# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
# from motor.motor_asyncio import AsyncIOMotorClient
# from bson import ObjectId

app = FastAPI()

# CORS middleware to allow requests from the React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB configuration
MONGO_URL = "mongodb://localhost:27017"
# client = AsyncIOMotorClient(MONGO_URL)
# database = client["flight_missions"]
# missions_collection = database["missions"]
missions_collection = [
    {"id": '1000', "name": "demo", "state": "pre-flight"}
]

START_ID = 1000

class Mission(BaseModel):
    # id: int
    name: str
    state: str

class MoveMission(BaseModel):
    new_state: str

# @app.get("/missions", response_model=list[Mission])
@app.get("/missions", response_model=list)
async def get_missions():
    # missions = await missions_collection.find().to_list(1000)
    missions = missions_collection
    return missions

@app.post("/missions", response_model=dict)
async def create_mission(mission: Mission):
    print("Abhsihek Kolakkal")
    print(mission)
    print("end")
    mission_dict = jsonable_encoder(mission)
    print(mission_dict)
    global START_ID
    START_ID = START_ID + 1
    mission_dict["id"] = START_ID 
    # result = await missions_collection.insert_one(mission_dict)
    result = missions_collection.append(mission_dict)
    # return {"message": "Mission created", "id": str(result.inserted_id)}
    return {"message": "Mission Created"}

@app.put("/missions/{mission_id}", response_model=dict)
async def move_mission(mission_id: str, move_mission_data: MoveMission):
    print(mission_id, move_mission_data)
    return {"message": "Mission Moved"}

    # print(mission_id, move_mission_data.dict())
    # try:
    #     new_state = move_mission_data.new_state
    #     result = await missions_collection.update_one(
    #         {"_id": ObjectId(mission_id)},
    #         {"$set": {"state": new_state}}
    #     )
    #     if result.modified_count == 0:
    #         raise HTTPException(status_code=404, detail="Mission not found")
    #     return {"message": "Mission moved successfully"}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
    

@app.delete("/missions/{mission_id}", response_model=dict)
async def delete_mission(mission_id: str):
    print(mission_id)
    return {"message": "Message deleted"}
    # result = await missions_collection.delete_one({"_id": ObjectId(mission_id)})
    # if result.deleted_count == 0:
    #     raise HTTPException(status_code=404, detail="Mission not found")
    # return {"message": "Mission deleted"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
