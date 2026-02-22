import os
import json
import random
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError

load_dotenv()

# Load multiple API keys (comma-separated)
_raw_keys = os.getenv("GOOGLE_API_KEYS", "")
API_KEYS = [k.strip() for k in _raw_keys.split(",") if k.strip()]

# Fallback: single key for backwards compatibility
if not API_KEYS:
    single = os.getenv("GOOGLE_API_KEY", "")
    if single:
        API_KEYS = [single]

if not API_KEYS:
    raise RuntimeError(
        "No API keys found. Set GOOGLE_API_KEYS (comma-separated) in backend/.env"
    )

print(f"Loaded {len(API_KEYS)} Gemini API key(s)")

# Pre-create clients for each key
_clients = [genai.Client(api_key=key) for key in API_KEYS]


def ask_gemini(prompt: str):
    structured_prompt = f"""
You are an AI system that MUST return valid JSON.
Do not return markdown.
Do not return explanations.
Only return JSON.

Prompt:
{prompt}
"""

    # Shuffle clients so we spread load randomly
    clients = list(_clients)
    random.shuffle(clients)

    last_error = None
    for i, client in enumerate(clients):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=structured_prompt
            )

            text = response.text.strip()

            # Strip markdown code fences if present (```json ... ```)
            if text.startswith("```"):
                lines = text.split("\n")
                # Remove first line (```json) and last line (```)
                lines = [l for l in lines if not l.strip().startswith("```")]
                text = "\n".join(lines).strip()

            print(text)

            try:
                return json.loads(text)
            except Exception:
                return {
                    "error": "Model did not return valid JSON",
                    "raw_response": text
                }

        except ClientError as e:
            last_error = e
            if "429" in str(e):
                print(f"Key {i+1}/{len(clients)} rate limited, trying next...")
                continue
            else:
                raise

    # All keys exhausted
    raise last_error
