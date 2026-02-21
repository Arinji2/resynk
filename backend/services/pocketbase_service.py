import requests

POCKETBASE_URL = "https://db-aissms.arinji.com/"
REPORTS_COLLECTION = "reports"
INCIDENTS_COLLECTION = "incidents"

def is_success(status_code: int) -> bool:
    return 200 <= status_code < 300

def create_report(data):
    url = f"{POCKETBASE_URL}/api/collections/{REPORTS_COLLECTION}/records"
   
    response = requests.post(url, json={
        "description": data.description,
        "latitude": data.latitude,
        "longitude": data.longitude
    })

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

