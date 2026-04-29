from datetime import datetime, timezone
from typing import Dict
from pydantic import BaseModel, Field


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class StaffSnapshot(BaseModel):
    total: int = 0
    idle: int = 0
    busy: int = 0
    by_role: Dict[str, int] = Field(default_factory=dict)
    captured_at: datetime = Field(default_factory=utc_now)

    class Config:
        json_schema_extra = {
            "example": {
                "total": 12,
                "idle": 2,
                "busy": 10,
                "by_role": {"nurse": 6, "tech": 4, "doctor": 2},
                "captured_at": "2026-04-29T07:45:00Z",
            }
        }
