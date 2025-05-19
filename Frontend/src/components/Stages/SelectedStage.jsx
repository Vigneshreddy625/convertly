import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function SelectedStage({
  files,
  onDeleteAll,
  onAddMore,
  onStartConversion,
  onFileSelect,
  accept = ".pdf",
  convertLabel = "Convert",
  previewImage
}) {
  const filePreview = (file, index) => {
    return (
      <div
        key={index}
        className="bg-gray-400 rounded-lg p-2 w-48 h-64 flex flex-col items-center justify-between m-2"
      >
        <div className="w-full h-full bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden p-2">
          <img
            src={previewImage}
            alt="preview"
            className="max-w-full max-h-full"
          />
        </div>
        <p className="text-gray-700 text-sm mt-2 truncate w-full text-center">
          {file.name}
        </p>
      </div>
    );
  };

  return (
    <div className="border border-blue-500 rounded-lg overflow-hidden">
      <div className="bg-blue-500 py-3 px-4 flex justify-end items-center">
        <button
          onClick={onDeleteAll}
          className="bg-white rounded-md cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <TrashIcon size={18} />
          Delete
        </button>
      </div>

      <div className="bg-[#ECECEC] dark:bg-black p-6 min-h-64 flex flex-wrap justify-center">
        {files.map((file, index) => filePreview(file, index))}
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={onFileSelect}
        />
      </div>

      <div className="bg-blue-500 p-4 flex justify-center">
        <Button onClick={onStartConversion} className="cursor-pointer">
          {convertLabel}
        </Button>
      </div>
    </div>
  );
}
