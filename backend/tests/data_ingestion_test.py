import os
import pandas as pd
import pytest
from data_ingestion import DataIngestion

@pytest.fixture
def data_ingestion():
    """Fixture to initialize DataIngestion class."""
    return DataIngestion("../data")

def test_ingest_csv(data_ingestion):
    """Test CSV ingestion."""
    df = data_ingestion.ingest_csv("dataset2.csv")
    assert isinstance(df, pd.DataFrame)
    assert not df.empty  # Ensure it's not empty
    assert "Date" in df.columns  # Check if expected column exists

def test_ingest_json(data_ingestion):
    """Test JSON ingestion."""
    df = data_ingestion.ingest_json("dataset1.json")
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert "company_id" in df.columns  # Check for expected column
    assert "employee_name" in df.columns  # Check if employee names exist

def test_ingest_pdf(data_ingestion):
    """Test PDF ingestion."""
    df = data_ingestion.ingest_pdf("dataset3.pdf")
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert "Revenue (in $)" in df.columns  # Ensure revenue column exists

def test_ingest_pptx(data_ingestion):
    """Test PPTX ingestion with revenue breakdown."""
    df, revenue_breakdown = data_ingestion.ingest_pptx("dataset4.pptx")
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert isinstance(revenue_breakdown, dict)
    assert "Gym" in revenue_breakdown  # Check if Gym exists in revenue breakdown

def test_ingest_missing_file(data_ingestion):
    """Test behavior when ingesting a non-existent file."""
    with pytest.raises(FileNotFoundError):
        data_ingestion.ingest_csv("non_existent.csv")
