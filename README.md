📌 TOPO - Data Processing & Visualization App
TOPO is a data processing and visualization application that extracts data from multiple sources (CSV, JSON, PDF, PPTX), presents it in tabular format, and provides sorting, filtering, and chart visualization options. Built with FastAPI (backend) & Next.js (frontend).

(Update with actual screenshot URL)

📂 Project Structure
bash
Copy
Edit
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
│── package.json         # Frontend dependencies
│── .gitignore           # Ignored files
🚀 Features
✔ Multi-format data ingestion (CSV, JSON, PDF, PPTX)
✔ Tabular representation of data
✔ Sorting & Filtering by Date, Membership ID, Employee ID, Revenue, Duration
✔ Interactive Bar Charts for PDF & PPTX data
✔ FastAPI Backend & Next.js Frontend
✔ Fully tested with Pytest

🔧 Setup Instructions
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/Pratz2005/TOPO.git
cd TOPO
2️⃣ Backend Setup (FastAPI)
sh
Copy
Edit
cd backend
python -m venv venv        # Create virtual environment
source venv/bin/activate    # On macOS/Linux
venv\Scripts\activate       # On Windows

pip install -r requirements.txt  # Install dependencies
uvicorn main:app --reload        # Start FastAPI server
📌 Backend will be available at: http://127.0.0.1:8000

3️⃣ Frontend Setup (Next.js)
sh
Copy
Edit
cd frontend
npm install  # Install dependencies
npm run dev  # Start frontend
📌 Frontend will be available at: http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/data	Fetch unified dataset
GET	/api/data/{file_type}	Fetch specific dataset (csv, json, pdf, pptx)
GET	/api/data/{file_type}?sort_by=Revenue	Fetch sorted data
GET	/api/data/{file_type}?filter_by=Membership_ID&filter_value=M001	Fetch filtered data
GET	/api/data/revenue	Fetch revenue breakdown
🧪 Running Tests
Run Pytest for backend validation:

sh
Copy
Edit
cd backend
pytest tests/
You should see ✅ all tests passing!

👨‍💻 Contributing
Fork the repository 🍴
Create a new branch (git checkout -b feature-name)
Make changes & commit (git commit -m "Added new feature")
Push & create a PR (git push origin feature-name)
📜 License
This project is MIT Licensed. Feel free to use and modify! 🎯
