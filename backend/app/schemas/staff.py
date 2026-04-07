from pydantic import BaseModel, Field
from typing import Dict


class StaffSnapshot(BaseModel):
    total: int = 0
    idle: int = 0
    busy: int = 0
    by_role: Dict[str, int] = Field(default_factory=dict)

    class Config:
        json_schema_extra = {
            "example": {
                "total": 12,
                "idle": 2,
                "busy": 10,
                "by_role": {"nurse": 6, "tech": 4, "doctor": 2},
            }
        }
