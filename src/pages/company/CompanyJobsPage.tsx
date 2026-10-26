import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Users,
  MapPin,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CompanyJobsPage: React.FC = () => {
  const { opportunities } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Corporate Job Roles Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Active Job Opportunities
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Manage your corporate talent postings and monitor evidence-backed applicant pools.
          </p>
        </div>

        <Link
          to="/company/jobs/create"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Role</span>
        </Link>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:shadow-card-elevated hover:border-indigo-300 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {job.postedDate}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  {job.isOpen ? 'Active Hiring' : 'Closed'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {job.location} • {job.workMode} ({job.type})
                  </span>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {job.requiredSkills.map((req, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200"
                  >
                    {req.name} (&gt;{req.requiredScore}%)
                  </span>
                ))}
              </div>

              {/* Applicants Count Metric */}
              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Verified Inflows:
                </span>
                <span className="font-mono font-bold text-indigo-900">
                  {job.applicantsCount || 48} Candidates
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Min Score: {job.minScore}%</span>

              <Link
                to="/company/applicants"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>Filter Candidates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
