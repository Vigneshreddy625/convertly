import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FileConverter from "../Stages/FileConverter";
import { converterConfigs } from "./converters";

export default function ConversionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.substring(1); 
  const conversionConfig = converterConfigs[path];
  
  useEffect(() => {
    if (!conversionConfig) {
      navigate("/", { replace: true });
    }
  }, [path, conversionConfig, navigate]);

  if (!conversionConfig) {
    return null;
  }

  return (
    <div>
        <FileConverter conversionConfig={conversionConfig} />
    </div>
  );
}