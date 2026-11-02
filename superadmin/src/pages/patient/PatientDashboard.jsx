import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Heart, ShieldAlert, Clock } from 'lucide-react';

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Patient Portal</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back, {user?.name}. Track your upcoming visits and medical records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Upcoming Appointments</span>
          <p className="text-3xl font-extrabold text-white">1</p>
          <p className="text-xs text-slate-500">Confirmed with Dr. Amit Trivedi</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Recorded Blood Group</span>
          <p className="text-3xl font-extrabold text-rose-400">O+</p>
          <p className="text-xs text-slate-500">Verified medical profile</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <span className="text-xs uppercase font-semibold text-slate-400">Allergies Reported</span>
          <p className="text-xl font-bold text-amber-400">Penicillin, Sulfa</p>
          <p className="text-xs text-slate-500">Notified to attending doctors</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-lg font-bold text-white">Your Scheduled Consultations</h3>
        <div className="divide-y divide-slate-800">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Apex Super-Speciality Hospital</p>
              <p className="text-xs text-slate-400">Dr. Amit Trivedi (Cardiology) • Oct 31, 2026 at 10:30 AM</p>
              <p className="text-xs text-indigo-400 mt-1">Reason: Routine quarterly cardiac checkup</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
