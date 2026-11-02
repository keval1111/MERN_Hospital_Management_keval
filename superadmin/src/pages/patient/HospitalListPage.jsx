import React, { useState } from 'react';
import { Hospital, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export default function HospitalListPage() {
  const [cityFilter, setCityFilter] = useState('All');

  const hospitals = [
    {
      id: 1,
      name: 'Apex Super-Speciality Hospital',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Plot 42, Bandra Kurla Complex, Bandra East',
      phone: '+91 22 2650 1234',
      departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
      hours: 'Mon - Fri: 08:00 AM - 08:00 PM',
      upi: 'apex.hospital@okhdfcbank'
    },
    {
      id: 2,
      name: 'LifeCare Multi-Speciality Institute',
      city: 'Ahmedabad',
      state: 'Gujarat',
      address: 'Opp. ISKCON Temple, SG Highway, Bodakdev',
      phone: '+91 79 2685 5500',
      departments: ['Cardiology', 'ENT', 'Dermatology'],
      hours: 'Mon - Sat: 09:00 AM - 09:00 PM',
      upi: 'lifecare@icici'
    }
  ];

  const filtered = cityFilter === 'All' ? hospitals : hospitals.filter(h => h.city === cityFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Accredited Hospitals Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Browse verified hospital tenants and check available clinical departments</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-semibold text-slate-400">Filter City:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((hospital) => (
          <div key={hospital.id} className="p-6 rounded-2xl glass-panel space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{hospital.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{hospital.address}, {hospital.city}</span>
                  </p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Verified Tenant
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{hospital.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{hospital.hours}</span>
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Departments:</p>
                <div className="flex flex-wrap gap-1.5">
                  {hospital.departments.map((dept, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-indigo-300 font-medium">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">UPI: {hospital.upi}</span>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all">
                <span>Book Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
