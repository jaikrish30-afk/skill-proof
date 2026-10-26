import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface TourStepInfo {
  step: number;
  title: string;
  desc: string;
  role: 'student' | 'company' | 'institution';
  route: string;
  actionHint: string;
}

export const demoSteps: TourStepInfo[] = [
  {
    step: 1,
    title: '1. Student Login & Overview',
    desc: 'Jai Krish logs in and reviews his InterTrack score (78%), verified skills, and stats.',
    role: 'student',
    route: '/student/dashboard',
    actionHint: 'Review Jai Krish’s stats on the Student Dashboard.',
  },
  {
    step: 2,
    title: '2. Student Opens Skill Profile',
    desc: 'Inspects 4-tier verification levels and evidence-backed skill confidence scores.',
    role: 'student',
    route: '/student/profile',
    actionHint: 'View the Skill Confidence radial card and 4-tier proof breakdown.',
  },
  {
    step: 3,
    title: '3. Upload Resume for Analysis',
    desc: 'Upload a sample PDF/DOCX resume to trigger AI Skill & Project extraction.',
    role: 'student',
    route: '/student/resume',
    actionHint: 'Click "Analyze & Extract Skills" on the sample resume.',
  },
  {
    step: 4,
    title: '4. AI Skill Extraction & Confirmation',
    desc: 'System parses Python (92%), Web Dev (85%), Cybersecurity (78%), and saves to profile.',
    role: 'student',
    route: '/student/resume',
    actionHint: 'Click "Confirm & Save Skills to InterTrack".',
  },
  {
    step: 5,
    title: '5. Take Python Coding Assessment',
    desc: 'Student launches the timed Python Coding Test with live test cases.',
    role: 'student',
    route: '/student/assessments/assess-python',
    actionHint: 'Explore code editor, run test cases, and click "Submit Assessment".',
  },
  {
    step: 6,
    title: '6. Assessment Result (85% Passed)',
    desc: 'System grades correctness (90%), code quality (80%), efficiency (75%).',
    role: 'student',
    route: '/student/assessments/assess-python',
    actionHint: 'Review assessment scorecard and skill verification confirmation.',
  },
  {
    step: 7,
    title: '7. Python Becomes Level 3 Verified',
    desc: 'Python skill is now backed by coding test and project evidence.',
    role: 'student',
    route: '/student/skills',
    actionHint: 'Check the glowing Verified badge and Level 3 evidence history.',
  },
  {
    step: 8,
    title: '8. Explore Opportunities',
    desc: 'Student looks at matched internships & full-time roles.',
    role: 'student',
    route: '/student/opportunities',
    actionHint: 'Locate "Cybersecurity Intern" at SecureTech Solutions (82% Match).',
  },
  {
    step: 9,
    title: '9. Smart Match Breakdown (82%)',
    desc: 'System compares student skills against job criteria and spots gap in SIEM.',
    role: 'student',
    route: '/student/opportunities/opp-cybersecurity-intern',
    actionHint: 'Inspect the Required Skill vs Your Skill comparison bar charts.',
  },
  {
    step: 10,
    title: '10. Skill-Gap Identification',
    desc: 'SIEM and Cloud Security are flagged as missing for 95%+ match.',
    role: 'student',
    route: '/student/opportunities/opp-cybersecurity-intern',
    actionHint: 'Click "Improve Match with Learning Roadmap".',
  },
  {
    step: 11,
    title: '11. Personalized Learning Roadmap',
    desc: 'Student follows 5 tailored modules to bridge SIEM and SOC skills.',
    role: 'student',
    route: '/student/roadmap',
    actionHint: 'Toggle roadmap milestones from In Progress to Completed.',
  },
  {
    step: 12,
    title: '12. Company Portal (SecureTech)',
    desc: 'Recruiter switches to Company Dashboard to manage hiring pipeline.',
    role: 'company',
    route: '/company/dashboard',
    actionHint: 'Review active job openings and candidate funnel stages.',
  },
  {
    step: 13,
    title: '13. Candidate Discovery Filter',
    desc: 'Company searches talent pool by verified skills, minimum score, and college.',
    role: 'company',
    route: '/company/applicants',
    actionHint: 'Filter by "Python" & "Cybersecurity" with Verified status.',
  },
  {
    step: 14,
    title: '14. Jai Krish Appears as Top Match',
    desc: 'Recruiter discovers Jai Krish (82% match, 88% assessment score, Qualified).',
    role: 'company',
    route: '/company/applicants',
    actionHint: 'Click "View InterTrack" on Jai Krish K R.',
  },
  {
    step: 15,
    title: '15. Candidate InterTrack Evidence',
    desc: 'Company verifies real code repos, assessment transcripts, and match scores.',
    role: 'company',
    route: '/company/candidates/student-jai-krish',
    actionHint: 'Check the "Why this candidate matched" and repository evidence.',
  },
  {
    step: 16,
    title: '16. Schedule Technical Interview',
    desc: 'Company schedules live technical round with principal architect.',
    role: 'company',
    route: '/company/candidates/student-jai-krish',
    actionHint: 'Click "Schedule Technical Interview" button in top right.',
  },
  {
    step: 17,
    title: '17. Academia-Industry Collaboration',
    desc: 'Institution tracks department skill gaps, industry demand, & placement readiness.',
    role: 'institution',
    route: '/institution/dashboard',
    actionHint: 'Review SRM IST skill mapping vs Industry demand analytics!',
  },
];

