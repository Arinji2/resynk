from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.sync_service import sync_family

router = APIRouter()


class FamilyMemberIn(BaseModel):
    name: str
    blood_type: str = ""
    is_head: bool = False
    allergies: str = ""
    medication: str = ""
    other_info: str = ""
    age: int = 0


class SyncRequest(BaseModel):
    family: list[FamilyMemberIn]


@router.post("/")
def family_sync(data: SyncRequest):
    if not data.family:
        raise HTTPException(status_code=400, detail="Family array cannot be empty")

    family_dicts = [m.model_dump() for m in data.family]
    return sync_family(family_dicts)
