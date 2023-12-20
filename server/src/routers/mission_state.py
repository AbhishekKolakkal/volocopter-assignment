from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import missionSchemas
from ..crud import missionCrud


router = APIRouter()

@router.get("/mission_state/")
def get_mission_states_api(db: Session = Depends(get_db)):
    return missionCrud.get_mission_states(db)

@router.post("/mission_state/", response_model=missionSchemas.MissionStateCreate)
def create_mission_state_api(mission_state: missionSchemas.MissionStateCreate, db: Session = Depends(get_db)):
    return missionCrud.create_mission_state(db, **mission_state.dict())

@router.delete("/mission_state/{mission_state_id}", response_model=missionSchemas.MissionState)
def delete_mission_state_api(mission_state_id: int, db: Session = Depends(get_db)):
    return missionCrud.delete_mission_state(db, mission_state_id)
