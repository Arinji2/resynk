import requests
from .incident_ai_service import analyze_report_for_incident
from .pocketbase_service import (
    POCKETBASE_URL,
    INCIDENTS_COLLECTION,
)

DISTANCE_THRESHOLD = 0.02


def find_or_create_incident_with_ai(data):
    """
    Uses AI to analyze report and create or merge incidents.
    """

    # 🔹 1️⃣ AI ANALYSIS
    ai_data = analyze_report_for_incident({
        "description": data.description,
        "latitude": data.latitude,
        "longitude": data.longitude
    })

    if not ai_data:
        return None

    # 🔹 2️⃣ Fetch existing incidents
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/{INCIDENTS_COLLECTION}/records"
    )

    incidents = response.json().get("items", [])

    # 🔹 3️⃣ Try to merge similar incidents
    for incident in incidents:
        lat_diff = abs(data.latitude - float(incident.get("latitude", 0)))
        lng_diff = abs(data.longitude - float(incident.get("longitude", 0)))

        if (
            incident.get("title") == ai_data["title"]
            and lat_diff < DISTANCE_THRESHOLD
            and lng_diff < DISTANCE_THRESHOLD
        ):
            return incident["id"]

    # 🔹 4️⃣ No match → Create new incident
    create_response = requests.post(
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
            "ai_how": ai_data["ai_how"],
            "ai_infrastructure": ai_data["ai_infrastructure"],
        },
    )

    if 200 <= create_response.status_code < 300:
        return create_response.json().get("id")

    print("INCIDENT CREATE ERROR:", create_response.text)
    return None
