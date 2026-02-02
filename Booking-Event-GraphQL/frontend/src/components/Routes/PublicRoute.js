import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    // Already logged in → redirect to /events
    return <Navigate to="/events" replace />;
  }

  return children;
};

export default PublicRoute;
