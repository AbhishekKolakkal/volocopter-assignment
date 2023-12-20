from pydantic import BaseModel, Field
from enum import Enum

class MissionBase(BaseModel):
    name: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    state: str = Field(..., min_length=1)


class MissionCreate(MissionBase):
    pass

class Mission(MissionBase):
    id: int

    class Config:
        orm_mode = True

class MissionMove(BaseModel):
    new_state: str = Field(..., min_length=1)


class MissionStateBase(BaseModel):
    state_name: str = Field(..., min_length=1)
    display_name: str = Field(..., min_length=1)

class MissionState(MissionStateBase):
    id: int

    class Config:
        orm_mode = True

class MissionStateCreate(MissionStateBase):
    pass