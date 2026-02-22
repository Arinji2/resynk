import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from services.pocketbase_service import create_report
from services.incidents_service import find_or_create_incident_with_ai

router = APIRouter()

POCKETBASE_URL = "https://db-aissms.arinji.com"
AUTH_COLLECTION = "_superusers"

security = HTTPBearer()


# ----------------------------
# Request Model
# ----------------------------

class ReportIn(BaseModel):
    description: str
    latitude: float
    longitude: float


# ----------------------------
# Token Verification
# ----------------------------

def verify_token(token: str) -> dict | None:
    """
    Verifies PocketBase superuser token using auth-refresh.
    """
    url = f"{POCKETBASE_URL}/api/collections/{AUTH_COLLECTION}/auth-refresh"

    response = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}"}
    )

    if 200 <= response.status_code < 300:
        return response.json().get("record")

    return None


# ----------------------------
# Create Report Endpoint
# ----------------------------

@router.post("/")
def post_report(
    data: ReportIn,
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Creates a report.

    Flow:
    1️⃣ Verify superuser token
    2️⃣ AI analyzes report
    3️⃣ Find or create incident
    4️⃣ Attach incident to report
    5️⃣ Save report to PocketBase
    """

    token = credentials.credentials

    # 1️⃣ Verify Token
    user = verify_token(token)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    # 2️⃣ AI Incident Detection
    incident_id = find_or_create_incident_with_ai(data)

    # 3️⃣ Create Report with Incident ID
    result = create_report(
        data,
        auth_token=f"Bearer {token}",
        incident_id=incident_id
    )

    # Debug prints (safe for development)
    print("INCIDENT ID:", incident_id)
    print("REPORT RESULT:", result)

    return result
