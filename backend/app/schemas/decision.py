from pydantic import BaseModel, Field
from typing import List
from app.schemas.queue import QueueSnapshot
from app.schemas.staff import StaffSnapshot


class DecisionRequest(BaseModel):
    queue: QueueSnapshot
    staff: StaffSnapshot


class DecisionResponse(BaseModel):
    actions: List[str] = Field(default_factory=list)
