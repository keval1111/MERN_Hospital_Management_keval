import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, Layers, Award, MapPin, Bell, LogOut, Shield } from 'lucide-react';

export default function SuperAdminLayout() {
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/superadmin', label: 'Platform Overview', icon: LayoutDashboard },
    { to: '/superadmin/hospitals', label: 'Hospital Onboarding', icon: Building2 },
    { to: '/superadmin/departments', label: 'Department Master', icon: Layers },
    { to: '/superadmin/designations', label: 'Designation Master', icon: Award },
    { to: '/superadmin/locations', label: 'Location Masters', icon: MapPin },
    { to: '/superadmin/notifications', label: 'Notification Logs', icon: Bell }
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">HMS Platform</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Super Admin
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
                end={item.to === '/superadmin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border-l-4 border-indigo-500'
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
            <p className="text-sm font-medium text-white truncate">{user?.name || 'Super Admin'}</p>
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

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
