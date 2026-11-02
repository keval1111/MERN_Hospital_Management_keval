import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  UserCheck,
  Calendar,
  Layers,
  Plus,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  ClipboardList,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UnifiedHospitalDashboard() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. HOSPITAL ADMIN VIEW                                                    */}
      {/* ========================================================================= */}
      {role === 'Hospital Admin' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Hospital Admin Panel
                </span>
                <span className="text-xs text-slate-500">• Single Unified Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {user?.hospital_name || 'Hospital'} Operations Overview
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage your hospital's departments, doctor rosters, staff shifts & operational schedule
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/portal/doctors"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Doctor</span>
              </Link>
            </div>
          </div>

          {/* Admin KPI Cards */}
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
              <p className="text-xs text-slate-500">Nurses & Receptionists</p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase font-semibold">Today's Appointments</span>
                <Calendar className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">24</p>
              <p className="text-xs text-slate-500">Booked across all depts</p>
            </div>
          </div>

          {/* Admin Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all">
              <h3 className="font-bold text-white text-base mb-2">Departments Configuration</h3>
              <p className="text-xs text-slate-400 mb-4">
                Configure clinical departments offered by your facility from the master list.
              </p>
              <Link to="/portal/departments" className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">
                Manage Departments <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-teal-500/40 transition-all">
              <h3 className="font-bold text-white text-base mb-2">Doctor Rosters & Schedules</h3>
              <p className="text-xs text-slate-400 mb-4">
                Provision doctor accounts, assign OPD slots, and set consultation fees.
              </p>
              <Link to="/portal/doctors" className="text-xs font-semibold text-teal-400 inline-flex items-center gap-1 hover:underline">
                View Doctors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all">
              <h3 className="font-bold text-white text-base mb-2">Staff & Reception Roster</h3>
              <p className="text-xs text-slate-400 mb-4">
                Assign desk staff for patient check-in, queue management, and billing.
              </p>
              <Link to="/portal/staff" className="text-xs font-semibold text-cyan-400 inline-flex items-center gap-1 hover:underline">
                View Staff Roster <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. DOCTOR VIEW                                                            */}
      {/* ========================================================================= */}
      {role === 'Doctor' && (
        <>
          <div className="pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Doctor Consultation Workspace
              </span>
              <span className="text-xs text-slate-500">• Single Unified Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome, Dr. {user?.name || 'Doctor'}</h1>
            <p className="text-sm text-slate-400 mt-1">
              Review your patient queue, consultation requests, and issue electronic prescriptions
            </p>
          </div>

          {/* Doctor Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase font-semibold">Today Appointments</span>
                <Stethoscope className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">6</p>
              <p className="text-xs text-slate-500">Scheduled consultations</p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase font-semibold">In Waiting Lounge</span>
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">2</p>
              <p className="text-xs text-slate-500">Patients checked-in by reception</p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs uppercase font-semibold">Completed Today</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">4</p>
              <p className="text-xs text-slate-500">Prescriptions filed</p>
            </div>
          </div>

          {/* Consultation Queue List */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Today's Patient Schedule</h3>
              <span className="text-xs text-slate-400">Live Queue Updated</span>
            </div>
            <div className="divide-y divide-slate-800">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">Vikramaditya Singhania (40 / M)</p>
                  <p className="text-xs text-slate-400">Reason: Routine cardiac checkup • Slot: 10:30 AM</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Waiting in Lobby
                  </span>
                  <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all">
                    Start Consultation
                  </button>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">Ananya Joshi (28 / F)</p>
                  <p className="text-xs text-slate-400">Reason: Follow-up ECG review • Slot: 11:15 AM</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                    Confirmed (Upcoming)
                  </span>
                  <button disabled className="px-4 py-2 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed">
                    Queue Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. STAFF / RECEPTION VIEW                                                 */}
      {/* ========================================================================= */}
      {role === 'Staff' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Staff & Reception Panel
                </span>
                <span className="text-xs text-slate-500">• Single Unified Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Patient Check-in & Reception Desk</h1>
              <p className="text-sm text-slate-400 mt-1">
                Verify arriving patients, mark arrival status for doctors, and manage walk-ins
              </p>
            </div>
            <Link
              to="/portal/walkin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/20 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Walk-in Registration</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <span className="text-xs uppercase font-semibold text-slate-400">Arrived Patients</span>
              <p className="text-3xl font-extrabold text-white">12</p>
              <p className="text-xs text-slate-500">Checked-in today</p>
            </div>
            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <span className="text-xs uppercase font-semibold text-slate-400">Currently Waiting</span>
              <p className="text-3xl font-extrabold text-white">3</p>
              <p className="text-xs text-slate-500">In waiting lounge</p>
            </div>
            <div className="p-6 rounded-2xl glass-panel space-y-2">
              <span className="text-xs uppercase font-semibold text-slate-400">My Shift</span>
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
                  <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all">
                    Mark Patient Arrived
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
