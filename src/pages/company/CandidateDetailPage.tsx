import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { VerificationBadge, VerificationLevelProgress } from '../../components/common/VerificationBadge';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Video,
  ExternalLink,
  Code2,
  FolderGit2,
  Building2,
  School,
  MapPin,
  TrendingUp,
  Sparkles,
  Send,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { studentProfile, skills, projects, assessments, scheduleInterview, addToast } = useApp();

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [interviewType, setInterviewType] = useState<'Technical' | 'HR'>('Technical');
  const [interviewerName, setInterviewerName] = useState('Vikram Malhotra');
  const [interviewerRole, setInterviewerRole] = useState('Principal Security Architect');
  const [interviewDate, setInterviewDate] = useState('Tomorrow, 3:30 PM IST');
  const [interviewTime, setInterviewTime] = useState('3:30 PM - 4:30 PM (60 mins)');
  const [meetingNotes, setMeetingNotes] = useState(
    'Focus on architectural defense of AI Dental Scanner and CVE scanning methodologies.'
  );

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview({
      title: `${interviewType} Defense: ${studentProfile.name}`,
      company: 'SecureTech Solutions',
      role: 'Cybersecurity Intern',
      date: interviewDate,
      time: interviewTime,
      interviewer: interviewerName,
      interviewerRole,
      platform: 'InterTrack Live Verified Video Room',
      meetingLink: `https://meet.intertrack.dev/room/sec-789-${studentProfile.id}`,
      type: interviewType,
      currentStage: `${interviewType} Interview`,
      stages: [
        { name: 'Resume Screening', status: 'completed' },
        { name: 'InterTrack Assessment (85%)', status: 'completed' },
        { name: 'Technical Interview', status: interviewType === 'Technical' ? 'current' : 'completed' },
        { name: 'HR Interview', status: interviewType === 'HR' ? 'current' : 'pending' },
        { name: 'Final Decision', status: 'pending' },
      ],
      notes: meetingNotes,
    });

    setIsScheduleModalOpen(false);
    addToast(
      `Technical interview scheduled with ${studentProfile.name} on ${interviewDate}!`,
      'success'
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner with Candidate Credentials */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-100 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {studentProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Candidate Profile
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <School className="w-3.5 h-3.5 text-slate-400" />
                {studentProfile.college}
              </span>
              <span className="flex items-center gap-1">
                {studentProfile.department} ({studentProfile.year})
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {studentProfile.location}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2 max-w-2xl">{studentProfile.bio}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Technical Interview</span>
          </button>
        </div>
      </div>

      {/* "Why This Candidate Received 82% Match" Callout */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-7 border border-stone-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              InterTrack Transparent Audit: Why {studentProfile.name} Matched 82%
            </h2>
          </div>
          <span className="font-mono font-bold text-sm text-emerald-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
            82% Role Fit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Exceeded Python Requirement:</strong> Scored 85% on automated timed coding
                challenge (Target: 65%). Optimal O(N) memory complexity confirmed.
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Practical Project Proof:</strong> Built 3 production repos including AI
                Dental Scanner and CVE Vulnerability Scanner with automated unit tests.
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Networking & Linux Competency:</strong> Validated through Level 2 hands-on
                simulations (82% & 70%).
              </span>
            </div>
            <div className="flex items-start gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Actionable Skill Gap (SIEM Telemetry):</strong> Scored 42% against 50%
                target. Currently active in dedicated SOC Lab learning roadmap.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Skills Matrix + Projects Proof */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Verified Skills & Test Transcripts (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card-subtle">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-4">
              Demonstrated Skills & Verification Level
            </h3>

            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                      <span className="text-[10px] uppercase font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {s.category}
                      </span>
                    </div>
                    <VerificationBadge verified={s.verified} level={s.verificationLevel} size="sm" />
                  </div>

                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Skill Confidence Score</span>
                    <span className="font-mono font-bold text-indigo-700">{s.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${s.confidenceScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Verified Projects & Code Repositories (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card-subtle">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-4">
              Audited Project Repositories (Level 3 Evidence)
            </h3>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Code Verified
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600">
                    <strong>Validated Benchmark:</strong> {proj.metrics}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title={`Schedule Interview: ${studentProfile.name}`}
        subtitle="Invite candidate to a verified technical defense room"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interview Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Technical">Technical Defense (Level 4)</option>
                <option value="HR">HR & Cultural Alignment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interviewer Name</label>
              <input
                type="text"
                required
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
              <input
                type="text"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time & Duration</label>
              <input
                type="text"
                required
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Interview Focus & Notes
            </label>
            <textarea
              rows={3}
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20"
            >
              Confirm & Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
