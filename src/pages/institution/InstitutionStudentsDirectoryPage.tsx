import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Users, Search, ShieldCheck, CheckCircle2, TrendingUp, ArrowRight, School } from 'lucide-react';
import { VerificationBadge } from '../../components/common/VerificationBadge';

export const InstitutionStudentsDirectoryPage: React.FC = () => {
  const { candidatesPool } = useApp();
  const [search, setSearch] = useState('');

  const filtered = candidatesPool.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Student Cohort Evidence Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          SRM IST Student Talent Cohort
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Search and verify student capability portfolios across all 5 engineering departments.
        </p>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-card-subtle flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student name or department..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {candidatesPool.length} Verified Cohorts
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Department & Year</th>
                <th className="px-6 py-4">InterTrack Score</th>
                <th className="px-6 py-4">Assessment</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <div className="font-bold text-slate-900 font-display">{s.name}</div>
                        <div className="text-[11px] text-slate-400">{s.college}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {s.department} • {s.year}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-700">
                    {s.skillMatch}%
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-800">{s.assessmentScore}%</td>
                  <td className="px-6 py-4">
                    <VerificationBadge
                      verified={s.verificationStatus === 'Verified'}
                      level={s.verificationStatus === 'Verified' ? 3 : 1}
                      size="sm"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/company/candidates/${s.id}`}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      Audit Proof →
                    </Link>
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
