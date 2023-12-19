# crud.py
from os import name
from sqlalchemy.orm import Session
from models.missionModels import Missions, Mission_State

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


def get_mission_states(db: Session):
    return db.query(Mission_State).all()

def create_mission_state(db: Session, state_name: str, display_name: str):
    mission_state = Mission_State(state_name=state_name, display_name=display_name)
    db.add(mission_state)
    db.commit()
    db.refresh(mission_state)
    return mission_state

def delete_mission_state(db: Session, mission_state_id: int):
    mission_state = db.query(Mission_State).filter(Mission_State.id == mission_state_id).first()
    if mission_state:
        db.delete(mission_state)
        db.commit()
    return mission_state
