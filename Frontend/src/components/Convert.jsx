import React, { useState } from 'react';
import axios from 'axios';

const Convert = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMessage('Please select a PDF file');
        setFile(null);
        setFileName('');
        return;
      }
      
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        setErrorMessage('File size exceeds 50MB limit');
        setFile(null);
        setFileName('');
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMessage('Please select a file first');
      return;
    }
    
    setIsUploading(true);
    setProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/converters/pdf-to-word',
        formData,
        {
          responseType: 'blob',
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename from content-disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let downloadFileName = fileName.replace('.pdf', '.docx');
      
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) {
          downloadFileName = fileNameMatch[1];
        }
      }
      
      link.setAttribute('download', downloadFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset form
      setFile(null);
      setFileName('');
      setProgress(0);
      
    } catch (error) {
      console.error('Error converting file:', error);
      setErrorMessage(
        error.response?.data?.detail || 
        'An error occurred during conversion. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="converter-container">
      <div className="converter-card">
        <div className="converter-header">
          <h2>PDF to Word Converter</h2>
          <p>Convert your PDF files to editable Word documents</p>
        </div>
        
        <form onSubmit={handleSubmit} className="converter-form">
          <div className="file-upload-area">
            <div 
              className="drop-zone"
              onClick={() => document.getElementById('file-input').click()}
            >
              {fileName ? (
                <div className="file-info">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>{fileName}</span>
                </div>
              ) : (
                <div className="upload-prompt">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p>Click to upload or drag and drop</p>
                  <span>.pdf files only, up to 50MB</span>
                </div>
              )}
            </div>
            
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          
          {progress > 0 && progress < 100 && (
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
              <span>{progress}%</span>
            </div>
          )}
          
          <button 
            type="submit" 
            className="convert-button"
            disabled={!file || isUploading}
          >
            {isUploading ? 'Converting...' : 'Convert to Word'}
          </button>
        </form>
        
        <div className="converter-footer">
          <p>Your files will be securely converted and available for download immediately</p>
        </div>
      </div>
      
      <style jsx>{`
        .converter-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f5f7fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .converter-card {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .converter-header {
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }
        
        .converter-header h2 {
          margin: 0 0 8px;
          color: #2563eb;
          font-size: 24px;
        }
        
        .converter-header p {
          margin: 0;
          color: #64748b;
        }
        
        .converter-form {
          padding: 24px;
        }
        
        .file-upload-area {
          margin-bottom: 16px;
        }
        
        .drop-zone {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          border: 2px dashed #cbd5e1;
          border-radius: 4px;
          background-color: #f8fafc;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .drop-zone:hover {
          border-color: #2563eb;
          background-color: #f0f7ff;
        }
        
        .upload-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #64748b;
        }
        
        .upload-prompt svg {
          margin-bottom: 16px;
          color: #94a3b8;
        }
        
        .upload-prompt p {
          margin: 0 0 4px;
          font-weight: 500;
        }
        
        .upload-prompt span {
          font-size: 14px;
        }
        
        .file-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0f172a;
        }
        
        .error-message {
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 4px;
          background-color: #fee2e2;
          color: #ef4444;
          font-size: 14px;
        }
        
        .progress-bar-container {
          margin-bottom: 16px;
          height: 8px;
          background-color: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          background-color: #2563eb;
          transition: width 0.3s ease;
        }
        
        .progress-bar-container span {
          position: absolute;
          top: -18px;
          right: 0;
          font-size: 12px;
          color: #64748b;
        }
        
        .convert-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 4px;
          background-color: #2563eb;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .convert-button:hover {
          background-color: #1d4ed8;
        }
        
        .convert-button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }
        
        .converter-footer {
          padding: 16px 24px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        
        .converter-footer p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }
      `}</style>
    </div>
  );
};

export default Convert;