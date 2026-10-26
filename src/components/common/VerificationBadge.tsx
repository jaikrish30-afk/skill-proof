import React from 'react';
import { ShieldCheck, ShieldAlert, Award, CheckCircle2, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  verified: boolean;
  level?: 1 | 2 | 3 | 4;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verified,
  level = 1,
  showLevel = true,
  size = 'md',
}) => {
  const levelLabels = {
    1: 'L1: Knowledge',
    2: 'L2: Practical Test',
    3: 'L3: Project Evidence',
    4: 'L4: Interview Proved',
  };

  const levelDescriptions = {
    1: 'Validated via foundational MCQs & knowledge tests',
    2: 'Validated via timed coding challenge & automated test cases',
    3: 'Validated via code repository, architecture, and live projects',
    4: 'Validated via live technical defense and company interview',
  };

  if (!verified) {
    return (
      <span
        title="Unverified - Take assessment or submit project evidence"
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${
          size === 'sm'
            ? 'px-2 py-0.5 text-xs'
            : size === 'lg'
            ? 'px-3.5 py-1.5 text-sm'
            : 'px-2.5 py-1 text-xs'
        }`}
      >
        <ShieldAlert className={size === 'sm' ? 'w-3 h-3 text-amber-500' : 'w-3.5 h-3.5 text-amber-500'} />
        <span>Not Verified</span>
      </span>
    );
  }

  return (
    <div className="group relative inline-flex items-center">
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm shadow-emerald-500/10 transition-all ${
          size === 'sm'
            ? 'px-2 py-0.5 text-xs'
            : size === 'lg'
            ? 'px-3.5 py-1.5 text-sm'
            : 'px-2.5 py-1 text-xs'
        }`}
      >
        <ShieldCheck className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-emerald-600 fill-emerald-100`} />
        <span>Verified</span>
        {showLevel && (
          <span className="bg-emerald-600 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold tracking-wider uppercase">
            L{level}
          </span>
        )}
      </span>

      {/* Tooltip */}
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-30 pointer-events-none border border-slate-700">
        <div className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
          <Award className="w-3.5 h-3.5" />
          {levelLabels[level]}
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          {levelDescriptions[level]}
        </p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
};

export const VerificationLevelProgress: React.FC<{ currentLevel: 1 | 2 | 3 | 4; verified: boolean }> = ({
  currentLevel,
  verified,
}) => {
  const levels = [
    { num: 1, title: 'Knowledge', desc: 'MCQs & Fundamentals' },
    { num: 2, title: 'Practical', desc: 'Coding & Hands-on Tests' },
    { num: 3, title: 'Project', desc: 'Real-world Repositories' },
    { num: 4, title: 'Interview', desc: 'Industry Tech Defense' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pt-2">
      {levels.map((lvl) => {
        const isCompleted = verified && currentLevel >= lvl.num;
        const isCurrent = verified && currentLevel === lvl.num;

        return (
          <div
            key={lvl.num}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              isCompleted
                ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                : 'bg-slate-50/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {lvl.num}
                </div>
              )}
            </div>
            <div className={`text-xs font-bold ${isCompleted ? 'text-emerald-900' : 'text-slate-600'}`}>
              L{lvl.num}: {lvl.title}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 leading-tight hidden sm:block">
              {lvl.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
};
