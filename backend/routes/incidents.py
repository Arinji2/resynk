from fastapi import APIRouter
import requests

router = APIRouter()

POCKETBASE_URL = "https://db-aissms.arinji.com/"


@router.get("/")
def get_incidents():
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/incidents/records"
    )
    return response.json()
