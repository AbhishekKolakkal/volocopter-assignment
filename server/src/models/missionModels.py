from sqlalchemy import Column, Integer, String
from ..database import Base


class Missions(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    state = Column(String)

class Mission_State(Base):
    __tablename__ = "mission_state"

    id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String)
    display_name = Column(String)

    