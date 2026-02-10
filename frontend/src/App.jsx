import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>🔒 SecureCheck</h1>
        <p>Plataforma de análisis de seguridad</p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Frontend en construcción - Sprint 0 completado
        </p>
      </div>
    </Router>
  );
}

export default App;
