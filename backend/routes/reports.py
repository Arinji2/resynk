from fastapi import APIRouter
from pydantic import BaseModel

from services.pocketbase_service import create_report, get_superuser_token
from services.incidents_service import find_or_create_incident_with_ai

router = APIRouter()


# ----------------------------
# Request Model
# ----------------------------

class ReportIn(BaseModel):
    description: str
    latitude: float
    longitude: float


# ----------------------------
# Create Report Endpoint
# ----------------------------

@router.post("/")
def post_report(data: ReportIn):
    """
    Creates a report.

    Flow:
    1️⃣ AI analyzes report
    2️⃣ Find or create incident
    3️⃣ Attach incident to report
    4️⃣ Save report to PocketBase
    """

    # 1️⃣ Get superuser token for PocketBase
    token = get_superuser_token()

    # 2️⃣ AI Incident Detection
    incident_id = find_or_create_incident_with_ai(data)

    # 3️⃣ Create Report with Incident ID
    result = create_report(
        data,
        auth_token=f"Bearer {token}" if token else None,
        incident_id=incident_id
    )

    # Debug prints (safe for development)
    print("INCIDENT ID:", incident_id)
    print("REPORT RESULT:", result)

    return result
