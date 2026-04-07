from fastapi import APIRouter
from app.schemas.staff import StaffSnapshot
from app.services.staff_service import get_current_staff, update_staff

router = APIRouter()


@router.get("/staff", response_model=StaffSnapshot)
def read_staff():
    return get_current_staff()


@router.post("/staff", response_model=StaffSnapshot)
def write_staff(snapshot: StaffSnapshot):
    return update_staff(snapshot)
