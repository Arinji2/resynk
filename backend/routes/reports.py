import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from services.pocketbase_service import create_report
from services.incidents_service import find_or_create_incident

router = APIRouter()

POCKETBASE_URL = "https://db-aissms.arinji.com"
AUTH_COLLECTION = "_superusers"

security = HTTPBearer()


class ReportIn(BaseModel):
    description: str
    latitude: float
    longitude: float


def verify_token(token: str) -> dict | None:
    """Verify a PocketBase token by calling the auth-refresh endpoint."""
    url = f"{POCKETBASE_URL}/api/collections/{AUTH_COLLECTION}/auth-refresh"
    response = requests.post(url, headers={"Authorization": token})

    if 200 <= response.status_code < 300:
        data = response.json()
        return data.get("record", data)
    return None


@router.post("/")
def post_report(
    data: ReportIn,
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """Create a report. Requires Bearer token from /auth/login."""
    token = credentials.credentials
    user = verify_token(token)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    result = create_report(data, auth_token=f"Bearer {token}")
    print(result)

    if result["success"]:
        find_or_create_incident(data)

    return result
