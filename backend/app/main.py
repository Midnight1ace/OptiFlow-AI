from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.routes import queue, staff, decisions, health
from app.utils.logger import configure_logging

settings = get_settings()
configure_logging(settings.LOG_LEVEL)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(queue.router, prefix=settings.API_V1_STR, tags=["queue"])
app.include_router(staff.router, prefix=settings.API_V1_STR, tags=["staff"])
app.include_router(decisions.router, prefix=settings.API_V1_STR, tags=["decisions"])


@app.get("/")
def root():
    return {"name": settings.APP_NAME, "status": "ok"}
