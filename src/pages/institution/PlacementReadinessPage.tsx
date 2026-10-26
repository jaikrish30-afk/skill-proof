import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, CheckCircle2, AlertTriangle, Clock, TrendingUp, ArrowRight, Users, ShieldCheck, Download, Sparkles, GraduationCap } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const PlacementReadinessPage: React.FC = () => {
  const { institutionStats, addToast, candidatesPool } = useApp();
  const [selectedCohortDept, setSelectedCohortDept] = useState<string | null>(null);

  const readiness = institutionStats.placementReadiness;

  const mockCohortStudents = [
    {
      name: 'Jai Krish K R',
      regNo: 'RA2111003010182',
      skillScore: 84,
      status: 'Ready for Placement',
      level: 4,
      skills: ['React', 'Python', 'Computer Vision'],
    },
    {
      name: 'Aarav Nair',
      regNo: 'RA2111003010214',
      skillScore: 78,
      status: 'Ready for Placement',
      level: 3,
      skills: ['Docker', 'FastAPI', 'PostgreSQL'],
    },
    {
      name: 'Pooja Sundaram',
      regNo: 'RA2111003010352',
      skillScore: 68,
      status: 'Needs Lab Training',
      level: 2,
      skills: ['Java Spring', 'AWS Basics'],
    },
    {
      name: 'Karthik Raja',
      regNo: 'RA2111003010488',
      skillScore: 54,
      status: 'Assessment Pending',
      level: 1,
      skills: ['Python Basics', 'SQL'],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>Institutional Placement Index</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Placement Readiness Benchmarks
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Categorization of student cohorts into immediate hiring readiness and intervention
          tracks.
        </p>
      </div>

      {/* 3 Large Category Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Placement Ready */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Tier 1: Placement Ready
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-4xl font-bold text-stone-900 font-mono my-2">
              {readiness.ready}%
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Passed Level 2 practical assessments and validated code repositories. Ready for
              direct corporate interviews.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-emerald-700">
            2,462 Verified Students
          </div>
        </div>

        {/* Needs Training */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Tier 2: Needs Training
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-4xl font-bold text-stone-900 font-mono my-2">
              {readiness.needsTraining}%
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Demonstrated theoretical foundation (Level 1) but requires practical coding lab
              reinforcement in SIEM or Cloud.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-amber-700">
            684 Students in Roadmaps
          </div>
        </div>

        {/* Assessment Pending */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Tier 3: Assessment Pending
              </span>
              <Clock className="w-5 h-5 text-stone-400" />
            </div>
            <div className="text-4xl font-bold text-stone-900 font-mono my-2">
              {readiness.pending}%
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enrolled students who have not yet initiated standardized InterTrack coding
              evaluations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-500">
            274 Unassessed Students
          </div>
        </div>
      </div>

      {/* Department Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 font-display">
            Department-Level Readiness Breakdown
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            Click "View Cohort" to inspect candidate rosters
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Total Students</th>
                <th className="px-6 py-4">Readiness %</th>
                <th className="px-6 py-4">Average Skill Score</th>
                <th className="px-6 py-4 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {institutionStats.departmentDistribution.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 font-display">{d.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-600">{d.students}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-700">{d.readyPct}%</span>
                      <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${d.readyPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-800">{d.avgScore}%</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCohortDept(d.name)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors inline-flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>View Cohort</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Details Modal */}
      {selectedCohortDept && (
        <Modal
          isOpen={!!selectedCohortDept}
          onClose={() => setSelectedCohortDept(null)}
          title={`Cohort Roster: ${selectedCohortDept}`}
          subtitle="Real-time InterTrack placement benchmarks and verified status"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-700">Enrolled Students (Sample Preview)</span>
              <button
                onClick={() => addToast(`Exported full CSV report for ${selectedCohortDept}.`, 'success')}
                className="px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {mockCohortStudents.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{st.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{st.regNo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {st.skills.map((sk, sidx) => (
                        <span key={sidx} className="px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-600 border border-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-sm text-emerald-700">{st.skillScore}%</div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        st.status.includes('Ready')
                          ? 'bg-emerald-100 text-emerald-800'
                          : st.status.includes('Training')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  addToast(`Dispatched diagnostic assessment to entire ${selectedCohortDept} cohort.`, 'success');
                  setSelectedCohortDept(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Assign Diagnostic Test to Cohort</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
