import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Clock,
  Award,
  Play,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  BookOpen,
  FolderGit2,
} from 'lucide-react';

export const LearningRoadmapPage: React.FC = () => {
  const { roadmap, toggleRoadmapStep } = useApp();

  const completedCount = roadmap.filter((s) => s.status === 'completed').length;
  const progressPct = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Skill Gap Closure</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Your Career Learning Roadmap
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Target Specialization: <strong className="text-amber-400">Cybersecurity Engineer</strong> • Role Match:{' '}
              <strong className="text-emerald-400 font-mono">81%</strong>
            </p>
          </div>

          {/* Roadmap Completion Bar */}
          <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-stone-300">Roadmap Progress</span>
              <span className="text-amber-400 font-mono">{progressPct}%</span>
            </div>
            <div className="w-full bg-stone-700 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400">
              {completedCount} of {roadmap.length} Milestones Cleared
            </span>
          </div>
        </div>

        {/* Missing Skills Warning Pills */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Flagged Gap Areas to Bridge:</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            SIEM & SPL Queries
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
            Cloud Security IAM
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
            Incident Response SOAR
          </span>
        </div>
      </div>

      {/* 5-Step Roadmap Timeline */}
      <div className="space-y-4">
        {roadmap.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <div
              key={step.id}
              className={`p-6 rounded-3xl bg-white border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-sm'
                  : isInProgress
                  ? 'border-brand-400 ring-2 ring-brand-500/20 shadow-card-subtle'
                  : 'border-slate-200 shadow-card-subtle opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {step.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {step.resourceType}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>

                  <div className="text-[11px] font-semibold text-brand-700">
                    Bridges Skill Gap: <strong className="text-slate-900">{step.skillGap}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <button
                  onClick={() => toggleRoadmapStep(step.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : isInProgress
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed ✓</span>
                    </>
                  ) : isInProgress ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Mark Complete</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-brand-600" />
                      <span>Start Module</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
