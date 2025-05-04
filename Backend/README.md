# Document Converter API

A FastAPI-based backend for converting documents between various formats.

## Features

- PDF to Word conversion
- Word to PDF conversion
- PDF to PowerPoint conversion
- PDF to Excel conversion
- PowerPoint to PDF conversion
- Excel to PDF conversion

## Requirements

- Python 3.8+
- Virtual Environment (venv)
- Windows OS (for COM automation)

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   ```
   venv\\Scripts\\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Running the API

```
uvicorn app.main:app --reload
```

The API will be available at http://127.0.0.1:8000

## API Documentation

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## License

MIT
"""