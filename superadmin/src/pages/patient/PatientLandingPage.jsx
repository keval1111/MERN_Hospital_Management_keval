import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Heart, Award, ArrowRight } from 'lucide-react';

export default function PatientLandingPage() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Multi-Tenant Hospital & Healthcare Network</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Find Top Hospitals & Expert Doctors Near You
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Book verified doctor consultations, check real-time queue status, and manage your family's medical records across accredited multi-speciality hospitals.
        </p>

        {/* Quick Search Bar */}
        <div className="max-w-2xl mx-auto p-2 rounded-2xl glass-panel shadow-2xl flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-900/60 rounded-xl">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by hospital name, specialty, or city..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
          <Link
            to="/hospitals"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Explore Hospitals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Specialty Highlights */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Popular Clinical Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel text-center space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white">Cardiology</h3>
            <p className="text-xs text-slate-400">Heart & bypass specialists</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white">Neurology</h3>
            <p className="text-xs text-slate-400">Brain & spine surgery</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white">Pediatrics</h3>
            <p className="text-xs text-slate-400">Child healthcare & vaccines</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center space-y-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white">Orthopedics</h3>
            <p className="text-xs text-slate-400">Joint replacement & bone care</p>
          </div>
        </div>
      </section>
    </div>
  );
}
