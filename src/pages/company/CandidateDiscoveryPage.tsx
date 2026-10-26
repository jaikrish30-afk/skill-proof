import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Award,
  TrendingUp,
  MapPin,
  School,
  ArrowRight,
  SlidersHorizontal,
  FolderGit2,
} from 'lucide-react';

export const CandidateDiscoveryPage: React.FC = () => {
  const { candidatesPool, updateCandidateStatus } = useApp();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedVerification, setSelectedVerification] = useState('All');
  const [minScore, setMinScore] = useState(70);

  const filteredCandidates = candidatesPool.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill =
      selectedSkill === 'All' ||
      cand.topSkills.some((s) => s.name.toLowerCase() === selectedSkill.toLowerCase());

    const matchesCollege = selectedCollege === 'All' || cand.college.includes(selectedCollege);

    const matchesVerification =
      selectedVerification === 'All' || cand.verificationStatus === selectedVerification;

    const matchesScore = cand.skillMatch >= minScore;

    return matchesSearch && matchesSkill && matchesCollege && matchesVerification && matchesScore;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Evidence-Based Candidate Discovery Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Candidate Discovery & Verification Search
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Directly filter students across university cohorts by authentic code benchmark scores,
          project repositories, and verified capabilities.
        </p>
      </div>

      {/* Deep Filter Box */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card-subtle space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Search input */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, college, dept..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Skill Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="All">All Demonstrated Skills</option>
              <option value="Python">Python</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Networking">Networking</option>
              <option value="Linux">Linux Systems</option>
              <option value="SIEM">SIEM & SOC</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>

          {/* College Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="All">All Academic Institutions</option>
              <option value="SRM">SRM Institute of Science & Tech</option>
              <option value="SSN">SSN College of Engineering</option>
              <option value="Anna">Anna University, CEG</option>
            </select>
          </div>

          {/* Verification Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Partial">Partial</option>
            </select>
          </div>
        </div>

        {/* Min Skill Score Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">
              Minimum Candidate Skill Match: <strong className="text-indigo-600">{minScore}%</strong>
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="90"
            step="2"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full sm:w-64 accent-indigo-600"
          />
        </div>
      </div>

      {/* Interactive Candidate Discovery Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Candidate & College</th>
                <th className="px-6 py-4">Skills Match</th>
                <th className="px-6 py-4">Code Test Score</th>
                <th className="px-6 py-4">Top Evidence Proofs</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4">Hiring Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Name & College */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                          <span>{cand.name}</span>
                          {cand.id === 'student-jai-krish' && (
                            <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                              Demo Focus
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {cand.college} • {cand.department}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Skills Match */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {cand.skillMatch}% Match
                    </span>
                  </td>

                  {/* Assessment Score */}
                  <td className="px-6 py-4 font-mono font-bold text-slate-800">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                      {cand.assessmentScore}%
                    </span>
                  </td>

                  {/* Top Evidence Proofs */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {cand.topSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {s.name} ({s.score}%)
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Verification */}
                  <td className="px-6 py-4">
                    <VerificationBadge
                      verified={cand.verificationStatus === 'Verified'}
                      level={cand.verificationStatus === 'Verified' ? 3 : 1}
                      size="sm"
                    />
                  </td>

                  {/* Hiring Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        cand.status === 'Qualified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : cand.status === 'Interviewing'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {cand.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/company/candidates/${cand.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <span>View InterTrack Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
