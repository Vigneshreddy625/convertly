import React from "react";
import pdftoword from "../assets/pdftoword.png";
import wordtopdf from "../assets/wordtopdf.png";
import mergepdf from "../assets/mergepdf.png";
import splitpdf from "../assets/splitpdf.webp";
import compresspdf from "../assets/compresspdf.svg";
import pdftoppt from "../assets/pdftoppt.svg";
import pdftoexcel from "../assets/pdftoexcel.svg";
import ppttopdf from "../assets/ppttopdf.svg";
import exceltopdf from "../assets/exceltopdf.svg";
import editpdf from "../assets/editpdf.png";
import Explorebtn from "./Items/Explorebtn";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();
  const tools = [
    {
      title: "PDF to Word",
      imageSrc: pdftoword,
      description: "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
    },
    {
      title: "Word to PDF",
      imageSrc: wordtopdf,
      description: "Make DOC and DOCX files easy to read by converting them to PDF.",
    },
    {
      title: "Merge PDF",
      imageSrc: mergepdf,
      description: "Combine PDFs in the order you want with the easiest PDF merger available.",
    },
    {
      title: "Split PDF",
      imageSrc: splitpdf,
      description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    },
    {
      title: "Compress PDF",
      imageSrc: compresspdf,
      description: "Reduce file size while optimizing for maximal PDF quality.",
    },
    
    {
      title: "PDF to PowerPoint",
      imageSrc: pdftoppt,
      description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
    },
    {
      title: "PDF to Excel",
      imageSrc: pdftoexcel,
      description: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    },
    
    {
      title: "PowerPoint to PDF",
      imageSrc: ppttopdf,
      description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    },
    {
      title: "Excel to PDF",
      imageSrc: exceltopdf,
      description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    },
    {
      title: "Edit PDF",
      imageSrc: editpdf,
      description: "Add text, images, shapes or freehand annotations to a PDF document.",
      isNew: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">PDF Tools</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">All your PDF needs in one place</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-transparent dark:bg-[#2d2b2b] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-4 flex flex-col justify-between relative border border-gray-200 dark:border-gray-700"
          >
            {tool.isNew && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                New!
              </span>
            )}

            <div className="mb-2 flex justify-center">
              <img
                src={tool.imageSrc}
                alt={`${tool.title} icon`}
                className="w-full h-16 object-contain"
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white dark:text-whit text-center">{tool.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">{tool.description}</p>
            </div>

            <div className="mt-4 flex justify-center" onClick={() => navigate(`/${tool.title.replace(/\s+/g, '').toLowerCase()}`)}>
              <Explorebtn/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
