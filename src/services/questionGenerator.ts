import { AssessmentQuestion } from '../types';

export interface QuestionBankItem extends AssessmentQuestion {
  category: 'coding' | 'technical' | 'aptitude' | 'soft_skills';
  skillId: string;
  skillName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

// Master Question Pool
export const MASTER_QUESTION_POOL: QuestionBankItem[] = [
  // ---------------- PYTHON & CODING ----------------
  {
    id: 'py-001',
    category: 'coding',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'intermediate',
    tags: ['algorithms', 'hash-map', 'arrays'],
    title: 'Two Sum Target Index Matcher',
    description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. Assume each input has exactly one solution in O(N) time.',
    type: 'code',
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your optimal O(N) hash map solution
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution
print(two_sum([2, 7, 11, 15], 9))`,
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', passed: true },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', passed: true },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', passed: true },
    ],
  },
  {
    id: 'py-002',
    category: 'coding',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'intermediate',
    tags: ['security', 'strings', 'hash-map'],
    title: 'Log File Threat Anomaly Extractor',
    description: 'Write a Python function `extract_suspicious_ips(log_entries, threshold)` that filters IP addresses with failed authentication attempts exceeding the threshold in a rolling window.',
    type: 'code',
    starterCode: `def extract_suspicious_ips(log_entries: list[dict], threshold: int) -> list[str]:
    from collections import defaultdict
    ip_counts = defaultdict(int)
    for entry in log_entries:
        if entry.get("status") == "FAIL":
            ip_counts[entry["ip"]] += 1
    return sorted([ip for ip, cnt in ip_counts.items() if cnt >= threshold])`,
    testCases: [
      { input: '5 failed logins from 192.168.1.50, threshold = 3', expectedOutput: "['192.168.1.50']", passed: true },
      { input: 'All successful logins', expectedOutput: '[]', passed: true },
    ],
  },
  {
    id: 'py-003',
    category: 'coding',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'intermediate',
    tags: ['sliding-window', 'strings'],
    title: 'Longest Substring Without Repeating Characters',
    description: 'Find the length of the longest substring without repeating characters using the sliding window technique.',
    type: 'code',
    starterCode: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3', passed: true },
      { input: 's = "bbbbb"', expectedOutput: '1', passed: true },
    ],
  },
  {
    id: 'py-004',
    category: 'coding',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'advanced',
    tags: ['dynamic-programming', 'arrays'],
    title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
    description: 'Given an integer array `nums`, find the contiguous subarray with the largest sum, and return its sum in O(N) linear time.',
    type: 'code',
    starterCode: `def max_sub_array(nums: list[int]) -> int:
    current_sum = nums[0]
    max_sum = nums[0]
    for x in nums[1:]:
        current_sum = max(x, current_sum + x)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    testCases: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6', passed: true },
      { input: 'nums = [1]', expectedOutput: '1', passed: true },
      { input: 'nums = [5, 4, -1, 7, 8]', expectedOutput: '23', passed: true },
    ],
  },
  {
    id: 'py-005',
    category: 'coding',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'advanced',
    tags: ['data-structures', 'lru-cache'],
    title: 'LRU Cache Capacity Eviction Policy',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both get and put operations.',
    type: 'code',
    starterCode: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    testCases: [
      { input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)', expectedOutput: '-1', passed: true },
    ],
  },
  {
    id: 'py-006',
    category: 'technical',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'intermediate',
    tags: ['memory', 'generators'],
    title: 'Memory & Generator Stream Optimization',
    description: 'Which built-in Python construct allows processing a 20GB log file with O(1) memory footprint without loading the entire dataset into RAM?',
    type: 'mcq',
    options: [
      'List Comprehensions with eager evaluation',
      'Generators / Yield expressions for streaming iterators',
      'Deepcopy object cloning',
      'Global variables in memory buffer',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'py-007',
    category: 'technical',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'advanced',
    tags: ['concurrency', 'gil'],
    title: 'GIL & Concurrency Characteristics',
    description: 'In CPython, which library is best suited for CPU-bound computational parallelism bypassing the Global Interpreter Lock (GIL)?',
    type: 'mcq',
    options: [
      'threading module',
      'multiprocessing module',
      'asyncio event loop',
      'time.sleep daemon',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'py-008',
    category: 'technical',
    skillId: 'skill-python',
    skillName: 'Python',
    difficulty: 'intermediate',
    tags: ['decorators', 'functional'],
    title: 'Decorator Closure Scope Execution',
    description: 'When applying `@my_decorator` on a function `def test():`, at what moment does the decorator wrapper function execute?',
    type: 'mcq',
    options: [
      'At module import/definition time',
      'Only when test() is called',
      'When Python garbage collector runs',
      'When the OS process terminates',
    ],
    correctOptionIndex: 0,
  },

  // ---------------- WEB DEVELOPMENT & JAVASCRIPT / TYPESCRIPT ----------------
  {
    id: 'web-001',
    category: 'coding',
    skillId: 'skill-webdev',
    skillName: 'Web Development',
    difficulty: 'intermediate',
    tags: ['javascript', 'closures', 'debounce'],
    title: 'Debounce Function Implementation',
    description: 'Implement a debounce function in JavaScript/TypeScript that delays invoking the target function until after `wait` milliseconds have elapsed since the last call.',
    type: 'code',
    starterCode: `function debounce(fn, delayMs) {
  let timerId = null;
  return function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}`,
    testCases: [
      { input: 'debounce(fn, 200) called 5 times in 50ms', expectedOutput: 'Single invocation after 200ms', passed: true },
    ],
  },
  {
    id: 'web-002',
    category: 'coding',
    skillId: 'skill-webdev',
    skillName: 'Web Development',
    difficulty: 'advanced',
    tags: ['javascript', 'promises', 'async'],
    title: 'Custom Promise.all Polyfill',
    description: 'Write an implementation of `Promise.all` that resolves when all input promises resolve, or rejects immediately when any input promise rejects.',
    type: 'code',
    starterCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        results[i] = res;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}`,
    testCases: [
      { input: '[Promise.resolve(1), Promise.resolve(2)]', expectedOutput: '[1, 2]', passed: true },
    ],
  },
  {
    id: 'web-003',
    category: 'technical',
    skillId: 'skill-webdev',
    skillName: 'Web Development',
    difficulty: 'intermediate',
    tags: ['react', 'virtual-dom'],
    title: 'React Reconciliation & Key Prop Optimization',
    description: 'Why is it considered an anti-pattern in React to use array indices as `key` props for dynamic lists with insertions or deletions?',
    type: 'mcq',
    options: [
      'It causes key uniqueness collision across different components',
      'It breaks virtual DOM component instance mapping, causing state leaks and unnecessary re-renders',
      'It causes JavaScript heap memory overflow in Chrome V8',
      'It prevents CSS flexbox layouts from calculating widths',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'web-004',
    category: 'technical',
    skillId: 'skill-webdev',
    skillName: 'Web Development',
    difficulty: 'advanced',
    tags: ['event-loop', 'microtasks'],
    title: 'JavaScript Event Loop Execution Order',
    description: 'Given `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`, what is the exact output sequence?',
    type: 'mcq',
    options: [
      '1, 4, 3, 2',
      '1, 2, 3, 4',
      '1, 4, 2, 3',
      '3, 1, 4, 2',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'web-005',
    category: 'technical',
    skillId: 'skill-webdev',
    skillName: 'Web Development',
    difficulty: 'intermediate',
    tags: ['typescript', 'types'],
    title: 'TypeScript Discriminated Unions & Exhaustiveness',
    description: 'Which pattern ensures at compile-time that all cases of a union type `type Action = { type: "A" } | { type: "B" }` have been handled in a switch statement?',
    type: 'mcq',
    options: [
      'The `never` type check in the default branch (`const _exhaustive: never = action`)',
      'Casting action with `as any`',
      'Using optional chaining `action?.type`',
      'Declaring action as `unknown`',
    ],
    correctOptionIndex: 0,
  },

  // ---------------- CYBERSECURITY ----------------
  {
    id: 'cs-001',
    category: 'technical',
    skillId: 'skill-cybersecurity',
    skillName: 'Cybersecurity',
    difficulty: 'intermediate',
    tags: ['owasp', 'injection', 'sql'],
    title: 'OWASP Top 10 Injection Prevention',
    description: 'Which mechanism provides the most robust defense against SQL Injection attacks across web applications?',
    type: 'mcq',
    options: [
      'Parameterized queries and Prepared Statements',
      'Client-side Javascript regex validation only',
      'Base64 encoding user input before SQL query',
      'Restricting input length to 20 characters',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'cs-002',
    category: 'technical',
    skillId: 'skill-cybersecurity',
    skillName: 'Cybersecurity',
    difficulty: 'advanced',
    tags: ['csrf', 'cookies', 'auth'],
    title: 'Cross-Site Request Forgery (CSRF) Mitigation',
    description: 'What is the most effective modern HTTP cookie attribute to protect web applications against Cross-Site Request Forgery (CSRF)?',
    type: 'mcq',
    options: [
      'SameSite=Strict or SameSite=Lax',
      'HttpOnly only',
      'Secure=false',
      'Domain=*.com wildcard',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'cs-003',
    category: 'technical',
    skillId: 'skill-cybersecurity',
    skillName: 'Cybersecurity',
    difficulty: 'intermediate',
    tags: ['cryptography', 'passwords'],
    title: 'Secure Password Storage Hashing Function',
    description: 'Which cryptographic algorithm is explicitly designed with adjustable work factors (cost) to resist GPU brute-force attacks for password storage?',
    type: 'mcq',
    options: [
      'bcrypt / Argon2id',
      'MD5 with salt',
      'SHA-1',
      'Base64 URL Safe',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'cs-004',
    category: 'technical',
    skillId: 'skill-cybersecurity',
    skillName: 'Cybersecurity',
    difficulty: 'advanced',
    tags: ['xss', 'csp'],
    title: 'Content Security Policy (CSP) Directives',
    description: 'To prevent inline script Cross-Site Scripting (XSS), which CSP directive is recommended instead of `unsafe-inline`?',
    type: 'mcq',
    options: [
      'Cryptographic Nonces (`script-src "nonce-rAnd0m123"`) or SHA-256 Hashes',
      'Allowing `*` in default-src',
      'Enabling `data:` URI scripts',
      'Disabling iframe sandbox flags',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'cs-005',
    category: 'coding',
    skillId: 'skill-cybersecurity',
    skillName: 'Cybersecurity',
    difficulty: 'intermediate',
    tags: ['security', 'sanitization', 'html'],
    title: 'HTML Sanitizer for User-Generated Markdown',
    description: 'Write a sanitization validator that detects and strips hazardous script tags and JavaScript event handlers from raw user HTML.',
    type: 'code',
    starterCode: `def sanitize_input(payload: str) -> str:
    import re
    # Remove <script> tags
    cleaned = re.sub(r'<script.*?>.*?</script>', '', payload, flags=re.IGNORECASE | re.DOTALL)
    # Remove dangerous inline event handlers
    cleaned = re.sub(r'on\\w+\\s*=\\s*["\\'].*?["\\']', '', cleaned, flags=re.IGNORECASE)
    return cleaned.strip()`,
    testCases: [
      { input: '<script>alert(1)</script><p>Hello</p>', expectedOutput: '<p>Hello</p>', passed: true },
    ],
  },

  // ---------------- NETWORKING ----------------
  {
    id: 'net-001',
    category: 'technical',
    skillId: 'skill-networking',
    skillName: 'Networking',
    difficulty: 'intermediate',
    tags: ['osi', 'protocols'],
    title: 'OSI Layer 4 vs Layer 7 Responsibilities',
    description: 'At which OSI model layer does TLS/SSL encryption and HTTP payload parsing occur versus TCP port sequencing?',
    type: 'mcq',
    options: [
      'TLS/HTTP at Layer 7 (Application/Presentation) & TCP at Layer 4 (Transport)',
      'TLS at Layer 2 (Data Link) & TCP at Layer 3 (Network)',
      'Both TLS and TCP occur at Layer 1 (Physical)',
      'HTTP occurs at Layer 3 and TCP occurs at Layer 2',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'net-002',
    category: 'technical',
    skillId: 'skill-networking',
    skillName: 'Networking',
    difficulty: 'intermediate',
    tags: ['subnetting', 'cidr', 'ip'],
    title: 'Subnet Mask & Usable Hosts Calculation',
    description: 'In an IPv4 subnet of `192.168.10.0/28`, how many total usable host IP addresses can be assigned to devices?',
    type: 'mcq',
    options: [
      '14 usable hosts (16 total - 1 network - 1 broadcast)',
      '28 usable hosts',
      '30 usable hosts',
      '16 usable hosts',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'net-003',
    category: 'technical',
    skillId: 'skill-networking',
    skillName: 'Networking',
    difficulty: 'advanced',
    tags: ['tcp', 'handshake'],
    title: 'TCP 3-Way Handshake Connection Teardown',
    description: 'What is the purpose of the `TIME_WAIT` state during a graceful TCP connection termination (FIN-ACK handshake)?',
    type: 'mcq',
    options: [
      'To ensure the final ACK is received by the remote endpoint and prevent delayed duplicate packets from corrupting new connections',
      'To renegotiate encryption cipher suites',
      'To flush DNS resolver cache memory',
      'To allow ARP broadcast queries',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'net-004',
    category: 'technical',
    skillId: 'skill-networking',
    skillName: 'Networking',
    difficulty: 'intermediate',
    tags: ['dns', 'protocols'],
    title: 'DNS Resolution Pipeline & TTL',
    description: 'What happens when a recursive DNS resolver receives an A-record with a TTL of 300 seconds?',
    type: 'mcq',
    options: [
      'It caches the IP mapping for 5 minutes before querying upstream authoritative nameservers again',
      'It terminates the TCP connection after 300ms',
      'It encrypts the payload with 300-bit RSA keys',
      'It reboots the router after 300 seconds',
    ],
    correctOptionIndex: 0,
  },

  // ---------------- PROBLEM SOLVING & DATA STRUCTURES ----------------
  {
    id: 'dsa-001',
    category: 'coding',
    skillId: 'skill-problemsolving',
    skillName: 'Problem Solving',
    difficulty: 'intermediate',
    tags: ['trees', 'recursion', 'binary-tree'],
    title: 'Invert Binary Tree',
    description: 'Given the root of a binary tree, invert the tree (swap left and right children recursively), and return its root.',
    type: 'code',
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: TreeNode) -> TreeNode:
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
    testCases: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', expectedOutput: '[4, 7, 2, 9, 6, 3, 1]', passed: true },
    ],
  },
  {
    id: 'dsa-002',
    category: 'coding',
    skillId: 'skill-problemsolving',
    skillName: 'Problem Solving',
    difficulty: 'intermediate',
    tags: ['stack', 'strings'],
    title: 'Valid Parentheses & Bracket Matching',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid in O(N) time and O(N) space.',
    type: 'code',
    starterCode: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    testCases: [
      { input: 's = "()[]{}"', expectedOutput: 'True', passed: true },
      { input: 's = "(]"', expectedOutput: 'False', passed: true },
    ],
  },
  {
    id: 'dsa-003',
    category: 'technical',
    skillId: 'skill-problemsolving',
    skillName: 'Problem Solving',
    difficulty: 'advanced',
    tags: ['complexity', 'graphs', 'dijkstra'],
    title: 'Dijkstra Shortest Path Time Complexity',
    description: 'What is the optimal time complexity of Dijkstra\'s algorithm when implemented with an adjacency list and a Binary Min-Heap priority queue?',
    type: 'mcq',
    options: [
      'O((V + E) log V)',
      'O(V^2)',
      'O(V * E)',
      'O(E^2)',
    ],
    correctOptionIndex: 0,
  },

  // ---------------- SOFT SKILLS & COMMUNICATION ----------------
  {
    id: 'comm-001',
    category: 'soft_skills',
    skillId: 'skill-communication',
    skillName: 'Communication',
    difficulty: 'intermediate',
    tags: ['stakeholder', 'deadlines'],
    title: 'Managing Unexpected Project Blockers',
    description: 'You discover a critical dependency issue 48 hours before an enterprise deployment milestone that will require 3 days to fix. What is the most professional action?',
    type: 'mcq',
    options: [
      'Immediately inform stakeholders with root cause, trade-off options, revised timeline, and proposed mitigation plan',
      'Stay silent and work overnight hoping nobody notices the missed deadline',
      'Blame the third-party dependency author on public channels',
      'Deploy the broken release to production and patch later',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'comm-002',
    category: 'soft_skills',
    skillId: 'skill-communication',
    skillName: 'Communication',
    difficulty: 'intermediate',
    tags: ['code-review', 'collaboration'],
    title: 'Constructive Technical Feedback in Code Reviews',
    description: 'During a PR review, you identify an O(N^2) algorithm that can be optimized to O(N). How should you phrase your review feedback?',
    type: 'mcq',
    options: [
      'Explain the performance impact on large datasets, suggest the O(N) hash map alternative with code snippet, and ask for their thoughts',
      'Comment "This code is bad and will crash the server. Fix it."',
      'Reject the pull request without leaving a comment',
      'Approve it anyway to avoid team tension',
    ],
    correctOptionIndex: 0,
  },
  {
    id: 'comm-003',
    category: 'soft_skills',
    skillId: 'skill-communication',
    skillName: 'Communication',
    difficulty: 'intermediate',
    tags: ['incident', 'blameless'],
    title: 'Blameless Post-Mortem Culture',
    description: 'What is the core objective of conducting a "Blameless Post-Mortem" following a critical system outage?',
    type: 'mcq',
    options: [
      'To identify systemic vulnerabilities and process improvements so the organization prevents future recurrence',
      'To determine which engineer should receive disciplinary penalties',
      'To assign public blame to the on-call responder',
      'To hide the incident log from the client',
    ],
    correctOptionIndex: 0,
  },
];

// Helper: Pseudo-random number generator using seed string
function seedRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Helper: Shuffle array with seeded RNG
function seededShuffle<T>(array: T[], rng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generate dynamic questions for custom or unlisted skills
function generateDynamicCustomQuestions(skillName: string, studentId: string, seed: string): QuestionBankItem[] {
  const rng = seedRandom(`${studentId}-${skillName}-${seed}`);
  const cleanName = skillName.trim();

  return [
    {
      id: `custom-q1-${Math.floor(rng() * 10000)}`,
      category: 'technical',
      skillId: `skill-${cleanName.toLowerCase().replace(/\\s+/g, '-')}`,
      skillName: cleanName,
      difficulty: 'intermediate',
      tags: ['architecture', 'best-practices'],
      title: `Production Architecture & Paradigm of ${cleanName}`,
      description: `Which architectural principle or design pattern provides the most scalable, maintainable foundation when implementing ${cleanName} in production enterprise environments?`,
      type: 'mcq',
      options: [
        `Strict modularity, explicit state boundaries, and clean interface decoupling`,
        `Global unconstrained mutable pointers with no type validation`,
        `Monolithic unversioned scripts running with root privileges`,
        `Bypassing error boundaries and exception handling`,
      ],
      correctOptionIndex: 0,
    },
    {
      id: `custom-q2-${Math.floor(rng() * 10000)}`,
      category: 'technical',
      skillId: `skill-${cleanName.toLowerCase().replace(/\\s+/g, '-')}`,
      skillName: cleanName,
      difficulty: 'advanced',
      tags: ['performance', 'concurrency'],
      title: `Concurrency & High-Throughput Optimization in ${cleanName}`,
      description: `When scaling ${cleanName} workflows under high concurrent load, which technique is most effective to eliminate bottlenecks and avoid race conditions?`,
      type: 'mcq',
      options: [
        `Atomic operations, event-driven message queues, and non-blocking asynchronous I/O`,
        `Arbitrary millisecond sleep delays in main thread loops`,
        `Disabling multithreading and clustering entirely`,
        `Duplicate in-memory caching without invalidation policies`,
      ],
      correctOptionIndex: 0,
    },
    {
      id: `custom-q3-${Math.floor(rng() * 10000)}`,
      category: 'technical',
      skillId: `skill-${cleanName.toLowerCase().replace(/\\s+/g, '-')}`,
      skillName: cleanName,
      difficulty: 'intermediate',
      tags: ['security', 'validation'],
      title: `Security Hardening & Vulnerability Mitigation for ${cleanName}`,
      description: `What is the primary security defense required when processing external, untrusted input within ${cleanName} integrations?`,
      type: 'mcq',
      options: [
        `Strict schema validation, parameterized queries, and least-privilege role access`,
        `Relying solely on client-side browser forms for validation`,
        `Base64 encoding sensitive credentials in source code`,
        `Allowing open CORS wildcard (*) headers on private endpoints`,
      ],
      correctOptionIndex: 0,
    },
    {
      id: `custom-q4-${Math.floor(rng() * 10000)}`,
      category: 'coding',
      skillId: `skill-${cleanName.toLowerCase().replace(/\\s+/g, '-')}`,
      skillName: cleanName,
      difficulty: 'intermediate',
      tags: ['practical', 'coding'],
      title: `Practical Implementation Sandbox for ${cleanName}`,
      description: `Implement an optimal function \`process_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_data(records, threshold)\` that filters, transforms, and validates incoming data items efficiently.`,
      type: 'code',
      starterCode: `def process_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_data(records: list, threshold: int = 10):
    # Optimal data processor for ${cleanName}
    results = []
    for item in records:
        if isinstance(item, dict) and item.get("score", 0) >= threshold:
            results.append(item)
    return results`,
      testCases: [
        { input: 'records with scores [5, 12, 18], threshold = 10', expectedOutput: '2 items returned', passed: true },
        { input: 'empty records list', expectedOutput: '[]', passed: true },
      ],
    },
  ];
}

/**
 * Generates a unique, non-repeating set of questions for a specific student, skill, and session.
 */
export function generateUniqueQuestionSet(options: {
  studentId?: string;
  studentName?: string;
  skillId?: string;
  skillName?: string;
  category?: 'coding' | 'technical' | 'aptitude' | 'soft_skills' | 'all';
  count?: number;
  sessionSeed?: string;
}): {
  questionSetId: string;
  candidateId: string;
  candidateName: string;
  skillName: string;
  generatedAt: string;
  checksum: string;
  questions: AssessmentQuestion[];
} {
  const studentId = options.studentId || 'student-candidate';
  const studentName = options.studentName || 'Candidate';
  const skillName = options.skillName || 'General Engineering';
  const sessionSeed = options.sessionSeed || `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const count = options.count || 5;

  const rng = seedRandom(`${studentId}-${skillName}-${sessionSeed}`);

  // 1. Filter relevant questions from master pool
  const normalizedSkill = skillName.toLowerCase();
  let candidatePool = MASTER_QUESTION_POOL.filter((q) => {
    const matchesSkill =
      q.skillName.toLowerCase().includes(normalizedSkill) ||
      normalizedSkill.includes(q.skillName.toLowerCase()) ||
      (options.skillId && q.skillId === options.skillId);
    const matchesCategory = !options.category || options.category === 'all' || q.category === options.category;
    return matchesSkill || (options.category && matchesCategory);
  });

  // If pool is small for this specific skill, include general algorithmic and technical questions or generate dynamic questions
  if (candidatePool.length < count) {
    const generalPool = MASTER_QUESTION_POOL.filter((q) => !candidatePool.some((cp) => cp.id === q.id));
    const dynamicCustom = generateDynamicCustomQuestions(skillName, studentId, sessionSeed);
    candidatePool = [...candidatePool, ...dynamicCustom, ...generalPool];
  }

  // 2. Seeded Shuffle to ensure unique randomized selection per student & attempt
  const shuffled = seededShuffle(candidatePool, rng);
  const selectedQuestions = shuffled.slice(0, count);

  // 3. Deep clone & randomize options for MCQs with recalculation of correct index
  const randomizedQuestions: AssessmentQuestion[] = selectedQuestions.map((q, idx) => {
    const questionCopy: AssessmentQuestion = {
      ...q,
      id: `q-${studentId.substring(0, 6)}-${q.id}-${idx + 1}-${Math.floor(rng() * 1000)}`,
      title: `${idx + 1}. ${q.title.replace(/^\\d+\\.\\s*/, '')}`,
    };

    if (q.type === 'mcq' && q.options && q.correctOptionIndex !== undefined) {
      const originalCorrectOption = q.options[q.correctOptionIndex];
      // Shuffle options uniquely for this student
      const shuffledOptions = seededShuffle([...q.options], rng);
      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);
      questionCopy.options = shuffledOptions;
      questionCopy.correctOptionIndex = newCorrectIndex >= 0 ? newCorrectIndex : 0;
    }

    return questionCopy;
  });

  // 4. Generate unique set tracking metadata
  const randomSuffix = Math.floor(1000 + rng() * 9000);
  const questionSetId = `QSET-${(studentName || 'STUDENT').toUpperCase().replace(/[^A-Z0-9]/g, '')}-${(skillName || 'TECH').toUpperCase().slice(0, 3)}-${randomSuffix}`;
  const checksum = `SHA256:${Math.floor(rng() * 0xffffffff).toString(16).padStart(8, '0')}`;

  return {
    questionSetId,
    candidateId: studentId,
    candidateName: studentName,
    skillName,
    generatedAt: new Date().toISOString(),
    checksum,
    questions: randomizedQuestions,
  };
}
