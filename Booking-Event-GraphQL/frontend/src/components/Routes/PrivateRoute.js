import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Not logged in → redirect to /auth
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
