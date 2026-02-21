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
            "email": random_email,
            "password": random_password,
            "passwordConfirm": random_password,
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


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
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records",
        json={
            "title": report.title,
            "description": report.description,
            "image": report.imageUri,
            "location": {"lat": report.latitude, "lon": report.longitude},
            "mesh_sync_id": report.meshSyncID,
            "incident": incident_id,
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


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
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        json={
            "title": title,
            "location": {"lat": report.latitude, "lon": report.longitude},
            "status": "active",
            "priority_score": 1,
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


def find_or_create_incident(report, token: str):
    """Find an incident by title, or create a new one."""
    existing = find_incident_by_title(report.title, token)
    if existing:
        return existing["id"]

    new_incident = create_incident(report.title, report, token)
    if new_incident:
        return new_incident["id"]
    return None


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
