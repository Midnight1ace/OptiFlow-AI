from app.ai.rules import evaluate_system
from app.schemas.decision import DecisionAction, DecisionResponse
from app.schemas.queue import QueueSnapshot
from app.schemas.staff import StaffSnapshot

ER_THRESHOLD = 15
LAB_THRESHOLD = 8


def _build_action(label: str, tag: str, tone: str, rationale: str) -> DecisionAction:
    return DecisionAction(label=label, tag=tag, tone=tone, rationale=rationale)


def evaluate_decisions(queue: QueueSnapshot, staff: StaffSnapshot) -> DecisionResponse:
    queue_areas = queue.areas
    staff_state = {
        "idle": staff.idle,
        "total": staff.total,
        "busy": staff.busy,
        "by_role": staff.by_role,
    }

    raw_actions = evaluate_system(queue_areas, staff_state)
    reasons: list[str] = []
    actions: list[DecisionAction] = []

    er_waiting = queue_areas.get("ER", 0)
    lab_waiting = queue_areas.get("Lab", 0)
    total_waiting = sum(queue_areas.values())
    busiest_area = max(queue_areas, key=queue_areas.get, default="ER")
    busiest_count = queue_areas.get(busiest_area, 0)
    utilization = (staff.busy / staff.total) if staff.total else 0

    if "Open new ER counter" in raw_actions:
        reasons.append(
            f"ER queue is above the congestion threshold ({er_waiting} waiting vs {ER_THRESHOLD} threshold)."
        )
        actions.append(
            _build_action(
                label="Open new ER counter",
                tag="Urgent",
                tone="urgent",
                rationale="Reduce front-door congestion before the ER queue grows further.",
            )
        )

    if "Reassign idle staff" in raw_actions:
        reasons.append(
            f"{staff.idle} staff member(s) are idle while the ER still has active patient demand."
        )
        actions.append(
            _build_action(
                label="Reassign idle staff",
                tag="Staffing",
                tone="info",
                rationale="Move available coverage toward the busiest area to shorten waits.",
            )
        )

    if "Add lab technician shift" in raw_actions:
        reasons.append(
            f"Lab queue is above the support threshold ({lab_waiting} waiting vs {LAB_THRESHOLD} threshold)."
        )
        actions.append(
            _build_action(
                label="Add lab technician shift",
                tag="Capacity",
                tone="success",
                rationale="Increase diagnostic throughput to prevent spillover into downstream care.",
            )
        )

    if not reasons:
        reasons.append(
            f"Queue load is currently controlled with {total_waiting} patients waiting across tracked departments."
        )

    if not actions:
        actions.append(
            _build_action(
                label="Continue monitoring current load",
                tag="Stable",
                tone="success",
                rationale="No threshold breach detected in the present snapshot.",
            )
        )

    if er_waiting > ER_THRESHOLD or lab_waiting > LAB_THRESHOLD:
        status = "critical"
        summary = (
            f"{busiest_area} is the main pressure point with {busiest_count} waiting patients. "
            "Immediate operational action is recommended."
        )
    elif busiest_count >= 8 or utilization >= 0.85:
        status = "watch"
        summary = (
            f"{busiest_area} is elevated at {busiest_count} waiting patients. "
            "Monitor staffing closely and prepare the next intervention."
        )
    else:
        status = "stable"
        summary = (
            f"Current load is manageable. {busiest_area} is the busiest tracked area with "
            f"{busiest_count} waiting patients."
        )

    return DecisionResponse(
        engine="Rules-based triage engine",
        status=status,
        summary=summary,
        generated_at=max(queue.captured_at, staff.captured_at),
        actions=actions,
        reasons=reasons,
    )
