from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

@router.post("/") 
def reports():
    return {"status": "ok"}
