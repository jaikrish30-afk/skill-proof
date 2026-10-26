import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  PlusCircle,
  Briefcase,
  Building2,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const CreateJobPage: React.FC = () => {
  const { addOpportunity, addToast } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('Cybersecurity Threat Analyst Intern');
  const [company, setCompany] = useState('SecureTech Solutions');
  const [location, setLocation] = useState('Chennai, Tamil Nadu');
  const [type, setType] = useState<'Internship' | 'Full-time' | 'Co-op'>('Internship');
  const [workMode, setWorkMode] = useState<'Remote' | 'On-site' | 'Hybrid'>('Hybrid');
  const [stipend, setStipend] = useState('₹35,000 / month');
  const [minScore, setMinScore] = useState(70);
  const [description, setDescription] = useState(
    'Seeking passionate cybersecurity and networking engineers to conduct automated endpoint scanning, triage threat anomalies, and validate SIEM rule playbooks with Python.'
  );
  const [requiredSkillsInput, setRequiredSkillsInput] = useState(
    'Python: 65, Networking: 70, Linux: 65, Cybersecurity: 70, SIEM: 50'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSkills = requiredSkillsInput.split(',').map((item) => {
      const parts = item.split(':');
      const name = parts[0]?.trim() || 'Programming';
      const score = Number(parts[1]?.trim() || 65);
      return { name, requiredScore: score };
    });

    addOpportunity({
      title,
      company,
      companyId: 'comp-securetech',
      companyLogo: '🛡️',
      location,
      type,
      workMode,
      stipend,
      description,
      requiredSkills: parsedSkills,
      minScore,
      matchPercentage: 84,
      departmentTarget: ['Information Technology', 'Computer Science'],
    });

    addToast(`Opportunity "${title}" published to student talent network!`, 'success');
    navigate('/company/jobs');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Talent Requirement Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Create & Publish Job Role
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Define required skills and minimum InterTrack confidence thresholds to automatically
          filter qualified university candidates.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card-subtle">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Employment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Co-op">Co-op Program</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Stipend / Compensation
              </label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Minimum Overall InterTrack Score ({minScore}%)
              </label>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-indigo-600 mt-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Required Skills & Minimum Target Thresholds (Skill: MinScore)
            </label>
            <input
              type="text"
              required
              value={requiredSkillsInput}
              onChange={(e) => setRequiredSkillsInput(e.target.value)}
              placeholder="Python: 65, Networking: 70, Linux: 65, SIEM: 50"
              className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Format: SkillName: Score, SkillName2: Score. Used by AI matcher to calculate gap
              analysis.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Directly integrates into SRM IST, SSN, and partner university placement portals.
            </span>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <span>Publish Opportunity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
