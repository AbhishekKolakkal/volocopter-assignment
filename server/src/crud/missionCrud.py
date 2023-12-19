# crud.py
from sqlalchemy.orm import Session
from models.missionModels import Missions

def get_missions(db: Session):
    return db.query(Missions).all()

def create_mission(db: Session, name: str, state: str):
    mission = Missions(name=name, state=state)
    db.add(mission)
    db.commit()
    db.refresh(mission)
    return mission

def move_mission(db: Session, id: int, new_state: str):
    mission = db.query(Missions).filter(Missions.id == id).first()
    if mission:
        mission.state = new_state
        db.add(mission)
        db.commit()
        db.refresh(mission)
    return mission

def delete_mission(db: Session, mission_id: int):
    mission = db.query(Missions).filter(Missions.id == mission_id).first()
    if mission:
        db.delete(mission)
        db.commit()
    return mission
