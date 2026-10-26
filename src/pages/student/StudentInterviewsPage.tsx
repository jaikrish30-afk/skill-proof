import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Interview } from '../../types';
import { useNavigate, Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  User,
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Camera,
  Share2,
  ShieldCheck,
  Code2,
  MessageSquare,
  Send,
  Sparkles,
  Play,
  Terminal,
  FileCode,
  HelpCircle,
  Copy,
  Check,
  Plus,
  KeyRound,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const StudentInterviewsPage: React.FC = () => {
  const { interviews, addToast } = useApp();
  const navigate = useNavigate();
  const [activeRoomInterview, setActiveRoomInterview] = useState<Interview | null>(null);
  const [isJoinCodeModalOpen, setIsJoinCodeModalOpen] = useState(false);
  const [inputMeetingCode, setInputMeetingCode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const studentVideoRef = useRef<HTMLVideoElement>(null);

  // Live Interviewer Question Launcher & Chat States
  const [activeTab, setActiveTab] = useState<'code' | 'chat'>('code');
  const [sharedCode, setSharedCode] = useState<string>(
    `# Shared Live Technical Sandbox
# Synchronized in real time between Recruiter & Candidate

def defense_walkthrough():
    """
    Demonstrate your algorithmic design & architecture defense.
    """
    pass
`
  );

  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string; isQuestion?: boolean }[]>([
    {
      sender: 'Vikram Malhotra (Interviewer)',
      text: 'Welcome to your Level 4 Technical Defense interview, Jai Krish! Please prepare your code walkthrough.',
      time: '3:30 PM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Preset Technical Interviewer Questions
  const technicalQuestions = [
    {
      title: 'AI Dental Scanner Architecture',
      prompt: `# QUESTION 1: System Latency & Deep Learning Pipeline
# Walk through how you achieved <120ms inference latency in the AI Dental Scanner.
# Implement the model preprocessing and batching handler below:

def preprocess_dental_scan(image_tensor, target_dim=(512, 512)):
    # Implement image tensor normalization and CLAHE contrast enhancement
    pass
`,
    },
    {
      title: 'Python Concurrency & LRU Cache',
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
      title: 'Network Port Scanner & CVE Risk Triage',
      prompt: `# QUESTION 3: Security & Socket Defense
# Write an asynchronous port scanner in Python that identifies vulnerable open services.

import asyncio

async def scan_host_vulnerabilities(target_ip: str, ports: list[int]):
    # Implement asynchronous socket connection with timeout
    pass
`,
    },
  ];

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeRoomInterview && cameraOn) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          if (studentVideoRef.current) {
            studentVideoRef.current.srcObject = s;
          }
        })
        .catch(() => {});
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeRoomInterview, cameraOn]);

  const handleLaunchQuestion = (q: { title: string; prompt: string }) => {
    setSharedCode(q.prompt);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Vikram Malhotra (Interviewer)',
        text: `⚡ LAUNCHED QUESTION: ${q.title}\nPlease see the shared code pad to begin your defense.`,
        time,
        isQuestion: true,
      },
    ]);
    setActiveTab('code');
    addToast(`Technical Question "${q.title}" launched to code pad!`, 'success');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      { sender: 'Jai Krish K R (You)', text: chatInput, time },
    ]);
    setChatInput('');
  };

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMeetingCode.trim()) {
      addToast('Please enter a valid meeting code.', 'warning');
      return;
    }
    const cleanCode = inputMeetingCode.trim().toUpperCase();
    navigate(`/interview-room/${cleanCode}?role=candidate`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    addToast(`Room Code ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200 mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Verified Technical & HR Interviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            My Interviews & Live Rooms
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Level 4 Technical Defense with live video streaming, shared VS Code online compiler, and question launcher.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsJoinCodeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-4 h-4 text-brand-600" />
            <span>Join with Code</span>
          </button>

          <Link
            to="/interview-room/SKP-ROOM-8842?role=candidate"
            className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4" />
            <span>Launch Live IDE Room</span>
          </Link>
        </div>
      </div>

      {/* Interviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviews.map((int) => {
          const roomCode = `SKP-INT-${int.id.slice(-4).toUpperCase()}`;
          return (
            <div
              key={int.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card-subtle flex flex-col justify-between hover:border-brand-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      int.type === 'Technical'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {int.type} Defense Round
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                      {roomCode}
                    </span>
                    <button
                      onClick={() => handleCopyCode(roomCode)}
                      title="Copy Meeting Code to share with peers or interviewers"
                      className="p-1 hover:text-brand-600 text-slate-400 transition-colors"
                    >
                      {copiedId === roomCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display mb-1">{int.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {int.company} • {int.role}
                  </span>
                </p>

                {/* Schedule Info Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date & Time:
                    </span>
                    <span className="font-bold text-slate-900">{int.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> Interviewer:
                    </span>
                    <span className="font-bold text-slate-900">
                      {int.interviewer} ({int.interviewerRole})
                    </span>
                  </div>
                </div>

                {/* Pipeline Stages Tracker */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Hiring Pipeline Progression
                  </div>
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {int.stages.map((stg, i) => (
                      <div
                        key={i}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-bold border transition-all ${
                          stg.status === 'completed'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : stg.status === 'current'
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {stg.status === 'completed' ? '✓' : i + 1}
                        <div className="truncate text-[9px] mt-0.5">{stg.name.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setActiveRoomInterview(int)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5 text-slate-500" />
                  <span>Quick Modal</span>
                </button>

                <Link
                  to={`/interview-room/${roomCode}?role=candidate`}
                  className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Enter VS Code Live Room</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Join via Meeting Code Modal */}
      <Modal
        isOpen={isJoinCodeModalOpen}
        onClose={() => setIsJoinCodeModalOpen(false)}
        title="Join Live Interview Room via Meeting Code"
        subtitle="Connect seamlessly with interviewers, candidates, or peer evaluators"
      >
        <form onSubmit={handleJoinWithCode} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enter 12-Character Meeting Code
            </label>
            <input
              type="text"
              required
              value={inputMeetingCode}
              onChange={(e) => setInputMeetingCode(e.target.value)}
              placeholder="e.g. SKP-ROOM-8842"
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold uppercase rounded-xl border border-slate-200 focus:border-brand-500 outline-none"
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
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-mono text-[11px] font-bold text-brand-700 hover:bg-brand-50"
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
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Connect to Room</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Simulated Live Verified Video Room Modal with Question Launcher & Chat */}
      <Modal
        isOpen={!!activeRoomInterview}
        onClose={() => setActiveRoomInterview(null)}
        title={activeRoomInterview ? `${activeRoomInterview.company} Verified Technical Room` : ''}
        subtitle="Live encrypted defense session with synchronized code pad and question dispatcher"
        maxWidth="4xl"
      >
        {activeRoomInterview && (
          <div className="space-y-6">
            {/* Video Streams */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Interviewer Stream */}
              <div className="relative rounded-2xl bg-slate-950 aspect-video overflow-hidden border border-slate-800 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                  alt="Interviewer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeRoomInterview.interviewer} (Interviewer Lead)</span>
                </div>
              </div>

              {/* Student Live Stream */}
              <div className="relative rounded-2xl bg-slate-900 aspect-video overflow-hidden border border-slate-800 flex items-center justify-center">
                {cameraOn ? (
                  <video
                    ref={studentVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-500 text-xs font-semibold">Camera is Turned Off</div>
                )}
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Jai Krish K R (Candidate Live Stream)</span>
                </div>
              </div>
            </div>

            {/* Question Launcher Preset Toolbar */}
            <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Interviewer Live Question Dispatcher</span>
                </span>
                <span className="text-[10px] text-slate-400">Click to push prompt into code pad</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLaunchQuestion(q)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-900/80 hover:bg-indigo-700 text-white text-xs font-semibold border border-indigo-400/40 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 text-cyan-300 fill-current" />
                    <span>Launch: {q.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs for Code Sandbox vs Live Chat */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Shared Code Defense Pad</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live Interviewer Message Box ({chatMessages.length})</span>
              </button>
            </div>

            {activeTab === 'code' ? (
              /* Synchronized Code Pad */
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-64">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>defense_solution.py</span>
                  <span className="text-emerald-400">● Synchronized in Real-Time</span>
                </div>
                <textarea
                  value={sharedCode}
                  onChange={(e) => setSharedCode(e.target.value)}
                  className="w-full flex-1 p-3 bg-transparent text-cyan-200 font-mono text-xs outline-none resize-none"
                  spellCheck={false}
                />
              </div>
            ) : (
              /* Live Message Box */
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col h-64 justify-between">
                <div className="overflow-y-auto space-y-3 pr-2 max-h-44">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-2xl text-xs ${
                        msg.isQuestion
                          ? 'bg-indigo-100/90 border border-indigo-300 text-indigo-950 font-medium'
                          : msg.sender.includes('You')
                          ? 'bg-brand-600 text-white ml-8 text-right'
                          : 'bg-white border border-slate-200 text-slate-800 mr-8'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] opacity-75 mb-0.5">
                        <span className="font-bold">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 mt-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type response or question to interviewer..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-1.5 ${
                    micOn ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-700 border-rose-300'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{micOn ? 'Mute' : 'Unmute'}</span>
                </button>

                <button
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-1.5 ${
                    cameraOn ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-700 border-rose-300'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{cameraOn ? 'Stop Camera' : 'Start Camera'}</span>
                </button>
              </div>

              <button
                onClick={() => setActiveRoomInterview(null)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors"
              >
                Leave Room
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
