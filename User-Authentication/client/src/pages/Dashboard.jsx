// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email) {
        setUserEmail(user.email);
        return; // Stop here if user is valid
      }
    }

    // If user not found or invalid, redirect to login
    navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome, {userEmail}!</h1>
        <p className="dashboard-subtitle">
          This is your personal dashboard. You can access protected content, manage your profile, and explore features.
        </p>

        <div className="dashboard-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/settings")}
          >
            Settings
          </button>
          <button className="dashboard-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
