import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Compass,
  ArrowRight,
  Send,
  Building2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { opportunities, skills, applyForOpportunity, applications } = useApp();
  const navigate = useNavigate();

  const opp = opportunities.find((o) => o.id === id) || opportunities[0];
  const isApplied = applications.some((a) => a.opportunityId === opp.id);

  // Compare each required skill against student's actual skill score
  const skillComparisons = opp.requiredSkills.map((req) => {
    const studentSkill = skills.find((s) => s.name.toLowerCase().includes(req.name.toLowerCase()));
    const studentScore = studentSkill ? studentSkill.confidenceScore : 42; // default fallback if missing
    const hasMet = studentScore >= req.requiredScore;
    const isVerified = studentSkill?.verified || false;

    return {
      skill: req.name,
      required: req.requiredScore,
      studentScore,
      hasMet,
      isVerified,
      gap: req.requiredScore - studentScore,
    };
  });

  const matchingSkills = skillComparisons.filter((c) => c.hasMet);
  const gapSkills = skillComparisons.filter((c) => !c.hasMet);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Role Overview */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>InterTrack Smart Match Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              {opp.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300">
              <span className="font-bold text-white flex items-center gap-1">
                <Building2 className="w-4 h-4 text-amber-400" />
                {opp.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-stone-400" />
                {opp.location} ({opp.workMode})
              </span>
              <span className="text-emerald-400 font-bold">{opp.stipend}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => applyForOpportunity(opp.id)}
              disabled={isApplied}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                isApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-brand-600 hover:bg-brand-700 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isApplied ? 'Application Submitted ✓' : 'Apply with InterTrack'}</span>
            </button>
          </div>
        </div>

        {/* Overall Match Highlight Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-stone-800 border border-stone-700 text-emerald-400 flex items-center justify-center text-2xl font-bold font-mono">
              {opp.matchPercentage}%
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Overall Candidate Match
              </span>
              <p className="text-xs text-stone-300 mt-0.5">
                Qualified for direct recruiter screening based on verified evidence.
              </p>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-wrap gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">{matchingSkills.length} Verified Strengths</strong> (Python, Networking, Linux)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-500/40 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">{gapSkills.length} Actionable Skill Gap:</strong> SIEM Telemetry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Skill vs Requirement Comparison + Learning Roadmap Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Visual Skill Comparison Bars (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Required Skill vs. Your Demonstrated Score
                </h2>
                <p className="text-xs text-slate-500">
                  Direct benchmark comparing corporate threshold against your authenticated evidence
                </p>
              </div>
            </div>

            {/* Comparison Bars */}
            <div className="space-y-6">
              {skillComparisons.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
                      {item.hasMet ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Qualified
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          Gap (-{item.gap}%)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-slate-400">Req: {item.required}%</span>
                      <span
                        className={`font-bold ${
                          item.hasMet ? 'text-brand-600 font-black' : 'text-amber-600'
                        }`}
                      >
                        You: {item.studentScore}%
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar (Required vs You) */}
                  <div className="relative w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                    {/* Required marker line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-700 z-10"
                      style={{ left: `${item.required}%` }}
                      title={`Target Requirement: ${item.required}%`}
                    />
                    {/* Student Progress */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.hasMet
                          ? 'bg-brand-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.studentScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-brand-500" /> Your Verified Score
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-3 bg-slate-700" /> Corporate Min Requirement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Gap Analysis & Roadmap Callout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Skill Gap Analysis Box */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-700 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Identified Skill Gaps
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Closing these 2 areas will boost your placement match from <strong>82%</strong> to{' '}
                <strong>96%</strong>.
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>SIEM & SOC Operations</span>
                    <span className="text-amber-700">Gap: 8%</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Required: 50% • Current: 42% (Needs Splunk / Elastic query lab completion).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>Cloud Security & IAM</span>
                    <span className="text-slate-500">Optional Bonus</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Will elevate priority ranking in recruiter applicant queue.
                  </p>
                </div>
              </div>
            </div>

            {/* Improve Match CTA Button */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/student/roadmap"
                className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Improve Match with Learning Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
