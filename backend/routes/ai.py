from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import ask_gemini

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str


@router.post("/")
def generate_ai_response(data: PromptRequest):
    return ask_gemini(data.prompt)
