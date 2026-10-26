import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { AIChatMessage } from '../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Code2,
  Briefcase,
  Shield,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const AIAgentDrawer: React.FC = () => {
  const { isAIAgentOpen, setIsAIAgentOpen, aiInitialPrompt } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `### 👋 Hi! I am the InterTrack Real-Time AI Copilot.\n\nI am here to help you accelerate your technical career and internships:\n- **Solve & Debug Code**: Ask me to write algorithms in Python, JavaScript, C++, or Java.\n- **Internship Matching**: Discover top companies looking for your verified skills.\n- **Technical Defense Prep**: Practice mock questions for your Level 4 live interview.\n- **Customer Feedback & Insights**: Ask about verified reviews from students and hiring managers.\n\nHow can I help you today?`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'What internships match my profile?',
        'Explain Two Sum algorithm in Python',
        'How to ace Level 4 Technical Defense?',
        'Show InterTrack customer reviews',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAIAgentOpen) {
      scrollToBottom();
    }
  }, [messages, isAIAgentOpen]);

  // Handle incoming initial prompt if triggered from elsewhere
  useEffect(() => {
    if (aiInitialPrompt && isAIAgentOpen) {
      handleSendMessage(aiInitialPrompt);
    }
  }, [aiInitialPrompt, isAIAgentOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await apiService.askAIAgent(query);
      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: res.answer || 'I evaluated your request. Let me know if you would like more details!',
        codeSnippet: res.codeSnippet,
        suggestedFollowUps: res.suggestedFollowUps || [],
        timestamp: res.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const fallbackMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `### 🤖 InterTrack AI Assistant\n\nI have processed your question: **"${query}"**.\n\nTo maximize your match score on InterTrack:\n1. Verify your claimed skills through **timed code assessments**.\n2. Add GitHub repositories for **Level 3 Project Evidence**.\n3. Search and apply for active internships at **SecureTech Solutions** or **NextGen HealthTech**.`,
        suggestedFollowUps: [
          'Show high stipend internships',
          'Solve Two Sum in Python',
          'Open Customer Feedback Wall',
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        text: `### 🔄 Conversation Reset\n\nI am ready for your next real-time technical, coding, or internship question!`,
        timestamp: 'Just now',
        suggestedFollowUps: [
          'What internships match my profile?',
          'Explain Two Sum algorithm in Python',
          'Open Online Compiler playground',
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button (visible when drawer is closed) */}
      {!isAIAgentOpen && (
        <button
          onClick={() => setIsAIAgentOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
          </div>
          <span className="tracking-wide">Ask AI Copilot</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-extrabold uppercase">
            Real-Time
          </span>
        </button>
      )}

      {/* Slide-over Drawer Backdrop & Panel */}
      {isAIAgentOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsAIAgentOpen(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200">
              {/* Drawer Header */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-white relative">
                    <Bot className="w-5 h-5 text-brand-300" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-display">
                      <span>InterTrack AI Copilot</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-brand-500/30 text-brand-300 border border-brand-500/30">
                        Online
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Real-time code debugger, interview mentor & internship match advisor
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearHistory}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Clear Chat History"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsAIAgentOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                {messages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id || index}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                        <span>{isUser ? 'You' : 'InterTrack AI'}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[90%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-brand-600 text-white rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        {/* Message content rendering */}
                        <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                        {/* Optional Attached Code Snippet */}
                        {msg.codeSnippet && (
                          <div className="mt-3 rounded-lg overflow-hidden bg-slate-950 text-slate-200 border border-slate-800">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                              <span>{msg.codeSnippet.language.toUpperCase()}</span>
                              <button
                                onClick={() => handleCopyCode(msg.codeSnippet!.code, index)}
                                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedIndex === index ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3 text-xs font-mono overflow-x-auto leading-relaxed">
                              {msg.codeSnippet.code}
                            </pre>
                          </div>
                        )}

                        {/* Follow up suggestions */}
                        {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {msg.suggestedFollowUps.map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handleSendMessage(prompt)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-[11px] font-medium transition-colors border border-slate-200 cursor-pointer"
                              >
                                <span>{prompt}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 w-fit">
                    <span className="w-2 h-2 rounded-full bg-brand-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-brand-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-brand-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-slate-500 font-medium ml-1">
                      InterTrack AI is thinking & compiling...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask any question (code, algorithms, internships, interview tips)..."
                    className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                    title="Send Message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Powered by InterTrack Real-Time Cognitive Engine</span>
                  <span className="text-brand-600 font-semibold">Press Enter to send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
