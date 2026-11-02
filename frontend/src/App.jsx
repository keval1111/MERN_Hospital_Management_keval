import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import PublicPatientLayout from './layouts/PublicPatientLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import HospitalAdminLayout from './layouts/HospitalAdminLayout';
import DoctorLayout from './layouts/DoctorLayout';
import StaffLayout from './layouts/StaffLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Dashboards
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import HospitalAdminDashboard from './pages/admin/HospitalAdminDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';

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

          {/* Super Admin Protected Portal */}
          <Route
            path="/superadmin"
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

          {/* Hospital Admin Protected Portal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Hospital Admin']}>
                <HospitalAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HospitalAdminDashboard />} />
            <Route path="departments" element={<HospitalAdminDashboard />} />
            <Route path="doctors" element={<HospitalAdminDashboard />} />
            <Route path="staff" element={<HospitalAdminDashboard />} />
            <Route path="appointments" element={<HospitalAdminDashboard />} />
          </Route>

          {/* Doctor Protected Portal */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DoctorDashboard />} />
            <Route path="today" element={<DoctorDashboard />} />
            <Route path="waiting-queue" element={<DoctorDashboard />} />
            <Route path="patients" element={<DoctorDashboard />} />
          </Route>

          {/* Staff Protected Portal */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={['Staff']}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="walk-in" element={<StaffDashboard />} />
            <Route path="patients" element={<StaffDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
