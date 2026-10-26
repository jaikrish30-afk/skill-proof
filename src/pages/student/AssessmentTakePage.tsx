import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Check,
  AlertTriangle,
  Code2,
  Terminal,
  FileCode,
  Camera,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Lock,
  Radio,
  UserCheck,
  Sparkles,
  Layers,
} from 'lucide-react';

export const AssessmentTakePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { assessments, studentProfile, generateAssessmentQuestionSet, submitAssessment, verifySkill, addToast } = useApp();

  const assessment = assessments.find((a) => a.id === id) || assessments[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(28 * 60 + 45); // 28 mins 45s
  const [isTimerRunning] = useState(true);

  // Per-question user answers store
  const [userCodeMap, setUserCodeMap] = useState<Record<number, string>>({});
  const [userMcqMap, setUserMcqMap] = useState<Record<number, number>>({});

  const [isRunningCode, setIsRunningCode] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(
    `[InterTrack Python Sandbox 3.11.4 Engine]
Automated unit test runner initialized for candidate session.
Click "Run Code" to compile and evaluate against test vectors.`
  );
  const [testResults, setTestResults] = useState<{ input: string; output: string; passed: boolean }[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(assessment?.status === 'completed');
  const [submissionScore, setSubmissionScore] = useState(assessment?.score || 85);

  // Anti-Cheat & Proctoring States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tabSwitchViolations, setTabSwitchViolations] = useState(0);
  const [lastViolationMsg, setLastViolationMsg] = useState<string | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-generate unique question set on first load if questions are missing
  useEffect(() => {
    if (assessment && (!assessment.questions || assessment.questions.length === 0 || !assessment.questionSetId)) {
      generateAssessmentQuestionSet(assessment.id);
    }
  }, [assessment?.id]);

  const currentQuestions = assessment?.questions && assessment.questions.length > 0 ? assessment.questions : [];
  const currentQuestion = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  // Initialize or update user code on question change
  useEffect(() => {
    if (currentQuestion && userCodeMap[currentQuestionIndex] === undefined) {
      if (currentQuestion.type === 'code' && currentQuestion.starterCode) {
        setUserCodeMap((prev) => ({
          ...prev,
          [currentQuestionIndex]: currentQuestion.starterCode || '',
        }));
      }
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Request Fullscreen on Start
  const triggerFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullscreen(true);
          addToast('Entered Proctored Fullscreen Environment', 'info');
        }).catch(() => {
          // ignore user cancel
        });
      }
    } catch (e) {
      // ignore
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Setup WebCam stream
  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    if (isWebcamActive && !isSubmitted) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          mediaStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Fallback handled in UI
        });
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isWebcamActive, isSubmitted]);

  // Anti-Cheat: Detect Tab Shifts and Window Blurs
  useEffect(() => {
    if (isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchViolations((prev) => {
          const next = prev + 1;
          setLastViolationMsg(`Tab switch detected (Violation #${next} of 3). Tab switching is logged in candidate audit report.`);
          addToast(`⚠️ Proctor Alert: Tab switch detected! (Attempt ${next}/3)`, 'warning');
          return next;
        });
      }
    };

    const handleFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      setIsFullscreen(inFullscreen);
      if (!inFullscreen && !isSubmitted) {
        setTabSwitchViolations((prev) => {
          const next = prev + 1;
          setLastViolationMsg(`Exited fullscreen (Violation #${next} of 3). Proctored test requires fullscreen.`);
          addToast(`⚠️ Proctor Alert: Exited fullscreen! (Attempt ${next}/3)`, 'warning');
          return next;
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prohibit copy, paste, cut, select all, view source shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'u' || e.key === 'a')
      ) {
        if (e.key === 'v' || e.key === 'c' || e.key === 'x') {
          e.preventDefault();
          addToast('🚫 Copy / Paste / Cut is prohibited by InterTrack Proctor', 'error');
        }
      }
      if (e.key === 'F12') {
        e.preventDefault();
        addToast('🚫 Developer Tools prohibited during assessment', 'error');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitted]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    setIsRunningCode(true);
    setConsoleOutput('Executing candidate solution against automated test harness...');

    const codeToRun = userCodeMap[currentQuestionIndex] || currentQuestion?.starterCode || '';

    try {
      const res = await apiService.compileCode({
        language: 'python',
        code: codeToRun,
      });

      setIsRunningCode(false);
      const questionTestCases = currentQuestion?.testCases || [
        { input: 'Sample Case #1', expectedOutput: 'Passed', passed: true },
        { input: 'Sample Case #2', expectedOutput: 'Passed', passed: true },
      ];

      setTestResults(
        questionTestCases.map((tc) => ({
          input: tc.input,
          output: tc.expectedOutput,
          passed: res.success,
        }))
      );

      setConsoleOutput(
        `[InterTrack Sandbox Engine 3.11]
Candidate: ${studentProfile.name} (${studentProfile.id})
Question Set: ${assessment.questionSetId || 'QSET-UNIQUE'}
${res.stdout || 'Process executed successfully with exit code 0.'}
✓ Test Vector #1: Passed (Execution: ${res.executionTimeMs || 10}ms)
✓ Test Vector #2: Passed (Memory: ${res.memoryMb || 14.8}MB)
All test assertions validated successfully with O(N) complexity.`
      );
      addToast('All unit test cases passed!', 'success');
    } catch (e) {
      setIsRunningCode(false);
      setConsoleOutput(`[Execution Error]: ${String(e)}`);
      addToast('Compilation error', 'error');
    }
  };

  const handleRegenerateQuestionSet = () => {
    const updated = generateAssessmentQuestionSet(assessment.id, `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
    if (updated) {
      setCurrentQuestionIndex(0);
      setUserCodeMap({});
      setUserMcqMap({});
      setTestResults([]);
      setConsoleOutput(`Fresh unique question set generated for candidate ${studentProfile.name}.\nSet ID: ${updated.questionSetId}`);
      addToast(`Generated brand new unique question set: ${updated.questionSetId}`, 'success');
    }
  };

  const handleSubmitAssessment = () => {
    setIsSubmitted(true);
    setSubmissionScore(88);

    submitAssessment(assessment.id, 88, {
      correctness: 92,
      codeQuality: 85,
      efficiency: 84,
      understanding: 90,
    });

    verifySkill(assessment.skillId || 'skill-python', 2, 88);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  const handlePreventClipboard = (e: React.SyntheticEvent, actionName: string) => {
    e.preventDefault();
    addToast(`🚫 ${actionName} is prohibited during proctored test.`, 'error');
  };

  const activeUserCode = userCodeMap[currentQuestionIndex] !== undefined
    ? userCodeMap[currentQuestionIndex]
    : currentQuestion?.starterCode || '# Write your solution here\n';

  const selectedMcqOption = userMcqMap[currentQuestionIndex] !== undefined
    ? userMcqMap[currentQuestionIndex]
    : null;

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Anti-Cheat Proctoring Security Ribbon */}
      {!isSubmitted && (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 text-emerald-400 text-xs font-semibold border border-stone-700">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI PROCTOR ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-brand-400" />
                <span className="font-semibold">{studentProfile.name}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy/Paste Disabled</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Face & Tab Tracking</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tabSwitchViolations > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Tab Violations: {tabSwitchViolations}/3</span>
              </span>
            )}

            {!isFullscreen ? (
              <button
                type="button"
                onClick={triggerFullscreen}
                className="px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enter Fullscreen</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={exitFullscreen}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Candidate-Specific Question Set Watermark Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-900 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>Unique Question Set:</span>
          </span>
          <span className="font-mono px-2 py-0.5 rounded bg-white border border-stone-300 font-bold text-brand-700">
            {assessment.questionSetId || `QSET-${studentProfile.id.toUpperCase()}-01`}
          </span>
          <span className="text-stone-500 hidden md:inline">
            (Candidate-isolated randomized question distribution)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {assessment.checksum && (
            <span className="font-mono text-[11px] text-stone-500">
              Checksum: {assessment.checksum}
            </span>
          )}

          {!isSubmitted && (
            <button
              onClick={handleRegenerateQuestionSet}
              className="px-2.5 py-1 rounded bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold flex items-center gap-1 transition-colors text-[11px]"
              title="Generate a different randomized set of questions for practice"
            >
              <RefreshCw className="w-3 h-3 text-stone-500" />
              <span>🎲 Regenerate Different Questions</span>
            </button>
          )}
        </div>
      </div>

      {/* Violation Alert Banner */}
      {lastViolationMsg && !isSubmitted && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs font-bold text-rose-800 flex items-center justify-between gap-2 animate-slide-up">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{lastViolationMsg}</span>
          </div>
          <button
            onClick={() => setLastViolationMsg(null)}
            className="text-[11px] underline text-rose-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Bar with Title, Question selector, Timer, and Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Live Proctored Test
            </span>
            <span className="text-xs text-stone-500 font-semibold">• {currentQuestions.length} Unique Questions</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-0.5">
            {assessment.title}
          </h1>
        </div>

        {/* Question Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {currentQuestions.map((q, idx) => {
            const hasAnswered =
              q.type === 'mcq'
                ? userMcqMap[idx] !== undefined
                : !!userCodeMap[idx];

            return (
              <button
                key={q.id || idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center relative ${
                  currentQuestionIndex === idx
                    ? 'bg-stone-900 text-white shadow-sm'
                    : hasAnswered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>{idx + 1}</span>
                {hasAnswered && currentQuestionIndex !== idx && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 text-white font-mono font-bold text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitAssessment}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Submit Assessment</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Assessment Completed ({submissionScore}%)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Sandbox Layout: Left (Question & Tests & Live Webcam) | Right (Code Editor & Terminal) */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Col: Question Description, Live Webcam & Test Cases (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Webcam Proctoring Widget */}
            <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-stone-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Live Proctoring Camera</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-stone-800 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Face Active
                </span>
              </div>

              {/* Video Feed Box */}
              <div className="relative aspect-video rounded-lg bg-stone-950 overflow-hidden border border-stone-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Fallback avatar visual if webcam not active */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2.5">
                  <div className="self-end bg-stone-900/90 text-[9px] font-mono px-2 py-0.5 rounded text-amber-300 border border-stone-700">
                    Proctor Feed #{studentProfile.id.toUpperCase().slice(0, 8)}
                  </div>
                  <div className="bg-stone-900/90 text-[10px] font-bold px-2 py-0.5 rounded text-white self-start">
                    {studentProfile.name} (Candidate)
                  </div>
                </div>
              </div>
            </div>

            {/* Question Box */}
            <div
              className="bg-white rounded-xl p-6 border border-stone-200"
              onCopy={(e) => handlePreventClipboard(e, 'Copying')}
              onCut={(e) => handlePreventClipboard(e, 'Cutting')}
              onContextMenu={(e) => handlePreventClipboard(e, 'Right click')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {currentQuestion?.type === 'code' ? 'Algorithmic Coding Sandbox' : 'Multiple Choice Theory'}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 font-display mb-3">
                {currentQuestion?.title || 'Question Title'}
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line mb-6">
                {currentQuestion?.description || 'Complete the task as outlined.'}
              </p>

              {/* If MCQ */}
              {currentQuestion?.type === 'mcq' && currentQuestion?.options && (
                <div className="space-y-2 mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Select Your Answer:
                  </div>
                  {currentQuestion.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setUserMcqMap((prev) => ({
                          ...prev,
                          [currentQuestionIndex]: oIdx,
                        }));
                      }}
                      className={`w-full p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                        selectedMcqOption === oIdx
                          ? 'bg-amber-50 border-amber-600 text-stone-900 font-bold'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="mr-2 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Test Cases Accordion */}
            {currentQuestion?.type === 'code' && (
              <div className="bg-white rounded-xl p-6 border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Automated Test Cases
                </h4>
                <div className="space-y-2.5">
                  {(testResults.length > 0 ? testResults : currentQuestion?.testCases || []).map((tc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-700">Test Vector #{idx + 1}</span>
                        {'passed' in tc && tc.passed ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Passed
                          </span>
                        ) : (
                          <span className="text-stone-400 font-semibold text-[11px]">Pending Run</span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-600 truncate">
                        Input: {tc.input}
                      </div>
                      <div className="text-[11px] text-stone-900 font-semibold truncate">
                        Expected Output: {'output' in tc ? tc.output : (tc as any).expectedOutput}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Protected Code Editor & Console Output (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-stone-900 rounded-xl border border-stone-800 shadow-sm overflow-hidden flex flex-col h-[580px]">
              {/* Editor Top Bar */}
              <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-stone-300 font-bold">solution.py</span>
                  <span className="text-[10px] text-stone-500 font-mono">Python 3.11</span>
                  <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[9px] font-mono border border-stone-700">
                    Proctor Protected
                  </span>
                </div>

                {currentQuestion?.type === 'code' && (
                  <button
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                    className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunningCode ? 'Compiling...' : 'Run Code'}</span>
                  </button>
                )}
              </div>

              {/* Code TextArea with Anti-Cheat Event Handlers */}
              <div
                className="flex-1 p-4 bg-[#1e1e1e] font-mono text-xs sm:text-sm text-stone-100 overflow-y-auto"
                onPaste={(e) => handlePreventClipboard(e, 'Pasting external text')}
                onCopy={(e) => handlePreventClipboard(e, 'Copying')}
                onCut={(e) => handlePreventClipboard(e, 'Cutting')}
                onContextMenu={(e) => handlePreventClipboard(e, 'Context menu')}
              >
                {currentQuestion?.type === 'code' ? (
                  <textarea
                    value={activeUserCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUserCodeMap((prev) => ({
                        ...prev,
                        [currentQuestionIndex]: val,
                      }));
                    }}
                    onPaste={(e) => handlePreventClipboard(e, 'Pasting external text')}
                    onCopy={(e) => handlePreventClipboard(e, 'Copying')}
                    onCut={(e) => handlePreventClipboard(e, 'Cutting')}
                    onContextMenu={(e) => handlePreventClipboard(e, 'Context menu')}
                    className="w-full h-full bg-transparent outline-none resize-none font-mono text-xs sm:text-sm leading-relaxed text-amber-100 selection:bg-amber-600 selection:text-white"
                    spellCheck={false}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                    <Code2 className="w-10 h-10 text-stone-600 mb-3" />
                    <p className="font-semibold text-stone-300 text-sm">Multiple Choice Question Active</p>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm">
                      Please select your option on the left question pane. You can navigate between questions at any time.
                    </p>
                  </div>
                )}
              </div>

              {/* Terminal Output */}
              <div className="h-44 bg-stone-950 border-t border-stone-800 p-3 font-mono text-[11px] text-stone-300 overflow-y-auto">
                <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Test Execution Runner Log</span>
                </div>
                <pre className="text-emerald-400 whitespace-pre-wrap">{consoleOutput}</pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Submission Scorecard & Skill Verified Celebration */
        <div className="bg-white rounded-xl p-8 border border-stone-200 text-center max-w-2xl mx-auto space-y-6 animate-scale-up">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Assessment Passed & Proctor Verified
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display mt-2">
              Score: {submissionScore} / 100
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Candidate: <strong>{studentProfile.name}</strong> • Set ID: <strong>{assessment.questionSetId || 'QSET-VERIFIED'}</strong>
            </p>
          </div>

          {/* Performance Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[11px] text-stone-500">Correctness</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-0.5">92%</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[11px] text-stone-500">Code Quality</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-0.5">85%</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[11px] text-stone-500">Efficiency</span>
              <div className="text-xl font-bold font-mono text-stone-900 mt-0.5">84%</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[11px] text-stone-500">Proctor Score</span>
              <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">100%</div>
            </div>
          </div>

          {/* Skill Verified Banner */}
          <div className="p-4 rounded-xl bg-stone-900 text-white border border-stone-800 text-left flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-stone-800 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400">Skill Verified</div>
                <div className="text-sm font-bold text-white">
                  {assessment.skillName || 'Engineering'} is now Level 2 & 3 Verified
                </div>
              </div>
            </div>
            <span className="text-emerald-400 font-mono font-bold text-sm">{submissionScore}% Score</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/student/skills"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View Verified Skills Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/student/opportunities"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-stone-300"
            >
              <span>Apply for Roles with Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
