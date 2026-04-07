from functools import lru_cache
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[3]
load_dotenv(ROOT_DIR / ".env")


class Settings:
    APP_NAME = os.getenv("APP_NAME", "OptiFlow AI")
    API_V1_STR = os.getenv("API_V1_STR", "/api/v1")
    ENVIRONMENT = os.getenv("ENVIRONMENT", "local")
    DATABASE_URL = os.getenv("DATABASE_URL", "")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    API_KEY = os.getenv("API_KEY", "")
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")


@lru_cache
def get_settings() -> Settings:
    return Settings()
