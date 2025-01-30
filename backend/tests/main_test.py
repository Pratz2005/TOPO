from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_full_data():
    """Test unified dataset retrieval."""
    response = client.get("/api/data")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Ensure it returns a list
    assert len(response.json()) > 0  # Ensure it's not empty
    assert "Date" in response.json()[0]  # Ensure expected column exists

def test_get_file_specific_data():
    """Test retrieval of file-specific data."""
    response = client.get("/api/data/csv")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0  # Ensure it's not empty
    assert "Membership_ID" in response.json()[0]  # Ensure expected column

def test_get_nonexistent_file():
    """Test request for a non-existent file type."""
    response = client.get("/api/data/nonexistent")
    assert response.status_code == 404  # Expect 404 Not Found

def test_get_revenue_distribution():
    """Test revenue breakdown API."""
    response = client.get("/api/data/revenue")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    assert "Gym" in response.json()  # Ensure Gym exists

def test_sorting():
    """Test sorting functionality."""
    response = client.get("/api/data/csv?sort_by=Revenue")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 1
    assert data[0]["Revenue"] <= data[1]["Revenue"]  # Check sorting order
