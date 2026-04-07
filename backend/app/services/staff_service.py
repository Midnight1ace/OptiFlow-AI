from app.schemas.staff import StaffSnapshot


_current_staff = StaffSnapshot(
    total=12,
    idle=2,
    busy=10,
    by_role={"nurse": 6, "tech": 4, "doctor": 2},
)


def get_current_staff() -> StaffSnapshot:
    return _current_staff


def update_staff(snapshot: StaffSnapshot) -> StaffSnapshot:
    global _current_staff
    _current_staff = snapshot
    return _current_staff
