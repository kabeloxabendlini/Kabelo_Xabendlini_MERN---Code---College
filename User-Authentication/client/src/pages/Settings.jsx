// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const THEMES = ["light", "dark", "ocean", "sunset"];

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="page-card">
        <h1>Settings</h1>

        {/* Theme Preview Grid */}
        <h3 className="section-title">Choose Theme</h3>
        <div className="theme-grid">
          {THEMES.map((t) => (
            <div
              key={t}
              className={`theme-tile ${t} ${theme === t ? "active" : ""}`}
              onClick={() => applyTheme(t)}
            >
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

        <button className="danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
