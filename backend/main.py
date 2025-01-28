from fastapi import FastAPI, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from data_ingestion import DataIngestion  # Import the OOP-based data ingestion

# Initialize DataIngestion class
data_handler = DataIngestion("../data")

class DataAPI:
    """Handles API requests for retrieving dataset information."""
    
    def __init__(self):
        """Loads the unified dataset and file-specific datasets."""
        self.unified_dataset = self._load_pickle("unified_dataset.pkl")
        self.file_specific_data = {
            "csv": self._load_pickle("csv_data.pkl"),
            "json": self._load_pickle("json_data.pkl"),
            "pdf": self._load_pickle("pdf_data.pkl"),
            "pptx": self._load_pickle("pptx_data.pkl"),
        }

    def _load_pickle(self, file_path: str):
        """Loads a dataset from a pickle file, handling missing files."""
        try:
            return pd.read_pickle(file_path)
        except FileNotFoundError:
            print(f"Warning: {file_path} not found. Returning empty DataFrame.")
            return pd.DataFrame()  # Return empty DataFrame if file not found

    def get_full_data(self):
        """Returns the unified dataset as a dictionary."""
        return self.unified_dataset.fillna("N/A").to_dict(orient="records")

    def get_file_specific_data(self, file_type: str):
        """Returns data for a specific file type, or raises an error if not found."""
        if file_type not in self.file_specific_data:
            raise HTTPException(status_code=404, detail="File type not found")
        return self.file_specific_data[file_type].fillna("N/A").to_dict(orient="records")


# Initialize FastAPI
app = FastAPI()
data_api = DataAPI()  # Instance of DataAPI to handle API requests

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to match frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint: GET /api/data (Unified Dataset)
@app.get("/api/data")
def get_full_data():
    return data_api.get_full_data()

# Endpoint: GET /api/data/{file_type} (Specific Dataset)
@app.get("/api/data/{file_type}")
def get_file_specific_data(file_type: str):
    return data_api.get_file_specific_data(file_type)
