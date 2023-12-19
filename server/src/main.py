from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi import Body
from pydantic import BaseModel, Field
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import models

app = FastAPI()


models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Mission(BaseModel):
    name: str
    state: str



@app.get("/missions")
async def get_missions(db: Session = Depends(get_db)):
    return db.query(models.Missions).all()

@app.post("/missions")
async def create_mission(mission: Mission, db: Session = Depends(get_db)):
    
    mission_model = models.Missions()
    mission_model.name = mission.name
    mission_model.state = mission.state

    db.add(mission_model)
    db.commit()

    return {"message": "Mission Created"}

@app.put("/missions/{mission_id}")
async def move_mission(mission_id: int, new_state: str = Body(...), db: Session = Depends(get_db)):
    mission_model = db.query(models.Missions).filter(models.Missions.id == mission_id).first()
    if mission_model == None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {mission_id} : Does not Exist"
        )
    
    mission_model.state = new_state
    db.add(mission_model)
    db.commit()
    
    
    return mission_model

    

@app.delete("/missions/{mission_id}")
async def delete_mission(mission_id: int, db: Session = Depends(get_db)):
    mission_model = db.query(models.Missions).filter(models.Missions.id == mission_id).first()

    if mission_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {mission_id} : Does not exist"
        )
    
    db.query(models.Missions).filter(models.Missions.id == mission_id).delete() #TODO: THIS LINE CAN CHANGE

    db.commit()
    return {"message": "Message deleted"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
