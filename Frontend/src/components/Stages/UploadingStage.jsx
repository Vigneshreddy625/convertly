import { UploadIcon } from "lucide-react";

export default function UploadingStage({ files, progress, speed, timeLeft }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded-lg p-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-10">
        Uploading file 1 of {files.length}
      </h2>

      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-8 text-purple-500">
          <UploadIcon size={80} color="#8257E6" />
        </div>

        <div className="text-gray-700 mb-4 flex gap-2 dark:text-gray-200">
          <span>Time left {timeLeft} Seconds</span>
          <span>-</span>
          <span>Upload speed {speed} KB/S</span>
        </div>

        <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-center mt-2 text-gray-600 dark:text-gray-200">
          {files[0]?.name}
          <br />({(files[0]?.size / 1024).toFixed(2)} KB)
        </div>
      </div>
    </div>
  );
}