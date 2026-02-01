// src/components/Routes/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return children; // Render the protected component
};

export default PrivateRoute;
