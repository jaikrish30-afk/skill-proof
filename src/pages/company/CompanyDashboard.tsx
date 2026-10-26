import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  BarChart3,
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const { opportunities, candidatesPool } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Industry Recruiter & Talent Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              SecureTech Solutions Hiring Desk
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Source job-ready academia talent based on demonstrated code tests and verified project
              repositories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/company/jobs/create"
              className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Job Opening</span>
            </Link>

            <Link
              to="/company/applicants"
              className="px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Candidate Discovery</span>
            </Link>
          </div>
        </div>

        {/* Top 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-stone-800">
          <div className="p-4 rounded-xl bg-stone-800 border border-stone-700">
            <span className="text-xs text-slate-400">Active Job Roles</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">4</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              142 Total Inflows
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Total Applicants</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono mt-1">
              48
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Cybersecurity Intern</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Shortlisted via Proof</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">12</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              Min 75% Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Technical Interviews</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">6</div>
            <span className="text-[11px] text-cyan-300 font-semibold mt-0.5 block">
              3 HR Scheduled
            </span>
          </div>
        </div>
      </div>

      {/* Hiring Pipeline Funnel & Candidate Discovery Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Active Role Funnel (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Active Hiring Funnel: Cybersecurity Intern
                </h2>
                <p className="text-xs text-slate-500">Live stages driven by verified test benchmarks</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Role Open
              </span>
            </div>

            {/* Funnel Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">1. Total Applicants</span>
                  <span className="font-mono text-slate-900">48 Candidates</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-slate-700 h-full rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">2. InterTrack Shortlisted (&gt;75% Match)</span>
                  <span className="font-mono text-brand-600">12 Candidates</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-brand-600 h-full rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">3. Technical Defense Scheduled</span>
                  <span className="font-mono text-indigo-600">6 Candidates</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-[12.5%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">4. HR Culture Alignment</span>
                  <span className="font-mono text-cyan-600">3 Candidates</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full w-[6.2%]" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Avg time-to-hire reduced by <strong>68%</strong> via verified proofs.
              </span>
              <Link
                to="/company/interviews"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>Pipeline Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Top Matched Candidates (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Top Evidence-Verified Candidates
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked by verified skills match for Cybersecurity Intern
                </p>
              </div>
              <Link
                to="/company/applicants"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                View All (5)
              </Link>
            </div>

            <div className="space-y-3.5">
              {candidatesPool.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                          {c.name}
                        </h4>
                        <span className="px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {c.college} • {c.department}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                        <span className="text-indigo-700 font-bold">Match: {c.skillMatch}%</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600">Test: {c.assessmentScore}%</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/company/candidates/${c.id}`}
                    className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>View Proof</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
