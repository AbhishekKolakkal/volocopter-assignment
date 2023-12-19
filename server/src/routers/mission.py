# routers/mission.py
from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from database import get_db
from schemas import missionSchemas
from crud import missionCrud

router = APIRouter()

# Dependency to get the database session

@router.post("/missions/", response_model=missionSchemas.Mission)
def create_mission_api(mission: missionSchemas.MissionCreate, db: Session = Depends(get_db)):
    return missionCrud.create_mission(db, **mission.dict())

@router.get("/missions/")
def get_missions_api(db: Session = Depends(get_db)):
    return missionCrud.get_missions(db)

@router.put("/missions/{mission_id}", response_model=missionSchemas.Mission)
def move_mission_api(mission_id: int, mission: missionSchemas.MissionMove, db: Session = Depends(get_db)):
    return missionCrud.move_mission(db, mission_id, **mission.dict())

@router.delete("/missions/{mission_id}", response_model=missionSchemas.Mission)
def delete_mission_api(mission_id: int, db: Session = Depends(get_db)):
    return missionCrud.delete_mission(db, mission_id)
