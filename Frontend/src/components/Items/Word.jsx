import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Download, FileType } from 'lucide-react';

function WordConverter() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelection(selectedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    } else if (selectedFile) {
      setFile(null);
      setError('Please select a valid PDF file.');
      setSuccess(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleConversion = () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }
    
    setIsConverting(true);
    setSuccess(false);
    
    // Simulating conversion process
    setTimeout(() => {
      setIsConverting(false);
      setSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-purple-100 dark:border-purple-900 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="relative px-6 py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-800 dark:to-fuchsia-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-500/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
          
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-2xl mr-4">
              <FileType className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Word to Pdf</h1>
          </div>
          <p className="text-purple-100 mt-1 text-sm">Convert your documents effortlessly</p>
        </div>

        <div className="p-6">
          {!success && (
            <div className="flex justify-between mb-8 relative">
              <div className="absolute h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 dark:from-violet-600 dark:to-fuchsia-600 top-4 left-4 right-4 transform -translate-y-1/2 z-0" 
                  style={{ width: isConverting ? '66%' : file ? '33%' : '0%', transition: 'width 0.5s ease-in-out' }}></div>
                  
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${file ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 scale-110 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                  1
                </div>
                <span className="text-xs mt-1 font-medium text-gray-600 dark:text-gray-300">Upload</span>
              </div>
              
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isConverting ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 scale-110 text-white' : success ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                  2
                </div>
                <span className="text-xs mt-1 font-medium text-gray-600 dark:text-gray-300">Convert</span>
              </div>
              
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${success ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 scale-110 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                  3
                </div>
                <span className="text-xs mt-1 font-medium text-gray-600 dark:text-gray-300">Download</span>
              </div>
            </div>
          )}

          {!success ? (
            <>
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                  ${isDragging ? 'border-fuchsia-400 dark:border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20 scale-105' : ''}
                  ${file ? 'border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700'}
                  hover:border-violet-400 dark:hover:border-violet-600 group
                `}
              >
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".doc"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {!file ? (
                  <label 
                    htmlFor="word-upload" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-900/40 group-hover:from-violet-200 group-hover:to-fuchsia-200 dark:group-hover:from-violet-800/40 dark:group-hover:to-fuchsia-800/40 transition-all duration-300 shadow-lg">
                      <Upload className="text-fuchsia-500 dark:text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" size={32} />
                    </div>
                    <span className="font-semibold text-lg text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">Select Word File</span>
                    <span className="text-sm mt-1 text-gray-500 dark:text-gray-400">or drag and drop here</span>
                    <span className="text-xs mt-3 py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 inline-block">Max size: 10MB</span>
                  </label>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-900/40 shadow-lg">
                      <FileText className="text-violet-600 dark:text-violet-400" size={32} />
                    </div>
                    <span className="font-semibold text-lg text-gray-800 dark:text-gray-200 truncate max-w-full">{file.name}</span>
                    <div className="mt-2 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 py-1 px-4 rounded-full text-sm">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                    <button 
                      onClick={resetForm} 
                      className="mt-4 text-sm text-fuchsia-600 hover:text-fuchsia-800 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 font-medium bg-fuchsia-50 dark:bg-fuchsia-900/20 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/30 py-1 px-4 rounded-full transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 rounded-xl flex items-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 border-l-4 border-red-500 dark:border-red-600">
                  <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0" size={20} />
                  <span className="ml-3 text-sm font-medium">{error}</span>
                </div>
              )}

              <button
                onClick={handleConversion}
                disabled={!file || isConverting}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold mt-6 transition-all duration-300
                  ${!file || isConverting ? 
                    'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 
                    'bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-700 dark:to-fuchsia-700 hover:from-violet-700 hover:to-fuchsia-700 dark:hover:from-violet-600 dark:hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transform hover:-translate-y-1'
                  }
                  flex items-center justify-center gap-2
                `}
              >
                {isConverting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Converting...</span>
                  </>
                ) : 'Convert to PDF Document'}
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-600/10 rounded-full blur-xl"></div>
                <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 shadow-lg relative z-10">
                  <CheckCircle className="text-white" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Conversion Complete!</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">Your file has been successfully converted to Word format.</p>
              
              <button 
                className="w-full py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 hover:from-green-600 hover:to-teal-600 dark:hover:from-green-500 dark:hover:to-teal-500 text-white shadow-lg hover:shadow-xl hover:shadow-green-200 dark:hover:shadow-green-900/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <Download size={20} className="mr-2" />
                Download Word Document
              </button>
              
              <button 
                onClick={resetForm}
                className="w-full mt-4 py-3 px-6 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                Convert Another File
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <div className="flex justify-center space-x-2 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Secure conversion. Files deleted after processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordConverter;