import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { VerificationBadge, VerificationLevelProgress } from '../../components/common/VerificationBadge';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Building2,
  Mail,
  MapPin,
  ExternalLink,
  Edit3,
  Calendar,
  Layers,
  FolderGit2,
  Code2,
  Check,
  Camera,
  Upload,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const StudentProfilePage: React.FC = () => {
  const { studentProfile, skills, updateStudentProfile, uploadStudentAvatar, createNewProfile, addToast } = useApp();
  const [selectedSkillForEvidence, setSelectedSkillForEvidence] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] = useState(false);

  // Edit State
  const [careerGoal, setCareerGoal] = useState(studentProfile.careerGoal);
  const [bio, setBio] = useState(studentProfile.bio);

  // Create Profile Form State
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    college: 'SRM Institute of Science and Technology',
    department: 'Computer Science & Engineering',
    year: 'B.Tech - 3rd Year',
    degree: 'Bachelor of Technology',
    cgpa: '8.8 / 10.0',
    careerGoal: 'Full Stack & AI Engineer',
    bio: 'Passionate software engineer building evidence-backed skill proof with deep learning and modern web technologies.',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const newProfileFileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadStudentAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCreateForm((prev) => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({ careerGoal, bio });
    setIsEditModalOpen(false);
  };

  const handleCreateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name.trim() || !createForm.email.trim()) {
      addToast('Please enter candidate name and email.', 'warning');
      return;
    }
    createNewProfile(createForm);
    setCareerGoal(createForm.careerGoal);
    setBio(createForm.bio);
    setIsCreateProfileModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card-subtle relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()} title="Click to upload profile photo">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-brand-100 shadow-md group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold transition-opacity">
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Change Photo</span>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {studentProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  InterTrack ID: #INT-8842
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200 flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-slate-400" />
                  {studentProfile.college}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {studentProfile.department} ({studentProfile.year})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {studentProfile.location}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-brand-700 mt-2 flex items-center gap-1.5">
                <span className="font-normal text-slate-500">Career Goal:</span>
                {studentProfile.careerGoal}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCreateProfileModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create New Profile</span>
            </button>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Large Skill Confidence Card */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Radial Confidence Metric */}
          <div className="md:col-span-4 text-center md:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-stone-800"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${studentProfile.overallScore * 2.64} 300`}
                  strokeLinecap="round"
                  className="text-amber-400 drop-shadow-md"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                  {studentProfile.overallScore}%
                </span>
                <span className="text-[9px] uppercase font-bold text-amber-200/80">Confidence</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Overall Skill Confidence
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                Authentic Talent Rating
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Calculated across algorithmic code tests, multi-tier project reviews, and knowledge
                benchmarking.
              </p>
            </div>
          </div>

          {/* 4-Tier Verification Levels Breakdown */}
          <div className="md:col-span-8 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
              <span>Evidence Progression Standard</span>
              <span className="text-emerald-400 font-mono text-[11px]">4 / 4 Tiers Supported</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
                <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Level 1</span>
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">Knowledge</div>
                <div className="text-[10px] text-slate-400 mt-0.5">MCQs & Quizzes</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
                <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Level 2</span>
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">Practical</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Automated Code Tests</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
                <div className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Level 3</span>
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">Project</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Verified Repositories</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 text-center">
                <div className="text-amber-400 font-bold text-xs flex items-center justify-center gap-1">
                  <span>⏳ Level 4</span>
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">Interview</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Industry Live Defense</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Cards with Deep Evidence Drilldown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Demonstrated Skills</h3>
            <p className="text-xs text-slate-500">
              Click any skill card to inspect audit logs, test scores, and code links.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedSkillForEvidence(skill)}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-card-subtle hover:border-brand-400 hover:shadow-card-elevated cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 font-display">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <VerificationBadge
                    verified={skill.verified}
                    level={skill.verificationLevel}
                  />
                </div>

                {/* Score & Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Skill Confidence</span>
                    <span className="text-brand-700 font-bold font-mono">
                      {skill.confidenceScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-600 h-full rounded-full"
                      style={{ width: `${skill.confidenceScore}%` }}
                    />
                  </div>
                </div>

                {/* Evidence Checklist Summary */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
                  {skill.evidenceList.slice(0, 3).map((ev, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        {ev.status === 'verified' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : ev.status === 'in_progress' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                        )}
                        <span className="truncate">{ev.name}</span>
                      </div>
                      {ev.score && (
                        <span className="font-mono text-[11px] font-bold text-slate-700 shrink-0">
                          {ev.score}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-bold group-hover:text-brand-700">
                <span>View Full Evidence Audit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Modal Drilldown */}
      <Modal
        isOpen={!!selectedSkillForEvidence}
        onClose={() => setSelectedSkillForEvidence(null)}
        title={selectedSkillForEvidence ? `${selectedSkillForEvidence.name} Evidence Portfolio` : ''}
        subtitle="Verifiable cryptographic proof of skill demonstration"
        maxWidth="2xl"
      >
        {selectedSkillForEvidence && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs text-slate-500">Total Confidence</span>
                <div className="text-2xl font-black text-brand-600 font-mono">
                  {selectedSkillForEvidence.confidenceScore}%
                </div>
              </div>
              <VerificationBadge
                verified={selectedSkillForEvidence.verified}
                level={selectedSkillForEvidence.verificationLevel}
                size="lg"
              />
            </div>

            <VerificationLevelProgress
              currentLevel={selectedSkillForEvidence.verificationLevel}
              verified={selectedSkillForEvidence.verified}
            />

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Validated Evidence Records
              </h4>
              {selectedSkillForEvidence.evidenceList.map((ev: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{ev.name}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          ev.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ev.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {ev.notes || `Validated via automated benchmark with official timestamp.`}
                    </p>
                    {ev.date && (
                      <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                        Verified Date: {ev.date}
                      </span>
                    )}
                  </div>

                  {ev.score && (
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-400">Score</span>
                      <div className="text-lg font-bold font-mono text-slate-800">
                        {ev.score}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
        subtitle="Update your career goals and biography"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Profile Photo
            </label>
            <div className="flex items-center gap-3">
              <img
                src={studentProfile.avatar}
                alt="Profile"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Upload New Picture</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Career Goal & Target Specialization
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Professional Biography
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* Create New Profile Modal */}
      <Modal
        isOpen={isCreateProfileModalOpen}
        onClose={() => setIsCreateProfileModalOpen(false)}
        title="Create New Candidate Profile"
        subtitle="Register a new student with InterTrack verified credentials"
      >
        {/* Hidden File Input for new profile avatar */}
        <input
          type="file"
          ref={newProfileFileRef}
          onChange={handleNewProfilePhotoUpload}
          accept="image/*"
          className="hidden"
        />

        <form onSubmit={handleCreateProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Candidate Photo
            </label>
            <div className="flex items-center gap-3">
              <img
                src={createForm.avatar}
                alt="Candidate Avatar"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-200 shadow-sm"
              />
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => newProfileFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-700 text-xs font-bold transition-colors flex items-center gap-1.5 border border-blue-200"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local Picture</span>
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCreateForm((p) => ({
                        ...p,
                        avatar:
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                      }))
                    }
                    className="text-[10px] text-slate-500 hover:text-brand-600 underline"
                  >
                    Preset 1
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCreateForm((p) => ({
                        ...p,
                        avatar:
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
                      }))
                    }
                    className="text-[10px] text-slate-500 hover:text-brand-600 underline"
                  >
                    Preset 2
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCreateForm((p) => ({
                        ...p,
                        avatar:
                          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
                      }))
                    }
                    className="text-[10px] text-slate-500 hover:text-brand-600 underline"
                  >
                    Preset 3
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={createForm.name}
                onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Academic Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={createForm.email}
                onChange={(e) => setCreateForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="priya.s@srmist.edu.in"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Institution / College
              </label>
              <input
                type="text"
                value={createForm.college}
                onChange={(e) => setCreateForm((p) => ({ ...p, college: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Department & Branch
              </label>
              <input
                type="text"
                value={createForm.department}
                onChange={(e) => setCreateForm((p) => ({ ...p, department: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={createForm.year}
                onChange={(e) => setCreateForm((p) => ({ ...p, year: e.target.value }))}
                placeholder="B.Tech - 3rd Year"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cumulative CGPA
              </label>
              <input
                type="text"
                value={createForm.cgpa}
                onChange={(e) => setCreateForm((p) => ({ ...p, cgpa: e.target.value }))}
                placeholder="8.8 / 10.0"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={createForm.location}
                onChange={(e) => setCreateForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="Chennai, India"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target Career Role
            </label>
            <input
              type="text"
              value={createForm.careerGoal}
              onChange={(e) => setCreateForm((p) => ({ ...p, careerGoal: e.target.value }))}
              placeholder="e.g. AI / Machine Learning Engineer"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Profile Summary & Bio
            </label>
            <textarea
              rows={3}
              value={createForm.bio}
              onChange={(e) => setCreateForm((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Brief professional summary and technology interests..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Profile</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const School = GraduationCap;
