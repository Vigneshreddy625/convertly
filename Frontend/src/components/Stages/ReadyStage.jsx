import { ArrowLeftIcon, CircleCheckBigIcon, DownloadIcon } from "lucide-react";

export default function ReadyStage({ onStartOver, downloadUrl, downloadFileName }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 border border-gray-500 rounded-lg p-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-10">
        Your document is ready!
      </h2>

      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-10 text-purple-500">
          <CircleCheckBigIcon size={80} color="#8257E6" strokeWidth={1.5} />
        </div>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={downloadFileName}
            className="bg-blue-500 text-white font-medium py-3 px-8 rounded-md w-full max-w-md flex items-center justify-center gap-2 mb-4 hover:bg-blue-600"
          >
            <DownloadIcon size={18} />
            Download
          </a>
        )}

        <button
          onClick={onStartOver}
          className="text-gray-600 dark:text-gray-200 flex items-center gap-1 hover:text-gray-800 cursor-pointer"
        >
          <ArrowLeftIcon size={16} />
          Start Over
        </button>
      </div>
    </div>
  );
}