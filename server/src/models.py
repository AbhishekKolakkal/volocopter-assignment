from sqlalchemy import Column, Integer, String
from database import Base


class Missions(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    state = Column(String)
