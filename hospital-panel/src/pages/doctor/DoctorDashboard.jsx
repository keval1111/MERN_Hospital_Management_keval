import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome, {user?.name || 'Doctor'}</h1>
        <p className="text-sm text-slate-400 mt-1">Review your patient queue, consultation requests, and clinical notes</p>
      </div>

      {/* Doctor Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Today Appointments</span>
            <Stethoscope className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">6</p>
          <p className="text-xs text-slate-500">Scheduled for today</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">In Waiting Queue</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">2</p>
          <p className="text-xs text-slate-500">Arrived at clinic</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-semibold">Completed Consultations</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">4</p>
          <p className="text-xs text-slate-500">Prescriptions filed</p>
        </div>
      </div>

      {/* Appointment Schedule List */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-lg font-bold text-white">Today's Patient Schedule</h3>
        <div className="divide-y divide-slate-800">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Vikramaditya Singhania (40 / M)</p>
              <p className="text-xs text-slate-400">Reason: Routine quarterly cardiac checkup • BP: 128/84 mmHg</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                In Waiting
              </span>
              <button className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition-all">
                Start Consultation
              </button>
            </div>
          </div>

          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">Priya Nambiar (32 / F)</p>
              <p className="text-xs text-slate-400">Reason: Follow-up lab review</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
