from fastapi import APIRouter
from pydantic import BaseModel
from services.pocketbase_service import create_report
from services.incidents_service import find_or_create_incident

router = APIRouter()

class ReportIn(BaseModel):
    description: str
    latitude: float
    longitude: float

@router.post("/")
def post_report(data: ReportIn):
    result = create_report(data)
    print(result)

    if result["success"]:
        find_or_create_incident(data)

    return result
