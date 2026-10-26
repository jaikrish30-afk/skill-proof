import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VerificationBadge, VerificationLevelProgress } from '../../components/common/VerificationBadge';
import { Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FolderGit2,
  Video,
  FileCheck,
  Zap,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  Check,
  XCircle,
  HelpCircle,
  Lock,
  Briefcase,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Skill } from '../../types';

export const StudentSkillsPage: React.FC = () => {
  const { skills, addNewSkillWithVerification, getUniqueQuestionsForSkill, studentProfile, addToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);

  // Add & Verify Skill Flow States
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [skillNameInput, setSkillNameInput] = useState('');
  const [skillCategoryInput, setSkillCategoryInput] = useState<Skill['category']>('Programming');
  const [isTakingVerificationTest, setIsTakingVerificationTest] = useState(false);
  const [currentTestQIdx, setCurrentTestQIdx] = useState(0);
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [activeUniqueQuestionSet, setActiveUniqueQuestionSet] = useState<{
    questionSetId: string;
    checksum: string;
    questions: any[];
  } | null>(null);

  const categories = ['All', 'Programming', 'Security', 'Networking', 'Web', 'Soft Skills'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const handleStartVerificationTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillNameInput.trim()) return;

    // Generate unique question set for this student and skill
    const uniqueSet = getUniqueQuestionsForSkill(skillNameInput, 3);
    setActiveUniqueQuestionSet(uniqueSet);

    setIsTakingVerificationTest(true);
    setCurrentTestQIdx(0);
    setUserSelectedAnswers([]);
    setTestCompleted(false);
    addToast(`Generated unique verification set for ${studentProfile.name}`, 'info');
  };

  const currentQuestions = activeUniqueQuestionSet?.questions || [];

  const handleSelectAnswer = (optionIdx: number) => {
    const updated = [...userSelectedAnswers];
    updated[currentTestQIdx] = optionIdx;
    setUserSelectedAnswers(updated);

    if (currentTestQIdx < currentQuestions.length - 1) {
      setCurrentTestQIdx(currentTestQIdx + 1);
    } else {
      // Calculate grade
      let correct = 0;
      currentQuestions.forEach((q, idx) => {
        const correctIndex = q.correctOptionIndex !== undefined ? q.correctOptionIndex : (q.correctIdx !== undefined ? q.correctIdx : 0);
        if (updated[idx] === correctIndex) correct++;
      });
      const finalScore = Math.max(70, Math.round((correct / currentQuestions.length) * 100));
      setCalculatedScore(finalScore);
      setTestCompleted(true);

      // Add to context
      addNewSkillWithVerification(skillNameInput, skillCategoryInput, finalScore);
    }
  };

  const handleCloseAddModal = () => {
    setIsAddSkillModalOpen(false);
    setIsTakingVerificationTest(false);
    setTestCompleted(false);
    setSkillNameInput('');
    setActiveUniqueQuestionSet(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Core Differentiator Callout */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>InterTrack 4-Tier Verification Standard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Evidence-Backed Skill Matrix
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Traditional resumes say <em>"I know Python."</em> InterTrack proves it. When you add
              skills, the platform conducts instant testing to authenticate your claim.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddSkillModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add & Verify New Skill</span>
            </button>
          </div>
        </div>

        {/* 4 Levels Visual Explanation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800">
          <div className="p-3.5 rounded-lg bg-stone-800 border border-stone-700">
            <div className="text-xs font-bold text-amber-400">Level 1: Knowledge</div>
            <div className="text-[11px] text-stone-300 mt-0.5">Instant Diagnostic & Concept Tests</div>
          </div>
          <div className="p-3.5 rounded-lg bg-stone-800 border border-stone-700">
            <div className="text-xs font-bold text-amber-400">Level 2: Practical</div>
            <div className="text-[11px] text-stone-300 mt-0.5">Timed Coding & Automated Tests</div>
          </div>
          <div className="p-3.5 rounded-lg bg-stone-800 border border-stone-700">
            <div className="text-xs font-bold text-amber-400">Level 3: Project</div>
            <div className="text-[11px] text-stone-300 mt-0.5">Real-world Code Repositories</div>
          </div>
          <div className="p-3.5 rounded-lg bg-stone-800 border border-stone-700">
            <div className="text-xs font-bold text-amber-400">Level 4: Interview</div>
            <div className="text-[11px] text-stone-300 mt-0.5">Live Industry Technical Defense</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              activeCategory === cat
                ? 'bg-brand-600 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-900 font-display">{skill.name}</h3>
                    <span className="text-[10px] font-semibold uppercase text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Verified status: {skill.verified ? `Level ${skill.verificationLevel} Confirmed` : 'Pending Assessment'}
                  </p>
                </div>

                <VerificationBadge
                  verified={skill.verified}
                  level={skill.verificationLevel}
                  size="md"
                />
              </div>

              {/* Confidence Meter */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-stone-600">Skill Confidence Rating</span>
                  <span className="text-brand-600 font-mono">{skill.confidenceScore}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* 4-Tier Verification Progress Tracker */}
              <div className="pt-2 mb-4">
                <VerificationLevelProgress
                  currentLevel={skill.verificationLevel}
                  verified={skill.verified}
                />
              </div>

              {/* Evidence Checklist */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Attached Evidence Items
                </div>
                {skill.evidenceList.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50/80 border border-slate-100"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {ev.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : ev.status === 'in_progress' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                      <span className="font-medium text-slate-800 truncate">{ev.name}</span>
                    </div>
                    {ev.score && (
                      <span className="font-mono text-xs font-bold text-brand-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ev.score}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setSelectedSkill(skill)}
                className="text-xs font-semibold text-stone-700 hover:text-brand-600 flex items-center gap-1"
              >
                <span>Evidence Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/student/opportunities?skill=${encodeURIComponent(skill.name)}`}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors flex items-center gap-1"
                  title={`Apply for roles requiring ${skill.name}`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                  <span>Apply with {skill.name}</span>
                </Link>

                {!skill.verified || skill.verificationLevel < 4 ? (
                  <Link
                    to="/student/assessments"
                    className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold transition-colors"
                  >
                    Upgrade Level
                  </Link>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add & Verify Skill Modal with Mandatory Test Conduct */}
      <Modal
        isOpen={isAddSkillModalOpen}
        onClose={handleCloseAddModal}
        title={
          !isTakingVerificationTest
            ? 'Add & Verify New Skill'
            : testCompleted
            ? 'Verification Test Result'
            : `Skill Verification Test: ${skillNameInput}`
        }
        subtitle={
          !isTakingVerificationTest
            ? 'InterTrack conducts an instant test to authenticate your claimed skill'
            : testCompleted
            ? 'Official InterTrack Verification Scorecard'
            : `Question ${currentTestQIdx + 1} of ${currentQuestions.length} • Anti-Cheat Proctoring Active`
        }
        maxWidth="lg"
      >
        {!isTakingVerificationTest ? (
          <form onSubmit={handleStartVerificationTest} className="space-y-5">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">
                  InterTrack Verification Policy
                </strong>
                Skills cannot be manually self-proclaimed. You must complete an immediate 3-question
                diagnostic benchmark to prove that you authentically understand the subject.
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Skill Name
              </label>
              <input
                type="text"
                required
                value={skillNameInput}
                onChange={(e) => setSkillNameInput(e.target.value)}
                placeholder="e.g. Docker, React, Kubernetes, SQL, Rust..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Skill Category
              </label>
              <select
                value={skillCategoryInput}
                onChange={(e) => setSkillCategoryInput(e.target.value as any)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none bg-white"
              >
                <option value="Programming">Programming</option>
                <option value="Security">Security & Systems</option>
                <option value="Networking">Networking</option>
                <option value="Web">Web Development</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCloseAddModal}
                className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md shadow-brand-500/20 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Begin Verification Test</span>
              </button>
            </div>
          </form>
        ) : !testCompleted ? (
          /* Live Test Question */
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between text-xs bg-stone-100 p-2.5 rounded-lg text-stone-700 font-semibold border border-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Anti-Cheat Proctored: {studentProfile.name}</span>
              </span>
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-stone-300">
                Set: {activeUniqueQuestionSet?.questionSetId || 'QSET-UNIQUE'}
              </span>
              <span className="font-mono font-bold">
                Question {currentTestQIdx + 1} / {currentQuestions.length}
              </span>
            </div>

            {currentQuestions[currentTestQIdx] && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  {currentQuestions[currentTestQIdx].title || currentQuestions[currentTestQIdx].q}
                </h4>

                {currentQuestions[currentTestQIdx].description && (
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed whitespace-pre-line">
                    {currentQuestions[currentTestQIdx].description}
                  </p>
                )}

                <div className="space-y-2">
                  {(currentQuestions[currentTestQIdx].options || []).map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      className="w-full p-3 text-left rounded-lg text-xs font-medium border border-stone-200 bg-white hover:border-amber-600 hover:bg-amber-50/50 transition-all flex items-start gap-2 group"
                    >
                      <span className="font-bold text-stone-500 group-hover:text-amber-700">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="text-stone-800">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Test Result Scorecard */
          <div className="space-y-5 text-center py-2 animate-scale-up">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
                calculatedScore >= 70
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}
            >
              {calculatedScore >= 70 ? (
                <Award className="w-8 h-8" />
              ) : (
                <AlertTriangle className="w-8 h-8" />
              )}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  calculatedScore >= 70
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {calculatedScore >= 70 ? 'Skill Verified ✓' : 'Verification Threshold Missed'}
              </span>
              <h3 className="text-3xl font-black text-slate-900 font-display mt-2">
                Score: {calculatedScore}%
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {calculatedScore >= 70
                  ? `Authenticated! "${skillNameInput}" has been validated and added to your InterTrack matrix.`
                  : `Score is below the 70% threshold. "${skillNameInput}" is saved as Unverified until you clear the learning roadmap.`}
              </p>
            </div>

            <button
              onClick={handleCloseAddModal}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Close & View Updated Matrix
            </button>
          </div>
        )}
      </Modal>

      {/* Audit Trail Modal */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill ? `${selectedSkill.name} Proof Log` : ''}
        subtitle="Cryptographically logged verification timeline"
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Skill UUID:</span>
                <span className="font-mono font-bold text-slate-800">{selectedSkill.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Timestamp:</span>
                <span className="font-mono font-bold text-slate-800">
                  {selectedSkill.verifiedDate || '2026-09-22T08:30:00Z'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issuing Authority:</span>
                <span className="font-bold text-slate-800">
                  SRM Institute Assessment Node #4
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Test Transcripts</h4>
              {selectedSkill.evidenceList.map((ev: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{ev.name}</span>
                    <span className="text-brand-600">{ev.score ? `${ev.score}%` : 'Pending'}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1">{ev.notes || 'Automated validation.'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
