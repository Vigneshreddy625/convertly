  import { useState } from "react";
  import UploadStage from "./UploadStage";
  import UploadingStage from "./UploadingStage";
  import SelectedStage from "./SelectedStage";
  import ReadyStage from "./ReadyStage";

  export default function FileConverter({ conversionConfig }) {
    const {
      inputLabel,
      outputLabel,
      accept,
      iconType,
      image,
      fileMimeTypes = [],
    } = conversionConfig;

    const [stage, setStage] = useState("upload");
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    const handleFileSelect = (e) => {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        fileMimeTypes.includes(file.type)
      );

      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        setStage("selected");
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        fileMimeTypes.includes(file.type)
      );

      if (droppedFiles.length > 0) {
        setFiles(droppedFiles);
        setStage("selected");
      }
    };

    const handleDeleteAll = () => {
      setFiles([]);
      setStage("upload");
    };

    const handleAddMore = () => {
      document.getElementById("file-input").click();
    };

    const handleStartConversion = () => {
      setStage("uploading");
      simulateUpload();
    };

    const simulateUpload = () => {
      let progress = 0;
      setUploadSpeed(925);
      setTimeLeft(2);

      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage("ready");
          }, 500);
        }
      }, 100);
    };

    const handleStartOver = () => {
      setFiles([]);
      setUploadProgress(0);
      setStage("upload");
    };

    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Convert {inputLabel} to {outputLabel}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Converts your {inputLabel} to high-quality {outputLabel} document
              easily using our online converter tool.
            </p>
          </div>

          <div className="w-full">
            {stage === "upload" && (
              <UploadStage
                onFileSelect={handleFileSelect}
                onDrop={handleDrop}
                accept={accept}
                fileLabel={inputLabel}
                icon={iconType}
                image={image}
              />
            )}

            {stage === "selected" && (
              <SelectedStage
                files={files}
                onDeleteAll={handleDeleteAll}
                onAddMore={handleAddMore}
                onStartConversion={handleStartConversion}
                onFileSelect={handleFileSelect}
                accept={accept}
                convertLabel={`Convert to ${outputLabel}`}
              />
            )}

            {stage === "uploading" && (
              <UploadingStage
                files={files}
                progress={uploadProgress}
                speed={uploadSpeed}
                timeLeft={timeLeft}
              />
            )}

            {stage === "ready" && <ReadyStage onStartOver={handleStartOver} />}
          </div>
        </div>
      </div>
    );
  }
