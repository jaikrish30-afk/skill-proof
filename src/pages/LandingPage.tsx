import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Building2,
  School,
  FileCheck,
  Target,
  BarChart3,
  Video,
  Layers,
  Code2,
  Cpu,
  Compass,
  Check,
  XCircle,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, startDemoTour } = useApp();
  const navigate = useNavigate();

  const handleQuickRole = (role: 'student' | 'company' | 'institution') => {
    setRole(role);
    if (role === 'student') navigate('/student/dashboard');
    if (role === 'company') navigate('/company/dashboard');
    if (role === 'institution') navigate('/institution/dashboard');
  };

  const handleStartDemo = () => {
    startDemoTour();
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top theme banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs sm:text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Portal for Academia–Industry Collaboration & Evidence Mapping</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.1] mb-6">
              Track Internships.{' '}
              <span className="text-amber-400 block sm:inline">
                Prove Real Skills.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              InterTrack connects ambitious students with verified tech internships through multi-language
              cloud compilers, real-time AI copilot guidance, and authentic Level 1-4 technical defenses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/student/internships"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <span>Search Internships</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/student/compiler"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-base border border-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                <Code2 className="w-5 h-5 text-amber-300" />
                <span>Try Online Compiler</span>
              </Link>

              <Link
                to="/feedback"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-stone-850 hover:bg-stone-800 text-amber-300 font-semibold text-base border border-amber-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <span>Customer Reviews</span>
              </Link>
            </div>

            {/* Quick Portal Switcher Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
              <span className="font-medium">Direct Demo Logins:</span>
              <button
                onClick={() => handleQuickRole('student')}
                className="px-3 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Student (Jai Krish)</span>
              </button>
              <button
                onClick={() => handleQuickRole('company')}
                className="px-3 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Company (SecureTech)</span>
              </button>
              <button
                onClick={() => handleQuickRole('institution')}
                className="px-3 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700 hover:bg-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <School className="w-3.5 h-3.5 text-amber-400" />
                <span>Institution (SRM IST)</span>
              </button>
            </div>
          </div>

          {/* Hero Visual: Modern Interactive Dashboard Preview */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="rounded-xl bg-stone-950 border border-stone-800 p-4 sm:p-6 overflow-hidden">
              {/* Fake window top bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-stone-700" />
                  <div className="w-3 h-3 rounded-full bg-stone-700" />
                  <div className="w-3 h-3 rounded-full bg-stone-700" />
                  <span className="ml-2 text-xs font-mono text-stone-400">
                    intertrack.io/student/evidence-profile/jaikrish
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-400 text-xs font-medium flex items-center gap-1 border border-stone-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    InterTrack Verified
                  </span>
                </div>
              </div>

              {/* Dashboard Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Score Card */}
                <div className="p-4 rounded-lg bg-stone-900 border border-stone-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-400">Skill Confidence Score</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-bold text-white">78%</div>
                    <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      5 of 8 Skills Evidence-Verified
                    </div>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-600 h-full w-[78%]" />
                  </div>
                </div>

                {/* Verified Skills Breakdown */}
                <div className="p-4 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-xs font-medium text-stone-400 block mb-2">
                    Demonstrated Skills
                  </span>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
                        <span className="flex items-center gap-1">
                          Python <span className="text-[10px] text-amber-400 font-semibold">L3</span>
                        </span>
                        <span className="text-stone-300 font-semibold">84%</span>
                      </div>
                      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-500 h-full w-[84%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
                        <span className="flex items-center gap-1">
                          Cybersecurity <span className="text-[10px] text-amber-400 font-semibold">L2</span>
                        </span>
                        <span className="text-stone-300 font-semibold">76%</span>
                      </div>
                      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-500 h-full w-[76%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
                        <span className="flex items-center gap-1">
                          Web Dev <span className="text-[10px] text-amber-400 font-semibold">L3</span>
                        </span>
                        <span className="text-stone-300 font-semibold">71%</span>
                      </div>
                      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-500 h-full w-[71%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industry Match Card */}
                <div className="p-4 rounded-lg bg-stone-900 border border-stone-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-400">Industry Opportunity Match</span>
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mt-2">Cybersecurity Intern</div>
                    <div className="text-xs text-stone-400">SecureTech Solutions</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700">
                      <span className="text-emerald-400">82% Match</span>
                      <span className="text-[10px] text-stone-400 font-normal">| Gap: SIEM</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-2">
                    ✓ Coding Test passed (85%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section (Students / Industry / Institutions) */}
      <section className="py-20 bg-white" id="for-students">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Built for the Entire Talent Ecosystem
            </h2>
            <p className="text-stone-600 text-base sm:text-lg mt-4">
              Bridging Students, Academicians and Industry for Skill Mapping, Internships and Placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Role Card */}
            <div className="rounded-xl p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  For Students
                </span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3 font-display">
                  Build a Verified Skill Profile
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  "Build a verified skill profile and discover opportunities." Upload your resume,
                  take automated coding assessments, link real project repositories, and prove what
                  you can build.
                </p>
                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    <span>Automated AI Skill Extraction from Resumes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    <span>4-Tier Skill Verification Levels (L1 to L4)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    <span>Smart Match % and Personalized Learning Roadmap</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickRole('student')}
                className="w-full py-2.5 rounded-lg bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Industry Role Card */}
            <div className="rounded-xl p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between group" id="for-companies">
              <div>
                <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  For Industry
                </span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3 font-display">
                  Hire Job-Ready Talent
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  "Find job-ready talent based on demonstrated skills." Filter candidates by proven
                  assessment scores, inspect real project code, and schedule interviews seamlessly.
                </p>
                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-stone-800" />
                    <span>Evidence-backed candidate discovery matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-stone-800" />
                    <span>Transparent "Why candidate matched" breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-stone-800" />
                    <span>Direct interview pipeline & scheduling suite</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickRole('company')}
                className="w-full py-2.5 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Company Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Institution Role Card */}
            <div className="rounded-xl p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between group" id="for-institutions">
              <div>
                <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-6">
                  <School className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  For Institutions
                </span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3 font-display">
                  Close Student Skill Gaps
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  "Track skill gaps and improve placement readiness." Real-time analytics
                  comparing department capability against live market requirements.
                </p>
                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Department-level skill distribution & gap heatmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Placement readiness buckets (Ready / Needs Training)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-time Industry Demand benchmarking</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickRole('institution')}
                className="w-full py-2.5 rounded-lg bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Institution Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* "How InterTrack Works" 5-Step Pipeline */}
      <section className="py-20 bg-stone-950 text-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-wider border border-stone-700">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 font-display">
              How InterTrack Works
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3">
              From static resume to verified evidence and industry placement in 5 continuous steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: '01',
                title: 'Upload Resume',
                desc: 'Upload PDF/DOC resume. The platform parses raw experience into structured technical data.',
                icon: FileCheck,
              },
              {
                num: '02',
                title: 'Discover Skills',
                desc: 'Extracts skills, project stacks, and historical certifications automatically.',
                icon: Layers,
              },
              {
                num: '03',
                title: 'Prove Skills',
                desc: 'Take timed coding challenges, submit GitHub repositories, and answer technical assessments.',
                icon: Code2,
              },
              {
                num: '04',
                title: 'Get Verified',
                desc: 'Receive Level 1 to Level 4 verifiable cryptographic badges on your InterTrack profile.',
                icon: ShieldCheck,
              },
              {
                num: '05',
                title: 'Match With Industry',
                desc: 'Get matched with top internships, view skill gaps, and receive direct interview invites.',
                icon: Target,
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between hover:border-stone-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold font-mono text-amber-400">
                        {step.num}
                      </span>
                      <div className="p-2 rounded-lg bg-stone-800 text-stone-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Core Platform Capabilities
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3">
              Purpose-built tools designed to replace resume guessing with measurable proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Resume Skill Extraction',
                desc: 'Instant structured extraction of programming languages, tools, frameworks, and projects from PDF/DOCX files.',
                icon: FileCheck,
                badge: 'Extraction Engine',
              },
              {
                title: 'Practical Assessments',
                desc: 'Real code editor environment with automated unit tests, time complexity metrics, and anti-cheat timers.',
                icon: Code2,
                badge: 'Hands-on Coding',
              },
              {
                title: 'Skill Verification',
                desc: '4-tier evidence validation: Knowledge MCQs, Practical Coding, Project Repositories, and Technical Defenses.',
                icon: ShieldCheck,
                badge: 'Core Differentiator',
              },
              {
                title: 'Industry Matching',
                desc: 'Smart algorithm comparing candidate verified scores against exact corporate internship requirements.',
                icon: Target,
                badge: 'Smart Placement',
              },
              {
                title: 'Interview Management',
                desc: 'Unified stages from Resume Screening to Technical & HR interviews with live integrated rooms.',
                icon: Video,
                badge: 'Recruiter Suite',
              },
              {
                title: 'Skill Gap Analysis',
                desc: 'Visual radar and bar comparisons pinpointing missing prerequisites alongside personalized roadmaps.',
                icon: Compass,
                badge: 'Learning Roadmap',
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-stone-100 text-brand-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 font-display">{feat.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Differentiator: Traditional Resume vs InterTrack */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Why InterTrack Matters
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2 font-display">
              Traditional Resume vs. InterTrack
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              See the fundamental shift from claims to demonstrable evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Resume */}
            <div className="p-8 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Traditional Recruitment
                  </span>
                  <XCircle className="w-5 h-5 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 font-display">
                  "I know Python."
                </h3>
                <div className="p-4 rounded-lg bg-white border border-stone-200 text-xs text-stone-600 space-y-2 mb-6 font-mono">
                  <div>• Skills: Python, SQL, React, Cloud</div>
                  <div>• Unverified bullet points</div>
                  <div>• Keyword matching only</div>
                  <div>• High rate of false-positive hires</div>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Companies have no reliable verification until after multiple screening rounds,
                  leading to wasted interview hours and unqualified applicants.
                </p>
              </div>
            </div>

            {/* InterTrack */}
            <div className="p-8 rounded-xl bg-stone-900 text-white border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                    InterTrack Evidence Standard
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  "I demonstrated Python through tests & projects."
                </h3>
                <div className="p-4 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-200 space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Scored 85% in Algorithmic Coding Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Verified AI Dental Scanner & SCADA Repositories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Level 3 Evidence Authenticated by Institution</span>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Recruiters hire with total confidence based on authentic, demonstrated capability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong Final CTA */}
      <section className="py-20 bg-stone-900 text-white border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-stone-800 text-amber-400 mb-6 border border-stone-700">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-display tracking-tight leading-tight mb-4">
            Your resume tells your story.
            <br />
            <span className="text-amber-400">Your InterTrack proves it.</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Join thousands of students, top universities, and high-growth technology companies
            building the future of evidence-backed talent matching.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={handleStartDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-base border border-stone-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Launch Guided Demo Tour</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white font-display">
              Inter<span className="text-brand-400">Track</span>
            </span>
          </div>
          <p className="text-xs text-stone-500 text-center sm:text-left">
            Evidence-Based Skill & Internship Platform. Bridging Students, Academicians, and Industry.
          </p>
          <div className="text-xs text-stone-500">
            © 2026 InterTrack Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
