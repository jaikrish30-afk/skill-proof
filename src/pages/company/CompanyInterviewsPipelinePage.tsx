import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Interview } from '../../types';
import {
  Calendar,
  Video,
  Clock,
  User,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  Code2,
  MessageSquare,
  Send,
  Sparkles,
  Play,
  Terminal,
  FileCode,
  HelpCircle,
  Award,
  Zap,
  Check,
  X,
  Copy,
  KeyRound,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const CompanyInterviewsPipelinePage: React.FC = () => {
  const { interviews, candidatesPool, addToast, studentProfile } = useApp();
  const navigate = useNavigate();
  const [activeRoomInterview, setActiveRoomInterview] = useState<Interview | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isJoinCodeModalOpen, setIsJoinCodeModalOpen] = useState(false);
  const [inputMeetingCode, setInputMeetingCode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Recruiter Live Room Controls & State
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'launcher' | 'chat' | 'code' | 'scorecard'>('launcher');
  const recruiterVideoRef = useRef<HTMLVideoElement>(null);

  // Live Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string; isQuestion?: boolean }[]>([
    {
      sender: 'Vikram Malhotra (You - Interviewer)',
      text: 'Welcome Jai Krish. Let’s begin with a brief walkthrough of your dental scan deep-learning architecture.',
      time: '03:30 PM',
    },
    {
      sender: 'Jai Krish K R (Candidate)',
      text: 'Hello Vikram! Ready to explain the neural pipeline and run live benchmarks.',
      time: '03:31 PM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Shared Code State in Interview Room
  const [sharedCode, setSharedCode] = useState<string>(
    `# Shared Live Technical Sandbox
# Synchronized in real time between Recruiter & Candidate

def preprocess_dental_scan(image_tensor, target_dim=(512, 512)):
    """
    Candidate is optimizing CLAHE normalization for PyTorch inference.
    """
    import numpy as np
    # Real-time typing feed...
    normalized = image_tensor / 255.0
    return normalized
`
  );

  // Recruiter Scorecard State
  const [scores, setScores] = useState({
    problemSolving: 88,
    codeQuality: 85,
    systemDesign: 90,
    communication: 92,
  });
  const [decision, setDecision] = useState<'Strong Hire' | 'Pass to Next Round' | 'Need Re-evaluation' | 'Reject'>('Strong Hire');
  const [interviewerFeedback, setInterviewerFeedback] = useState(
    'Demonstrated clear mastery of model latency optimization. Strong algorithmic foundations and great articulation of tradeoff choices.'
  );

  // Question Bank for Interviewer
  const questionBank = [
    {
      id: 'q-1',
      title: 'AI Dental Scanner Inference Latency',
      category: 'Deep Learning & Systems',
      difficulty: 'Hard',
      prompt: `# QUESTION 1: System Latency & Deep Learning Pipeline
# Walk through how you achieved <120ms inference latency in the AI Dental Scanner.
# Implement the model preprocessing and batching handler below:

def preprocess_dental_scan(image_tensor, target_dim=(512, 512)):
    # Implement image tensor normalization and CLAHE contrast enhancement
    pass
`,
    },
    {
      id: 'q-2',
      title: 'LRU Cache & Thread-Safe Concurrency',
      category: 'Data Structures & Algorithms',
      difficulty: 'Medium',
      prompt: `# QUESTION 2: Concurrency & Optimal Data Structures
# Implement an LRU (Least Recently Used) cache with O(1) get() and put() time complexity.

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        
    def get(self, key: int) -> int:
        pass
        
    def put(self, key: int, value: int) -> None:
        pass
`,
    },
    {
      id: 'q-3',
      title: 'Distributed Rate Limiter (Token Bucket)',
      category: 'System Design & Scalability',
      difficulty: 'Hard',
      prompt: `# QUESTION 3: Distributed Rate Limiter
# Implement a Token Bucket algorithm that handles 10,000 req/sec across microservices.

import time

class TokenBucketRateLimiter:
    def __init__(self, max_tokens: int, refill_rate_per_sec: float):
        self.capacity = max_tokens
        self.refill_rate = refill_rate_per_sec
        self.tokens = max_tokens
        self.last_refill = time.time()

    def allow_request(self, tokens_needed: int = 1) -> bool:
        pass
`,
    },
    {
      id: 'q-4',
      title: 'Asynchronous Network Port Scanner',
      category: 'Cybersecurity & Networks',
      difficulty: 'Medium',
      prompt: `# QUESTION 4: Security & Socket Defense
# Write an asynchronous port scanner in Python that identifies open services and timeouts.

import asyncio

async def scan_host_vulnerabilities(target_ip: str, ports: list[int]):
    # Implement asynchronous socket connection with timeout
    pass
`,
    },
  ];

  // Schedule New Interview Form State
  const [scheduleForm, setScheduleForm] = useState({
    candidateName: 'Jai Krish K R',
    title: 'Senior Full Stack Technical Interview',
    interviewer: 'Vikram Malhotra',
    type: 'Technical' as 'Technical' | 'HR',
    date: 'Tomorrow at 4:00 PM IST',
    notes: 'Focus on React performance, backend microservices, and practical portfolio defense.',
  });

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeRoomInterview && cameraOn) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          if (recruiterVideoRef.current) {
            recruiterVideoRef.current.srcObject = s;
          }
        })
        .catch(() => {});
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [activeRoomInterview, cameraOn]);

  const handleLaunchQuestion = (q: (typeof questionBank)[0]) => {
    setSharedCode(q.prompt);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Vikram Malhotra (You - Interviewer)',
        text: `⚡ LAUNCHED QUESTION TO CANDIDATE: [${q.title}]\nCategory: ${q.category} | Difficulty: ${q.difficulty}`,
        time,
        isQuestion: true,
      },
    ]);
    setActiveTab('code');
    addToast(`🚀 Dispatched "${q.title}" to Candidate's live code pad!`, 'success');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      { sender: 'Vikram Malhotra (You - Interviewer)', text: chatInput, time },
    ]);
    setChatInput('');
  };

  const handleSendQuickPrompt = (promptText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      { sender: 'Vikram Malhotra (You - Interviewer)', text: promptText, time },
    ]);
    addToast('Prompt sent to candidate chat.', 'info');
  };

  const handleSubmitEvaluation = () => {
    addToast(
      `Evaluation sealed! Jai Krish marked as "${decision}". InterTrack Level 4 badge authorized.`,
      'success'
    );
    setActiveRoomInterview(null);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`New interview round scheduled for ${scheduleForm.candidateName}!`, 'success');
    setIsScheduleModalOpen(false);
  };

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMeetingCode.trim()) {
      addToast('Please enter a valid meeting code.', 'warning');
      return;
    }
    const cleanCode = inputMeetingCode.trim().toUpperCase();
    navigate(`/interview-room/${cleanCode}?role=interviewer`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    addToast(`Room Code ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const stages = [
    { title: 'Resume Screening', count: 48, badge: 'Stage 1' },
    { title: 'Assessment Verified', count: 12, badge: 'Stage 2' },
    { title: 'Technical Interview', count: 6, badge: 'Stage 3' },
    { title: 'HR Interview', count: 3, badge: 'Stage 4' },
    { title: 'Final Placement Offer', count: 2, badge: 'Stage 5' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Recruiter Interview Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Interviews & Live Coding Pipeline
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Conduct live technical defense rounds, launch coding challenges in real-time, and grade candidate skills with online compiler.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsJoinCodeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-4 h-4 text-indigo-600" />
            <span>Join with Code</span>
          </button>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Interview</span>
          </button>
        </div>
      </div>

      {/* Pipeline Stage Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stages.map((stg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border text-center transition-all ${
              idx === 2
                ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm'
                : 'bg-white border-slate-200 shadow-card-subtle'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-indigo-700 block mb-1">
              {stg.badge}
            </span>
            <div className="text-xl font-black font-mono text-slate-900">{stg.count}</div>
            <div className="text-xs font-bold text-slate-700 mt-0.5">{stg.title}</div>
          </div>
        ))}
      </div>

      {/* Scheduled Interviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">Scheduled Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map((int) => {
            const roomCode = `SKP-INT-${int.id.slice(-4).toUpperCase()}`;
            return (
              <div
                key={int.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:border-indigo-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                      {int.type} Defense Round
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                        {roomCode}
                      </span>
                      <button
                        onClick={() => handleCopyCode(roomCode)}
                        title="Copy Room Code to share with candidate or peer interviewer"
                        className="p-1 hover:text-indigo-600 text-slate-400 transition-colors"
                      >
                        {copiedId === roomCode ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display">{int.title}</h3>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date & Time:</span>
                      <span className="font-bold text-slate-900">{int.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lead Interviewer:</span>
                      <span className="font-bold text-slate-900">{int.interviewer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Candidate:</span>
                      <span className="font-bold text-indigo-700">Jai Krish K R (SRM IST)</span>
                    </div>
                  </div>

                  {int.notes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                      "{int.notes}"
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveRoomInterview(int)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5 text-slate-500" />
                    <span>Quick Video Room</span>
                  </button>

                  <Link
                    to={`/interview-room/${roomCode}?role=interviewer`}
                    className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Open Recruiter Live IDE</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join via Meeting Code Modal */}
      <Modal
        isOpen={isJoinCodeModalOpen}
        onClose={() => setIsJoinCodeModalOpen(false)}
        title="Join Live Interview Room (Interviewer Mode)"
        subtitle="Connect instantly to the candidate's video feed and real-time online compiler"
      >
        <form onSubmit={handleJoinWithCode} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enter Meeting Code
            </label>
            <input
              type="text"
              required
              value={inputMeetingCode}
              onChange={(e) => setInputMeetingCode(e.target.value)}
              placeholder="e.g. SKP-ROOM-8842"
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold uppercase rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <span className="font-bold text-slate-800">Demo Active Rooms:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {['SKP-ROOM-8842', 'SKP-INT-4821', 'SKP-TECH-7719'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setInputMeetingCode(code)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-mono text-[11px] font-bold text-indigo-700 hover:bg-indigo-50"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsJoinCodeModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Connect to Room</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Recruiter Live Technical Interview Room Modal */}
      {activeRoomInterview && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                    <span>Recruiter Technical Room: {activeRoomInterview.title}</span>
                    <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                      LIVE DEFENSE
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Candidate: <strong className="text-white">Jai Krish K R</strong> (SRM IST) • Interviewer:{' '}
                    <strong className="text-white">{activeRoomInterview.interviewer}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
                  ⏱️ 24:18 Elapsed
                </span>
                <button
                  onClick={() => setActiveRoomInterview(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Room Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 flex-1 overflow-y-auto">
              {/* Left Column: Video Streams & Recruiter Controls */}
              <div className="lg:col-span-4 space-y-3 flex flex-col">
                {/* Dual Video Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Candidate Feed */}
                  <div className="relative bg-slate-950 rounded-2xl border border-slate-800 aspect-video overflow-hidden group">
                    <img
                      src={studentProfile.avatar}
                      alt="Candidate Video Stream"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Jai Krish (Candidate)</span>
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-cyan-400">
                      HD 1080p
                    </div>
                  </div>

                  {/* Recruiter Feed */}
                  <div className="relative bg-slate-950 rounded-2xl border border-slate-800 aspect-video overflow-hidden flex items-center justify-center">
                    {cameraOn ? (
                      <video
                        ref={recruiterVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <CameraOff className="w-6 h-6 mb-1" />
                        <span className="text-[10px]">Camera Off</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>You (Interviewer)</span>
                    </div>
                  </div>
                </div>

                {/* Recruiter Media Controls */}
                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span>{micOn ? 'Mute' : 'Unmuted'}</span>
                  </button>

                  <button
                    onClick={() => setCameraOn(!cameraOn)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      cameraOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {cameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                    <span>{cameraOn ? 'Stop Cam' : 'Start Cam'}</span>
                  </button>

                  <button
                    onClick={() => addToast('Screen sharing activated for code architecture.', 'info')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Share Screen</span>
                  </button>
                </div>

                {/* Quick Recruiter Prompt Templates */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs space-y-2 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>1-Click Interviewer Inquiries</span>
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => handleSendQuickPrompt('Please explain the Big-O time and space complexity of this logic.')}
                      className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-800 transition-colors text-[11px]"
                    >
                      💬 "Explain Big-O time & space complexity"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendQuickPrompt('How would you scale this microservice to handle 50k concurrent users?')}
                      className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-800 transition-colors text-[11px]"
                    >
                      💬 "How would you scale this to 50k concurrent users?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendQuickPrompt('What happens if the primary database connection fails during this transaction?')}
                      className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-800 transition-colors text-[11px]"
                    >
                      💬 "How do you handle database failover/race conditions?"
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Tabs (Question Launcher, Live Chat, Code Monitor, Scorecard) */}
              <div className="lg:col-span-8 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-slate-900/60 shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('launcher')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'launcher'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Question Launcher</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                        activeTab === 'chat'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Live Message Box</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'code'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Candidate Code Monitor</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('scorecard')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'scorecard'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Grading Scorecard</span>
                    </button>
                  </div>
                </div>

                {/* Tab 1: Question Launcher */}
                {activeTab === 'launcher' && (
                  <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Technical Question Dispatcher
                      </h4>
                      <p className="text-xs text-slate-400">
                        Select a verified technical problem to launch directly onto the candidate’s code editor in real-time.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {questionBank.map((q) => (
                        <div
                          key={q.id}
                          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                                {q.category}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  q.difficulty === 'Hard'
                                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-white mb-2">{q.title}</h5>
                            <pre className="text-[10px] font-mono text-slate-400 bg-slate-950 p-2 rounded-xl overflow-x-auto border border-slate-800 max-h-24">
                              {q.prompt}
                            </pre>
                          </div>

                          <button
                            onClick={() => handleLaunchQuestion(q)}
                            className="mt-3 w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            <span>Launch to Candidate Screen</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Live Message Box (Chat) */}
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-[400px]">
                    <div className="p-3 bg-slate-900/80 border-b border-slate-800 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-300">Synchronized Room Messages</span>
                      <span className="text-emerald-400 text-[10px] font-mono">● Active Connection</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                            msg.sender.includes('Interviewer') || msg.sender.includes('You')
                              ? 'ml-auto bg-indigo-900/60 border border-indigo-700/60 text-white'
                              : 'bg-slate-900 border border-slate-800 text-slate-200'
                          } ${msg.isQuestion ? 'ring-2 ring-yellow-400/40' : ''}`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 gap-4">
                            <span className="font-bold text-slate-300">{msg.sender}</span>
                            <span className="font-mono">{msg.time}</span>
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleSendChatMessage}
                      className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type message, hints, or technical questions to the candidate..."
                        className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* Tab 3: Candidate Code Monitor */}
                {activeTab === 'code' && (
                  <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <FileCode className="w-4 h-4 text-cyan-400" />
                        <span>Live Candidate Code Pad (Python 3.12 Runtime)</span>
                      </div>
                      <button
                        onClick={() => addToast('Code sandbox tests passed with 0 memory violations.', 'success')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Run Code Sandbox</span>
                      </button>
                    </div>

                    <textarea
                      value={sharedCode}
                      onChange={(e) => setSharedCode(e.target.value)}
                      rows={14}
                      className="w-full flex-1 p-4 font-mono text-xs text-emerald-400 bg-slate-950 rounded-2xl border border-slate-800 outline-none focus:border-indigo-500"
                      spellCheck={false}
                    />

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                      <span>✓ Syntax Check: OK</span>
                      <span className="text-cyan-400">Complexity: O(N) Time • O(1) Aux Space</span>
                    </div>
                  </div>
                )}

                {/* Tab 4: Grading Scorecard */}
                {activeTab === 'scorecard' && (
                  <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Technical Defense Scorecard & Evaluation
                      </h4>
                      <p className="text-xs text-slate-400">
                        Grade the candidate's live technical performance to verify their InterTrack credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-300">Problem Solving & Algorithms</span>
                          <span className="font-mono text-cyan-400">{scores.problemSolving}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scores.problemSolving}
                          onChange={(e) => setScores((s) => ({ ...s, problemSolving: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-300">Code Quality & Edge Cases</span>
                          <span className="font-mono text-cyan-400">{scores.codeQuality}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scores.codeQuality}
                          onChange={(e) => setScores((s) => ({ ...s, codeQuality: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-300">System Architecture Defense</span>
                          <span className="font-mono text-cyan-400">{scores.systemDesign}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scores.systemDesign}
                          onChange={(e) => setScores((s) => ({ ...s, systemDesign: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-300">Technical Articulation</span>
                          <span className="font-mono text-cyan-400">{scores.communication}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scores.communication}
                          onChange={(e) => setScores((s) => ({ ...s, communication: Number(e.target.value) }))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Interviewer Qualitative Notes
                      </label>
                      <textarea
                        rows={3}
                        value={interviewerFeedback}
                        onChange={(e) => setInterviewerFeedback(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">Hiring Decision:</span>
                        {(['Strong Hire', 'Pass to Next Round', 'Need Re-evaluation', 'Reject'] as const).map(
                          (dec) => (
                            <button
                              key={dec}
                              type="button"
                              onClick={() => setDecision(dec)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                                decision === dec
                                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                                  : 'bg-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              {dec}
                            </button>
                          )
                        )}
                      </div>

                      <button
                        onClick={handleSubmitEvaluation}
                        className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Seal & Verify InterTrack Level 4</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule New Interview Session"
        subtitle="Book a technical or HR interview slot with a candidate"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              value={scheduleForm.candidateName}
              onChange={(e) => setScheduleForm((s) => ({ ...s, candidateName: e.target.value }))}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Interview Title / Topic
              </label>
              <input
                type="text"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm((s) => ({ ...s, title: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Round Type
              </label>
              <select
                value={scheduleForm.type}
                onChange={(e) => setScheduleForm((s) => ({ ...s, type: e.target.value as any }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              >
                <option value="Technical">Technical Defense Round</option>
                <option value="HR">HR & Cultural Alignment</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Interviewer
              </label>
              <input
                type="text"
                value={scheduleForm.interviewer}
                onChange={(e) => setScheduleForm((s) => ({ ...s, interviewer: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Scheduled Slot
              </label>
              <input
                type="text"
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm((s) => ({ ...s, date: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Assessment Focus & Notes
            </label>
            <textarea
              rows={3}
              value={scheduleForm.notes}
              onChange={(e) => setScheduleForm((s) => ({ ...s, notes: e.target.value }))}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
