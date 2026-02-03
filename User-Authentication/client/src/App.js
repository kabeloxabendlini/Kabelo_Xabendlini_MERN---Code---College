// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Redirect default route to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 404 fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
