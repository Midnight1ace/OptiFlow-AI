from app.schemas.queue import QueueSnapshot


_current_queue = QueueSnapshot(areas={"ER": 18, "Lab": 6, "Radiology": 3})


def get_current_queue() -> QueueSnapshot:
    return _current_queue


def update_queue(snapshot: QueueSnapshot) -> QueueSnapshot:
    global _current_queue
    _current_queue = snapshot
    return _current_queue
