# schemas.py
from pydantic import BaseModel


class MissionBase(BaseModel):
    name: str
    state: str

class MissionCreate(MissionBase):
    pass

class Mission(MissionBase):
    id: int

    class Config:
        orm_mode = True

class MissionMove(BaseModel):
    new_state: str

