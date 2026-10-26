export type UserRole = 'student' | 'company' | 'institution';

export interface SkillEvidence {
  level: 1 | 2 | 3 | 4; // 1: Knowledge (MCQ), 2: Practical (Coding), 3: Project Evidence, 4: Interview Verified
  levelName: string;
  name: string;
  status: 'verified' | 'pending' | 'in_progress' | 'unverified';
  score?: number;
  date?: string;
  notes?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Security' | 'Networking' | 'Web' | 'Data & AI' | 'Soft Skills';
  confidenceScore: number;
  verified: boolean;
  verificationLevel: 1 | 2 | 3 | 4;
  evidenceList: SkillEvidence[];
  verifiedDate?: string;
}

export interface ProjectEvidence {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  skillsDemonstrated: string[];
  evidenceStatus: 'verified' | 'submitted' | 'under_review';
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  evidenceDetails: string;
  date: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'mcq';
  starterCode?: string;
  solutionTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    explanation?: string;
    passed?: boolean;
  }[];
  options?: string[];
  correctOptionIndex?: number;
  hint?: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: 'coding' | 'technical' | 'aptitude' | 'soft_skills';
  skillId: string;
  skillName: string;
  durationMinutes: number;
  questionCount: number;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  passed?: boolean;
  breakdown?: {
    correctness: number;
    codeQuality: number;
    efficiency: number;
    understanding: number;
  };
  questions: AssessmentQuestion[];
  completedDate?: string;
  questionSetId?: string;
  candidateId?: string;
  checksum?: string;
  generatedAt?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Co-op';
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  stipend?: string;
  description: string;
  requiredSkills: {
    name: string;
    requiredScore: number;
  }[];
  minScore: number;
  matchPercentage?: number;
  postedDate: string;
  applicantsCount: number;
  departmentTarget: string[];
  isOpen: boolean;
  duration?: string;
  domain?: string;
  perks?: string[];
}

export interface Application {
  id: string;
  opportunityId: string;
  studentId: string;
  studentName: string;
  company: string;
  role: string;
  appliedDate: string;
  matchScore: number;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Technical Interview' | 'HR Interview' | 'Selected' | 'Rejected';
  stageIndex: number;
  timeline: {
    stage: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
}

export interface InterviewStage {
  name: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Interview {
  id: string;
  title: string;
  company: string;
  role: string;
  date: string;
  time: string;
  interviewer: string;
  interviewerRole: string;
  platform: string;
  meetingLink: string;
  type: 'Technical' | 'HR';
  status: 'Scheduled' | 'Completed' | 'Upcoming';
  currentStage: string;
  stages: InterviewStage[];
  notes?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  skillGap: string;
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  resourceType: 'Lab Challenge' | 'Video Course' | 'Assessment' | 'Project' | 'Certification';
  description: string;
  linkText?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'interview';
  link?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  department: string;
  year: string;
  degree: string;
  cgpa: string;
  careerGoal: string;
  bio: string;
  location: string;
  overallScore: number;
  verifiedSkillsCount: number;
  totalSkillsCount: number;
  assessmentsCompleted: number;
  applicationsCount: number;
  interviewsCount: number;
}

export interface FeedbackItem {
  id: string;
  authorName: string;
  authorRole: 'Student' | 'Recruiter' | 'Institution Faculty' | 'Industry Mentor' | 'Guest';
  authorOrg: string;
  authorAvatar?: string;
  rating: number; // 1 to 5
  category: 'Platform Experience' | 'Internship Matching' | 'Online Compiler' | 'AI Agent Assistance' | 'Skill Verification';
  content: string;
  wouldRecommend: boolean;
  helpfulCount: number;
  createdAt: string;
  verifiedBadge?: boolean;
  tags?: string[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  suggestedFollowUps?: string[];
}

