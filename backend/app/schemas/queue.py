from pydantic import BaseModel, Field
from typing import Dict


class QueueSnapshot(BaseModel):
    areas: Dict[str, int] = Field(default_factory=dict)

    class Config:
        json_schema_extra = {
            "example": {"areas": {"ER": 18, "Lab": 6, "Radiology": 3}}
        }
