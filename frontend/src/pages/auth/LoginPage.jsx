import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('superadmin@hospital.com');
  const [password, setPassword] = useState('Admin@123');
  const [roleHint, setRoleHint] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const user = await login(email, password, roleHint);
      
      // If temporary password, redirect immediately to change password
      if (user.is_temporary_password) {
        navigate('/change-password', { replace: true });
        return;
      }

      // Role-based destination
      if (user.role === 'Super Admin') navigate('/superadmin');
      else if (user.role === 'Hospital Admin') navigate('/admin');
      else if (user.role === 'Doctor') navigate('/doctor');
      else if (user.role === 'Staff') navigate('/staff');
      else navigate('/patient');
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40">
      <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hospital Portal Login</h1>
          <p className="text-sm text-slate-400 mt-1">Multi-Tenant Unified Access</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
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
          <p className="text-xs font-semibold text-slate-400 mb-3 text-center">Quick Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => quickFill('superadmin@hospital.com', 'Admin@123', 'Super Admin')}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-indigo-300 border border-slate-700/50 text-left font-medium transition-colors"
            >
              🛡️ Super Admin
            </button>
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
              🩺 Doctor (Cardiology)
            </button>
            <button
              type="button"
              onClick={() => quickFill('staff.pooja@hospital.com', 'Admin@123', 'Staff')}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-slate-700/50 text-left font-medium transition-colors"
            >
              📋 Healthcare Staff
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Are you a patient?{' '}
          <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
