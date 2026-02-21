from fastapi import FastAPI 
from routes import reports,incidents,sync, news


app = FastAPI(
    title="Resilience Engine API",
    description="Offline-first disaster coordination backend",
    version="1.0.0"
)

app.include_router(reports.router, prefix="/reports", tags=["Reports"])
#app.include_router(sync.router, prefix="/sync", tags=["Sync"])
app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
app.include_router(news.router, prefix="/news", tags=["NEWS"])

@app.get("/health")
def health():
    return {"status": "ok"}
