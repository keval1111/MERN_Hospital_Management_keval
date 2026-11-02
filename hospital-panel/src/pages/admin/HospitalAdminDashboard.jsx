import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, UserCheck, Calendar, Layers, Plus } from 'lucide-react';

export default function HospitalAdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{user?.hospital_name || 'Hospital'} Operations</h1>
          <p className="text-sm text-slate-400 mt-1">Manage hospital departments, doctor roster, staff shifts & operational schedule</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Active Departments</span>
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">4</p>
          <p className="text-xs text-slate-500">Selected from Master List</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Registered Doctors</span>
            <Users className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">8</p>
          <p className="text-xs text-slate-500">Licensed specialists</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Healthcare Staff</span>
            <UserCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">14</p>
          <p className="text-xs text-slate-500">Nurses & Reception</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Today Appointments</span>
            <Calendar className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">24</p>
          <p className="text-xs text-slate-500">Patient schedule</p>
        </div>
      </div>

      {/* Departments Overview */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-lg font-bold text-white">Adopted Departments & Specialists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Cardiology</h4>
            <p className="text-xs text-slate-400">2 Senior Consultants • 8 daily slots</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Pediatrics</h4>
            <p className="text-xs text-slate-400">2 Specialists • Neonatal & vaccinations</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Orthopedics</h4>
            <p className="text-xs text-slate-400">1 Consultant • Bone & joint care</p>
          </div>
        </div>
      </div>
    </div>
  );
}
