import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import SuperAdminLayout from './layouts/SuperAdminLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// Dashboards
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Master Portal Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SuperAdminDashboard />} />
            <Route path="hospitals" element={<SuperAdminDashboard />} />
            <Route path="departments" element={<SuperAdminDashboard />} />
            <Route path="designations" element={<SuperAdminDashboard />} />
            <Route path="locations" element={<SuperAdminDashboard />} />
            <Route path="notifications" element={<SuperAdminDashboard />} />
          </Route>

          {/* Alias for /superadmin */}
          <Route path="/superadmin/*" element={<Navigate to="/" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