export const DemoTourBar: React.FC = () => {
  const {
    isDemoTourActive,
    demoTourStep,
    nextDemoStep,
    prevDemoStep,
    stopDemoTour,
    jumpToDemoStep,
    setRole,
    role: currentRole,
  } = useApp();
  const navigate = useNavigate();

  if (!isDemoTourActive) return null;

  const currentStepData = demoSteps[demoTourStep - 1] || demoSteps[0];

  const handleStepNavigation = (stepNum: number) => {
    const target = demoSteps[stepNum - 1];
    if (!target) return;

    jumpToDemoStep(stepNum);
    if (currentRole !== target.role) {
      setRole(target.role);
    }
    navigate(target.route);
  };

  const handleNext = () => {
    if (demoTourStep < 17) {
      const nextStep = demoTourStep + 1;
      const target = demoSteps[nextStep - 1];
      jumpToDemoStep(nextStep);
      if (currentRole !== target.role) {
        setRole(target.role);
      }
      navigate(target.route);
    } else {
      stopDemoTour();
    }
  };

  const handlePrev = () => {
    if (demoTourStep > 1) {
      const prevStep = demoTourStep - 1;
      const target = demoSteps[prevStep - 1];
      jumpToDemoStep(prevStep);
      if (currentRole !== target.role) {
        setRole(target.role);
      }
      navigate(target.route);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Step badge & Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-600 text-white rounded-lg text-xs font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>DEMO FLOW {demoTourStep}/17</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide truncate">
                {currentStepData.title}
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-stone-800 text-brand-300 border border-stone-700">
                {currentStepData.role}
              </span>
            </div>
            <p className="text-[11px] text-stone-300 hidden sm:block truncate">
              {currentStepData.desc}
            </p>
          </div>
        </div>

        {/* Step Progress indicators */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {demoSteps.map((s) => {
            const isActive = s.step === demoTourStep;
            const isPassed = s.step < demoTourStep;
            return (
              <button
                key={s.step}
                onClick={() => handleStepNavigation(s.step)}
                title={s.title}
                className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white ring-2 ring-brand-400'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
              </button>
            );
          })}
        </div>

        {/* Right: Next / Prev Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handlePrev}
            disabled={demoTourStep === 1}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={handleNext}
            className="px-3.5 py-1 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5"
          >
            <span>{demoTourStep === 17 ? 'Finish Demo' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={stopDemoTour}
            title="Exit Demo Tour"
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
