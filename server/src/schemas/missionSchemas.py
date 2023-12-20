# schemas.py
from pydantic import BaseModel


class MissionBase(BaseModel):
    name: str
    description: str
    state: str

class MissionCreate(MissionBase):
    pass

class Mission(MissionBase):
    id: int

    class Config:
        orm_mode = True

class MissionMove(BaseModel):
    new_state: str


class MissionStateBase(BaseModel):
    state_name: str
    display_name: str

class MissionState(MissionStateBase):
    id: int

    class Config:
        orm_mode = True

class MissionStateCreate(MissionStateBase):
    pass