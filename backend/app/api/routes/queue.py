from fastapi import APIRouter
from app.schemas.queue import QueueSnapshot
from app.services.queue_service import get_current_queue, update_queue

router = APIRouter()


@router.get("/queue", response_model=QueueSnapshot)
def read_queue():
    return get_current_queue()


@router.post("/queue", response_model=QueueSnapshot)
def write_queue(snapshot: QueueSnapshot):
    return update_queue(snapshot)
