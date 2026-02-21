import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=API_KEY)


def ask_gemini(prompt: str):

    structured_prompt = f"""
    You are an AI system that MUST return valid JSON.
    Do not return markdown.
    Do not return explanations.
    Only return JSON.

    Prompt:
    {prompt}
    """

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=structured_prompt
    )

    text = response.text.strip()

    try:
        return json.loads(text)
    except Exception:
        return {
            "error": "Model did not return valid JSON",
            "raw_response": text
        }
