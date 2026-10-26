import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Zap, ArrowRight, Sparkles, Send } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const IndustrySkillDemandPage: React.FC = () => {
  const { institutionStats, addToast } = useApp();
  const [selectedAssessmentSkill, setSelectedAssessmentSkill] = useState<string | null>(null);

  // Deployment Form State
  const [testTitle, setTestTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(15);
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingThreshold, setPassingThreshold] = useState(70);

  const handleOpenDeployModal = (skillName: string) => {
    setSelectedAssessmentSkill(skillName);
    setTestTitle(`Standardized InterTrack Diagnostic: ${skillName} Industry Benchmark`);
  };

  const handleDeployAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      `🎯 Assessment "${testTitle}" deployed to 1,200+ students with automated proctoring enabled!`,
      'success'
    );
    setSelectedAssessmentSkill(null);
  };

  const chartData = [
    { skill: 'Python', industryDemand: 142, studentSupply: 160 },
    { skill: 'Cybersecurity', industryDemand: 128, studentSupply: 65 },
    { skill: 'Cloud & K8s', industryDemand: 115, studentSupply: 52 },
    { skill: 'React / Next', industryDemand: 98, studentSupply: 110 },
    { skill: 'AI/ML Vision', industryDemand: 94, studentSupply: 70 },
    { skill: 'SQL & Data', industryDemand: 86, studentSupply: 105 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Macro Hiring Demand Pulse</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Industry Skill Demand & Sourcing Trends
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Real-time aggregation of required skill competencies across 140+ corporate internship
          postings.
        </p>
      </div>

      {/* Demand vs Supply Visual Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Market Demand vs. Student Capability Supply
            </h2>
            <p className="text-xs text-slate-500">
              Identifying severe talent shortage domains for fast-track curriculum updates
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <div className="w-3 h-3 rounded bg-indigo-600" /> Industry Demand
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <div className="w-3 h-3 rounded bg-emerald-600" /> Student Supply Pool
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="skill" tick={{ fontSize: 11 }} />
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
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="industryDemand" name="Corporate Demand" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="studentSupply" name="Verified Student Supply" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demand Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutionStats.industrySkillDemand.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:border-emerald-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                    item.priority.includes('Shortage')
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : item.priority === 'Critical'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {item.growth} YoY
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-display mb-1">{item.skill}</h3>
              <p className="text-xs text-slate-500 mb-4">
                Required in <strong>{item.demandCount}</strong> active platform job openings.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Curriculum Action:</span>
              <button
                onClick={() => handleOpenDeployModal(item.skill)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors inline-flex items-center gap-1 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deploy Assessment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deploy Assessment Modal */}
      {selectedAssessmentSkill && (
        <Modal
          isOpen={!!selectedAssessmentSkill}
          onClose={() => setSelectedAssessmentSkill(null)}
          title={`Deploy Diagnostic Assessment: ${selectedAssessmentSkill}`}
          subtitle="Publish an automated timed test with live proctoring to all eligible students"
        >
          <form onSubmit={handleDeployAssessment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assessment Title
              </label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Questions
                </label>
                <input
                  type="number"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Time Limit (Min)
                </label>
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pass Threshold (%)
                </label>
                <input
                  type="number"
                  value={passingThreshold}
                  onChange={(e) => setPassingThreshold(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Anti-Cheat Protections Active</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Fullscreen lockdown, tab-switch interception, clipboard block, and webcam streams will be enforced automatically.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAssessmentSkill(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Student Portals</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
