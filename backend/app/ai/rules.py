from typing import Dict, List


def evaluate_system(queue: Dict[str, int], staff: Dict[str, int]) -> List[str]:
    actions: List[str] = []

    if queue.get("ER", 0) > 15:
        actions.append("Open new ER counter")

    if staff.get("idle", 0) > 0 and queue.get("ER", 0) > 0:
        actions.append("Reassign idle staff")

    if queue.get("Lab", 0) > 8:
        actions.append("Add lab technician shift")

    if not actions:
        actions.append("System stable - monitor queues")

    return actions
