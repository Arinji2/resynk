from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.pocketbase_service import create_bulk_reports

router=APIRouter()

class ReportIn(BaseModel):
    description:str
    latitude: float
    longitude: float

@router.post("/")
def bulk_sync(data: list[ReportIn]):
    return create_bulk_reports(data)
