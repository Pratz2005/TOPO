from fastapi.testclient import TestClient
from main import app
client = TestClient(app)
def test_get_full_data():
    response = client.get("/api/data")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Ensure it returns a list
def test_get_file_specific_data():
    response = client.get("/api/data/csv")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
def test_get_revenue_distribution():
    response = client.get("/api/data/revenue")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    assert "Gym" in response.json()  # Check if Gym exists