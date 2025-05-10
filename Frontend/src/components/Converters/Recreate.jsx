import React, { useState } from "react";
import axios from "axios";
import LazyImage from "../Items/LazyImage";
import UploadingStage from "../Stages/UploadingStage";
import SelectedStage from "../Stages/SelectedStage";
import ReadyStage from "../Stages/ReadyStage";

import pdftoword from "../../assets/pdftoword.png";
import wordtopdf from "../../assets/wordtopdf.png";
import pdftoppt from "../../assets/pdftoppt.svg";
import pdftoexcel from "../../assets/pdftoexcel.svg";
import ppttopdf from "../../assets/ppttopdf.svg";
import exceltopdf from "../../assets/exceltopdf.svg";

const CONVERTER_CONFIG = {
  "pdf-to-word": {
    title: "Convert PDF to Word",
    description: "Converts your PDF to high-quality Word document easily using our online converter tool.",
    icon: pdftoword,
    acceptedFiles: ".pdf",
    inputLabel: "Choose PDF File",
    dropLabel: "or drop PDF here",
    outputExtension: ".docx",
    endpoint: "/converters/pdf-to-word",
    outputMimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  "word-to-pdf": {
    title: "Convert Word to PDF",
    description: "Transform your Word documents into high-quality PDF files easily.",
    icon: wordtopdf,
    acceptedFiles: ".doc,.docx",
    inputLabel: "Choose Word File",
    dropLabel: "or drop Word file here",
    outputExtension: ".pdf",
    endpoint: "/converters/word-to-pdf",
    outputMimeType: "application/pdf"
  },
  "pdf-to-excel": {
    title: "Convert PDF to Excel",
    description: "Extract tables from your PDF into editable Excel spreadsheets.",
    icon: pdftoexcel,
    acceptedFiles: ".pdf",
    inputLabel: "Choose PDF File",
    dropLabel: "or drop PDF here",
    outputExtension: ".xlsx",
    endpoint: "/converters/pdf-to-excel",
    outputMimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  "excel-to-pdf": {
    title: "Convert Excel to PDF",
    description: "Transform your Excel spreadsheets into shareable PDF files.",
    icon: exceltopdf,
    acceptedFiles: ".xls,.xlsx",
    inputLabel: "Choose Excel File",
    dropLabel: "or drop Excel file here",
    outputExtension: ".pdf",
    endpoint: "/converters/excel-to-pdf",
    outputMimeType: "application/pdf"
  },
  "ppt-to-pdf": {
    title: "Convert PowerPoint to PDF",
    description: "Convert your presentations into high-quality PDF documents.",
    icon: ppttopdf,
    acceptedFiles: ".ppt,.pptx",
    inputLabel: "Choose PowerPoint File",
    dropLabel: "or drop PowerPoint file here",
    outputExtension: ".pdf",
    endpoint: "/converters/powerpoint-to-pdf",
    outputMimeType: "application/pdf"
  },
  "pdf-to-ppt": {
    title: "Convert PDF to PowerPoint",
    description: "Transform your PDF into editable PowerPoint presentations.",
    icon: pdftoppt,
    acceptedFiles: ".pdf",
    inputLabel: "Choose PDF File",
    dropLabel: "or drop PDF here",
    outputExtension: ".pptx",
    endpoint: "/converters/pdf-to-powerpoint",
    outputMimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  },
};

function Recreate({ converterType }) {
  const config = CONVERTER_CONFIG[converterType];
  
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [stage, setStage] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("");

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setStage("selected");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setStage("selected");
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDeleteAll = () => {
    setFile(null);
    setFileName("");
    setStage("upload");
  };

  const handleAddMore = () => {
    document.getElementById("file-input").click();
  };

  const handleStartOver = () => {
    setFile(null);
    setFileName("");
    setProgress(0);
    setUploadSpeed("");
    setTimeLeft("");
    setStage("upload");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setStage("uploading");
    setProgress(0);
    setUploadSpeed("");
    setTimeLeft("");

    const formData = new FormData();
    formData.append("file", file);

    let startTime = null;
    let previousBytesLoaded = 0;

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000${config.endpoint}`,
        formData,
        {
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            if (!startTime) startTime = new Date().getTime();

            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);

            const now = new Date().getTime();
            const elapsed = now - startTime;
            const bytesUploaded = progressEvent.loaded - previousBytesLoaded;
            const speed = bytesUploaded / (elapsed / 1000);

            if (speed > 0) {
              const remaining = progressEvent.total - progressEvent.loaded;
              const time = remaining / speed;
              const mins = Math.floor(time / 60);
              const secs = Math.round(time % 60);
              setTimeLeft(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
            }

            if (speed > 1024 * 1024) {
              setUploadSpeed(`${(speed / (1024 * 1024)).toFixed(2)} MB/s`);
            } else if (speed > 1024) {
              setUploadSpeed(`${(speed / 1024).toFixed(2)} KB/s`);
            } else {
              setUploadSpeed(`${speed.toFixed(0)} B/s`);
            }

            previousBytesLoaded = progressEvent.loaded;
          },
        }
      );

      const outputBlob = new Blob([response.data], {
        type: config.outputMimeType
      });
      
      const url = window.URL.createObjectURL(outputBlob);

      const disposition = response.headers["content-disposition"];
      const fileNameParts = fileName.split('.');
      fileNameParts.pop(); 
      let downloadName = fileNameParts.join('.') + config.outputExtension;
      
      if (disposition) {
        const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          downloadName = filenameMatch[1];
        }
      }

      setDownloadUrl(url);
      setDownloadFileName(downloadName);

      setStage("ready");
    } catch (err) {
      console.error("Upload failed", err);
      setStage("upload");
    } finally {
      setIsUploading(false);
    }
  };

  if (!config) {
    return <div>Invalid converter type</div>;
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            {config.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>

        <div className="w-full">
          {stage === "upload" && (
            <div
              className={`bg-blue-500 rounded-lg p-24 text-center ${
                isDragging ? "border-4 border-white border-dashed" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-36 h-full mb-4 text-white">
                  <LazyImage src={config.icon} alt={`${converterType} icon`} />
                </div>

                <label className="bg-white text-gray-800 font-medium py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 mb-3 hover:bg-gray-100 transition-colors">
                  <span className="text-gray-800">{config.inputLabel}</span>
                  <input
                    id="file-input"
                    type="file"
                    accept={config.acceptedFiles}
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>

                <p className="text-white text-lg">{config.dropLabel}</p>
              </div>
            </div>
          )}

          {stage === "selected" && (
            <SelectedStage
              files={[file]}
              onDeleteAll={handleDeleteAll}
              onAddMore={handleAddMore}
              onStartConversion={handleSubmit}
              onFileSelect={handleFileSelect}
              accept={config.acceptedFiles}
              convertLabel={`Convert to ${config.outputExtension.slice(1).toUpperCase()}`}
            />
          )}

          {stage === "uploading" && (
            <UploadingStage
              files={[file]}
              progress={progress}
              speed={uploadSpeed}
              timeLeft={timeLeft}
            />
          )}

          {stage === "ready" && (
            <ReadyStage
              onStartOver={handleStartOver}
              downloadUrl={downloadUrl}
              downloadFileName={downloadFileName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Recreate;