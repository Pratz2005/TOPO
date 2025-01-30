from fastapi import FastAPI, HTTPException, Query
import os
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from data_ingestion import DataIngestion  

# Initialize DataIngestion class
data_handler = DataIngestion("../data")

class DataAPI:
    """Handles API requests for retrieving dataset information with sorting and filtering."""
    
    def __init__(self):
        """Loads the unified dataset, file-specific datasets, and revenue breakdown."""
        self.unified_dataset = self._load_pickle("unified_dataset.pkl")
        self.file_specific_data = {
            "csv": self._load_pickle("csv_data.pkl"),
            "json": self._load_pickle("json_data.pkl"),
            "pdf": self._load_pickle("pdf_data.pkl"),
            "pptx": self._load_pickle("pptx_data.pkl"),
        }
        self.revenue_breakdown = self._load_revenue_breakdown()

    def _load_pickle(self, file_path: str):
        """Loads a dataset from a pickle file, handling missing files."""
        try:
            return pd.read_pickle(file_path)
        except FileNotFoundError:
            print(f"Warning: {file_path} not found. Returning empty DataFrame.")
            return pd.DataFrame()  # Return empty DataFrame if file not found
        
    def _load_revenue_breakdown(self):
        """Loads revenue breakdown from a pickle file and converts to dictionary."""
        try:
            # Get absolute path to the current file (main.py)
            backend_dir = os.path.dirname(os.path.abspath(__file__))
            revenue_pickle_path = os.path.join(backend_dir, "revenue_breakdown.pkl")
            
            
            revenue_df = pd.read_pickle(revenue_pickle_path)
            
            result = dict(zip(revenue_df["Category"], revenue_df["Percentage"]))
            return result
            
        except Exception as e:
            print(f"Error loading revenue data: {str(e)}")
            print(f"Current working directory: {os.getcwd()}")
            return {}


    def _filter_and_sort_data(self, data, sort_by: str = None, order: str = "asc"):
        """Applies sorting to the dataset."""
        df = pd.DataFrame(data)

        # Apply Sorting
        if sort_by and sort_by in df.columns:
            df = df.sort_values(by=sort_by, ascending=(order == "asc"))

        return df.to_dict(orient="records")

    def get_full_data(self, sort_by: str = None, order: str = "asc"):
        """Returns the unified dataset with sorting."""
        return self._filter_and_sort_data(self.unified_dataset.fillna("N/A").to_dict(orient="records"), sort_by, order)

    def get_file_specific_data(self, file_type: str, sort_by: str = None, order: str = "asc"):
        """Returns data for a specific file type with sorting."""
        if file_type not in self.file_specific_data:
            raise HTTPException(status_code=404, detail="File type not found")
        return self._filter_and_sort_data(self.file_specific_data[file_type].fillna("N/A").to_dict(orient="records"), sort_by, order)
    
    def get_revenue_distribution(self):
        """Returns revenue breakdown data."""
        return self.revenue_breakdown



# Initialize FastAPI
app = FastAPI()
data_api = DataAPI()  # Instance of DataAPI to handle API requests

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002" ],  # Adjust to match frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint: GET /api/data (Unified Dataset with sorting)
@app.get("/api/data")
def get_full_data(
    sort_by: str = Query(None, description="Sort by field name"),
    order: str = Query("asc", description="Sort order (asc/desc)")
):
    return data_api.get_full_data(sort_by, order)

# Endpoint: GET /api/data/{file_type} (Specific Dataset with sorting)

# Move the revenue endpoint BEFORE the file_type endpoint
@app.get("/api/data/revenue")
def get_revenue_distribution():
    """Returns revenue breakdown data as a dictionary."""
    revenue = data_api.get_revenue_distribution()
    return revenue

@app.get("/api/data/{file_type}")
def get_file_specific_data(
    file_type: str,
    sort_by: str = Query(None, description="Sort by field name"),
    order: str = Query("asc", description="Sort order (asc/desc)")
):
    if file_type == "revenue":
        raise HTTPException(status_code=400, detail="Invalid file type")
    return data_api.get_file_specific_data(file_type, sort_by, order)