import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, isTemporaryPassword, role } = useAuth();
  const location = useLocation();

  // 1. Not Authenticated -> Redirect to Login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Mandatory First-Login Password Change Check
  if (isTemporaryPassword && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  // 3. Role Authorization Check
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to respective home dashboard based on role
    if (role === 'Super Admin') return <Navigate to="/superadmin" replace />;
    if (role === 'Hospital Admin') return <Navigate to="/admin" replace />;
    if (role === 'Doctor') return <Navigate to="/doctor" replace />;
    if (role === 'Staff') return <Navigate to="/staff" replace />;
    if (role === 'Patient') return <Navigate to="/patient" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
