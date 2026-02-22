import React from "react";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {userId}</p>
      <p>Email: test@test.com</p>
    </div>
  );
};

export default ProfilePage;