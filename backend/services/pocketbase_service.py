import requests
import uuid

POCKETBASE_URL = "https://db-aissms.arinji.com/"
REPORTS_COLLECTION = "reports"
INCIDENTS_COLLECTION = "incidents"

def is_success(status_code: int) -> bool:
    return 200 <= status_code < 300

def create_report(data, auth_token=None):
    url = f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records"
    headers = {}
    if auth_token:
        headers["Authorization"] = auth_token

    response = requests.post(url, json={
        "description": data.description,
        "latitude": data.latitude,
        "longitude": data.longitude
    }, headers=headers)

    print("PocketBase Status:", response.status_code)
    print("PocketBase Response:", response.text)

    return {
        "status": response.status_code,
        "success": 200 <= response.status_code < 300,
        "data": response.json() if 200 <= response.status_code < 300 else response.text
    }


def create_bulk_reports(reports):
    results = []
    
    for report in reports:
        response = requests.post(
            f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records",
            json={
                "description": report.description,
                "latitude": report.latitude,
                "longitude": report.longitude
            }
        )

        results.append({
            "status": response.status_code,
            "body": response.text
        })

    successful = sum(
        1 for r in results if 200 <= r["status"] < 300
    )

    return {
        "received": len(reports),
        "stored": successful,
        "details": results,
        "Length of reports": len(reports)
    }

def get_all_incidents():
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records"
    )
    return response.json()

def create_incident(center_latitude, center_longitude):
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        json={
            "center_latitude": center_latitude,
            "center_longitude": center_longitude,
            "report_count": 1,
            "status": "active"
        }
    )

    return response.json()

def update_incident(incident_id, new_count):
    response = requests.patch(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records/{incident_id}",
        json={
            "report_count": new_count
        }
    )

    return response.json()


# --- Sync Feature Helpers ---

USERS_COLLECTION = "users"
HOUSEHOLDS_COLLECTION = "households"
FAMILY_MEMBERS_COLLECTION = "family_members"

SUPERUSER_EMAIL = "website@aissms.arinji.com"
SUPERUSER_PASSWORD = "coauzBco3SVkmd6"


def get_superuser_token():
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/_superusers/auth-with-password",
        json={"identity": SUPERUSER_EMAIL, "password": SUPERUSER_PASSWORD}
    )
    if is_success(response.status_code):
        return response.json().get("token")
    return None


def _auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


def find_user_by_name(name: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{USERS_COLLECTION}/records",
        params={"filter": f"(name='{name}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def create_user(name: str, is_head: bool, token: str):
    random_password = uuid.uuid4().hex
    random_email = f"{uuid.uuid4().hex[:8]}@sync.local"
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{USERS_COLLECTION}/records",
        json={
            "name": name,
            "is_head": is_head,
            "email": random_email,
            "password": random_password,
            "passwordConfirm": random_password,
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


def find_household_by_head(user_id: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{HOUSEHOLDS_COLLECTION}/records",
        params={"filter": f"(head_of_house='{user_id}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def create_household(head_user_id: str, token: str):
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{HOUSEHOLDS_COLLECTION}/records",
        json={"head_of_house": head_user_id},
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


def find_family_member(household_id: str, name: str, token: str):
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{FAMILY_MEMBERS_COLLECTION}/records",
        params={"filter": f"(household='{household_id}' && full_name='{name}')"},
        headers=_auth_headers(token),
    )
    data = response.json()
    items = data.get("items", [])
    return items[0] if items else None


def create_family_member(household_id: str, member_data: dict, token: str):
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{FAMILY_MEMBERS_COLLECTION}/records",
        json={
            "household": household_id,
            "full_name": member_data["name"],
            "blood_type": member_data.get("blood_type", ""),
            "allergies": member_data.get("allergies", ""),
            "medications": member_data.get("medication", ""),
            "other_info": member_data.get("other_info", ""),
            "age": member_data.get("age", 0),
            "is_head": member_data.get("is_head", False)
        },
        headers=_auth_headers(token),
    )
    return response.json() if is_success(response.status_code) else None


