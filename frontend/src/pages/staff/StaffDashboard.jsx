import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, UserCheck, Clock, UserPlus } from 'lucide-react';

export default function StaffDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reception & Patient Check-in</h1>
          <p className="text-sm text-slate-400 mt-1">Manage arriving patients, mark check-in arrival status, and register walk-ins</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/20 transition-all">
          <UserPlus className="w-4 h-4" />
          <span>Walk-in Registration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Arrived Patients</span>
          <p className="text-3xl font-extrabold text-white">12</p>
          <p className="text-xs text-slate-500">Checked in today</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Currently Waiting</span>
          <p className="text-3xl font-extrabold text-white">3</p>
          <p className="text-xs text-slate-500">In waiting lounge</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Upcoming Shifts</span>
          <p className="text-3xl font-extrabold text-white">Morning</p>
          <p className="text-xs text-slate-500">08:00 AM - 04:00 PM</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-lg font-bold text-white">Today's Arrival Verification Queue</h3>
        <div className="divide-y divide-slate-800">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Vikramaditya Singhania • 10:30 AM</p>
              <p className="text-xs text-slate-400">Dr. Amit Trivedi (Cardiology) • Slot Confirmed</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Confirmed
              </span>
              <button className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all">
                Mark Patient Arrived
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
