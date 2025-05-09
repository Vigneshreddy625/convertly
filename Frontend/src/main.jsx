import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/Darkmode/Theme-provider.jsx";
import { AuthProvider } from "./authContext/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
