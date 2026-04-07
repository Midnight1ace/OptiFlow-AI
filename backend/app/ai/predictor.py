from typing import Dict, List


def predict(queue_history: List[Dict[str, int]]):
    if not queue_history:
        return {"next_hour": {}}
    return {"next_hour": queue_history[-1]}
