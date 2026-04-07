from sqlalchemy import Column, DateTime, Integer, JSON
from sqlalchemy.sql import func
from app.db.base import Base


class DecisionModel(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)
    actions = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
