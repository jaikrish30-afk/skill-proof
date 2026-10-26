import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Award, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';

export const InstitutionAssessmentsPage: React.FC = () => {
  const { assessments } = useApp();

  const assessmentStats = [
    { title: 'Python Algorithmic Test', completions: 1420, avgScore: '84.2%', passRate: '92%' },
    { title: 'Cybersecurity Assessment', completions: 840, avgScore: '76.8%', passRate: '86%' },
    { title: 'Full Stack Web Benchmark', completions: 1100, avgScore: '78.5%', passRate: '88%' },
    { title: 'Networking Architecture', completions: 920, avgScore: '69.4%', passRate: '74%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Institutional Assessment Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Standardized Skill Testing Analytics
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Monitor participation rates, test score distributions, and accreditation credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {assessmentStats.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Department Core Benchmark
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-2">{item.title}</h3>

              <div className="grid grid-cols-3 gap-3 my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-500">Completions</span>
                  <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                    {item.completions}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Avg Score</span>
                  <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">
                    {item.avgScore}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Pass Rate</span>
                  <div className="text-lg font-bold font-mono text-indigo-700 mt-0.5">
                    {item.passRate}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Status: Active Testing Node</span>
              <span className="text-emerald-700 font-bold">Auto-Graded ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
