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
import ConversionPage from "./components/Converters/Converter";
import NotFound from "./components/Items/NotFound";
import { converterRoutes } from "./components/Converters/converters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          {converterRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={
                <ConversionPage converterType={config.path.substring(1)} />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
