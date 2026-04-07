from sqlalchemy import Column, DateTime, Integer, JSON
from sqlalchemy.sql import func
from app.db.base import Base


class StaffSnapshotModel(Base):
    __tablename__ = "staff_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    by_role = Column(JSON, nullable=False)
    total = Column(Integer, nullable=False)
    idle = Column(Integer, nullable=False)
    busy = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
