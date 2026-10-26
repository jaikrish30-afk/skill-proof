import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  FolderGit2,
  BookOpen,
  Briefcase,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const ResumeExtractionPage: React.FC = () => {
  const { addExtractedSkills, addToast } = useApp();
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [fileName, setFileName] = useState<string | null>('Jai_Krish_KR_Resume_2026.pdf');
  const [extractedData, setExtractedData] = useState({
    skills: [
      { name: 'Python', confidenceScore: 92, category: 'Programming' },
      { name: 'Web Development', confidenceScore: 85, category: 'Web' },
      { name: 'Cybersecurity', confidenceScore: 78, category: 'Security' },
      { name: 'Linux', confidenceScore: 70, category: 'Security' },
      { name: 'Networking', confidenceScore: 65, category: 'Networking' },
    ],
    projects: [
      { title: 'AI Dental Scanner', tech: 'Python, PyTorch, OpenCV, FastAPI' },
      { title: 'LT Line Fault Detection', tech: 'Python, SCADA, MQTT, Data Analysis' },
      { title: 'Cybersecurity Vulnerability Tool', tech: 'Python, Nmap, Bash, CVE Analysis' },
    ],
    certifications: [
      'CompTIA Security+ Certified (2025)',
      'Python for Deep Learning Specialization',
      'Cisco CCNA Networking Essentials',
    ],
    education: {
      institution: 'SRM Institute of Science and Technology',
      degree: 'B.Tech in Information Technology',
      cgpa: '8.92 / 10.0',
    },
  });

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setHasExtracted(true);
      addToast('Resume processed! 5 core skills and 3 projects extracted.', 'success');
    }, 1200);
  };

  const handleConfirmAndSave = () => {
    addExtractedSkills(extractedData.skills as any);
    addToast('Skills and parsed evidence confirmed and merged into profile!', 'success');
    navigate('/student/skills');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated Skill Extraction Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Resume & Skill Extraction
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Upload your resume in PDF, DOC, or DOCX. The platform automatically identifies verifiable
          skills, project technologies, and certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Upload Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4 font-display">
                Upload Document
              </h2>

              {/* Drag & Drop Area */}
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 text-brand-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Click or drag resume file here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF, DOC, DOCX up to 10MB
                </p>

                {fileName && (
                  <div className="mt-4 p-2.5 rounded-xl bg-white border border-slate-200 inline-flex items-center gap-2 text-xs font-mono text-slate-700">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <span>{fileName}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className="mt-6 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Document via AI Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{hasExtracted ? 'Re-Analyze Resume' : 'Analyze & Extract Skills'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Architecture / Integrity Notice */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
              <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-brand-600" />
                <span>Evidence-First Pipeline</span>
              </div>
              Extracted skills are initially saved as <strong>Level 1 (Knowledge)</strong>. To reach
              <strong> Level 2 (Practical)</strong> and <strong>Level 3 (Project)</strong>, students
              complete code tests and peer repo verification.
            </div>
          </div>
        </div>

        {/* Right Side: AI Skill Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-card-subtle">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    AI Skill & Evidence Extraction
                  </h2>
                  <p className="text-xs text-slate-500">
                    Parsed confidence scores based on syntax parsing and project descriptions
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                {extractedData.skills.length} Skills Extracted
              </span>
            </div>

            {/* Extracted Skills List */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Extracted Skills & Confidence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedData.skills.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{s.name}</span>
                      <span className="text-xs font-black font-mono text-brand-600">
                        {s.confidenceScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-600 h-full rounded-full"
                        style={{ width: `${s.confidenceScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parsed Projects & Certs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Projects */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2.5">
                  <FolderGit2 className="w-4 h-4 text-brand-600" />
                  <span>Detected Projects (3)</span>
                </div>
                <div className="space-y-2">
                  {extractedData.projects.map((p, i) => (
                    <div key={i} className="text-xs">
                      <p className="font-bold text-slate-900">{p.title}</p>
                      <p className="text-[11px] text-slate-500">{p.tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Certifications (3)</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {extractedData.certifications.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm & Save Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Confirmed skills will be attached to your public InterTrack URL.
              </span>

              <button
                onClick={handleConfirmAndSave}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Confirm & Save Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
