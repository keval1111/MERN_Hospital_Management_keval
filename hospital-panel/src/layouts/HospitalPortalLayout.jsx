import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Layers,
  LogOut,
  Building2,
  Stethoscope,
  ClipboardList,
  FileText,
  UserPlus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function HospitalPortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role Badge Styling
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Hospital Admin':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-400',
          title: 'Hospital Admin'
        };
      case 'Doctor':
        return {
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          dot: 'bg-cyan-400',
          title: 'Specialist Doctor'
        };
      case 'Staff':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          dot: 'bg-amber-400',
          title: 'Hospital Staff / Reception'
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          dot: 'bg-slate-400',
          title: role || 'Member'
        };
    }
  };

  const badge = getRoleBadge(user?.role);

  // Unified Navigation Items filtered by user role
  const allNavItems = [
    {
      to: '/portal',
      label: 'Portal Dashboard',
      icon: LayoutDashboard,
      roles: ['Hospital Admin', 'Doctor', 'Staff'],
      exact: true
    },
    // Hospital Admin Sections
    {
      to: '/portal/departments',
      label: 'Department Setup',
      icon: Layers,
      roles: ['Hospital Admin']
    },
    {
      to: '/portal/doctors',
      label: 'Doctors Roster',
      icon: Users,
      roles: ['Hospital Admin']
    },
    {
      to: '/portal/staff',
      label: 'Healthcare Staff',
      icon: UserCheck,
      roles: ['Hospital Admin']
    },
    // Doctor Sections
    {
      to: '/portal/consultations',
      label: 'My Consultations',
      icon: Stethoscope,
      roles: ['Doctor']
    },
    {
      to: '/portal/prescriptions',
      label: 'Prescriptions & Rx',
      icon: FileText,
      roles: ['Doctor']
    },
    // Staff & Admin Sections
    {
      to: '/portal/checkin',
      label: 'Arrival & Check-in',
      icon: ClipboardList,
      roles: ['Staff', 'Hospital Admin']
    },
    {
      to: '/portal/walkin',
      label: 'Walk-in Registration',
      icon: UserPlus,
      roles: ['Staff', 'Hospital Admin']
    },
    // Shared Schedule
    {
      to: '/portal/schedule',
      label: 'Hospital Schedule',
      icon: Calendar,
      roles: ['Hospital Admin', 'Doctor', 'Staff']
    }
  ];

  const visibleNavLinks = allNavItems.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col fixed inset-y-0 z-50">
        {/* Hospital Branding Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-white text-sm tracking-tight truncate">
              {user?.hospital_name || 'Hospital Operations'}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
              <span className={`text-[11px] font-medium px-1.5 py-0.2 rounded border ${badge.bg}`}>
                {badge.title}
              </span>
            </div>
          </div>
        </div>

        {/* Role Notice banner */}
        <div className="mx-3 my-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div className="text-[11px] text-slate-300 leading-tight">
            <span className="font-semibold text-white">Unified Panel:</span> View filtered for <span className="text-emerald-400 font-medium">{user?.role}</span>
          </div>
        </div>

        {/* Dynamic Nav Links */}
        <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
          {visibleNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </nav>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Staff User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
              Hospital Operations Portal
            </span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs text-slate-400">
              Role: <strong className="text-white">{user?.role}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Connected & Verified
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
