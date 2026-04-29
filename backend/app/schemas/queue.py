from datetime import datetime, timezone
from typing import Dict
from pydantic import BaseModel, Field


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class QueueSnapshot(BaseModel):
    areas: Dict[str, int] = Field(default_factory=dict)
    captured_at: datetime = Field(default_factory=utc_now)

    class Config:
        json_schema_extra = {
            "example": {
                "areas": {"ER": 18, "Lab": 6, "Radiology": 3},
                "captured_at": "2026-04-29T07:45:00Z",
            }
        }
