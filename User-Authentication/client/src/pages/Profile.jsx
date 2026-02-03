import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setUserEmail(user.email);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="page-card">
        <h1>Profile</h1>
        <p><strong>Email:</strong> {userEmail}</p>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
