import { UploadIcon } from "lucide-react";

export default function UploadingStage({ files, progress, speed, timeLeft }) {
  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl p-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-10">
        Uploading file 1 of {files.length}
      </h2>

      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-8 text-blue-500">
          <UploadIcon size={80} className="text-blue-500" />
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-4 flex gap-2">
          <span>Time left {timeLeft} seconds</span>
          <span>-</span>
          <span>Upload speed {speed} KB/s</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-center mt-2 text-gray-600 dark:text-gray-300 text-sm">
          {files[0]?.name}
          <br />({(files[0]?.size / 1024).toFixed(2)} KB)
        </div>
      </div>
    </div>
  );
}
