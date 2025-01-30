# 📌 TOPO - Data Processing & Visualization App

TOPO is a **data processing and visualization application** that extracts data from multiple sources (**CSV, JSON, PDF, PPTX**), presents it in tabular format, and provides **sorting, filtering, and chart visualization** options. Built with **FastAPI (backend) & Next.js (frontend)**.

---

## 📂 Project Structure
```bash
TOPO/
│── backend/             # FastAPI backend for data ingestion & API endpoints
│   ├── data_ingestion.py  # Handles data extraction from CSV, JSON, PDF, PPTX
│   ├── main.py           # FastAPI app exposing APIs for fetching data
│   ├── tests/            # Pytest-based test cases for backend validation
│   ├── data/             # Sample dataset files
│── frontend/            # Next.js frontend for interactive data visualization
│   ├── pages/           # Next.js pages for displaying data
│   ├── components/      # Reusable UI components (tables, charts, etc.)
│   ├── utils/api.ts     # API handling for fetching data
│── README.md            # Project documentation
│── requirements.txt     # Backend dependencies
│── package.json     
