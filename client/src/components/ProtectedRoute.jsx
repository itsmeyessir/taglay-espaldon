import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLoader from './PageLoader'; // Assuming you have a PageLoader component

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />; // Show a loading spinner while checking auth status
  }

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Check if there are allowed roles and if the user's role is included
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // User is authenticated but does not have the required role
    // Redirect to a forbidden page or home page
    return <Navigate to="/" replace />; // Or to a specific /forbidden page
  }

  // User is authenticated and has the required role (if any)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
