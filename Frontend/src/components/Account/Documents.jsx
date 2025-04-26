import React, { useState } from 'react';
import { Eye, Download, FileText, Search } from 'lucide-react';
import firstimage from "../../assets/firstimage.png";

function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  
  const files = [
    { id: 1, name: "Annual Report.pdf", date: "12/04/2024" },
    { id: 2, name: "Business Proposal.docx", date: "23/03/2024" },
    { id: 3, name: "Project Analysis.xlsx", date: "15/02/2024" },
    { id: 4, name: "Market Research.ppt", date: "05/01/2024"},
    { id: 6, name: "Financial Statement.pdf", date: "28/12/2023"},
    { id: 7, name: "Financial Statement.pdf", date: "28/12/2023"},
    { id: 8, name: "Financial Statement.pdf", date: "28/12/2023"},
    { id: 9, name: "Financial Statement.pdf", date: "28/12/2023"},

  ];

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id) => {
    console.log(`Viewing file ${id}`);
  };

  const handleDownload = (id) => {
    console.log(`Downloading file ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
        <div className='text-center mb-8'>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Your Documents
          </h1>
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
          <div 
            key={file.id}
            className="group relative p-2 transition-all"
            onMouseEnter={() => setHoveredId(file.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className='flex flex-col items-center justify-center'>
              <div className="w-32 h-32 flex items-center justify-center">
                <img src={firstimage} alt={file.name} className="object-contain" />
              </div>
              
              <div className="p-2 text-center w-full">
                <h2 className="text-md font-semibold truncate pb-1">{file.name}</h2>
                
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">Converted on: {file.date}</p>
                
                <div className="flex items-center justify-center gap-6">
                  <button 
                    onClick={() => handleView(file.id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    aria-label="View file"
                  >
                    <Eye size={18} />
                  </button>
                  
                  <button 
                    onClick={() => handleDownload(file.id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    aria-label="Download file"
                  >
                    <Download size={18} />
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