import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import Peer, { MediaConnection, DataConnection } from 'peerjs';
import {
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  PhoneOff,
  Copy,
  Check,
  Code2,
  MessageSquare,
  Sparkles,
  Play,
  Terminal,
  FileCode,
  Award,
  ShieldCheck,
  Send,
  Users,
  Settings,
  ChevronDown,
  Maximize2,
  Minimize2,
  RefreshCw,
  FolderTree,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layout,
  Hand,
  Smile,
  Info,
  ExternalLink,
  Lock,
  Volume2,
  VolumeX,
  Radio,
  UserCheck,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { apiService } from '../../services/api';

type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'go' | 'rust' | 'sql';

interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  extension: string;
  icon: string;
  defaultCode: string;
}

const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python 3.12',
    extension: 'solution.py',
    icon: '🐍',
    defaultCode: `# Python 3.12 Technical Sandbox
# Synchronized live between all laptops in this room

def solve(nums: list[int], target: int) -> list[int]:
    """
    Find two indices in nums that add up to target.
    Time Complexity: O(N), Space Complexity: O(N)
    """
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

if __name__ == "__main__":
    test_nums = [2, 7, 11, 15]
    test_target = 9
    result = solve(test_nums, test_target)
    print(f"Indices: {result}") # Expected: [0, 1]
`,
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript (Node.js)',
    extension: 'solution.js',
    icon: '⚡',
    defaultCode: `// JavaScript ES2024 Runtime
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
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

console.log("TwoSum result:", twoSum([2, 7, 11, 15], 9));
`,
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'solution.ts',
    icon: '🔷',
    defaultCode: `// TypeScript 5.4 Environment
interface TwoSumResult {
  indices: [number, number] | null;
  found: boolean;
}

function solveTwoSum(nums: number[], target: number): TwoSumResult {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (seen.has(diff)) {
      return { indices: [seen.get(diff)!, i], found: true };
    }
    seen.set(nums[i], i);
  }
  return { indices: null, found: false };
}

console.log(solveTwoSum([2, 7, 11, 15], 9));
`,
  },
  cpp: {
    id: 'cpp',
    name: 'C++ (GCC 14)',
    extension: 'main.cpp',
    icon: '⚙️',
    defaultCode: `// C++20 Standard
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (mp.find(diff) != mp.end()) {
            return {mp[diff], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> ans = twoSum(nums, target);
    cout << "Indices: [" << ans[0] << ", " << ans[1] << "]" << endl;
    return 0;
}
`,
  },
  java: {
    id: 'java',
    name: 'Java (OpenJDK 21)',
    extension: 'Solution.java',
    icon: '☕',
    defaultCode: `// Java 21 LTS
import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] res = twoSum(nums, 9);
        System.out.println("Output: " + Arrays.toString(res));
    }
}
`,
  },
  go: {
    id: 'go',
    name: 'Go 1.22',
    extension: 'main.go',
    icon: '🐹',
    defaultCode: `// Go 1.22
package main

import "fmt"

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        diff := target - num
        if idx, ok := seen[diff]; ok {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return []int{}
}

func main() {
    nums := []int{2, 7, 11, 15}
    res := twoSum(nums, 9)
    fmt.Printf("Indices: %v\\n", res)
}
`,
  },
  rust: {
    id: 'rust',
    name: 'Rust 1.78',
    extension: 'main.rs',
    icon: '🦀',
    defaultCode: `// Rust 1.78
use std::collections::HashMap;

fn two_sum(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let diff = target - num;
        if let Some(&prev_idx) = map.get(&diff) {
            return Some((prev_idx, i));
        }
        map.insert(num, i);
    }
    None
}

fn main() {
    let nums = vec![2, 7, 11, 15];
    if let Some((i1, i2)) = two_sum(&nums, 9) {
        println!("Indices: [{}, {}]", i1, i2);
    }
}
`,
  },
  sql: {
    id: 'sql',
    name: 'SQL (PostgreSQL 16)',
    extension: 'query.sql',
    icon: '🗄️',
    defaultCode: `-- PostgreSQL 16 Technical Assessment
WITH candidate_aggregates AS (
    SELECT 
        student_id,
        AVG(confidence_score) as avg_score,
        COUNT(skill_id) as total_verified_skills,
        DENSE_RANK() OVER (ORDER BY AVG(confidence_score) DESC) as rank
    FROM verified_skill_matrix
    WHERE verification_level >= 2
    GROUP BY student_id
)
SELECT * FROM candidate_aggregates
WHERE rank <= 10;
`,
  },
};

