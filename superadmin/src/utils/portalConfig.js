/**
 * Multi-Port & Portal Configuration Utility
 * Detects whether the current frontend is running on:
 * - Port 3000: User / Patient Frontend
 * - Port 3001: Super Admin Panel
 * - Port 3002: Hospital Admin, Doctor & Staff Shared Panel
 * - Port 5173 / other: Unified All-in-One Mode
 */

export const PORTAL_TYPES = {
  PATIENT: 'patient',
  SUPERADMIN: 'superadmin',
  HOSPITAL: 'hospital',
  UNIFIED: 'unified'
};

export const PORTAL_URLS = {
  patient: 'http://localhost:3000',
  superadmin: 'http://localhost:3001',
  hospital: 'http://localhost:3002'
};

export function getActivePortalType() {
  // 1. Check Vite define flag first
  const envType = import.meta.env.VITE_PORTAL_TYPE;
  if (envType && envType !== 'unified') {
    return envType;
  }

  // 2. Fallback to detecting current window port
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    if (port === '3000') return PORTAL_TYPES.PATIENT;
    if (port === '3001') return PORTAL_TYPES.SUPERADMIN;
    if (port === '3002') return PORTAL_TYPES.HOSPITAL;
  }

  return PORTAL_TYPES.UNIFIED;
}

export function isAllowedOnPortal(role, portalType = getActivePortalType()) {
  if (portalType === PORTAL_TYPES.UNIFIED) return true;

  if (portalType === PORTAL_TYPES.SUPERADMIN) {
    return role === 'Super Admin';
  }

  if (portalType === PORTAL_TYPES.HOSPITAL) {
    return ['Hospital Admin', 'Doctor', 'Staff'].includes(role);
  }

  if (portalType === PORTAL_TYPES.PATIENT) {
    return role === 'Patient' || !role; // public visitors or patient
  }

  return true;
}
