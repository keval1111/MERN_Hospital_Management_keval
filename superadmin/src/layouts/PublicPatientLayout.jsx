import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Hospital, Calendar, User, LogOut } from 'lucide-react';

export default function PublicPatientLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Public Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">MediPlatform</span>
              <span className="block text-xs text-indigo-400 font-medium">Healthcare Multi-Tenant Network</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/hospitals" className="hover:text-white transition-colors">Find Hospitals</Link>
            <Link to="/hospitals" className="hover:text-white transition-colors">Find Doctors</Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (user?.role === 'Super Admin') navigate('/superadmin');
                    else if (user?.role === 'Hospital Admin') navigate('/admin');
                    else if (user?.role === 'Doctor') navigate('/doctor');
                    else if (user?.role === 'Staff') navigate('/staff');
                    else navigate('/patient');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>{user?.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
                >
                  Patient Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <Hospital className="w-5 h-5 text-indigo-400" />
            <span>&copy; 2026 MediPlatform. Multi-Tenant Hospital Governance System.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/login" className="hover:text-slate-300">Staff & Admin Login</Link>
            <Link to="/hospitals" className="hover:text-slate-300">Hospitals Directory</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
