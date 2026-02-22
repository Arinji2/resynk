from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.sync_service import sync_data

router = APIRouter()


class LocationIn(BaseModel):
    lat: float = 0.0
    lon: float = 0.0

class UserIn(BaseModel):
    name: str = ""
    role: str = ""
    age: int = 0
    aadharNumber: str = ""
    allergies: str = ""
    medications: str = ""
    bloodGroup: str = ""
    last_location: LocationIn = LocationIn()




class ReportIn(BaseModel):
    id: str = ""
    title: str = ""
    description: str = ""
    imageUri: str = ""
    createdAt: str = ""
    latitude: float = 0.0
    longitude: float = 0.0
    meshSyncID: str = ""


class SyncRequest(BaseModel):
    user: UserIn
    reports: list[ReportIn] = []


@router.post("/")
def sync(data: SyncRequest):
    if not data.user.aadharNumber:
        raise HTTPException(status_code=400, detail="User aadharNumber is required")

    return sync_data(data.user, data.reports)