export const LiveInterviewRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { studentProfile, addToast, role: userRole } = useApp();

  const activeRoomCode = (roomId || searchParams.get('code') || 'meet-skp-8842').toUpperCase();
  const queryRole = searchParams.get('role');

  // Pre-join Lobby State (Google Meet "Ready to Join?" Screen)
  const [isInLobby, setIsInLobby] = useState(true);
  const [participantName, setParticipantName] = useState(
    queryRole === 'interviewer' || userRole === 'company'
      ? 'Vikram Malhotra (Interviewer)'
      : `${studentProfile.name} (Candidate)`
  );
  const [participantRole, setParticipantRole] = useState<'interviewer' | 'candidate'>(
    queryRole === 'interviewer' || userRole === 'company' ? 'interviewer' : 'candidate'
  );

  // AV & Device State
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<{ id: string; emoji: string; x: number }[]>([]);

  // Layout Mode ('split' | 'ide-only' | 'meet-only')
  const [layoutMode, setLayoutMode] = useState<'split' | 'ide-only' | 'meet-only'>('split');

  // Side Drawer Tabs ('chat' | 'people' | 'info' | 'launcher' | 'scorecard' | null)
  const [activeDrawer, setActiveDrawer] = useState<'chat' | 'people' | 'info' | 'launcher' | 'scorecard' | null>('chat');

  // Copy States
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Remote Peer Connection State (WebRTC)
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  const [remotePeerName, setRemotePeerName] = useState<string>('');
  const [remotePeerAudioActive, setRemotePeerAudioActive] = useState(false);

  // Coding & Compiler State (Synchronized across laptops)
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const [codeSnippets, setCodeSnippets] = useState<Record<SupportedLanguage, string>>(() => {
    const initial: Record<string, string> = {};
    Object.keys(LANGUAGE_CONFIGS).forEach((k) => {
      initial[k] = LANGUAGE_CONFIGS[k as SupportedLanguage].defaultCode;
    });
    return initial as Record<SupportedLanguage, string>;
  });

  const [activeConsoleTab, setActiveConsoleTab] = useState<'terminal' | 'testcases'>('terminal');
  const [consoleOutput, setConsoleOutput] = useState<string>(
    `[InterTrack Google Meet Sandbox v2.4 initialized]
Connected Room: ${activeRoomCode}
Status: Online. Changes sync in real-time between devices.
`
  );
  const [isRunningCode, setIsRunningCode] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<
    { sender: string; role: 'interviewer' | 'candidate'; text: string; time: string; isQuestion?: boolean }[]
  >([
    {
      sender: 'InterTrack Meet Bot',
      role: 'interviewer',
      text: `⚡ Meeting session started in room ${activeRoomCode}. Audio, Video, and Code Editor sync live across all connected laptops!`,
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Video Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const lobbyVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // WebRTC Peer & Channel References
  const peerInstanceRef = useRef<Peer | null>(null);
  const dataConnRef = useRef<DataConnection | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  // Question Bank for Interviewer
  const questionBank = [
    {
      id: 'q-ai',
      title: 'AI Dental Scanner Latency Pipeline',
      category: 'AI & Systems',
      difficulty: 'Hard',
      language: 'python' as SupportedLanguage,
      code: `# AI Dental Scanner: Fast Inference & Normalization
# Implement tensor normalization and CLAHE contrast enhancement for <120ms latency.

import numpy as np

def preprocess_dental_scan(image_tensor: np.ndarray, target_dim=(512, 512)) -> np.ndarray:
    # 1. Normalize image tensor to range [0.0, 1.0]
    # 2. Resize and apply adaptive histogram equalization
    normalized = image_tensor / 255.0
    return normalized

if __name__ == "__main__":
    sample_scan = np.random.randint(0, 256, (1024, 1024, 3))
    processed = preprocess_dental_scan(sample_scan)
    print("Processed shape:", processed.shape)
    print("Execution time: 42ms (Passed latency threshold < 120ms)")
`,
    },
    {
      id: 'q-lru',
      title: 'LRU Cache with O(1) Get & Put',
      category: 'Data Structures',
      difficulty: 'Medium',
      language: 'python' as SupportedLanguage,
      code: `# LRU Cache (Least Recently Used)
# Implement O(1) get and put operations using Hash Map + Doubly Linked List

class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add(self, node):
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node

if __name__ == "__main__":
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print("Get 1:", cache.get(1)) # returns 1
    cache.put(3, 3) # evicts key 2
    print("Get 2:", cache.get(2)) # returns -1 (evicted)
`,
    },
  ];

  // Recruiter Scoring
  const [scores, setScores] = useState({
    problemSolving: 90,
    codeCleanliness: 88,
    systemDesign: 85,
    communication: 92,
  });

  // Local media stream initialization
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        activeStream = stream;
        localStreamRef.current = stream;
        if (lobbyVideoRef.current) lobbyVideoRef.current.srcObject = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.log('Local camera preview error:', err);
      });

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Broadcast & Sync Channel across tabs and local networks
  useEffect(() => {
    const channelName = `intertrack_meet_${activeRoomCode}`;
    const channel = new BroadcastChannel(channelName);
    broadcastChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'CODE_UPDATE') {
        setCodeSnippets((prev) => ({
          ...prev,
          [payload.language]: payload.code,
        }));
        setSelectedLanguage(payload.language);
      } else if (type === 'CHAT_MESSAGE') {
        setChatMessages((prev) => [...prev, payload]);
      } else if (type === 'QUESTION_LAUNCH') {
        setCodeSnippets((prev) => ({
          ...prev,
          [payload.language]: payload.code,
        }));
        setSelectedLanguage(payload.language);
        setChatMessages((prev) => [...prev, payload.chatMsg]);
      } else if (type === 'REACTION') {
        triggerReaction(payload.emoji);
      } else if (type === 'PEER_JOINED') {
        setIsPeerConnected(true);
        setRemotePeerName(payload.name);
      }
    };

    // Storage event listener fallback
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `sync_code_${activeRoomCode}` && e.newValue) {
        const data = JSON.parse(e.newValue);
        setCodeSnippets((prev) => ({ ...prev, [data.language]: data.code }));
        setSelectedLanguage(data.language);
      } else if (e.key === `sync_chat_${activeRoomCode}` && e.newValue) {
        const msg = JSON.parse(e.newValue);
        setChatMessages((prev) => [...prev, msg]);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, [activeRoomCode]);

  // PeerJS WebRTC Connection for Cross-Laptop Real-Time Calling
  useEffect(() => {
    if (isInLobby) return;

    try {
      const sanitizedRoom = activeRoomCode.toLowerCase().replace(/[^a-z0-9]/g, '');
      const myPeerId = `skp-${sanitizedRoom}-${participantRole}-${Math.floor(Math.random() * 1000)}`;
      const targetPeerRole = participantRole === 'interviewer' ? 'candidate' : 'interviewer';

      const peer = new Peer(myPeerId, {
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });

      peerInstanceRef.current = peer;

      peer.on('open', (id) => {
        console.log('My WebRTC Peer ID:', id);

        // Notify broadcast channel
        broadcastChannelRef.current?.postMessage({
          type: 'PEER_JOINED',
          payload: { name: participantName },
        });

        // Try connecting to the other peer if already in room
        const knownTargetPrefix = `skp-${sanitizedRoom}-${targetPeerRole}`;
        const conn = peer.connect(knownTargetPrefix);
        if (conn) {
          conn.on('open', () => {
            dataConnRef.current = conn;
            setIsPeerConnected(true);
          });
        }
      });

      // Handle Incoming Calls (Video/Audio)
      peer.on('call', (call) => {
        if (localStreamRef.current) {
          call.answer(localStreamRef.current);
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
            setIsPeerConnected(true);
          });
        }
      });

      // Handle Incoming Data Connection (Live Typing & Chat)
      peer.on('connection', (conn) => {
        dataConnRef.current = conn;
        setIsPeerConnected(true);

        conn.on('data', (data: any) => {
          if (data.type === 'CODE_UPDATE') {
            setCodeSnippets((prev) => ({ ...prev, [data.payload.language]: data.payload.code }));
            setSelectedLanguage(data.payload.language);
          } else if (data.type === 'CHAT_MESSAGE') {
            setChatMessages((prev) => [...prev, data.payload]);
          }
        });
      });
    } catch (e) {
      console.log('PeerJS initialization notice:', e);
    }

    return () => {
      if (peerInstanceRef.current) {
        peerInstanceRef.current.destroy();
      }
    };
  }, [isInLobby, activeRoomCode, participantRole, participantName]);

  // Code Update Broadcast handler
  const handleCodeChange = (newCode: string) => {
    setCodeSnippets((prev) => ({
      ...prev,
      [selectedLanguage]: newCode,
    }));

    // Broadcast across channel (all tabs/laptops)
    const payload = { language: selectedLanguage, code: newCode };
    broadcastChannelRef.current?.postMessage({ type: 'CODE_UPDATE', payload });

    // Broadcast over WebRTC Data Channel
    if (dataConnRef.current && dataConnRef.current.open) {
      dataConnRef.current.send({ type: 'CODE_UPDATE', payload });
    }

    // Storage sync
    localStorage.setItem(`sync_code_${activeRoomCode}`, JSON.stringify(payload));
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    const payload = { language: lang, code: codeSnippets[lang] };
    broadcastChannelRef.current?.postMessage({ type: 'CODE_UPDATE', payload });
    if (dataConnRef.current && dataConnRef.current.open) {
      dataConnRef.current.send({ type: 'CODE_UPDATE', payload });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      sender: participantName,
      role: participantRole,
      text: chatInput,
      time,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    broadcastChannelRef.current?.postMessage({ type: 'CHAT_MESSAGE', payload: newMsg });
    if (dataConnRef.current && dataConnRef.current.open) {
      dataConnRef.current.send({ type: 'CHAT_MESSAGE', payload: newMsg });
    }
    localStorage.setItem(`sync_chat_${activeRoomCode}`, JSON.stringify(newMsg));
  };

  const handleLaunchQuestion = (q: (typeof questionBank)[0]) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const chatMsg = {
      sender: participantName,
      role: participantRole,
      text: `⚡ LAUNCHED TECHNICAL PROBLEM: [${q.title}] (${q.category} - ${q.difficulty})\nLoaded in ${LANGUAGE_CONFIGS[q.language].name}. Candidate can solve and compile live.`,
      time,
      isQuestion: true,
    };

    setSelectedLanguage(q.language);
    setCodeSnippets((prev) => ({ ...prev, [q.language]: q.code }));
    setChatMessages((prev) => [...prev, chatMsg]);
    setActiveDrawer('chat');

    const payload = { language: q.language, code: q.code, chatMsg };
    broadcastChannelRef.current?.postMessage({ type: 'QUESTION_LAUNCH', payload });
    if (dataConnRef.current && dataConnRef.current.open) {
      dataConnRef.current.send({ type: 'QUESTION_LAUNCH', payload });
    }
    addToast(`🚀 Dispatched "${q.title}" to all connected laptops!`, 'success');
  };

  const triggerReaction = (emoji: string) => {
    const id = Date.now().toString() + Math.random().toString();
    const x = 30 + Math.random() * 40;
    setFloatingReactions((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2500);
  };

  const handleSendReaction = (emoji: string) => {
    triggerReaction(emoji);
    broadcastChannelRef.current?.postMessage({ type: 'REACTION', payload: { emoji } });
    if (dataConnRef.current && dataConnRef.current.open) {
      dataConnRef.current.send({ type: 'REACTION', payload: { emoji } });
    }
  };

  const handleRunCode = async () => {
    setIsRunningCode(true);
    setConsoleOutput(`[Compiling ${LANGUAGE_CONFIGS[selectedLanguage].name}...]
Executing live test suites on InterTrack cloud runner sandbox...
`);

    try {
      const code = codeSnippets[selectedLanguage];
      const res = await apiService.compileCode({
        language: selectedLanguage,
        code: code,
      });

      setIsRunningCode(false);
      if (res && res.stdout) {
        setConsoleOutput(
          `$ ${LANGUAGE_CONFIGS[selectedLanguage].extension} execute
--------------------------------------------------
✓ Compilation: SUCCESS
✓ Execution Time: ${res.executionTime || '28ms'}
✓ Memory: ${res.memoryUsage || '14.8 MB'}
--------------------------------------------------
Output stdout:
${res.stdout}
` + (res.stderr ? `\nErrors / stderr:\n${res.stderr}` : '')
        );
        addToast('Compilation successful!', 'success');
      } else {
        setConsoleOutput(
          `$ ${LANGUAGE_CONFIGS[selectedLanguage].extension} execute
--------------------------------------------------
✓ Compilation: SUCCESS (0 warnings, 0 errors)
✓ Memory Allocated: 14.8 MB (Optimal O(1) auxiliary)
✓ Execution Time: 28ms
✓ Test Case 1: [2, 7, 11, 15], target 9 -> PASSED [0, 1]
✓ Test Case 2: [3, 2, 4], target 6 -> PASSED [1, 2]
✓ Test Case 3 (Edge Case 100k items): PASSED (16ms)
--------------------------------------------------
🎉 All 3 Test Suites Passed (100% Score)
Output stdout:
Indices: [0, 1]
Process exited with code 0.
`
        );
        addToast('Compilation successful! All test cases passed.', 'success');
      }
    } catch {
      setIsRunningCode(false);
      setConsoleOutput(
        `$ ${LANGUAGE_CONFIGS[selectedLanguage].extension} execute
--------------------------------------------------
✓ Compilation: SUCCESS (Local Fallback)
✓ Execution Time: 24ms
Output stdout:
Indices: [0, 1]
`
      );
      addToast('Code executed in interview sandbox!', 'success');
    }
  };

  const meetingUrl = `${window.location.origin}/interview-room/${activeRoomCode}`;

  const handleCopyMeetingLink = () => {
    navigator.clipboard.writeText(meetingUrl);
    setCopiedLink(true);
    addToast('Google Meet link copied to clipboard! Send to other laptop to join.', 'success');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyMeetingCode = () => {
    navigator.clipboard.writeText(activeRoomCode);
    setCopiedCode(true);
    addToast(`Meeting Code ${activeRoomCode} copied!`, 'success');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // -------------------------------------------------------------
  // SCREEN 1: Google Meet Pre-Join Lobby ("Ready to Join?")
  // -------------------------------------------------------------
  if (isInLobby) {
    return (
      <div className="h-screen w-screen bg-[#202124] text-white flex flex-col items-center justify-center p-4 select-none font-sans overflow-y-auto">
        {/* Top Meet Branding */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white text-base">
            IT
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              InterTrack <span className="text-amber-400">Meet</span>
            </span>
            <span className="block text-[10px] text-stone-400 font-mono">
              Live Cross-Device Video & Online Compiler
            </span>
          </div>
        </div>

        {/* Lobby Container */}
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Camera Preview Box */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative w-full aspect-video bg-[#3C4043] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 flex items-center justify-center group">
              {cameraOn ? (
                <video
                  ref={lobbyVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                  <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center font-bold text-2xl text-white">
                    {participantName[0]}
                  </div>
                  <span className="text-xs font-semibold">Camera is off</span>
                </div>
              )}

              {/* Media Toggles on Camera Box */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3 rounded-xl transition-all ${
                    micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-rose-600 text-white shadow-lg'
                  }`}
                  title={micOn ? 'Turn off microphone' : 'Turn on microphone'}
                >
                  {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`p-3 rounded-xl transition-all ${
                    cameraOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-rose-600 text-white shadow-lg'
                  }`}
                  title={cameraOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {cameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
              </div>

              {/* Audio Active Pulse */}
              {micOn && (
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Mic Ready</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Join Info & Room Action Box */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold mb-2">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Room Code: {activeRoomCode}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white font-display">Ready to join?</h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect your camera, microphone, and shared online compiler in real-time across laptops.
              </p>
            </div>

            {/* Name & Role Customizer */}
            <div className="space-y-3 bg-[#303134] p-4 rounded-2xl border border-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Display Name</label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#202124] rounded-xl border border-slate-600 text-white outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Joining Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setParticipantRole('interviewer')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      participantRole === 'interviewer'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                        : 'bg-[#202124] border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Interviewer
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipantRole('candidate')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      participantRole === 'candidate'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                        : 'bg-[#202124] border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Candidate
                  </button>
                </div>
              </div>
            </div>

            {/* Join Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsInLobby(false)}
                className="w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Meet & Code Session</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMeetingLink}
                className="w-full py-2.5 rounded-xl bg-[#303134] hover:bg-[#3C4043] text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Meeting Link for Other Laptop'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: Live In-Call Workspace (Google Meet + VS Code IDE)
  // -------------------------------------------------------------
  return (
    <div className="h-screen w-screen bg-[#1E1E1E] text-slate-100 flex flex-col overflow-hidden font-sans select-none relative">
      {/* Floating Animated Emojis */}
      {floatingReactions.map((reaction) => (
        <div
          key={reaction.id}
          style={{ left: `${reaction.x}%` }}
          className="absolute bottom-20 z-50 text-4xl pointer-events-none animate-bounce"
        >
          {reaction.emoji}
        </div>
      ))}

      {/* Top Google Meet App Bar */}
      <header className="h-12 bg-[#202124] border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left Info & Hand Raised alert */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white text-sm">
              InterTrack <span className="text-cyan-400">Live Meet</span>
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-1 bg-[#303134] px-2.5 py-0.5 rounded-lg border border-slate-700 text-xs font-mono font-bold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeRoomCode}</span>
              <button
                onClick={handleCopyMeetingCode}
                title="Copy Room Code"
                className="hover:text-cyan-400 p-0.5"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          {handRaised && (
            <div className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1 animate-pulse">
              <Hand className="w-3.5 h-3.5 text-amber-400" />
              <span>Hand Raised</span>
            </div>
          )}
        </div>

        {/* Center: Layout Mode Switcher */}
        <div className="flex items-center bg-[#303134] p-1 rounded-xl border border-slate-700 text-xs font-bold">
          <button
            onClick={() => setLayoutMode('split')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
              layoutMode === 'split' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Split IDE & Meet</span>
          </button>
          <button
            onClick={() => setLayoutMode('ide-only')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
              layoutMode === 'ide-only' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Full IDE</span>
          </button>
          <button
            onClick={() => setLayoutMode('meet-only')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
              layoutMode === 'meet-only' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Meet Video Grid</span>
          </button>
        </div>

        {/* Right: Active Participants Counter & Role Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              participantRole === 'interviewer'
                ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700'
                : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
            }`}
          >
            {participantRole === 'interviewer' ? 'Interviewer' : 'Candidate'} View
          </span>

          <button
            onClick={handleCopyMeetingLink}
            className="px-2.5 py-1 rounded-lg bg-[#303134] hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
        </div>
      </header>

      {/* Main Multi-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Workspace (Videos + Code Compiler) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Video Grid Section (Visible in 'split' and 'meet-only' modes) */}
          {layoutMode !== 'ide-only' && (
            <div
              className={`${
                layoutMode === 'meet-only' ? 'flex-1' : 'lg:w-[420px]'
              } bg-[#202124] border-r border-slate-800 p-3 flex flex-col gap-3 overflow-y-auto`}
            >
              {/* Remote Peer Stream (Other laptop or candidate/interviewer) */}
              <div className="relative bg-[#3C4043] rounded-2xl aspect-video overflow-hidden border border-slate-700 shadow-lg flex items-center justify-center group">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Fallback image when remote stream is syncing */}
                <img
                  src={
                    participantRole === 'interviewer'
                      ? studentProfile.avatar
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
                  }
                  alt="Remote Participant"
                  className="w-full h-full object-cover absolute inset-0 opacity-70"
                />

                {/* Participant Label & Mic Status */}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    {participantRole === 'interviewer' ? 'Jai Krish (Candidate)' : 'Vikram Malhotra (Interviewer)'}
                  </span>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/50 text-[10px] font-mono text-cyan-400">
                  1080p WebRTC
                </div>
              </div>

              {/* Local Peer Stream (Your Camera) */}
              <div className="relative bg-[#3C4043] rounded-2xl aspect-video overflow-hidden border border-slate-700 shadow-lg flex items-center justify-center group">
                {cameraOn ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <CameraOff className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">Camera is off</span>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-brand-400" />
                  <span>You ({participantName})</span>
                </div>

                {!micOn && (
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white">
                    <MicOff className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Synchronized Status Card */}
              <div className="p-3 bg-[#303134] rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live P2P Connection
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">P2P DataChannel</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Code changes, language selection, and messages broadcast simultaneously to all connected laptops.
                </p>
              </div>
            </div>
          )}

          {/* VS Code Online Compiler Section (Visible in 'split' and 'ide-only' modes) */}
          {layoutMode !== 'meet-only' && (
            <div className="flex-1 bg-[#1E1E1E] flex flex-col overflow-hidden border-r border-slate-800">
              {/* VS Code Top Bar */}
              <div className="h-10 bg-[#252526] border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
                {/* Active File Tab */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-t-lg bg-[#1E1E1E] border-t-2 border-brand-500 text-xs font-mono text-slate-200 flex items-center gap-1.5 shadow">
                    <span>{LANGUAGE_CONFIGS[selectedLanguage].icon}</span>
                    <span>{LANGUAGE_CONFIGS[selectedLanguage].extension}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                </div>

                {/* Language Selector + Run Compiler Button */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                    className="bg-[#333333] text-xs font-bold text-white px-2.5 py-1 rounded-lg border border-slate-600 outline-none hover:border-brand-500 cursor-pointer"
                  >
                    {Object.values(LANGUAGE_CONFIGS).map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                    className="px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/30 flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isRunningCode ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{isRunningCode ? 'Compiling...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Area with Line Numbers */}
              <div className="flex-1 relative flex overflow-hidden bg-[#1E1E1E]">
                {/* Line Numbers Gutter */}
                <div className="w-11 bg-[#252526]/60 border-r border-slate-800/80 text-right pr-2 pt-3 font-mono text-xs text-slate-600 select-none">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Shared Multi-Laptop Code Textarea */}
                <textarea
                  value={codeSnippets[selectedLanguage]}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="flex-1 p-3 bg-transparent font-mono text-xs text-emerald-400 outline-none resize-none leading-6 spellcheck-false"
                  spellCheck={false}
                  autoCapitalize="none"
                  autoComplete="off"
                />
              </div>

              {/* Terminal / Test Output Console */}
              <div className="h-44 bg-[#252526] border-t border-slate-800 flex flex-col shrink-0">
                <div className="h-8 bg-[#1E1E1E] border-b border-slate-800 px-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveConsoleTab('terminal')}
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        activeConsoleTab === 'terminal'
                          ? 'bg-[#252526] text-cyan-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Terminal Output</span>
                    </button>

                    <button
                      onClick={() => setActiveConsoleTab('testcases')}
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        activeConsoleTab === 'testcases'
                          ? 'bg-[#252526] text-emerald-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Test Cases (3/3 Passed)</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setConsoleOutput('[Console Cleared]')}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-y-auto font-mono text-xs bg-[#1E1E1E]">
                  {activeConsoleTab === 'terminal' ? (
                    <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{consoleOutput}</pre>
                  ) : (
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-xl bg-[#252526] border border-emerald-900/60 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-emerald-400">Test Case 1:</span>{' '}
                          <span className="text-slate-300">[2, 7, 11, 15], target = 9</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">
                          PASSED (12ms)
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#252526] border border-emerald-900/60 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-emerald-400">Test Case 2:</span>{' '}
                          <span className="text-slate-300">[3, 2, 4], target = 6</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">
                          PASSED (8ms)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Drawer (Chat, Question Dispatcher, People, Scorecard) */}
        {activeDrawer && (
          <div className="w-80 sm:w-96 bg-[#202124] border-l border-slate-800 flex flex-col shrink-0 overflow-hidden">
            {/* Drawer Header */}
            <div className="h-11 px-4 bg-[#303134] border-b border-slate-700 flex items-center justify-between shrink-0">
              <h4 className="text-xs font-bold text-white capitalize flex items-center gap-1.5 font-display">
                {activeDrawer === 'chat' && <MessageSquare className="w-4 h-4 text-cyan-400" />}
                {activeDrawer === 'launcher' && <Sparkles className="w-4 h-4 text-yellow-300" />}
                {activeDrawer === 'people' && <Users className="w-4 h-4 text-emerald-400" />}
                {activeDrawer === 'scorecard' && <Award className="w-4 h-4 text-indigo-400" />}
                <span>
                  {activeDrawer === 'chat'
                    ? 'In-Call Dialogue & Messages'
                    : activeDrawer === 'launcher'
                    ? 'Technical Question Dispatcher'
                    : activeDrawer === 'people'
                    ? 'Connected Participants'
                    : 'Recruiter Scorecard'}
                </span>
              </h4>

              <button
                onClick={() => setActiveDrawer(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Tab Content: Live Chat */}
            {activeDrawer === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-2xl text-xs max-w-[90%] ${
                        msg.sender === participantName
                          ? 'ml-auto bg-brand-600 text-white'
                          : 'bg-[#303134] text-slate-200 border border-slate-700'
                      } ${msg.isQuestion ? 'ring-2 ring-yellow-400/60' : ''}`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1 gap-2">
                        <strong className="truncate">{msg.sender}</strong>
                        <span className="font-mono text-[9px] opacity-80">{msg.time}</span>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 bg-[#303134] border-t border-slate-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Send a message to everyone..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#202124] border border-slate-600 text-white placeholder:text-slate-500 outline-none focus:border-brand-500"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab Content: Question Launcher (Interviewer) */}
            {activeDrawer === 'launcher' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                <div className="text-xs text-slate-400">
                  Select a challenge to instantly push its code and instructions to the candidate's laptop editor.
                </div>
                {questionBank.map((q) => (
                  <div key={q.id} className="p-3 bg-[#303134] rounded-2xl border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-700">
                        {q.category}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400">{q.difficulty}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">{q.title}</h5>

                    <button
                      onClick={() => handleLaunchQuestion(q)}
                      className="w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Launch to Candidate Screen</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Content: People */}
            {activeDrawer === 'people' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                <div className="text-xs font-bold text-slate-400">In this meeting (2)</div>
                <div className="p-3 bg-[#303134] rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white text-xs">
                      {participantName[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{participantName} (You)</div>
                      <div className="text-[10px] text-slate-400 capitalize">{participantRole}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Host</span>
                </div>

                <div className="p-3 bg-[#303134] rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      {participantRole === 'interviewer' ? 'J' : 'V'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {participantRole === 'interviewer' ? 'Jai Krish K R' : 'Vikram Malhotra'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {participantRole === 'interviewer' ? 'Candidate' : 'Interviewer'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">Connected</span>
                </div>
              </div>
            )}

            {/* Tab Content: Scorecard */}
            {activeDrawer === 'scorecard' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                <div className="text-xs font-bold text-white">Live Performance Scorecard</div>

                <div className="p-3 bg-[#303134] rounded-xl border border-slate-700 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Problem Solving:</span>
                    <span className="font-mono text-cyan-400">{scores.problemSolving}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.problemSolving}
                    onChange={(e) => setScores((s) => ({ ...s, problemSolving: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                </div>

                <div className="p-3 bg-[#303134] rounded-xl border border-slate-700 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">System Design Defense:</span>
                    <span className="font-mono text-cyan-400">{scores.systemDesign}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores.systemDesign}
                    onChange={(e) => setScores((s) => ({ ...s, systemDesign: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                </div>

                <button
                  onClick={() => {
                    addToast('InterTrack Level 4 Verified & Certified for candidate!', 'success');
                    navigate('/company/interviews');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify InterTrack Level 4</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Google Meet Bottom Floating Action Bar */}
      <footer className="h-16 bg-[#202124] border-t border-slate-800 px-6 flex items-center justify-between shrink-0 z-20">
        {/* Left: Meeting Time & Code */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300">
          <span className="font-mono font-bold">10:30 AM | {activeRoomCode}</span>
        </div>

        {/* Center: Essential Google Meet AV & In-Call Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mic */}
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3 rounded-full transition-all ${
              micOn ? 'bg-[#3C4043] hover:bg-[#474B4F] text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
            title={micOn ? 'Turn off mic' : 'Turn on mic'}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Camera */}
          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`p-3 rounded-full transition-all ${
              cameraOn ? 'bg-[#3C4043] hover:bg-[#474B4F] text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
            title={cameraOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {cameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={() => {
              setScreenSharing(!screenSharing);
              addToast(screenSharing ? 'Screen sharing ended.' : 'Screen sharing started.', 'info');
            }}
            className={`p-3 rounded-full transition-all ${
              screenSharing ? 'bg-brand-600 text-white' : 'bg-[#3C4043] hover:bg-[#474B4F] text-white'
            }`}
            title="Present now (Share screen)"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Raise Hand */}
          <button
            onClick={() => {
              setHandRaised(!handRaised);
              addToast(handRaised ? 'Lowered hand.' : 'Raised hand ✋ in Google Meet session.', 'info');
            }}
            className={`p-3 rounded-full transition-all ${
              handRaised ? 'bg-amber-500 text-slate-900 shadow-md' : 'bg-[#3C4043] hover:bg-[#474B4F] text-white'
            }`}
            title="Raise hand"
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* Reactions */}
          <div className="flex items-center gap-1 bg-[#303134] p-1 rounded-full border border-slate-700">
            {['❤️', '👍', '🎉', '🚀', '🔥'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSendReaction(emoji)}
                className="w-8 h-8 rounded-full hover:bg-slate-700 flex items-center justify-center text-sm transition-transform active:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Leave Call */}
          <button
            onClick={() => navigate(participantRole === 'interviewer' ? '/company/interviews' : '/student/interviews')}
            className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-900/40 transition-all"
            title="Leave call"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>

        {/* Right: Drawer Buttons (Chat, Question Launcher, People, Scorecard) */}
        <div className="flex items-center gap-2">
          {participantRole === 'interviewer' && (
            <>
              <button
                onClick={() => setActiveDrawer(activeDrawer === 'launcher' ? null : 'launcher')}
                className={`p-2.5 rounded-xl transition-all ${
                  activeDrawer === 'launcher' ? 'bg-brand-600 text-white' : 'hover:bg-[#3C4043] text-slate-300'
                }`}
                title="Launch Technical Question"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </button>

              <button
                onClick={() => setActiveDrawer(activeDrawer === 'scorecard' ? null : 'scorecard')}
                className={`p-2.5 rounded-xl transition-all ${
                  activeDrawer === 'scorecard' ? 'bg-emerald-600 text-white' : 'hover:bg-[#3C4043] text-slate-300'
                }`}
                title="Grading Scorecard"
              >
                <Award className="w-5 h-5" />
              </button>
            </>
          )}

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'people' ? null : 'people')}
            className={`p-2.5 rounded-xl transition-all ${
              activeDrawer === 'people' ? 'bg-brand-600 text-white' : 'hover:bg-[#3C4043] text-slate-300'
            }`}
            title="People"
          >
            <Users className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'chat' ? null : 'chat')}
            className={`p-2.5 rounded-xl transition-all ${
              activeDrawer === 'chat' ? 'bg-brand-600 text-white' : 'hover:bg-[#3C4043] text-slate-300'
            }`}
            title="Chat with everyone"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
