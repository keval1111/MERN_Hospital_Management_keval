import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, Building2, Stethoscope, UserCheck, ExternalLink } from 'lucide-react';
import { getActivePortalType, PORTAL_TYPES, PORTAL_URLS, isAllowedOnPortal } from '../../utils/portalConfig';

export default function LoginPage() {
  const portalType = getActivePortalType();

  // Initial credentials according to active portal
  const getDefaultCredentials = () => {
    if (portalType === PORTAL_TYPES.SUPERADMIN) {
      return { email: 'superadmin@hospital.com', pass: 'Admin@123', role: 'Super Admin' };
    }
    if (portalType === PORTAL_TYPES.HOSPITAL) {
      return { email: 'admin.apex@hospital.com', pass: 'Admin@123', role: 'Hospital Admin' };
    }
    return { email: 'rahul.sharma@gmail.com', pass: 'Patient@123', role: 'Patient' };
  };

  const defaultCreds = getDefaultCredentials();
  const [email, setEmail] = useState(defaultCreds.email);
  const [password, setPassword] = useState(defaultCreds.pass);
  const [roleHint, setRoleHint] = useState(defaultCreds.role);
  const [errorMsg, setErrorMsg] = useState('');
  const [redirectInfo, setRedirectInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setRedirectInfo(null);
    setLoading(true);

    try {
      const user = await login(email, password, roleHint);

      // 1. Mandatory Temporary Password change
      if (user.is_temporary_password) {
        navigate('/change-password', { replace: true });
        return;
      }

      // 2. Multi-Port Validation & Redirection:
      if (!isAllowedOnPortal(user.role, portalType)) {
        if (portalType === PORTAL_TYPES.SUPERADMIN) {
          setErrorMsg(`Access Restricted: Role '${user.role}' cannot access the Super Admin Panel (Port 3001).`);
          setRedirectInfo({
            targetUrl: ['Hospital Admin', 'Doctor', 'Staff'].includes(user.role)
              ? `${PORTAL_URLS.hospital}/portal`
              : `${PORTAL_URLS.patient}/patient`,
            label: ['Hospital Admin', 'Doctor', 'Staff'].includes(user.role)
              ? 'Open Hospital Panel (Port 3002)'
              : 'Open Patient Portal (Port 3000)'
          });
          return;
        }

        if (portalType === PORTAL_TYPES.HOSPITAL) {
          setErrorMsg(`Access Restricted: Role '${user.role}' cannot access Hospital Operations (Port 3002).`);
          setRedirectInfo({
            targetUrl: user.role === 'Super Admin'
              ? `${PORTAL_URLS.superadmin}/superadmin`
              : `${PORTAL_URLS.patient}/patient`,
            label: user.role === 'Super Admin'
              ? 'Open Super Admin Panel (Port 3001)'
              : 'Open Patient Portal (Port 3000)'
          });
          return;
        }
      }

      // 3. Normal local navigation when allowed on this portal
      if (user.role === 'Super Admin') {
        navigate('/superadmin');
      } else if (['Hospital Admin', 'Doctor', 'Staff'].includes(user.role)) {
        navigate('/portal');
      } else {
        navigate('/patient');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (quickEmail, quickPassword, quickRole) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setRoleHint(quickRole);
  };

  // Dynamic header badge based on current port
  const getPortalHeader = () => {
    if (portalType === PORTAL_TYPES.SUPERADMIN) {
      return {
        icon: Shield,
        badge: 'PORT 3001 • MASTER CONTROL',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        title: 'Super Admin Portal',
        subtitle: 'Platform Master & Tenant Management'
      };
    }
    if (portalType === PORTAL_TYPES.HOSPITAL) {
      return {
        icon: Building2,
        badge: 'PORT 3002 • HOSPITAL OPERATIONS',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        title: 'Hospital Clinical Panel',
        subtitle: 'Admin, Doctor & Healthcare Staff Access'
      };
    }
    return {
      icon: Stethoscope,
      badge: 'PORT 3000 • PATIENT CARE',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      title: 'Patient Healthcare Portal',
      subtitle: 'Hospital Search & Appointment Access'
    };
  };

  const portalHeader = getPortalHeader();
  const HeaderIcon = portalHeader.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40">
      <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <HeaderIcon className="w-7 h-7" />
          </div>
          <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border mb-2 ${portalHeader.badgeColor}`}>
            {portalHeader.badge}
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">{portalHeader.title}</h1>
          <p className="text-sm text-slate-400 mt-1">{portalHeader.subtitle}</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            {redirectInfo && (
              <a
                href={redirectInfo.targetUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold transition-all mt-1"
              >
                <span>{redirectInfo.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@hospital.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast-Login Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-400 mb-3 text-center">Quick Demo Accounts for this Port:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {portalType === PORTAL_TYPES.SUPERADMIN && (
              <button
                type="button"
                onClick={() => quickFill('superadmin@hospital.com', 'Admin@123', 'Super Admin')}
                className="col-span-2 p-2.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-left font-medium transition-colors"
              >
                🛡️ Super Admin Master (Port 3001)
              </button>
            )}

            {portalType === PORTAL_TYPES.HOSPITAL && (
              <>
                <button
                  type="button"
                  onClick={() => quickFill('admin.apex@hospital.com', 'Admin@123', 'Hospital Admin')}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 border border-slate-700/50 text-left font-medium transition-colors"
                >
                  🏢 Hospital Admin
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('doctor.amit@hospital.com', 'Admin@123', 'Doctor')}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-slate-700/50 text-left font-medium transition-colors"
                >
                  🩺 Doctor (OPD)
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('staff.pooja@hospital.com', 'Admin@123', 'Staff')}
                  className="col-span-2 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-slate-700/50 text-left font-medium transition-colors"
                >
                  📋 Healthcare Staff / Desk
                </button>
              </>
            )}

            {(portalType === PORTAL_TYPES.PATIENT || portalType === PORTAL_TYPES.UNIFIED) && (
              <>
                <button
                  type="button"
                  onClick={() => quickFill('rahul.sharma@gmail.com', 'Patient@123', 'Patient')}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-sky-300 border border-slate-700/50 text-left font-medium transition-colors"
                >
                  👤 Patient User
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('priya.patel@gmail.com', 'Patient@123', 'Patient')}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-sky-300 border border-slate-700/50 text-left font-medium transition-colors"
                >
                  👤 Patient 2
                </button>
              </>
            )}
          </div>
        </div>

        {/* Portal Switching Links */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Other Portals:</span>
          <div className="flex gap-2">
            <a href="http://localhost:3000" className="hover:text-sky-300 underline">Port 3000 (Patient)</a>
            <span>•</span>
            <a href="http://localhost:3001" className="hover:text-indigo-300 underline">Port 3001 (Super Admin)</a>
            <span>•</span>
            <a href="http://localhost:3002" className="hover:text-emerald-300 underline">Port 3002 (Hospital)</a>
          </div>
        </div>
      </div>
    </div>
  );
}
