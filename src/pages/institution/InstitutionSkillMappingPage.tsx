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
import {
  LineChart,
  Target,
  Award,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  School,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const InstitutionSkillMappingPage: React.FC = () => {
  const { institutionStats, addToast } = useApp();
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engineering');
  const [selectedWorkshopSkill, setSelectedWorkshopSkill] = useState<string | null>(null);

  // Workshop Form State
  const [workshopTitle, setWorkshopTitle] = useState('');
  const [workshopInstructor, setWorkshopInstructor] = useState('Dr. K. Ramanathan (Professor of Practice)');
  const [workshopDuration, setWorkshopDuration] = useState('3-Day Hands-on Bootcamp');
  const [targetBatch, setTargetBatch] = useState('3rd & 4th Year B.Tech CSE');

  const mappingData = institutionStats.departmentSkillMapping;

  const handleOpenWorkshop = (skillName: string) => {
    setSelectedWorkshopSkill(skillName);
    setWorkshopTitle(`Hands-on Industry Workshop: Advanced ${skillName} Mastery`);
  };

  const handleDeployWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`🚀 Lab Workshop "${workshopTitle}" deployed to ${targetBatch}!`, 'success');
    setSelectedWorkshopSkill(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <LineChart className="w-3.5 h-3.5" />
            <span>Curriculum & Industry Skill Mapping</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Department Skill Mapping & Gap Analysis
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Compare actual student capability scores with current industry internship requirements.
          </p>
        </div>

        {/* Department Selector */}
        <div className="w-full sm:w-64">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="Computer Science & Engineering">Computer Science & Eng.</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Cyber Security & Forensics">Cyber Security & Forensics</option>
            <option value="AI & Data Science">AI & Data Science</option>
          </select>
        </div>
      </div>

      {/* Main Comparison Chart: Student Capability vs Industry Requirement */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              {selectedDept}: Capability vs. Industry Demand
            </h2>
            <p className="text-xs text-slate-500">
              Verified cohort test average compared to corporate job thresholds
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <div className="w-3 h-3 rounded bg-emerald-600" /> Student Capability
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <div className="w-3 h-3 rounded bg-slate-700" /> Industry Requirement
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mappingData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="skill" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
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
              <Bar
                dataKey="studentCapability"
                name="Student Capability (%)"
                fill="#059669"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="industryRequirement"
                name="Industry Requirement (%)"
                fill="#334155"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Gaps Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Skill Gap & Intervention Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Priority areas requiring targeted laboratory workshops and coding challenges
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Skill Domain</th>
                <th className="px-6 py-4">Student Avg</th>
                <th className="px-6 py-4">Industry Target</th>
                <th className="px-6 py-4">Gap Status</th>
                <th className="px-6 py-4 text-right">Action Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mappingData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 font-display">
                    {row.skill}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-700">
                    {row.studentCapability}%
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">
                    {row.industryRequirement}%
                  </td>
                  <td className="px-6 py-4">
                    {row.gap > 0 ? (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-rose-200">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        Deficit (-{row.gap}%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Surplus (+{Math.abs(row.gap)}%)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row.gap > 0 ? (
                      <button
                        onClick={() => handleOpenWorkshop(row.skill)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-colors inline-flex items-center gap-1 shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Deploy Lab Workshop</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Maintain Curriculum
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deploy Lab Workshop Modal */}
      {selectedWorkshopSkill && (
        <Modal
          isOpen={!!selectedWorkshopSkill}
          onClose={() => setSelectedWorkshopSkill(null)}
          title={`Deploy Lab Workshop: ${selectedWorkshopSkill}`}
          subtitle="Bridge curriculum deficits with targeted practical lab challenges"
        >
          <form onSubmit={handleDeployWorkshop} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Workshop Module Title
              </label>
              <input
                type="text"
                value={workshopTitle}
                onChange={(e) => setWorkshopTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lead Instructor / Mentor
                </label>
                <input
                  type="text"
                  value={workshopInstructor}
                  onChange={(e) => setWorkshopInstructor(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duration & Format
                </label>
                <input
                  type="text"
                  value={workshopDuration}
                  onChange={(e) => setWorkshopDuration(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Student Cohort
              </label>
              <input
                type="text"
                value={targetBatch}
                onChange={(e) => setTargetBatch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800">
              💡 <strong>Automatic Integration:</strong> All participating students will receive verified InterTrack Level 2 practical credentials upon lab completion.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedWorkshopSkill(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publish & Deploy Workshop</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
