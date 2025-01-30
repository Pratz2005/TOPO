import os
import pandas as pd
import pytest
from data_ingestion import DataIngestion
@pytest.fixture
def data_ingestion():
    return DataIngestion("../data")
def test_ingest_csv(data_ingestion):
    df = data_ingestion.ingest_csv("dataset2.csv")
    assert isinstance(df, pd.DataFrame)
    assert not df.empty  # Ensure it's not empty
def test_ingest_json(data_ingestion):
    df = data_ingestion.ingest_json("dataset1.json")
    assert isinstance(df, pd.DataFrame)
    assert "company_id" in df.columns  # Check for expected column
def test_ingest_pptx(data_ingestion):
    df, revenue_breakdown = data_ingestion.ingest_pptx("dataset4.pptx")
    assert isinstance(df, pd.DataFrame)
    assert isinstance(revenue_breakdown, dict)
    assert "Gym" in revenue_breakdown  # Check if Gym exists in revenue breakdown

