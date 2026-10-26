import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Download, ShieldCheck, CheckCircle2, Award, Printer } from 'lucide-react';

export const InstitutionReportsPage: React.FC = () => {
  const { institutionStats, addToast } = useApp();

  const handleDownloadReport = (name: string) => {
    addToast(`Generating and exporting "${name}" in PDF / CSV format...`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Accreditation & Quality Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Institutional InterTrack Reports
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Official evidence transcripts formatted for NAAC, NBA, and ABET accreditation audits.
          </p>
        </div>

        <button
          onClick={() => handleDownloadReport('Complete Institutional Accreditation Dossier')}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export All Audited Reports</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            title: 'Outcome-Based Education (OBE) Skill Mapping Audit',
            code: 'DOC-OBE-2026-SRM',
            desc: 'Course outcome (CO) vs Program outcome (PO) direct assessment evidence mapping with test performance records.',
            date: 'September 2026',
          },
          {
            title: 'Industry Placement Readiness & Gap Dossier',
            code: 'DOC-PLACE-774-IT',
            desc: 'Comprehensive breakdown of 2,890 assessed students across 5 engineering departments with 72% placement readiness benchmark.',
            date: 'September 2026',
          },
          {
            title: 'Cryptographic Skill Verification Ledger',
            code: 'DOC-BLOCK-LEDGER-99',
            desc: '14,250 verified Level 1 to Level 4 skill certificates issued to graduating students.',
            date: 'August 2026',
          },
          {
            title: 'Corporate Recruiter Sourcing & Feedback Digest',
            code: 'DOC-CORP-SEC-441',
            desc: 'Recruiter feedback metrics from SecureTech Solutions, CodeLabs, and DataNova Analytics.',
            date: 'September 2026',
          },
        ].map((rep, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{rep.code}</span>
                <span className="text-xs text-slate-500">{rep.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">{rep.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{rep.desc}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Validated by Academic Dean
              </span>

              <button
                onClick={() => handleDownloadReport(rep.title)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
