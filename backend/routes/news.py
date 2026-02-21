from fastapi import APIRouter, Query, HTTPException
from gnews import GNews
from typing import Any, List, Dict

router = APIRouter()

# Configure GNews safely
google_news = GNews(
    max_results=10,
    language="en",
    country="IN",
)


@router.get("/")
def get_news(search: str = Query(..., min_length=2)) -> Dict[str, Any]:
    """
    Fetch latest news articles based on search query.
    """

    try:
        articles = google_news.get_news(search)

        if not articles:
            return {
                "query": search,
                "total": 0,
                "results": [],
                "message": "No articles found."
            }

        results: List[Dict[str, Any]] = []

        for article in articles:
            results.append({
                "title": article.get("title"),
                "summary": article.get("description"),
                "source": (
                    article.get("publisher", {}).get("title")
                    if isinstance(article.get("publisher"), dict)
                    else article.get("publisher")
                ),
                "published_at": article.get("published date"),
                "url": article.get("url"),
            })

        return {
            "query": search,
            "total": len(results),
            "results": results,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch news: {str(e)}"
        )
