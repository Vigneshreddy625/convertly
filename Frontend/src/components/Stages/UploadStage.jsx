import { useState } from "react";
import { IconFileTypePdf, IconFileWord, IconPresentation, IconFileExcel } from "@tabler/icons-react";

export default function UploadStage({
  onFileSelect,
  onDrop,
  accept = ".pdf",
  icon,
  fileLabel = "PDF",
  image,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {  
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    setIsDragging(false);
    onDrop(e);
  };

  const renderIcon = () => {
    switch(icon) {
      case "pdf": return <IconFileTypePdf size={18} />;
      case "word": return <IconFileWord size={18} />;
      case "excel": return <IconFileExcel size={18} />;
      case "presentation": return <IconPresentation size={18} />;
      default: return null;
    }
  };

  console.log(renderIcon());
  console.log(icon);
  return (
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
        {image && (
          <div className="w-48 h-full mb-4 text-white">
            <img src={image} alt={`${fileLabel} icon`} />
          </div>
        )}

        <label className="bg-white text-gray-800 font-medium py-3 px-4 rounded-md cursor-pointer flex items-center gap-2 mb-3 hover:bg-gray-100 transition-colors">
          {renderIcon()}
          <span className="text-gray-800">Choose {fileLabel} File</span>
          <input
            id="file-input"
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={onFileSelect}
          />
        </label>

        <p className="text-white text-lg">or drop {fileLabel}s here</p>
      </div>
    </div>
  );
}