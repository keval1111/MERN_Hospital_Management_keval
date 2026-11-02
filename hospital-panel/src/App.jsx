import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import HospitalPortalLayout from './layouts/HospitalPortalLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// Dashboards
import UnifiedHospitalDashboard from './pages/portal/UnifiedHospitalDashboard';

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

          {/* ============================================================== */}
          {/* HOSPITAL OPERATIONS PORTAL (Admin, Doctor, Staff)              */}
          {/* ============================================================== */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['Hospital Admin', 'Doctor', 'Staff']}>
                <HospitalPortalLayout />
              </ProtectedRoute>
            }
          >
            {/* Common Entry Dashboard - dynamically adapts to role */}
            <Route index element={<UnifiedHospitalDashboard />} />

            {/* Hospital Admin Routes */}
            <Route
              path="departments"
              element={
                <ProtectedRoute allowedRoles={['Hospital Admin']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctors"
              element={
                <ProtectedRoute allowedRoles={['Hospital Admin']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="staff"
              element={
                <ProtectedRoute allowedRoles={['Hospital Admin']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="consultations"
              element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="prescriptions"
              element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />

            {/* Staff & Admin Routes */}
            <Route
              path="checkin"
              element={
                <ProtectedRoute allowedRoles={['Staff', 'Hospital Admin']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="walkin"
              element={
                <ProtectedRoute allowedRoles={['Staff', 'Hospital Admin']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />

            {/* Shared Schedule Route */}
            <Route
              path="schedule"
              element={
                <ProtectedRoute allowedRoles={['Hospital Admin', 'Doctor', 'Staff']}>
                  <UnifiedHospitalDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Alias for /portal */}
          <Route path="/portal/*" element={<Navigate to="/" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
