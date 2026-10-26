import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  School,
  Users,
  Award,
  Target,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { institutionStats } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-emerald-400 text-xs font-semibold border border-stone-700 mb-3">
              <School className="w-3.5 h-3.5" />
              <span>Academia-Industry Collaboration Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {institutionStats.name}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time curriculum skill mapping, practical test authentication, and corporate
              internship readiness tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/institution/skills"
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Skill Mapping Matrix</span>
            </Link>

            <Link
              to="/institution/reports"
              className="px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Accreditation Report</span>
            </Link>
          </div>
        </div>

        {/* Top 5 Institution Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8 pt-6 border-t border-stone-800">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Total Enrolled</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {institutionStats.totalStudents.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">5 Departments</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Assessed Students</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
              {institutionStats.assessedPercentage}%
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              {institutionStats.assessedStudents} Validated
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Verified Skill Proofs</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
              {institutionStats.verifiedSkillsTotal.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">L1 - L4 Credentials</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-xs text-slate-400">Internship Apps</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {institutionStats.internshipApplications}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
              +24% YoY Inflow
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400">Placement Readiness</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
              {institutionStats.placementReadiness.ready}%
            </div>
            <span className="text-[11px] text-emerald-300 font-semibold mt-0.5 block">
              72% Immediate Fit
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Department Cohort Readiness & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Department Cohort Readiness Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Department Placement Readiness
                </h2>
                <p className="text-xs text-slate-500">
                  Benchmarked by verified skill test thresholds
                </p>
              </div>
              <Link
                to="/institution/placement-readiness"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Readiness Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {institutionStats.departmentDistribution.map((dept, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{dept.name}</span>
                      <span className="text-xs text-slate-500 ml-2">
                        ({dept.students} Students)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-500">Avg Score: {dept.avgScore}%</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {dept.readyPct}% Ready
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${dept.readyPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Industry Demand & Action Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Critical Industry Demand Shortages
                </h3>
                <Link
                  to="/institution/industry-demand"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View Demand
                </Link>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-rose-900 mb-1">
                    <span>Cybersecurity & SOC Operations</span>
                    <span className="text-rose-700">+45% Demand</span>
                  </div>
                  <p className="text-rose-800 text-[11px]">
                    Department skill gap is 23%. Recommend hosting automated SOC test hackathons.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
                    <span>Cloud & DevOps (Kubernetes)</span>
                    <span className="text-amber-700">+34% Demand</span>
                  </div>
                  <p className="text-amber-800 text-[11px]">
                    Student capability is 52% vs industry threshold of 80%.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                    <span>Python & Problem Solving</span>
                    <span className="text-emerald-700">Surplus (+9%)</span>
                  </div>
                  <p className="text-emerald-800 text-[11px]">
                    SRM student average (84%) exceeds corporate hiring baseline (75%).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/institution/skills"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
              >
                <span>Open Skill Mapping Radar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
