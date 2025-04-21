import pdftoword from "../../assets/pdftoword.png";
import wordtopdf from "../../assets/wordtopdf.png";
import mergepdf from "../../assets/mergepdf.png";
import splitpdf from "../../assets/splitpdf.webp";
import compresspdf from "../../assets/compresspdf.svg";
import pdftoppt from "../../assets/pdftoppt.svg";
import pdftoexcel from "../../assets/pdftoexcel.svg";
import ppttopdf from "../../assets/ppttopdf.svg";
import exceltopdf from "../../assets/exceltopdf.svg";
import editpdf from "../../assets/editpdf.png";

export const converterConfigs = {
  pdftoword: {
    path: "/pdftoword",
    inputLabel: "PDF",
    outputLabel: "Word",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",    
    image: pdftoword,
  },
  wordtopdf: {
    path: "/wordtopdf",
    inputLabel: "Word",
    outputLabel: "PDF",
    accept: ".doc,.docx",
    fileMimeTypes: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    iconType: "word",
    image: wordtopdf,
  },
  mergepdf: {
    path: "/notdone",
    inputLabel: "PDFs",
    outputLabel: "Merged PDF",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",    
    image: mergepdf,
    multipleFiles: true,
  },
  splitpdf: {
    path: "/notdone",
    inputLabel: "PDF",
    outputLabel: "Split PDFs",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",
    image: splitpdf,
  },
  compresspdf: {
    path: "/notdone",
    inputLabel: "PDF",
    outputLabel: "Compressed PDF",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",
    image: compresspdf,
  },
  pdftopowerpoint: {
    path: "/pdftopowerpoint",
    inputLabel: "PDF",
    outputLabel: "PowerPoint",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",
    image: pdftoppt,
  },
  pdftoexcel: {
    path: "/pdftoexcel",
    inputLabel: "PDF",
    outputLabel: "Excel",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",
    image: pdftoexcel,
  },
  powerpointtopdf: {
    path: "/powerpointtopdf",
    inputLabel: "PowerPoint",
    outputLabel: "PDF",
    accept: ".ppt,.pptx",
    fileMimeTypes: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    iconType: "ppt",
    image: ppttopdf,
  },
  exceltopdf: {
    path: "/exceltopdf",
    inputLabel: "Excel",
    outputLabel: "PDF",
    accept: ".xls,.xlsx",
    fileMimeTypes: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    iconType: "excel",
    image: exceltopdf,
  },
  editpdf: {
    path: "/notdone",
    inputLabel: "PDF",
    outputLabel: "Edited PDF",
    accept: ".pdf",
    fileMimeTypes: ["application/pdf"],
    iconType: "pdf",
    image: editpdf,
  },
};

export const converterRoutes = Object.values(converterConfigs);