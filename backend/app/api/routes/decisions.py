from fastapi import APIRouter
from app.schemas.decision import DecisionRequest, DecisionResponse
from app.services.decision_engine import evaluate_decisions
from app.services.queue_service import get_current_queue
from app.services.staff_service import get_current_staff

router = APIRouter()


@router.get("/decisions", response_model=DecisionResponse)
def read_decisions():
    queue = get_current_queue()
    staff = get_current_staff()
    return evaluate_decisions(queue, staff)


@router.post("/decisions", response_model=DecisionResponse)
def write_decisions(payload: DecisionRequest):
    return evaluate_decisions(payload.queue, payload.staff)
