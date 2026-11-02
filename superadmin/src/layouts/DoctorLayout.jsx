import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, Calendar, Clock, UserCheck, LogOut } from 'lucide-react';

export default function DoctorLayout() {
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/doctor', label: 'Doctor Dashboard', icon: Stethoscope },
    { to: '/doctor/today', label: "Today's Appointments", icon: Calendar },
    { to: '/doctor/waiting-queue', label: 'Waiting Room Queue', icon: Clock },
    { to: '/doctor/patients', label: 'Patient Medical History', icon: UserCheck }
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-white text-base truncate">{user?.name || 'Doctor Panel'}</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Doctor
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/doctor'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-600/15 text-cyan-400 border-l-4 border-cyan-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64 flex flex-col">
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
