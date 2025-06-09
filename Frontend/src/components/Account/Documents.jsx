import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Download, FileText, Search, Trash2 } from 'lucide-react';
import firstimage from "../../assets/firstimage.png";

function Documents() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFiles = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const { data } = await axios.get('https://convertly-min2.onrender.com/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFiles(data);
      
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const filteredFiles = files.filter(file =>
    file.output_filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (url) => {
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Your Documents</h1>
        <p className="text-lg mt-2 text-gray-500 dark:text-gray-200">
          All your converted files in one place
        </p>
      </div>

      <div className="relative mb-8 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-100 outline-none transition-all shadow-sm border bg-gray-50 dark:bg-transparent dark:border-gray-600"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredFiles.map((file) => (
          <div key={file.id} className="group p-2 transition-all">
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src={firstimage} alt={file.filename} className="object-contain" />
              </div>

              <div className="p-2 text-center w-full">
                <h2 className="text-md font-semibold truncate pb-1">{file.output_filename}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
                  Converted on: {new Date(file.created_at).toLocaleDateString()}
                </p>

                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => handleDownload(file.storage_url)}
                    className="text-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    aria-label={`Download ${file.output_filename}`}
                  >
                    <Download size={18} />
                  </button>
                   <button
                    onClick={() => handleDelete(file.storage_url)}
                    className="text-red-500 hover:text-red-700  transition-colors cursor-pointer"
                    aria-label={`Delete ${file.output_filename}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-16">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No documents found</h3>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
}

export default Documents;
