import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollHeader from "./components/ScrollHeader.jsx";
import Navbar from "./components/Navbar.jsx";
import Playground from "./components/Playground.jsx";
import Footer from "./components/Footer.jsx";

function ModeFromPath() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/OndeGravitazionali")) return "tr";
  if (pathname.startsWith("/BuchiNeri")) return "bl";
  if (pathname.startsWith("/EinsteinTelescope")) return "br";
  return "tl"; // default
}

export default function App() {
  const [highContrast, setHighContrast] = React.useState(false);
  const mode = ModeFromPath();

  return (
    
    <div className={`app-wrap ${highContrast ? "high-contrast" : ""}`}>
<ScrollHeader />

      <Navbar
        highContrast={highContrast}
        onToggleHC={() => setHighContrast((v) => !v)}
      />

      

      <Routes>
        <Route path="/" element={<Navigate to="/TappetoElastico" replace />} />
        <Route
          path="/TappetoElastico"
          element={<Playground mode="tl" highContrast={highContrast} />}
        />
        <Route
          path="/OndeGravitazionali"
          element={<Playground mode="tr" highContrast={highContrast} />}
        />
        <Route
          path="/BuchiNeri"
          element={<Playground mode="bl" highContrast={highContrast} />}
        />
        <Route
          path="/EinsteinTelescope"
          element={<Playground mode="br" highContrast={highContrast} />}
        />
        <Route path="*" element={<Navigate to="/EinsteinTelescope" replace />} />
      </Routes>


      <Footer
        version="v1.0.0"
        repoUrl="https://github.com/your-org/doctor-tensor"
        email="giuseppe.greco@pg.infn.it"
      />
    </div>
  );
}
