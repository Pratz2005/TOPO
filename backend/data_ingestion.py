import os
import pandas as pd
import json
import pdfplumber
from pptx import Presentation

# Define the paths to the data folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, '../data')

# File paths
csv_file = os.path.join(DATA_DIR, 'dataset2.csv')
json_file = os.path.join(DATA_DIR, 'dataset1.json')
pdf_file = os.path.join(DATA_DIR, 'dataset3.pdf')
pptx_file = os.path.join(DATA_DIR, 'dataset4.pptx')

# Ingest data from CSV
def ingest_csv(file_path):
    df = pd.read_csv(file_path)
    print("CSV Data Ingested Successfully!")
    return df

# Ingest data from JSON
def ingest_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    print("JSON Data Ingested Successfully")

    # Normalize JSON with prefixes to avoid key conflicts
    return pd.json_normalize(
        data['companies'],
        'employees',
        ['id', 'name', 'revenue', 'location'],
        record_prefix='employee_',  # Prefix for employee-level keys
        meta_prefix='company_'      # Prefix for company-level keys
    )

# Ingest data from PDF
def ingest_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        table_data = []
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    table_data.append(row)
    print("PDF Data Ingested Successfully!")
    return pd.DataFrame(table_data[1:], columns=table_data[0])  # Assuming first row is the header


def ingest_pptx(file_path):
    presentation = Presentation(file_path)
    table_data = []  # For storing tabular data
    revenue_breakdown = {}  # For storing pie chart data

    for slide in presentation.slides:
        for shape in slide.shapes:
            # Extract table contents
            if shape.has_table:
                table = shape.table
                for row in table.rows:
                    row_data = [cell.text.strip() for cell in row.cells]
                    table_data.append(row_data)

            # Extract revenue breakdown (slide 3)
            if shape.has_text_frame and "Revenue Distribution" in shape.text:
                for paragraph in shape.text_frame.paragraphs:
                    if ":" in paragraph.text:  # Look for key-value pairs
                        try:
                            key, value = paragraph.text.split(":")
                            # Check if value is valid and not empty
                            value = value.strip()
                            if value and value.replace("%", "").strip().isdigit():
                                revenue_breakdown[key.strip()] = float(value.replace("%", "").strip())
                        except ValueError:
                            print(f"Skipping invalid line: {paragraph.text}")

    print("PPTX Data Ingested Successfully!")
    return table_data, revenue_breakdown

# Clean and merge data
def clean_and_merge_data(csv_data, json_data, pdf_data, pptx_data):
    # Example cleaning: Fill missing values with placeholders
    pptx_df = pd.DataFrame(pptx_data[1:], columns=pptx_data[0])

    csv_data.fillna("N/A", inplace=True)
    json_data.fillna("N/A", inplace=True)
    pdf_data.fillna("N/A", inplace=True)
    pptx_df.fillna("N/A", inplace=True)

    # Example merge: Combine into one dataset (adjust logic as needed)
    unified_dataset = pd.concat([csv_data, json_data, pdf_data, pptx_df], axis=0, ignore_index=True)
    return unified_dataset

# Main function
if __name__ == "__main__":
    # Ingest data
    csv_data = ingest_csv(csv_file)
    json_data = ingest_json(json_file)
    pdf_data = ingest_pdf(pdf_file)
    pptx_table_data, pptx_revenue_breakdown = ingest_pptx(pptx_file)

    file_specific_data = {
        "csv": csv_data,
        "json": json_data,
        "pdf": pdf_data,
        "pptx": pd.DataFrame(pptx_table_data[1:], columns=pptx_table_data[0])
    }

    # Optionally save datasets as pickle files for persistence


    # Clean and merge data (table data only)
    unified_dataset = clean_and_merge_data(csv_data, json_data, pdf_data, pptx_table_data)
    unified_dataset.to_pickle("unified_dataset.pkl")
    for key, df in file_specific_data.items():
        df.to_pickle(f"{key}_data.pkl")

    # # Output the merged data
    print("Unified Dataset:")
    # print(unified_dataset.isnull().sum())  # Check for NaN values in each column
    # print(unified_dataset[unified_dataset.isin([float("inf"), float("-inf")]).any(axis=1)])  # Check for infinite values

    print(unified_dataset)

    # # Output the pie chart data (revenue breakdown)
    print("Revenue Breakdown Data:")
    print(pptx_revenue_breakdown)
