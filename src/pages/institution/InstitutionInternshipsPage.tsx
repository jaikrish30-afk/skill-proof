import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Building2, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const InstitutionInternshipsPage: React.FC = () => {
  const { opportunities } = useApp();

  const companyPartners = [
    { name: 'SecureTech Solutions', activeHires: 14, roles: 'Cybersecurity Intern, SOC Analyst' },
    { name: 'CodeLabs Inc.', activeHires: 22, roles: 'Full Stack React & Node Intern' },
    { name: 'DataNova Analytics', activeHires: 18, roles: 'AI/ML Research Intern' },
    { name: 'CloudSphere Tech', activeHires: 9, roles: 'Cloud Infrastructure & DevOps' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Academia-Industry Placement Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Corporate Internship Partnerships
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Tracking corporate placement quotas, active candidate applications, and MOU compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {companyPartners.map((comp, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Verified Industry Partner
                </span>
                <span className="font-mono text-xs font-bold text-slate-700">
                  {comp.activeHires} Hires This Season
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-display mb-1">{comp.name}</h3>
              <p className="text-xs text-slate-500 mb-4">Sourcing roles: {comp.roles}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">InterTrack Integration: Active</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span>View Applicants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
