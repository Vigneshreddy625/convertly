FROM python:3.10-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    libreoffice \
    default-jre \
    curl \
    wget \
    fonts-dejavu \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    poppler-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory to /app
WORKDIR /app

# Copy requirements first and install Python deps
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app folder contents into /app/app
COPY app/ /app/app/

EXPOSE 8000

# Run uvicorn with correct module path "app.main"
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
