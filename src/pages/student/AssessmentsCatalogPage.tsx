import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  Award,
  Zap,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Cpu,
  Brain,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export const AssessmentsCatalogPage: React.FC = () => {
  const { assessments } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Assessments' },
    { id: 'coding', label: 'Coding Challenges', icon: Code2 },
    { id: 'technical', label: 'Technical Tests', icon: Cpu },
    { id: 'aptitude', label: 'Aptitude & Logic', icon: Brain },
    { id: 'soft_skills', label: 'Soft Skills', icon: MessageSquare },
  ];

  const filtered =
    selectedCategory === 'all'
      ? assessments
      : assessments.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200 mb-2">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Automated Evidence Assessment Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Skill Assessments & Coding Tests
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Complete timed technical benchmarks and coding sandboxes to verify your skills at Level 2
          and Level 3.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              selectedCategory === c.id
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.icon && <c.icon className="w-3.5 h-3.5" />}
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((assess) => {
          const isCompleted = assess.status === 'completed';

          return (
            <div
              key={assess.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:shadow-card-elevated hover:border-brand-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {assess.category.replace('_', ' ')}
                  </span>
                  {isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed ({assess.score}%)
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {assess.durationMinutes} mins
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-display mb-2">
                  {assess.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Verifies skill: <strong className="text-slate-800">{assess.skillName}</strong> • {assess.questionCount} Questions
                </p>

                {isCompleted && assess.breakdown && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Correctness:</span>
                      <span className="font-bold text-slate-900">{assess.breakdown.correctness}%</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Code Quality:</span>
                      <span className="font-bold text-slate-900">{assess.breakdown.codeQuality}%</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Efficiency:</span>
                      <span className="font-bold text-slate-900">{assess.breakdown.efficiency}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/student/assessments/${assess.id}`}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Review / Retake Assessment' : 'Start Assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
