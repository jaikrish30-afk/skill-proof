import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/common/Modal';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import {
  Search,
  Briefcase,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  Zap,
  Bookmark,
  Share2,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Award,
  Layers,
  Check,
  Bot,
  ExternalLink,
} from 'lucide-react';

export const InternshipSearchPage: React.FC = () => {
  const {
    opportunities,
    skills,
    applications,
    applyForOpportunity,
    addToast,
    openAIAgentWithPrompt,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [minStipend, setMinStipend] = useState(0);
  const [onlySkillMatched, setOnlySkillMatched] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedOppForDetail, setSelectedOppForDetail] = useState<(typeof opportunities)[0] | null>(null);

  // Quick search tags
  const quickTags = [
    { label: '🔥 All Trending', query: '', domain: 'All', mode: 'All' },
    { label: '🧠 AI & ML Internships', query: 'AI', domain: 'AI & Data Science', mode: 'All' },
    { label: '🛡️ Cybersecurity SOC', query: 'Cybersecurity', domain: 'Cybersecurity', mode: 'All' },
    { label: '⚡ React & Full-Stack', query: 'Full Stack', domain: 'Web Development', mode: 'All' },
    { label: '🏠 Remote Only', query: '', domain: 'All', mode: 'Remote' },
    { label: '💰 High Stipend (>₹40k)', query: '', domain: 'All', mode: 'All', minStipend: 40000 },
  ];

  const handleApply = (oppId: string, title: string, company: string) => {
    applyForOpportunity(oppId);
    addToast(`Successfully applied for "${title}" at ${company}! Track it under My Applications.`, 'success');
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
      addToast('Removed from saved internships.', 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      addToast('Saved to your bookmarked internships! ⭐', 'success');
    }
  };

  // Filtered & Ranked Internships
  const filteredInternships = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Query matching (title, company, skills, domain, location)
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          opp.title.toLowerCase().includes(q) ||
          opp.company.toLowerCase().includes(q) ||
          opp.location.toLowerCase().includes(q) ||
          (opp.domain && opp.domain.toLowerCase().includes(q)) ||
          opp.requiredSkills.some((s) => s.name.toLowerCase().includes(q));

        // Domain matching
        const matchesDomain =
          selectedDomain === 'All' ||
          (opp.domain && opp.domain.toLowerCase() === selectedDomain.toLowerCase()) ||
          opp.requiredSkills.some((s) => s.name.toLowerCase().includes(selectedDomain.toLowerCase()));

        // Work Mode matching
        const matchesMode = selectedWorkMode === 'All' || opp.workMode === selectedWorkMode;

        // Duration matching
        const matchesDuration =
          selectedDuration === 'All' ||
          (opp.duration && opp.duration.toLowerCase().includes(selectedDuration.toLowerCase()));

        // Stipend matching
        let stipendNum = 0;
        if (opp.stipend) {
          const numMatch = opp.stipend.replace(/[^0-9]/g, '');
          stipendNum = numMatch ? parseInt(numMatch, 10) : 0;
        }
        const matchesStipend = stipendNum >= minStipend;

        // Skill-matched toggle
        const matchesSkillFilter = !onlySkillMatched || (opp.matchPercentage || 70) >= 80;

        return (
          matchesQuery &&
          matchesDomain &&
          matchesMode &&
          matchesDuration &&
          matchesStipend &&
          matchesSkillFilter
        );
      })
      .sort((a, b) => (b.matchPercentage || 75) - (a.matchPercentage || 75));
  }, [
    opportunities,
    searchQuery,
    selectedDomain,
    selectedWorkMode,
    selectedDuration,
    minStipend,
    onlySkillMatched,
  ]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Banner with Search */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>InterTrack Smart Internship Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Find Your Dream Tech Internship
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Search verified internships directly matched to your verified credentials. Apply with 1-click
            attaching your InterTrack Level 1-4 authenticated scorecards.
          </p>

          {/* Search Box */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md">
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role (e.g., AI, Python, React, Cybersecurity) or company..."
                className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => {
                if (filteredInternships.length > 0) {
                  addToast(`Found ${filteredInternships.length} matching internships!`, 'info');
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Search Roles</span>
            </button>
          </div>

          {/* Quick Tag Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Filters:</span>
            {quickTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(tag.query);
                  setSelectedDomain(tag.domain);
                  setSelectedWorkMode(tag.mode);
                  if (tag.minStipend) setMinStipend(tag.minStipend);
                  else setMinStipend(0);
                }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 top-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mr-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filter By:</span>
            </div>

            {/* Domain Filter */}
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="All">All Tech Domains</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Web Development">Web & Full Stack</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
            </select>

            {/* Work Mode Filter */}
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-Site</option>
            </select>

            {/* Duration Filter */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="All">All Durations</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>

            {/* Min Stipend Range */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-500">Min:</span>
              <span className="font-bold text-brand-700">₹{(minStipend / 1000).toFixed(0)}k</span>
              <input
                type="range"
                min="0"
                max="50000"
                step="5000"
                value={minStipend}
                onChange={(e) => setMinStipend(parseInt(e.target.value, 10))}
                className="w-20 accent-brand-600"
              />
            </div>
          </div>

          {/* Toggle: Match With My Verified Skills */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlySkillMatched}
                onChange={(e) => setOnlySkillMatched(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 cursor-pointer"
              />
              <span>High Match Only (&gt;80%)</span>
            </label>

            {/* Ask AI Agent Assistant button */}
            <button
              onClick={() =>
                openAIAgentWithPrompt('What internships best match my verified profile with Python 84%?')
              }
              className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-brand-600" />
              <span>AI Match Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Available Positions</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
              {filteredInternships.length} internships found
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by candidate skill compatibility & verified evidence score.
          </p>
        </div>

        {bookmarkedIds.length > 0 && (
          <div className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            ⭐ {bookmarkedIds.length} Saved Roles
          </div>
        )}
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInternships.map((opp) => {
          const isApplied = applications.some((a) => a.opportunityId === opp.id);
          const isBookmarked = bookmarkedIds.includes(opp.id);
          const matchPct = opp.matchPercentage || 75;

          return (
            <div
              key={opp.id}
              className="group relative bg-white rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Logo, Title, Match Badge, Bookmark */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                      {opp.companyLogo || '💼'}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                        {opp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-1">
                        <span className="text-slate-800 font-bold">{opp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {opp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Match Score Badge */}
                    <div
                      className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 border ${
                        matchPct >= 80
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : matchPct >= 70
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{matchPct}% Match</span>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(opp.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Internship'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Badges Row: Stipend, Duration, Work Mode */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <DollarSign className="w-3 h-3" />
                    {opp.stipend || 'Competitive Stipend'}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {opp.duration || '6 Months'}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-50 text-brand-800 text-xs font-medium border border-brand-200">
                    <Building2 className="w-3 h-3 text-brand-600" />
                    {opp.workMode}
                  </span>

                  {opp.domain && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                      {opp.domain}
                    </span>
                  )}
                </div>

                {/* Description snippet */}
                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                {/* Required Skills Matrix */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Required Verified Skills:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {opp.requiredSkills.map((req, sIdx) => {
                      const candidateSkill = skills.find(
                        (s) => s.name.toLowerCase() === req.name.toLowerCase()
                      );
                      const isVerified = candidateSkill && candidateSkill.verified;
                      const candidateScore = candidateSkill ? candidateSkill.confidenceScore : 0;
                      const isPassing = candidateScore >= req.requiredScore;

                      return (
                        <span
                          key={sIdx}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                            isPassing && isVerified
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : candidateSkill
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {isPassing && isVerified ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          )}
                          <span>
                            {req.name} ({req.requiredScore}%)
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Perks Pills */}
                {opp.perks && opp.perks.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {opp.perks.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                      >
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedOppForDetail(opp)}
                  className="text-xs font-semibold text-slate-700 hover:text-brand-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {isApplied ? (
                    <span className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Applied ✓</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(opp.id, opp.title, opp.company)}
                      className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>1-Click Apply</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No results fallback */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No matching internships found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Try adjusting your search keywords, lowering the stipend threshold, or clearing the domain filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All');
              setSelectedWorkMode('All');
              setSelectedDuration('All');
              setMinStipend(0);
              setOnlySkillMatched(false);
            }}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Internship Full Detail Modal */}
      {selectedOppForDetail && (
        <Modal
          isOpen={!!selectedOppForDetail}
          onClose={() => setSelectedOppForDetail(null)}
          title={`${selectedOppForDetail.title} — ${selectedOppForDetail.company}`}
          subtitle={`${selectedOppForDetail.workMode} • ${selectedOppForDetail.location}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Header Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Stipend</span>
                <p className="text-sm font-extrabold text-emerald-700">
                  {selectedOppForDetail.stipend || 'Competitive'}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Duration</span>
                <p className="text-sm font-bold text-slate-800">
                  {selectedOppForDetail.duration || '6 Months'}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">InterTrack Fit</span>
                <p className="text-sm font-bold text-brand-700">
                  {selectedOppForDetail.matchPercentage || 80}% Compatible
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Work Mode</span>
                <p className="text-sm font-bold text-slate-800">{selectedOppForDetail.workMode}</p>
              </div>
            </div>

            {/* Role Overview */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Job Overview & Scope
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedOppForDetail.description}
              </p>
            </div>

            {/* Required Skills Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Required Technical Evidence
              </h4>
              <div className="space-y-2">
                {selectedOppForDetail.requiredSkills.map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
                  >
                    <span className="font-semibold text-slate-800">{req.name}</span>
                    <span className="text-slate-500">
                      Required Threshold: <strong className="text-slate-900">{req.requiredScore}%</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks & Benefits */}
            {selectedOppForDetail.perks && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Candidate Perks & Growth
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOppForDetail.perks.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                    >
                      🌟 {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  const prompt = `How should I prepare my technical defense for ${selectedOppForDetail.title} at ${selectedOppForDetail.company}?`;
                  setSelectedOppForDetail(null);
                  openAIAgentWithPrompt(prompt);
                }}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Agent Interview Tips</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOppForDetail(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                {applications.some((a) => a.opportunityId === selectedOppForDetail.id) ? (
                  <span className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                    Application Active ✓
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleApply(
                        selectedOppForDetail.id,
                        selectedOppForDetail.title,
                        selectedOppForDetail.company
                      );
                      setSelectedOppForDetail(null);
                    }}
                    className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Confirm & Apply with InterTrack</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
