import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import Explore from "./components/Explore";
import NotFound from "./components/Items/NotFound";
import Documents from "./components/Account/Documents";
import Personal from "./components/Account/Personal";
import PageUC from "./components/Items/PageUC";
import Auth from "./components/Auth/Main";
import PdfToWord from "./components/Converters/PdfToWord";
import WordToPdf from "./components/Converters/WordToPdf";
import PdfToPpt from "./components/Converters/PdfToPpt";
import PptToPdf from "./components/Converters/PptToPdf";
import PdfToExcel from "./components/Converters/PdfToExcel";
import ExcelToPdf from "./components/Converters/ExcelToPdf";

const underConstructionRoutes = [
  "/splitpdf",
  "/compresspdf",
  "/editpdf",
  "/mergepdf",
];

function App() {
  
  return (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="documents" element={<Documents />} />
          <Route path="account/profile" element={<Personal />} />
          <Route path="pdf-to-word" element={<PdfToWord />} />
          <Route path="word-to-pdf" element={<WordToPdf />} />
          <Route path="pdf-to-ppt" element={<PdfToPpt />} />
          <Route path="ppt-to-pdf" element={<PptToPdf />} />
          <Route path="pdf-to-excel" element={<PdfToExcel />} />
          <Route path="excel-to-pdf" element={<ExcelToPdf />} />
          {underConstructionRoutes.map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <PageUC />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
