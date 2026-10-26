import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Modal } from '../../components/common/Modal';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Sparkles,
  Award,
  Check,
  Send,
  Zap,
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { opportunities, applyForOpportunity, applyBySkillSet, applications, skills } = useApp();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('skill') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(50);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(
    searchParams.get('skill') || null
  );

  // Skill-Based Direct Application Modal State
  const [isSkillApplyModalOpen, setIsSkillApplyModalOpen] = useState(false);
  const [customRoleTitle, setCustomRoleTitle] = useState('Cybersecurity & Python Engineer');
  const [customCompany, setCustomCompany] = useState('SecureTech Solutions');
  const [selectedSkillsForApply, setSelectedSkillsForApply] = useState<string[]>(
    skills.filter((s) => s.verified).map((s) => s.name)
  );
  const [customPitch, setCustomPitch] = useState(
    'I have demonstrated practical skills verified through InterTrack coding challenges and project repositories.'
  );

  const toggleSkillSelection = (skillName: string) => {
    if (selectedSkillsForApply.includes(skillName)) {
      if (selectedSkillsForApply.length > 1) {
        setSelectedSkillsForApply(selectedSkillsForApply.filter((s) => s !== skillName));
      }
    } else {
      setSelectedSkillsForApply([...selectedSkillsForApply, skillName]);
    }
  };

  const handleCustomSkillApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkillsForApply.length === 0) return;

    applyBySkillSet({
      targetRoleTitle: customRoleTitle,
      targetCompany: customCompany,
      selectedSkillNames: selectedSkillsForApply,
      customPitch,
    });
    setIsSkillApplyModalOpen(false);
  };

  // Filter opportunities based on text, work mode, type, score, and skill filter
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesMode = selectedWorkMode === 'All' || opp.workMode === selectedWorkMode;
    const matchesScore = (opp.matchPercentage || 70) >= minMatchScore;

    const matchesSkillTag =
      !selectedSkillFilter ||
      opp.requiredSkills.some(
        (s) => s.name.toLowerCase() === selectedSkillFilter.toLowerCase()
      ) ||
      opp.title.toLowerCase().includes(selectedSkillFilter.toLowerCase());

    return matchesSearch && matchesType && matchesMode && matchesScore && matchesSkillTag;
  });

  // Calculate skill fit score preview for modal
  const selectedSkillsObjects = skills.filter((s) => selectedSkillsForApply.includes(s.name));
  const calculatedScorePreview =
    selectedSkillsObjects.length > 0
      ? Math.round(
          selectedSkillsObjects.reduce((acc, curr) => acc + curr.confidenceScore, 0) /
            selectedSkillsObjects.length
        )
      : 80;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Direct Skill Apply CTA */}
      <div className="rounded-xl bg-stone-900 text-white p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-700 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Evidence-Based Placement Matching</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Industry Roles & Opportunities
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Apply to live corporate job openings or submit an open direct application matching your
              verified InterTrack credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSkillApplyModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Apply for Any Role by My Skills</span>
            </button>
          </div>
        </div>

        {/* Skill-Based Quick Match Filter Pills */}
        <div className="mt-6 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-400 mr-1">Match by My Skills:</span>
          <button
            onClick={() => setSelectedSkillFilter(null)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedSkillFilter === null
                ? 'bg-amber-400 text-stone-950 font-semibold'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
            }`}
          >
            All Roles ({opportunities.length})
          </button>
          {skills
            .filter((s) => s.verified)
            .map((sk) => (
              <button
                key={sk.id}
                onClick={() =>
                  setSelectedSkillFilter(selectedSkillFilter === sk.name ? null : sk.name)
                }
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedSkillFilter === sk.name
                    ? 'bg-brand-600 text-white font-semibold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                <span>{sk.name}</span>
                <span className="text-[10px] text-amber-300 font-mono">({sk.confidenceScore}%)</span>
              </button>
            ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or required skill (e.g. Python, SOC)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
            />
          </div>

          {/* Work Mode Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 focus:border-brand-500 outline-none bg-white text-stone-800 font-medium"
            >
              <option value="All">All Locations & Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 focus:border-brand-500 outline-none bg-white text-stone-800 font-medium"
            >
              <option value="All">All Opportunity Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Co-op">Co-op Program</option>
            </select>
          </div>
        </div>

        {/* Match Percentage Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-stone-600">
              Minimum Skill Match: <strong className="text-brand-600">{minMatchScore}%</strong>
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="95"
            step="5"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="w-full sm:w-64 accent-brand-600"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
            <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900">No matching opportunities found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your skill filter or minimum match slider, or use the "Apply by My Skills"
              button to submit an open application.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSkillFilter(null);
                setMinMatchScore(50);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredOpportunities.map((opp) => {
            const isApplied = applications.some((a) => a.opportunityId === opp.id);

            return (
              <div
                key={opp.id}
                className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-stone-400 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-xl border border-stone-200 shrink-0">
                      {opp.companyLogo || '💼'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        {opp.company}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-brand-600 transition-colors font-display">
                        {opp.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {opp.location} • {opp.workMode}
                    </span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {opp.stipend || 'Competitive Stipend'}
                    </span>
                    <span>{opp.postedDate}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl line-clamp-2">
                    {opp.description}
                  </p>

                  {/* Required Skills Badges with Match Check */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-stone-400 mr-1">Required:</span>
                    {opp.requiredSkills.map((req, idx) => {
                      const studentSkill = skills.find(
                        (s) => s.name.toLowerCase() === req.name.toLowerCase()
                      );
                      const hasMet = studentSkill && studentSkill.confidenceScore >= req.requiredScore;

                      return (
                        <span
                          key={idx}
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded border flex items-center gap-1 ${
                            hasMet
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-stone-50 text-stone-700 border-stone-200'
                          }`}
                        >
                          {hasMet && <Check className="w-3 h-3 text-emerald-600" />}
                          <span>{req.name}</span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            ({studentSkill ? `${studentSkill.confidenceScore}% / ` : ''}{req.requiredScore}%)
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Right Col: Match Percentage & Action CTAs */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-left md:text-right">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-stone-100 text-stone-900 border border-stone-200 font-mono font-bold text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>{opp.matchPercentage}% Match</span>
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      Based on verified proof
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/student/opportunities/${opp.id}`}
                      className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                    >
                      Match Details
                    </Link>

                    <button
                      onClick={() => applyForOpportunity(opp.id)}
                      disabled={isApplied}
                      className={`px-4 py-2 rounded-lg font-semibold text-xs transition-colors ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-brand-600 hover:bg-brand-700 text-white'
                      }`}
                    >
                      {isApplied ? 'Applied ✓' : 'Apply with Skills'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Apply to Any Role by My Skills */}
      <Modal
        isOpen={isSkillApplyModalOpen}
        onClose={() => setIsSkillApplyModalOpen(false)}
        title="Apply for Any Role by My Verified Skills"
        subtitle="Submit a direct candidate application attaching your authenticated Level 1-4 InterTrack scorecard"
        maxWidth="2xl"
      >
        <form onSubmit={handleCustomSkillApplySubmit} className="space-y-5">
          {/* Role and Company Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Target Role / Specialization
              </label>
              <input
                type="text"
                value={customRoleTitle}
                onChange={(e) => setCustomRoleTitle(e.target.value)}
                placeholder="e.g. Cybersecurity Engineer, Python Backend Dev..."
                required
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Target Partner Company
              </label>
              <select
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-200 focus:border-brand-500 outline-none bg-white text-stone-800 font-medium"
              >
                <option value="SecureTech Solutions">SecureTech Solutions</option>
                <option value="Nexus Global Technologies">Nexus Global Technologies</option>
                <option value="CloudCore Systems">CloudCore Systems</option>
                <option value="CyberShield Defense Labs">CyberShield Defense Labs</option>
                <option value="FinTech Innovations Hub">FinTech Innovations Hub</option>
                <option value="Open Application (All Partner Companies)">
                  Open Application (All Partner Companies)
                </option>
              </select>
            </div>
          </div>

          {/* Select Which Verified Skills to Attach */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-stone-700">
                Select Verified Skills to Attach to Application ({selectedSkillsForApply.length} selected)
              </label>
              <span className="text-xs font-mono font-bold text-brand-600">
                Calculated Fit Score: {calculatedScorePreview}%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-stone-100 rounded-lg">
              {skills.map((skill) => {
                const isChecked = selectedSkillsForApply.includes(skill.name);
                return (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkillSelection(skill.name)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                      isChecked
                        ? 'bg-amber-50 border-amber-300 text-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-brand-600 accent-brand-600"
                      />
                      <div>
                        <p className="text-xs font-bold leading-tight">{skill.name}</p>
                        <p className="text-[10px] text-stone-500">
                          {skill.verified ? `Level ${skill.verificationLevel} Verified` : 'Diagnostic Test'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-600">
                      {skill.confidenceScore}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cover Note / Pitch */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Evidence Pitch / Note to Recruiter
            </label>
            <textarea
              value={customPitch}
              onChange={(e) => setCustomPitch(e.target.value)}
              rows={3}
              placeholder="Highlight your top demonstrated projects, test scores, or areas of focus..."
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-200 focus:border-brand-500 outline-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              Attached: Authenticated Level 1-4 InterTrack scores & GitHub repos.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSkillApplyModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Skill-Matched Application</span>
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
