import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import PublicPatientLayout from './layouts/PublicPatientLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Patient Pages
import PatientLandingPage from './pages/patient/PatientLandingPage';
import PatientRegisterPage from './pages/patient/PatientRegisterPage';
import HospitalListPage from './pages/patient/HospitalListPage';
import PatientDashboard from './pages/patient/PatientDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Patient & Information Routes */}
          <Route element={<PublicPatientLayout />}>
            <Route path="/" element={<PatientLandingPage />} />
            <Route path="/hospitals" element={<HospitalListPage />} />
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={['Patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<PatientRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          {/* Cross-Panel Redirect Hints */}
          <Route path="/superadmin/*" element={<a href="http://localhost:3001" className="p-8 block text-indigo-400">Please access Super Admin on Port 3001 (Click here)</a>} />
          <Route path="/portal/*" element={<a href="http://localhost:3002" className="p-8 block text-emerald-400">Please access Hospital Staff Portal on Port 3002 (Click here)</a>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
