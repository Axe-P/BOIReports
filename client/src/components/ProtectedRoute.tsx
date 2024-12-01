import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement; // The component to render if authorized
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  // Check if the token exists
  if (!token) {
    // Redirect to the Home page if no token is found
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the children
  return children;
};

export default ProtectedRoute;
