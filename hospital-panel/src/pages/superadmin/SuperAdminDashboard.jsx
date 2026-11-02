import React from 'react';
import { Building2, Users, Calendar, ShieldCheck, Plus, ArrowUpRight } from 'lucide-react';

export default function SuperAdminDashboard() {
  const stats = [
    { label: 'Total Hospitals', value: '12', change: '+2 this month', icon: Building2, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Active Doctors', value: '148', change: 'Across all tenants', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'System Appointments', value: '2,840', change: '+18% vs last month', icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Platform Health', value: '100%', change: 'Multi-tenant isolated', icon: ShieldCheck, color: 'text-amber-400', bg: 'bg-amber-500/10' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Super Admin Platform Governance</h1>
          <p className="text-sm text-slate-400 mt-1">Multi-Tenant Management, Master Governance & Hospital Onboarding</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all">
          <Plus className="w-4 h-4" />
          <span>Onboard New Hospital</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hospital Tenants Preview Table */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Registered Hospital Tenants</h3>
            <p className="text-xs text-slate-400">Independent healthcare providers running on your multi-tenant infrastructure</p>
          </div>
          <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Hospital Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-semibold text-white">Apex Super-Speciality Hospital</td>
                <td className="px-4 py-3 text-slate-400">Mumbai, Maharashtra</td>
                <td className="px-4 py-3">admin.apex@hospital.com</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    ● Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-semibold text-white">LifeCare Multi-Speciality Institute</td>
                <td className="px-4 py-3 text-slate-400">Ahmedabad, Gujarat</td>
                <td className="px-4 py-3">admin.lifecare@hospital.com</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    ● Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
