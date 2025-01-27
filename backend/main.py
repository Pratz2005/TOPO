from fastapi import FastAPI, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Load data
unified_dataset = pd.read_pickle("unified_dataset.pkl")
file_specific_data = {
    "csv": pd.read_pickle("csv_data.pkl"),
    "json": pd.read_pickle("json_data.pkl"),
    "pdf": pd.read_pickle("pdf_data.pkl"),
    "pptx": pd.read_pickle("pptx_data.pkl"),
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint: GET /api/data
@app.get("/api/data")
def get_full_data():
    cleaned_data = unified_dataset.fillna("N/A")
    return cleaned_data.to_dict(orient="records")

# Endpoint: GET /api/data/{file_type}
@app.get("/api/data/{file_type}")
def get_file_specific_data(file_type: str):
    if file_type not in file_specific_data:
        raise HTTPException(status_code=404, detail="File type not found")
    return file_specific_data[file_type].to_dict(orient="records")