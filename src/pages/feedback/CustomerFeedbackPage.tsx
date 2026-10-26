import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import { FeedbackItem } from '../../types';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Sparkles,
  Filter,
  PlusCircle,
  TrendingUp,
  Users,
  Building2,
  GraduationCap,
  ShieldCheck,
  Award,
  Send,
  Heart,
  Share2,
} from 'lucide-react';

export const CustomerFeedbackPage: React.FC = () => {
  const { feedbacks, addFeedback, upvoteFeedback, addToast } = useApp();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');

  // New Feedback Form State
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState<FeedbackItem['authorRole']>('Student');
  const [authorOrg, setAuthorOrg] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackItem['category']>('Platform Experience');
  const [content, setContent] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);
  const [tagInput, setTagInput] = useState('Top Internships, Helpful AI');

  // Filtered feedbacks
  const filteredFeedbacks = feedbacks.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesRole = selectedRole === 'All' || f.authorRole === selectedRole;
    const matchesRating = selectedRating === 'All' || f.rating === selectedRating;
    return matchesCat && matchesRole && matchesRating;
  });

  // Calculate Metrics
  const totalReviews = feedbacks.length;
  const avgRating = (
    feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / (feedbacks.length || 1)
  ).toFixed(1);
  const recommendCount = feedbacks.filter((f) => f.wouldRecommend).length;
  const recommendRate = Math.round((recommendCount / (feedbacks.length || 1)) * 100);

  const ratingCounts = {
    5: feedbacks.filter((f) => f.rating === 5).length,
    4: feedbacks.filter((f) => f.rating === 4).length,
    3: feedbacks.filter((f) => f.rating === 3).length,
    2: feedbacks.filter((f) => f.rating === 2).length,
    1: feedbacks.filter((f) => f.rating === 1).length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      addToast('Please fill out your name and review comments.', 'error');
      return;
    }

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addFeedback({
      authorName,
      authorRole,
      authorOrg: authorOrg || 'InterTrack Community',
      rating,
      category,
      content,
      wouldRecommend,
      verifiedBadge: true,
      tags: tags.length > 0 ? tags : ['Verified Review'],
    });

    setIsSubmitModalOpen(false);
    setAuthorName('');
    setAuthorOrg('');
    setContent('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public Customer & Community Feedback</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            What People Say About InterTrack
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            All reviews and feedback are 100% public and visible to everyone. Discover authentic experiences
            from students getting hired, recruiters finding verified talent, and colleges mapping industry skills.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Submit Your Feedback (Visible to All)</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Community Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Scorecard */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-center items-center text-center">
          <div className="text-5xl font-black font-display text-slate-900">{avgRating}</div>
          <div className="flex items-center gap-1 mt-2 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-2">
            Based on {totalReviews} verified community reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-center space-y-2">
          {[5, 4, 3, 2, 1].map((starVal) => {
            const count = (ratingCounts as any)[starVal];
            const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
            return (
              <div key={starVal} className="flex items-center gap-2 text-xs">
                <span className="w-12 text-slate-600 font-semibold">{starVal} stars</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-bold text-slate-500">{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Recommendation Rate */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{recommendRate}%</div>
          <p className="text-xs font-bold text-slate-800 mt-1">Recommendation Rate</p>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xs">
            Reviewers actively recommend InterTrack for internships & skill proof.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5 text-brand-600" />
            <span>Filter Reviews:</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Internship Matching">Internship Matching</option>
            <option value="Online Compiler">Online Compiler</option>
            <option value="AI Agent Assistance">AI Agent Assistance</option>
            <option value="Skill Verification">Skill Verification</option>
            <option value="Platform Experience">Platform Experience</option>
          </select>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="All">All User Roles</option>
            <option value="Student">Students</option>
            <option value="Recruiter">Corporate Recruiters</option>
            <option value="Institution Faculty">University Faculty</option>
            <option value="Industry Mentor">Industry Mentors</option>
          </select>

          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) =>
              setSelectedRating(e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10))
            }
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing {filteredFeedbacks.length} of {totalReviews} Reviews
        </div>
      </div>

      {/* Reviews Cards Feed */}
      <div className="space-y-4">
        {filteredFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-brand-400 transition-all space-y-4"
          >
            {/* Top row: Author Info, Star Rating, Timestamp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-sm shrink-0 border border-brand-200">
                  {fb.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{fb.authorName}</h4>
                    {fb.verifiedBadge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified User</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-semibold text-brand-700">{fb.authorRole}</span>
                    <span>•</span>
                    <span>{fb.authorOrg}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Star display */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= fb.rating ? 'fill-current' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium">{fb.createdAt}</span>
              </div>
            </div>

            {/* Category Pill */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {fb.category}
              </span>
              {fb.wouldRecommend && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Recommends InterTrack
                </span>
              )}
            </div>

            {/* Content text */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              "{fb.content}"
            </p>

            {/* Tags row */}
            {fb.tags && fb.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {fb.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer with Upvote Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Was this review helpful to you?</span>

              <button
                onClick={() => upvoteFeedback(fb.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-600 hover:text-brand-700 text-xs font-semibold border border-slate-200 hover:border-brand-300 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({fb.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Feedback Modal */}
      {isSubmitModalOpen && (
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title="Submit Customer Feedback"
          subtitle="Your feedback will be published immediately on the public wall and visible to all users."
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Overall Platform Rating (1 to 5 Stars)*
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    type="button"
                    key={starVal}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(starVal)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= starVal
                          ? 'text-amber-400 fill-current'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-xs font-bold text-slate-700">
                  {rating === 5
                    ? '5.0 - Excellent!'
                    : rating === 4
                    ? '4.0 - Very Good'
                    : rating === 3
                    ? '3.0 - Good'
                    : `${rating}.0 Stars`}
                </span>
              </div>
            </div>

            {/* Author Name and Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name*</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Jai Krish K R"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Role*</label>
                <select
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none bg-white"
                >
                  <option value="Student">Student / Candidate</option>
                  <option value="Recruiter">Corporate Recruiter</option>
                  <option value="Institution Faculty">University Dean / Faculty</option>
                  <option value="Industry Mentor">Technical Mentor</option>
                  <option value="Guest">Guest Reviewer</option>
                </select>
              </div>
            </div>

            {/* Organization / College & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">College / Organization</label>
                <input
                  type="text"
                  value={authorOrg}
                  onChange={(e) => setAuthorOrg(e.target.value)}
                  placeholder="e.g. SRMIST, SecureTech, CodeLabs"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feedback Category*</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none bg-white"
                >
                  <option value="Platform Experience">Overall Platform Experience</option>
                  <option value="Internship Matching">Internship Search & Matching</option>
                  <option value="Online Compiler">Online Compiler & Testing</option>
                  <option value="AI Agent Assistance">Real-Time AI Copilot</option>
                  <option value="Skill Verification">Evidence-Based Skill Verification</option>
                </select>
              </div>
            </div>

            {/* Content textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Review & Feedback Comments*
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your experience using InterTrack (internship search, code compiler, AI assistant, skill verification)..."
                className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none leading-relaxed"
              />
            </div>

            {/* Recommendation Checkbox & Tags */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={wouldRecommend}
                  onChange={(e) => setWouldRecommend(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                />
                <span>Yes, I recommend InterTrack for internships and skill proofing!</span>
              </label>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Feature Highlight Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. Verified Proof, Fast Matching, Great AI Agent"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Public Feedback</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
