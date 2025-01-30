# TOPO

## Overview
TOPO is an application designed to ingest and manipulate data from multiple formats, providing an interactive local visualization of the data and exposing it as REST API endpoints. The project follows Object-Oriented Programming (OOP) principles to ensure clean, maintainable, and modular code. Additionally, it incorporates rigorous testing to validate functionality and reliability.

The frontend is built using **Next.js** and **Tailwind CSS**, providing a fast and responsive user interface. The backend is implemented with **FastAPI**, ensuring high-performance API interactions and efficient data processing.

You can sort the data according to the headings in the table by double clicking the headings of the table then click the arrow for ascending or descending sorting


Key Features:
- Data ingestion and processing from multiple formats.
- Interactive data visualization.
- REST API for exposing processed data.
- Robust OOP-based design for maintainability.
- Comprehensive unit and integration testing.

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js (for frontend)
- Python (for backend)
- Package managers: npm/yarn for frontend, pip for backend
- Additional Dependicies - environment variables, API keys, charting libraries such as Chart.js, Recharts

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Pratz2005/TOPO.git
   cd TOPO
   ```
2. Install dependencies:

   **For frontend:**
   ```bash
   cd frontend
   npm install
   ```

   
   **For backend:**
   ```bash
   cd backend
   python -m venv .venv  # Create a Virtual Environment
   
   # Activate Virtual Environment
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # MacOS
   
   # Install dependencies
   pip install -r requirements.txt
   ```
   
4. Start the development server:
   Start Backend
   ```bash
   cd backend //if not in backend
   python data_ingestion.py //run data_ingestion.py
   uvicorn main:app --reload
   ```

   You can test the backend endpoints at http://127.0.0.1:8000/api/data for unified data, http://127.0.0.1:8000/api/{filetype}(for csv,json,pdf,pptx) and 
   http://127.0.0.1:8000/api/revenue for revenue distribution

5. Start Frontend
   ```bash
   cd frontend
   npm run dev
   ```
   
7. Access the application at:
   ```
   http://localhost:3000 //(or if 3000 is in use it may access 3001, I have done checks for the CORS policy uptil 3002
   ```

## API Access
# Endpoints
1. http://127.0.0.1:8000/api/data
2. http://127.0.0.1:8000/api/data/csv
3. http://127.0.0.1:8000/api/data/json
4. http://127.0.0.1:8000/api/data/pdf
5. http://127.0.0.1:8000/api/data/pptx
6. http://127.0.0.1:8000/api/data/revenue

## Testing Instructions

## Running Tests
1. Ensure the application is running.
2. Execute integration tests:
   ```bash
   cd backend
   $env:PYTHONPATH = "backend"
   pytest
   ```

## Pytest Tests Breakdown
### API Tests (`maintest.py`)
1. **`test_get_full_data()`** - Tests `/api/data`, ensures a list response with `"Date"` column.
2. **`test_get_file_specific_data()`** - Tests `/api/data/csv`, ensures `"Membership_ID"` column exists.
3. **`test_get_nonexistent_file()`** - Tests `/api/data/nonexistent`, expects `404` error.
4. **`test_get_revenue_distribution()`** - Tests `/api/data/revenue`, expects `"Gym"` in response.
5. **`test_sorting()`** - Tests `/api/data/csv?sort_by=Revenue`, ensures correct sorting order.

### Data Ingestion Tests (`data_ingestion_test.py`)
1. **`test_ingest_csv()`** - Ingests `dataset2.csv`, ensures `"Date"` column exists.
2. **`test_ingest_json()`** - Ingests `dataset1.json`, ensures `"company_id"` and `"employee_name"` columns exist.
3. **`test_ingest_pdf()`** - Ingests `dataset3.pdf`, ensures `"Revenue (in $)"` column exists.
4. **`test_ingest_pptx()`** - Ingests `dataset4.pptx`, ensures `"Gym"` exists in revenue breakdown.
5. **`test_ingest_missing_file()`** - Tests ingestion of a non-existent file, expects `FileNotFoundError`.

### Assumptions & Challenges Faced  

### Assumptions
1. **Consistent Data Format Across Files**  
   - Data files (CSV, JSON, PDF, PPTX) follow a structured format.  
   - Columns like `Date`, `Membership_ID`, `Revenue` exist in all datasets.

2. **Users Interact via the Frontend UI**  
   - The backend serves API responses; there’s **no separate admin dashboard**.

---

### Challenges & Solutions
1. **Extracting Structured Data from PDFs & PPTX**  
   - ❌ **Issue:** PDFs and PowerPoint slides store data in unstructured formats.  
   - ✅ **Solution:** Used `pdfplumber` for PDFs and `python-ppt
2. **CORS & API Connection Issues**  
   - ❌ **Issue:** Frontend requests were blocked by CORS.  
   - ✅ **Solution:** Configured **CORS Middleware** in FastAPI to allow requests.


### While doing the backend part of the code(running or testing) make sure to be in the virtual environment
