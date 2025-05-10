# Base image (adjust based on your environment)
FROM python:3.10-slim

# Install LibreOffice
RUN apt-get update && apt-get install -y libreoffice

# Install required Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of your application code
COPY . /app

# Set working directory
WORKDIR /app

# Expose the FastAPI app port (default 8000)
EXPOSE 8000

# Run FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
