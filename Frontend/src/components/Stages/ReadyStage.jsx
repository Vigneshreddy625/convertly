import { ArrowLeftIcon, CircleCheckBigIcon, DownloadIcon } from "lucide-react";

export default function ReadyStage({ onStartOver, downloadUrl, downloadFileName }) {
  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl p-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-10">
        Your document is ready!
      </h2>

      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-10 text-green-500">
          <CircleCheckBigIcon size={80} className="text-green-500" strokeWidth={1.5} />
        </div>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={downloadFileName}
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black font-medium py-3 px-8 rounded-md w-full max-w-md flex items-center justify-center gap-2 mb-4 hover:bg-opacity-90 transition"
          >
            <DownloadIcon size={18} />
            Download
          </a>
        )}

        <button
          onClick={onStartOver}
          className="text-gray-600 dark:text-gray-300 flex items-center gap-1 hover:text-black dark:hover:text-white transition"
        >
          <ArrowLeftIcon size={16} />
          Start Over
        </button>
      </div>
    </div>
  );
}
