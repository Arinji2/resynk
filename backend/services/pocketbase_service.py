import os
import requests
from dotenv import load_dotenv

load_dotenv()

POCKETBASE_URL = "https://db-aissms.arinji.com"
REPORTS_COLLECTION = "reports"
INCIDENTS_COLLECTION = "incidents"


# -----------------------
# Utility
# -----------------------

def is_success(status_code: int) -> bool:
    return 200 <= status_code < 300


def _headers(auth_token=None):
    headers = {"Content-Type": "application/json"}
    if auth_token:
        headers["Authorization"] = auth_token
    return headers


# -----------------------
# Reports
# -----------------------

def create_report(data, auth_token=None, incident_id=None):
    url = f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records"

    headers = {}
    if auth_token:
        headers["Authorization"] = auth_token

    payload = {
        "title": data.description[:50],
        "description": data.description,
        "severity_level": 5,
        "location": {
            "lat": data.latitude,
            "lon": data.longitude
        },
    }

    # Attach incident relation if exists
    if incident_id:
        payload["incident"] = incident_id

    response = requests.post(url, json=payload, headers=headers)

    print("REPORT CREATE STATUS:", response.status_code)
    print("REPORT CREATE RESPONSE:", response.text)

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
            },
            headers=_headers()
        )

        results.append({
            "status": response.status_code,
            "body": response.text
        })

    successful = sum(1 for r in results if is_success(r["status"]))

    return {
        "received": len(reports),
        "stored": successful,
        "details": results
    }


# -----------------------
# Incidents
# -----------------------

def get_all_incidents():
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records"
    )
    return response.json()


def create_incident(ai_data):
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records",
        json={
            "ref_id": ai_data["ref_id"],
            "title": ai_data["title"],
            "priority_score": ai_data["priority_score"],
            "status": ai_data["status"],
            "zone_sector": ai_data["zone_sector"],
            "location": ai_data["location"],
            "ai_where": ai_data["ai_where"],
            "ai_what": ai_data["ai_what"],
            "ai_when": ai_data["ai_when"],
            "ai_infrastructure": ai_data["ai_infrastructure"],
            "report_count": 1
        }
    )

    print("INCIDENT CREATE RESPONSE:", response.text)

    if is_success(response.status_code):
        return response.json()

    return None

def update_incident(incident_id, new_count):
    response = requests.patch(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records/{incident_id}",
        json={
            "report_count": new_count
        },
        headers=_headers()
    )

    return response.json()


# -----------------------
# Auth Helpers
# -----------------------

SUPERUSER_EMAIL = os.getenv("SUPERUSER_EMAIL")
SUPERUSER_PASSWORD = os.getenv("SUPERUSER_PASSWORD")


def get_superuser_token():
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/_superusers/auth-with-password",
        json={
            "identity": SUPERUSER_EMAIL,
            "password": SUPERUSER_PASSWORD
        },
        headers=_headers()
    )

    if is_success(response.status_code):
        return response.json().get("token")

    return None
