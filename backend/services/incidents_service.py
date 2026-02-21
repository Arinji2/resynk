import math
from services.pocketbase_service import get_all_incidents
from services.pocketbase_service import create_incident
from services.pocketbase_service import update_incident


DISTANCE_THRESHOLD = 0.01  


def calculate_distance(lat1, lon1, lat2, lon2):
    return math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)


def find_or_create_incident(report):

    response = get_all_incidents()

    incidents = response.get("items", [])

    if not incidents:
        return create_incident(report.latitude, report.longitude)

    for incident in incidents:
        print("INCIDENT RAW:", incident)

        distance = calculate_distance(
            report.latitude,
            report.longitude,
            incident["center_latitude"],
            incident["center_longitude"]
        )

        if distance < DISTANCE_THRESHOLD:
            new_count = incident["report_count"] + 1
            return update_incident(incident["id"], new_count)

    return create_incident(report.latitude, report.longitude)

