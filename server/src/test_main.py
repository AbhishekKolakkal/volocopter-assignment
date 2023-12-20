from fastapi.testclient import TestClient
from src.main import app


client = TestClient(app)


def test_get_missions():
    resp = client.get("/api/v1/missions/")
    print(resp.json())
    assert resp.status_code == 200


def test_create_missions():
    resp = client.post("/api/v1/missions/", json={
                                                "name": "Test Flight",
                                                "description": "Test Description",
                                                "state": "pre-flight"
                                            })
    assert resp.status_code == 200

def test_update_missions():
    resp = client.put("/api/v1/missions/1", json={
                                                "new_state": "post-flight"
                                            })
    assert resp.status_code == 200

def test_delete_missions():
    resp = client.delete("/api/v1/missions/1")
    assert resp.status_code == 200