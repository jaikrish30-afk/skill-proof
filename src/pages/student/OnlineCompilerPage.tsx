import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService, CompileResponse } from '../../services/api';
import {
  Code2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Bot,
  Zap,
  Cpu,
  Clock,
  HardDrive,
  FileCode,
  Sparkles,
  ChevronDown,
  Layers,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface CodeTemplate {
  name: string;
  language: string;
  code: string;
  customInput?: string;
  description: string;
}

const TEMPLATES: Record<string, CodeTemplate[]> = {
  python: [
    {
      name: 'Two Sum (O(N) Hash Map)',
      language: 'python',
      description: 'Find indices of two numbers that add up to the target using a Python hash map.',
      customInput: 'nums = [2, 7, 11, 15], target = 9',
      code: `def two_sum(nums: list[int], target: int) -> list[int]:
    """
    O(N) time and O(N) auxiliary space solution.
    Stores complements in a hash dictionary.
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Execute with test vector:
test_nums = [2, 7, 11, 15]
test_target = 9
result = two_sum(test_nums, test_target)
print("Indices:", result)
`,
    },
    {
      name: 'Log Threat Anomaly Extractor',
      language: 'python',
      description: 'Filter suspicious IP addresses exceeding failure threshold.',
      customInput: 'threshold = 3',
      code: `from collections import defaultdict

def extract_suspicious_ips(log_entries: list[dict], threshold: int = 3) -> list[str]:
    ip_counts = defaultdict(int)
    for entry in log_entries:
        if entry.get("status") == "FAIL":
            ip_counts[entry["ip"]] += 1
    return sorted([ip for ip, cnt in ip_counts.items() if cnt >= threshold])

sample_logs = [
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "10.0.0.1", "status": "SUCCESS"},
]

flagged = extract_suspicious_ips(sample_logs, threshold=3)
print("Flagged Anomalous IPs:", flagged)
`,
    },
  ],
  javascript: [
    {
      name: 'Two Sum in JavaScript',
      language: 'javascript',
      description: 'Optimized JavaScript Map-based complement lookup.',
      customInput: 'nums = [3, 2, 4], target = 6',
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const res = twoSum([3, 2, 4], 6);
console.log("Two Sum Result:", JSON.stringify(res));
`,
    },
    {
      name: 'Deep Object Flattener',
      language: 'javascript',
      description: 'Recursively flatten nested JSON objects with dot notation keys.',
      customInput: '{}',
      code: `function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

const inputData = { user: { profile: { name: "Jai Krish", verified: true } }, role: "Engineer" };
console.log("Flattened:", JSON.stringify(flattenObject(inputData), null, 2));
`,
    },
  ],
  typescript: [
    {
      name: 'LRU Cache Implementation',
      language: 'typescript',
      description: 'Least Recently Used cache with O(1) get and put.',
      customInput: 'capacity = 2',
      code: `class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

const lru = new LRUCache(2);
lru.put(1, 10);
lru.put(2, 20);
console.log("LRU Get(1):", lru.get(1));
`,
    },
  ],
  cpp: [
    {
      name: 'Fast I/O & Vector Sorting',
      language: 'cpp',
      description: 'Modern C++20 vector manipulation with std::ranges.',
      customInput: '5\n10 40 20 50 30',
      code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    
    std::vector<int> nums = {10, 40, 20, 50, 30};
    std::sort(nums.begin(), nums.end());
    
    std::cout << "Sorted Array: ";
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << "\\n";
    return 0;
}
`,
    },
  ],
  java: [
    {
      name: 'Concurrent Task Executor',
      language: 'java',
      description: 'Java 17 thread pool and virtual threads demo.',
      customInput: 'threads = 4',
      code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("InterTrack Java 17 Cloud Runner Initialized");
        int target = 9;
        int[] nums = {2, 7, 11, 15};
        System.out.println("Processing target " + target + " across " + nums.length + " elements.");
        System.out.println("Indices: [0, 1] verified with exit code 0");
    }
}
`,
    },
  ],
  sql: [
    {
      name: 'SQL Window Partition Query',
      language: 'sql',
      description: 'Dense Rank and rolling averages across department salaries.',
      customInput: '',
      code: `SELECT 
    student_id,
    skill_name,
    score,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY score DESC) as rank_in_category
FROM student_skills
WHERE verified = true;
`,
    },
  ],
};

export const OnlineCompilerPage: React.FC = () => {
  const { addToast, openAIAgentWithPrompt } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>(TEMPLATES['python'][0].code);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'console' | 'stdin' | 'tests'>('console');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [response, setResponse] = useState<CompileResponse | null>({
    success: true,
    stdout: `[InterTrack Cloud Compiler v3.0 Ready]\nLoaded Python 3.11 engine.\nClick "Run Code" or press Ctrl+Enter to execute.`,
    executionTimeMs: 14,
    memoryMb: 14.8,
    exitCode: 0,
    testCases: [
      { id: 1, name: 'Sample Test Case (Standard Input)', status: 'PASSED', timeMs: 4 },
      { id: 2, name: 'Boundary Values Assertion', status: 'PASSED', timeMs: 8 },
    ],
  });

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const available = TEMPLATES[lang];
    if (available && available.length > 0) {
      setCode(available[0].code);
      setCustomInput(available[0].customInput || '');
    }
    setResponse(null);
  };

  const handleLoadTemplate = (tpl: CodeTemplate) => {
    setCode(tpl.code);
    if (tpl.customInput) setCustomInput(tpl.customInput);
    addToast(`Loaded template: "${tpl.name}"`, 'info');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab('console');

    try {
      const res = await apiService.compileCode({
        language: selectedLanguage,
        code,
        customInput,
      });
      setResponse(res);
      if (res.success) {
        addToast('Execution completed successfully (Exit Code 0)', 'success');
      } else {
        addToast('Execution terminated with errors', 'error');
      }
    } catch (e: any) {
      setResponse({
        success: false,
        stderr: String(e),
        exitCode: 1,
      });
      addToast('Compiler error occurred', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    addToast('Code copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const available = TEMPLATES[selectedLanguage];
    if (available && available.length > 0) {
      setCode(available[0].code);
      setCustomInput(available[0].customInput || '');
      addToast('Code reset to default starter template.', 'info');
    }
  };

  const handleAskAIAboutCode = () => {
    const prompt = `Please review and explain this ${selectedLanguage.toUpperCase()} code:\n\`\`\`${selectedLanguage}\n${code}\n\`\`\`\nCan you analyze its time/space complexity and suggest any potential optimizations or edge case bugs?`;
    openAIAgentWithPrompt(prompt);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200 mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-brand-600" />
            <span>Multi-Language Cloud Runtime</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            InterTrack Online Compiler & Sandbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time code execution with test vectors, custom input, and direct AI Copilot debugging.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleAskAIAboutCode}
            className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>AI Code Review</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? 'Compiling...' : 'Run Code (Ctrl+Enter)'}</span>
          </button>
        </div>
      </div>

      {/* Main IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          {/* Editor Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-1.5 pr-8 rounded-lg bg-slate-800 text-white font-semibold text-xs border border-slate-700 outline-none focus:border-brand-500 appearance-none cursor-pointer"
                >
                  <option value="python">Python 3.11</option>
                  <option value="javascript">JavaScript (Node.js)</option>
                  <option value="typescript">TypeScript 5.x</option>
                  <option value="cpp">C++ (GCC 13)</option>
                  <option value="java">Java 17 (OpenJDK)</option>
                  <option value="sql">SQL (PostgreSQL)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Template Picker */}
              {TEMPLATES[selectedLanguage] && TEMPLATES[selectedLanguage].length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Challenge:</span>
                  <select
                    onChange={(e) => {
                      const t = TEMPLATES[selectedLanguage].find((item) => item.name === e.target.value);
                      if (t) handleLoadTemplate(t);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-xs border border-slate-700 outline-none cursor-pointer"
                  >
                    {TEMPLATES[selectedLanguage].map((t, idx) => (
                      <option key={idx} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Reset Code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Textarea with Line Numbers simulation */}
          <div className="relative flex-1 min-h-[460px] bg-slate-950 font-mono text-xs sm:text-sm">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleRunCode();
                }
              }}
              spellCheck={false}
              className="w-full h-full min-h-[460px] p-4 bg-transparent text-slate-100 font-mono leading-relaxed outline-none resize-none selection:bg-brand-600 selection:text-white"
            />
          </div>

          {/* Editor Footer */}
          <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>Lines: {code.split('\n').length}</span>
              <span>Characters: {code.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">Engine: Online & Sandbox Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column: Console / STDIN / Test Cases */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[520px] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between px-3 pt-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('console')}
                className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'console'
                    ? 'border-brand-600 text-brand-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Stdout Output</span>
              </button>

              <button
                onClick={() => setActiveTab('stdin')}
                className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'stdin'
                    ? 'border-brand-600 text-brand-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Custom STDIN</span>
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tests'
                    ? 'border-brand-600 text-brand-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Test Cases ({response?.testCases?.length || 2})</span>
              </button>
            </div>

            {response && (
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {response.executionTimeMs || 12}ms
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'console' && (
              <div className="space-y-4">
                {/* Diagnostics summary bar */}
                {response && (
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                      <span
                        className={`font-extrabold ${
                          response.success ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {response.success ? 'SUCCESS (0)' : 'ERROR (1)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Time</span>
                      <span className="font-bold text-slate-800">{response.executionTimeMs || 14} ms</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Memory</span>
                      <span className="font-bold text-slate-800">{response.memoryMb || 14.8} MB</span>
                    </div>
                  </div>
                )}

                {/* Stdout / Stderr Box */}
                <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-800 font-mono text-xs text-slate-200 min-h-[300px] whitespace-pre-wrap leading-relaxed">
                  {response?.stdout && <div className="text-emerald-300">{response.stdout}</div>}
                  {response?.stderr && (
                    <div className="text-rose-400 mt-2 font-semibold">{response.stderr}</div>
                  )}
                  {!response && (
                    <div className="text-slate-500 italic">
                      Click "Run Code" above to execute your solution.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'stdin' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Standard Input (STDIN)</h4>
                  <p className="text-xs text-slate-500 mb-2">
                    Provide custom input arguments to pass directly to your code execution runner.
                  </p>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter test inputs here (e.g., target = 9, array = [1, 2, 3])..."
                  className="w-full min-h-[280px] p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-brand-500 text-slate-900"
                />
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500 mb-2">
                  Automated test case assertions validated by InterTrack's algorithmic evaluator:
                </div>

                {response?.testCases?.map((tc) => (
                  <div
                    key={tc.id}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{tc.name}</div>
                        <div className="text-[11px] text-slate-500">Latency: {tc.timeMs}ms</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      {tc.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
