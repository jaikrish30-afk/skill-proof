import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Users, ShieldCheck, Award } from 'lucide-react';

export const CompanyAnalyticsPage: React.FC = () => {
  const universityTalentData = [
    { university: 'SRM IST', candidates: 34, avgScore: 82 },
    { university: 'SSN College', candidates: 22, avgScore: 79 },
    { university: 'Anna Univ (CEG)', candidates: 28, avgScore: 86 },
    { university: 'PSG Tech', candidates: 18, avgScore: 81 },
    { university: 'Vellore Tech', candidates: 25, avgScore: 80 },
  ];

  const skillBenchmarkData = [
    { subject: 'Python', candidateScore: 84, industryBenchmark: 70 },
    { subject: 'Cybersecurity', candidateScore: 76, industryBenchmark: 75 },
    { subject: 'Networking', candidateScore: 82, industryBenchmark: 68 },
    { subject: 'Linux', candidateScore: 72, industryBenchmark: 65 },
    { subject: 'Problem Solving', candidateScore: 85, industryBenchmark: 74 },
    { subject: 'Communication', candidateScore: 72, industryBenchmark: 70 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Talent Analytics & Sourcing Insights</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Corporate Hiring Analytics
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Benchmarking candidate capability pools across partnering academic institutions.
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle">
          <span className="text-xs text-slate-400 font-semibold">Verified Candidate Pool</span>
          <div className="text-3xl font-black text-slate-900 font-mono mt-1">127 Candidates</div>
          <span className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +32% Verified this month
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle">
          <span className="text-xs text-slate-400 font-semibold">Average Code Test Score</span>
          <div className="text-3xl font-black text-indigo-600 font-mono mt-1">81.4%</div>
          <span className="text-xs text-slate-500 mt-1 block">Across 5 partner universities</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle">
          <span className="text-xs text-slate-400 font-semibold">Screening Efficiency Gain</span>
          <div className="text-3xl font-black text-cyan-600 font-mono mt-1">68% Faster</div>
          <span className="text-xs text-slate-500 mt-1 block">Zero resume keyword fraud</span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* University Talent Distribution Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                University Talent Pool Inflow
              </h3>
              <p className="text-xs text-slate-500">
                Number of verified candidates per institution
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={universityTalentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="university" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#fff',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="candidates" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Benchmark Radar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Candidate Cohort vs Industry Average
              </h3>
              <p className="text-xs text-slate-500">
                Multi-domain radar benchmark based on test results
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillBenchmarkData}>
                <PolarGrid stroke="#CBD5E1" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Cohort Score"
                  dataKey="candidateScore"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="industryBenchmark"
                  stroke="#0EA5E9"
                  fill="#0EA5E9"
                  fillOpacity={0.2}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#fff',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
