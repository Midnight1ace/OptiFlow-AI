from sqlalchemy import Column, DateTime, Integer, JSON
from sqlalchemy.sql import func
from app.db.base import Base


class QueueSnapshotModel(Base):
    __tablename__ = "queue_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    areas = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
