import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ProjectEvidence } from '../../types';
import {
  FolderGit2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Plus,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ProjectsEvidencePage: React.FC = () => {
  const { projects, addProject } = useApp();
  const [selectedProject, setSelectedProject] = useState<ProjectEvidence | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newMetrics, setNewMetrics] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: ProjectEvidence = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      technologies: newTech.split(',').map((t) => t.trim()).filter(Boolean),
      skillsDemonstrated: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      evidenceStatus: 'submitted',
      githubUrl: newGithub || undefined,
      metrics: newMetrics || undefined,
      evidenceDetails: 'Submitted for peer verification and automated static analysis.',
      date: 'Just now',
    };

    addProject(newProj);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewTech('');
    setNewSkills('');
    setNewGithub('');
    setNewMetrics('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Level 3 Practical Evidence Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            My Projects Evidence
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Real software repositories and live deployments audited for Level 3 InterTrack
            verification.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Evidence</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:shadow-card-elevated hover:border-brand-300 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  {proj.date}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                    proj.evidenceStatus === 'verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{proj.evidenceStatus === 'verified' ? 'Verified Evidence' : 'Under Review'}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-display mb-2">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {proj.description}
              </p>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Skills Demonstrated */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Skills Demonstrated
                </div>
                <div className="flex flex-wrap gap-1">
                  {proj.skillsDemonstrated.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Repo</span>
                </a>
              )}

              <button
                onClick={() => setSelectedProject(proj)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 ml-auto"
              >
                <span>View Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Evidence Details Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
        subtitle="Audited repository & deployment metrics"
      >
        {selectedProject && (
          <div className="space-y-5 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-slate-700 mb-1">Project Overview</h4>
              <p className="text-slate-600 leading-relaxed">{selectedProject.description}</p>
            </div>

            {selectedProject.metrics && (
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block mb-0.5">
                  Performance & Validation Benchmark
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {selectedProject.metrics}
                </span>
              </div>
            )}

            <div>
              <h4 className="font-bold text-slate-700 mb-2">Technical Audit Notes</h4>
              <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {selectedProject.evidenceDetails}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-700 mb-2">Authenticated Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skillsDemonstrated.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Submit New Project Evidence"
        subtitle="Link code repositories for Level 3 skill authentication"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Distributed Key-Value Store"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Explain system architecture, algorithms implemented, and benchmarks..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Python, Redis, Docker, FastAPI"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skills Demonstrated (comma separated)
              </label>
              <input
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                placeholder="Python, System Design, Concurrency"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={newGithub}
              onChange={(e) => setNewGithub(e.target.value)}
              placeholder="https://github.com/username/project-repo"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md shadow-brand-500/20"
            >
              Submit Evidence
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
