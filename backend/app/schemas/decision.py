from datetime import datetime, timezone
from typing import List, Literal
from pydantic import BaseModel, Field
from app.schemas.queue import QueueSnapshot
from app.schemas.staff import StaffSnapshot


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class DecisionRequest(BaseModel):
    queue: QueueSnapshot
    staff: StaffSnapshot


class DecisionAction(BaseModel):
    label: str
    tag: str
    tone: Literal["urgent", "info", "success"]
    rationale: str


class DecisionResponse(BaseModel):
    engine: str = "Rules-based triage engine"
    status: Literal["stable", "watch", "critical"] = "stable"
    summary: str = "System stable. Continue monitoring live queue conditions."
    generated_at: datetime = Field(default_factory=utc_now)
    actions: List[DecisionAction] = Field(default_factory=list)
    reasons: List[str] = Field(default_factory=list)
