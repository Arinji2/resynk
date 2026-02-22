import requests
import uuid
from services.pocketbase_service import POCKETBASE_URL, get_superuser_token, is_success


USERS_COLLECTION = "users"
REPORTS_COLLECTION = "reports"


def _auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


# --- User helpers ---

def find_user_by_aadhar(aadhar_number: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{USERS_COLLECTION}/records",
        params={"filter": f"(adhar_number='{aadhar_number}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def create_user(user_data, token: str):
    random_password = uuid.uuid4().hex
    random_email = f"{uuid.uuid4().hex[:8]}@sync.local"
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{USERS_COLLECTION}/records",
        json={
            "name": user_data.name,
            "role": user_data.role,
            "age": user_data.age,
            "adhar_number": user_data.aadharNumber,
            "allergies": user_data.allergies,
            "medications": user_data.medications,
            "blood_type": user_data.bloodGroup,
            "last_location": {"lat": user_data.last_location.lat, "lon": user_data.last_location.lon},
            "email": random_email,
            "password": random_password,
            "passwordConfirm": random_password,
        },
        headers=_auth_headers(token),
    )
    if is_success(response.status_code):
        return response.json()
    print(f"USER CREATE FAILED ({response.status_code}): {response.text}")
    return None


def update_user(user_id: str, user_data, token: str):
    response = requests.patch(
        f"{POCKETBASE_URL}/api/collections/{USERS_COLLECTION}/records/{user_id}",
        json={
            "name": user_data.name,
            "role": user_data.role,
            "age": user_data.age,
            "allergies": user_data.allergies,
            "medications": user_data.medications,
            "blood_type": user_data.bloodGroup,
            "last_location": {"lat": user_data.last_location.lat, "lon": user_data.last_location.lon},
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


# --- Report helpers ---

INCIDENTS_COLLECTION = "incidents"


def find_report_by_mesh_sync_id(mesh_sync_id: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records",
        params={"filter": f"(mesh_sync_id='{mesh_sync_id}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def create_report_record(report, incident_id: str, token: str):
    payload = {
        "title": report.title,
        "description": report.description,
        "image": report.imageUri,
        "location": {"lat": report.latitude, "lon": report.longitude},
        "mesh_sync_id": report.meshSyncID,
        "incident": incident_id,
        "status": "pending",
    }
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records",
        json=payload,
        headers=_auth_headers(token),
    )
    if is_success(response.status_code):
        return response.json()
    print(f"[SYNC] REPORT CREATE FAILED ({response.status_code}): {response.text}")
    return None


# --- Incident helpers ---

def find_incident_by_title(title: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        params={"filter": f"(title='{title}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None



def create_incident(title: str, report, token: str):
    # Use AI to analyze the report and get structured incident data
    from services.incident_ai_service import analyze_report_for_incident

    ai_data = None
    try:
        ai_data = analyze_report_for_incident({
            "description": report.description,
            "latitude": report.latitude,
            "longitude": report.longitude
        })
    except Exception as e:
        print(f"AI analysis failed for sync incident: {e}")

    if ai_data:
        payload = {
            "title": ai_data.get("title", title),
            "category": ai_data.get("category", ""),
            "location": {"lat": report.latitude, "lon": report.longitude},
            "status": ai_data.get("status", "active"),
            "priority_score": ai_data.get("priority_score", 1),
            "zone_sector": ai_data.get("zone_sector", ""),
            "ai_where": ai_data.get("ai_where", ""),
            "ai_what": ai_data.get("ai_what", ""),
            "ai_when": ai_data.get("ai_when", ""),
            "ai_infrastructure": ai_data.get("ai_infrastructure", []),
        }
    else:
        payload = {
            "title": title,
            "location": {"lat": report.latitude, "lon": report.longitude},
            "status": "active",
            "priority_score": 1,
        }

    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        json=payload,
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


def _run_ai_analysis(report):
    """Run AI analysis and return the data, or None on failure."""
    from services.incident_ai_service import analyze_report_for_incident

    try:
        ai_data = analyze_report_for_incident({
            "description": report.description,
            "latitude": report.latitude,
            "longitude": report.longitude
        })
        return ai_data
    except Exception as e:
        print(f"AI analysis failed: {e}")
        return None


def _update_incident_with_ai(incident_id: str, ai_data: dict, token: str):
    """Update an existing incident with AI-generated fields."""
    payload = {
        "category": ai_data.get("category", ""),
        "zone_sector": ai_data.get("zone_sector", ""),
        "ai_where": ai_data.get("ai_where", ""),
        "ai_what": ai_data.get("ai_what", ""),
        "ai_when": ai_data.get("ai_when", ""),
        "ai_infrastructure": ai_data.get("ai_infrastructure", []),
        "priority_score": ai_data.get("priority_score", 1),
    }
    response = requests.patch(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records/{incident_id}",
        json=payload,
        headers=_auth_headers(token),
    )


def find_incident_by_location_and_category(lat: float, lon: float, category: str, token: str, radius_km: float = 2.0):
    """Find an existing incident of the same category within a radius."""
    # Roughly 1 degree is 111km
    delta = radius_km / 111.0
    min_lat, max_lat = lat - delta, lat + delta
    min_lon, max_lon = lon - delta, lon + delta

    # PocketBase filter for bounding box and category
    # We use .lat and .lon to access JSON object properties
    filter_str = f"(category='{category}' && location.lat >= {min_lat} && location.lat <= {max_lat} && location.lon >= {min_lon} && location.lon <= {max_lon})"
    
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        params={"filter": filter_str},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def find_or_create_incident(report, token: str):
    """Find an incident by location and category, or create a new one."""
    
    # Step 1: Run AI analysis first to get the category
    ai_data = _run_ai_analysis(report)
    if not ai_data:
        # Fallback to title-based matching if AI fails
        existing = find_incident_by_title(report.title, token)
        if existing:
            return existing["id"]
        # Create without AI if necessary
        new_incident = create_incident(report.title, report, token)
        return new_incident["id"] if new_incident else None

    category = ai_data.get("category", "")
    
    # Step 2: Try to find existing incident by location and category
    existing = find_incident_by_location_and_category(
        report.latitude, report.longitude, category, token
    )
    
    if existing:
        # Backfill AI data if missing
        if not existing.get("ai_where") and not existing.get("ai_what"):
            _update_incident_with_ai(existing["id"], ai_data, token)
        return existing["id"]

    # Step 3: No existing nearby incident found, create new one
    new_incident = create_incident(report.title, report, token)
    return new_incident["id"] if new_incident else None


# --- Main sync logic ---

def sync_data(user_data, reports: list):
    token = get_superuser_token()
    if not token:
        return {"success": False, "error": "Failed to authenticate with PocketBase"}

    # Step 1 — Find or create user by aadhar number
    existing_user = find_user_by_aadhar(user_data.aadharNumber, token)
    if existing_user:
        user_id = existing_user["id"]
        update_user(user_id, user_data, token)
    else:
        new_user = create_user(user_data, token)
        if not new_user:
            return {"success": False, "error": "Failed to create user"}
        user_id = new_user["id"]

    # Step 2 — Sync reports (skip duplicates by mesh_sync_id)
    created_reports = []
    skipped_reports = []

    for report in reports:
        if not report.meshSyncID:
            continue

        existing = find_report_by_mesh_sync_id(report.meshSyncID, token)
        if existing:
            skipped_reports.append(report.meshSyncID)
            continue

        # Find or create incident by title
        incident_id = find_or_create_incident(report, token) if report.title else None

        result = create_report_record(report, incident_id or "", token)
        if result:
            created_reports.append(result["id"])

    return {
        "success": True,
        "user_id": user_id,
        "created_reports": created_reports,
        "skipped_reports": skipped_reports,
    }
