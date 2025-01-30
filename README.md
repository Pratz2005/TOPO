# TOPO

## Overview
TOPO is an application designed to ingest and manipulate data from multiple formats, providing an interactive local visualization of the data and exposing it as REST API endpoints. The project follows Object-Oriented Programming (OOP) principles to ensure clean, maintainable, and modular code. Additionally, it incorporates rigorous testing to validate functionality and reliability.

The frontend is built using **Next.js** and **Tailwind CSS**, providing a fast and responsive user interface. The backend is implemented with **FastAPI**, ensuring high-performance API interactions and efficient data processing.


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

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Pratz2005/TOPO.git
   cd TOPO
   ```
2. Install dependencies:
   For frontend
   ```bash
   cd frontend
   npm install
   ```

   For backend
   '''bash
   cd backend
   python -m venv .venv // Create a Virtual Environment
   .venv\Scripts\activate // Windows
   source .venv/bin/activate // MacOS
   pip install -r requirements.txt //install dependicies
   '''
   
4. Start the development server:
   Start Backend
   ```bash
   cd backend //if not in backend
   uvicorn main:app --reload
   ```

   You can test the backend endpoints at http://127.0.0.1:8000/api/data for unified data, http://127.0.0.1:8000/api/{filetype}(for csv,json,pdf,pptx) and 
   http://127.0.0.1:8000/api/revenue for revenue distribution
6. Access the application at:
   ```
   http://localhost:3000 (or if 3000 is in use it may access 3001, I have done checks for the CORS policy uptil 3002
   ```

## API Access
[Include any API endpoints if applicable]

## Testing Instructions
### Running Unit Tests
1. Navigate to the project directory.
   ```bash
   cd TOPO
   ```
2. Run unit tests:
   ```bash
   [command to run tests, e.g., npm test, pytest, mvn test]
   ```

### Running Integration Tests
1. Ensure the application is running.
2. Execute integration tests:
   ```bash
   [command to run integration tests]
   ```

## Assumptions or Challenges
- **Assumptions:**
  - [List any assumptions made, e.g., expected input formats, supported platforms, etc.]
- **Challenges Faced:**
  - [Describe any technical challenges, e.g., API rate limits, state management, async handling]
  - [Challenge 2]

---
Feel free to update this README with more details based on your project setup!
