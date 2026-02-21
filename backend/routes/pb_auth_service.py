import requests
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

POCKETBASE_URL = "https://db-aissms.arinji.com"
AUTH_COLLECTION = "_superusers"


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    """
    Authenticate a user against PocketBase and return the auth token.
    """
    url = f"{POCKETBASE_URL}/api/collections/{AUTH_COLLECTION}/auth-with-password"

    print(f"[AUTH] Attempting login for: {data.email}")
    print(f"[AUTH] PocketBase URL: {url}")

    response = requests.post(url, json={
        "identity": data.email.strip(),
        "password": data.password.strip(),
    })

    print(f"[AUTH] PocketBase status: {response.status_code}")
    print(f"[AUTH] PocketBase response: {response.text}")

    if 200 <= response.status_code < 300:
        result = response.json()
        return {
            "token": result.get("token"),
            "user": result.get("record"),
        }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid email or password",
    )
