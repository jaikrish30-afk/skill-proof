import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Calendar,
  ArrowRight,
  TrendingUp,
  FileText,
  Video,
  Clock,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Target,
  Zap,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { studentProfile, skills, opportunities, assessments, applications, interviews, startDemoTour } = useApp();
  const navigate = useNavigate();

  const verifiedSkillsCount = skills.filter((s) => s.verified).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Welcome Card */}
      <div className="rounded-2xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold mb-3 border border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Evidence-Backed Talent Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Welcome back, {studentProfile.name}!
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-1.5 max-w-2xl">
              Here's your InterTrack journey overview. Your verified evidence matches 82% with
              active industry cybersecurity roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/student/resume"
              className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Resume</span>
            </Link>
            <Link
              to="/student/assessments/assess-python"
              className="px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Take Assessment</span>
            </Link>
          </div>
        </div>

        {/* Top 5 Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8 pt-6 border-t border-stone-800">
          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800 border border-stone-700">
            <div className="text-xs text-stone-400 font-medium">Overall Skill Score</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              {studentProfile.overallScore}%
            </div>
            <div className="text-[11px] text-amber-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Top 8% in Cohort</span>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800 border border-stone-700">
            <div className="text-xs text-stone-400 font-medium">Verified Skills</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono mt-1">
              {verifiedSkillsCount}/{skills.length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Level 1 - Level 4</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800 border border-stone-700">
            <div className="text-xs text-stone-400 font-medium">Assessments Done</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              {studentProfile.assessmentsCompleted}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">100% Pass Rate</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800 border border-stone-700">
            <div className="text-xs text-stone-400 font-medium">Applications</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              {applications.length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Active Pipeline</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-800 border border-stone-700 col-span-2 sm:col-span-1">
            <div className="text-xs text-stone-400 font-medium">Interviews</div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-400 font-mono mt-1">
              {interviews.length}
            </div>
            <div className="text-[11px] text-stone-300 font-semibold mt-1">1 Technical Scheduled</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Skills Matrix + Recommended Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Your Skills Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Your Skills</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Demonstrated confidence scores with verification level proof.
                </p>
              </div>
              <Link
                to="/student/skills"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View All Proofs</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {skills.slice(0, 6).map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-sm font-black font-mono text-brand-600">
                        {skill.confidenceScore}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          skill.confidenceScore >= 80
                            ? 'bg-brand-600'
                            : skill.confidenceScore >= 70
                            ? 'bg-brand-500'
                            : 'bg-stone-400'
                        }`}
                        style={{ width: `${skill.confidenceScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3 justify-between sm:justify-end">
                    <VerificationBadge
                      verified={skill.verified}
                      level={skill.verificationLevel}
                      size="sm"
                    />
                    <Link
                      to="/student/skills"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-white transition-colors"
                      title="Inspect Evidence"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Ready to prove more skills?</span>
              <Link
                to="/student/assessments"
                className="font-bold text-brand-600 hover:underline flex items-center gap-1"
              >
                <span>Take Live Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Upcoming Assessments Section */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Upcoming Assessments</h3>
                <p className="text-xs text-slate-500">
                  Prove your skills with practical tests to elevate your match score.
                </p>
              </div>
              <Link
                to="/student/assessments"
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                      Coding Test
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">30 mins</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Python Coding Test</h4>
                  <p className="text-[11px] text-slate-500 mb-4">
                    5 Algorithmic challenges & automated test cases.
                  </p>
                </div>
                <Link
                  to="/student/assessments/assess-python"
                  className="w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>Launch Test (85%)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">
                      Technical
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">45 mins</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Cybersecurity Exam</h4>
                  <p className="text-[11px] text-slate-500 mb-4">
                    Threat modeling, CVEs & SOC protocols.
                  </p>
                </div>
                <Link
                  to="/student/assessments"
                  className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs text-center transition-colors"
                >
                  View Details
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Soft Skills
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">25 mins</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Communication Test</h4>
                  <p className="text-[11px] text-slate-500 mb-4">
                    Workplace scenarios & team defense.
                  </p>
                </div>
                <Link
                  to="/student/assessments"
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs text-center transition-colors"
                >
                  Completed (72%)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Recommended Opportunities & Scheduled Interviews */}
        <div className="space-y-6">
          {/* Recommended Opportunities */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Recommended Roles
                </h3>
                <p className="text-xs text-slate-500">Matched to your verified skill profile</p>
              </div>
              <Link
                to="/student/opportunities"
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                All (4)
              </Link>
            </div>

            <div className="space-y-3.5">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-xl border border-stone-200 hover:border-stone-400 transition-colors flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {opp.company}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{opp.location}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200 font-mono font-bold text-xs">
                        {opp.matchPercentage}% Match
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[11px] font-medium text-slate-500">
                      Req: {opp.requiredSkills.map((r) => r.name).slice(0, 3).join(', ')}
                    </span>
                    <Link
                      to={`/student/opportunities/${opp.id}`}
                      className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <span>Match Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interview Card */}
          <div className="bg-stone-900 text-white rounded-xl p-6 border border-stone-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                Live Interview Scheduled
              </span>
              <span className="text-xs text-stone-400">Tomorrow</span>
            </div>

            <h4 className="text-base font-bold text-white font-display">
              Technical Defense Round
            </h4>
            <p className="text-xs text-stone-300 mt-0.5">
              SecureTech Solutions • Cybersecurity Intern
            </p>

            <div className="p-3 rounded-lg bg-stone-800 border border-stone-700 mt-4 text-xs text-stone-300 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Interviewer:</span>
                <span className="font-semibold text-white">Vikram Malhotra (Lead)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Time:</span>
                <span className="font-semibold text-amber-400">3:30 PM IST (60m)</span>
              </div>
            </div>

            <Link
              to="/student/interviews"
              className="mt-4 w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Interview Room</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
