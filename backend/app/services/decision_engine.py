from app.schemas.queue import QueueSnapshot
from app.schemas.staff import StaffSnapshot
from app.schemas.decision import DecisionResponse
from app.ai.rules import evaluate_system


def evaluate_decisions(queue: QueueSnapshot, staff: StaffSnapshot) -> DecisionResponse:
    actions = evaluate_system(
        queue.areas,
        {
            "idle": staff.idle,
            "total": staff.total,
            "busy": staff.busy,
            "by_role": staff.by_role,
        },
    )
    return DecisionResponse(actions=actions)
