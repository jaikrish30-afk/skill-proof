import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Send,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Video,
} from 'lucide-react';

export const ApplicationsTrackingPage: React.FC = () => {
  const { applications } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Technical Interview':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Shortlisted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Selected':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-blue-50 text-brand-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200 mb-2">
          <Send className="w-3.5 h-3.5" />
          <span>Application Pipeline Tracker</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          My Applications
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Monitor your active applications, match benchmarks, and upcoming recruiter rounds.
        </p>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Company & Role</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">InterTrack Match</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 font-display">{app.role}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.company}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                    {app.appliedDate}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {app.matchScore}% Match
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{app.status}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {app.status === 'Technical Interview' ? (
                      <Link
                        to="/student/interviews"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Room</span>
                      </Link>
                    ) : (
                      <Link
                        to={`/student/opportunities/${app.opportunityId}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700"
                      >
                        View Details
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
