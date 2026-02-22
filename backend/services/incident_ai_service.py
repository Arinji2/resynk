import uuid
from services.ai_service import ask_gemini


def analyze_report_for_incident(report_data: dict):
    """
    Uses Gemini AI to analyze a disaster report
    and return structured incident data.
    """

    prompt = f"""
You are a disaster analysis AI.

Analyze the report below and return ONLY valid JSON.

Report:
Description: {report_data["description"]}
Latitude: {report_data["latitude"]}
Longitude: {report_data["longitude"]}

Return JSON in EXACT format:

{{
  "title": "Short incident title",
  "priority_score": number between 1-10,
  "status": "active",
  "zone_sector": "estimated zone or sector",
  "location": "human readable location",
  "ai_where": "Where it happened",
  "ai_what": "What happened",
  "ai_when": "When it happened",
  "ai_infrastructure": ["roads", "bridges"]
}}

Return ONLY JSON.
"""

    result = ask_gemini(prompt)

    if not result or "error" in result:
        return None

    # Clamp priority score to 1–10
    try:
        priority = float(result.get("priority_score", 5))
    except:
        priority = 5

    priority = max(1, min(priority, 10))
    result["priority_score"] = priority

    # Generate unique reference ID
    result["ref_id"] = str(uuid.uuid4())[:8]

    return result
