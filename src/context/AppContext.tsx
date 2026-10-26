import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  Skill,
  ProjectEvidence,
  Assessment,
  Opportunity,
  Application,
  Interview,
  RoadmapStep,
  NotificationItem,
  FeedbackItem,
} from '../types';
import {
  initialStudentProfile,
  initialSkills,
  initialProjects,
  initialAssessments,
  initialOpportunities,
  initialApplications,
  initialInterviews,
  initialRoadmap,
  initialNotifications,
  initialCandidatesPool,
  institutionData,
  initialFeedback,
  CandidateDiscoveryItem,
} from '../data/initialData';

import { generateUniqueQuestionSet } from '../services/questionGenerator';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  studentProfile: StudentProfile;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  verifySkill: (skillId: string, level: 1 | 2 | 3 | 4, score?: number) => void;
  addNewSkillWithVerification: (skillName: string, category: Skill['category'], score: number) => void;
  uploadStudentAvatar: (avatarDataUrl: string) => void;
  createNewProfile: (newProfile: Partial<StudentProfile>) => void;
  addExtractedSkills: (newSkills: Partial<Skill>[]) => void;
  projects: ProjectEvidence[];
  addProject: (proj: ProjectEvidence) => void;
  assessments: Assessment[];
  generateAssessmentQuestionSet: (assessmentId: string, customSeed?: string) => Assessment | undefined;
  getUniqueQuestionsForSkill: (skillName: string, count?: number) => {
    questionSetId: string;
    checksum: string;
    questions: any[];
  };
  submitAssessment: (assessmentId: string, score: number, breakdown: Assessment['breakdown']) => void;
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'postedDate' | 'applicantsCount' | 'isOpen'>) => void;
  applications: Application[];
  applyForOpportunity: (oppId: string) => void;
  applyBySkillSet: (data: {
    targetRoleTitle: string;
    targetCompany: string;
    selectedSkillNames: string[];
    customPitch?: string;
  }) => void;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  interviews: Interview[];
  scheduleInterview: (interview: Omit<Interview, 'id' | 'status'>) => void;
  roadmap: RoadmapStep[];
  toggleRoadmapStep: (stepId: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  candidatesPool: CandidateDiscoveryItem[];
  updateCandidateStatus: (candidateId: string, status: CandidateDiscoveryItem['status']) => void;
  institutionStats: typeof institutionData;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  isDemoTourActive: boolean;
  demoTourStep: number;
  startDemoTour: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  stopDemoTour: () => void;
  jumpToDemoStep: (step: number) => void;
  resetAllData: () => void;
  // Customer Feedback (Visible to All)
  feedbacks: FeedbackItem[];
  addFeedback: (item: Omit<FeedbackItem, 'id' | 'createdAt' | 'helpfulCount'>) => void;
  upvoteFeedback: (feedbackId: string) => void;
  // AI Agent (Real-time Q&A Copilot)
  isAIAgentOpen: boolean;
  setIsAIAgentOpen: (open: boolean) => void;
  openAIAgentWithPrompt: (prompt?: string) => void;
  aiInitialPrompt: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'intertrack_app_data_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return ((localStorage.getItem('intertrack_role') || localStorage.getItem('skillproof_role')) as UserRole) || 'student';
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`) || localStorage.getItem('skillproof_app_data_v1_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills`) || localStorage.getItem('skillproof_app_data_v1_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [projects, setProjects] = useState<ProjectEvidence[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects`) || localStorage.getItem('skillproof_app_data_v1_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [assessments, setAssessments] = useState<Assessment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_assessments`) || localStorage.getItem('skillproof_app_data_v1_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_opportunities`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialOpportunities.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return initialOpportunities;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_applications`) || localStorage.getItem('skillproof_app_data_v1_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_interviews`) || localStorage.getItem('skillproof_app_data_v1_interviews');
    return saved ? JSON.parse(saved) : initialInterviews;
  });

  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_roadmap`) || localStorage.getItem('skillproof_app_data_v1_roadmap');
    return saved ? JSON.parse(saved) : initialRoadmap;
  });

  // Customer Feedback State (Visible to all)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_feedbacks`);
    return saved ? JSON.parse(saved) : initialFeedback;
  });

  // Real-time AI Agent Drawer State
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [candidatesPool, setCandidatesPool] = useState<CandidateDiscoveryItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_candidates`);
    return saved ? JSON.parse(saved) : initialCandidatesPool;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Interactive Guided Tour State
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);
  const [demoTourStep, setDemoTourStep] = useState<number>(1);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('skillproof_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills`, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_assessments`, JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_opportunities`, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_interviews`, JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_roadmap`, JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_candidates`, JSON.stringify(candidatesPool));
  }, [candidatesPool]);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addToast(`Switched active portal to ${newRole.toUpperCase()}`, 'info');
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({ ...prev, ...updates }));
    addToast('Student profile updated successfully.');
  };

  const uploadStudentAvatar = (avatarDataUrl: string) => {
    setStudentProfile((prev) => ({ ...prev, avatar: avatarDataUrl }));
    addToast('Profile photo updated successfully!', 'success');
  };

  const createNewProfile = (newProfileData: Partial<StudentProfile>) => {
    const freshProfile: StudentProfile = {
      id: `student-${Date.now()}`,
      name: newProfileData.name || 'New Student',
      email: newProfileData.email || 'student@university.edu',
      avatar: newProfileData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      college: newProfileData.college || 'SRM Institute of Science and Technology',
      department: newProfileData.department || 'Computer Science & Engineering',
      year: newProfileData.year || 'B.Tech - 3rd Year',
      degree: newProfileData.degree || 'Bachelor of Technology',
      cgpa: newProfileData.cgpa || '8.5 / 10.0',
      careerGoal: newProfileData.careerGoal || 'Software Engineer',
      bio: newProfileData.bio || 'Aspiring technology engineer building evidence-backed skill proof.',
      location: newProfileData.location || 'Chennai, India',
      overallScore: 70,
      verifiedSkillsCount: 1,
      totalSkillsCount: 3,
      assessmentsCompleted: 1,
      applicationsCount: 0,
      interviewsCount: 0,
    };

    setStudentProfile(freshProfile);
    addToast(`New candidate profile created for ${freshProfile.name}!`, 'success');
  };

  const addNewSkillWithVerification = (skillName: string, category: Skill['category'], score: number) => {
    const isPassed = score >= 70;
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: skillName,
      category,
      confidenceScore: score,
      verified: isPassed,
      verificationLevel: isPassed ? 1 : 1,
      verifiedDate: isPassed ? new Date().toISOString().split('T')[0] : undefined,
      evidenceList: [
        {
          level: 1,
          levelName: 'Level 1: Knowledge Diagnostic Test',
          name: `${skillName} Diagnostic Verification Challenge`,
          status: isPassed ? 'verified' : 'pending',
          score,
          date: new Date().toISOString().split('T')[0],
          notes: isPassed
            ? `Passed real-time verification test with ${score}%. Authenticated into InterTrack.`
            : `Score (${score}%) was below 70% threshold. Needs study before re-test.`,
        },
        {
          level: 2,
          levelName: 'Level 2: Practical Code Benchmark',
          name: `${skillName} Timed Sandbox Challenge`,
          status: 'pending',
        },
      ],
    };

    setSkills((prev) => {
      const existing = prev.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase());
      return [newSkill, ...existing];
    });

    if (isPassed) {
      setStudentProfile((prev) => ({
        ...prev,
        totalSkillsCount: prev.totalSkillsCount + 1,
        verifiedSkillsCount: prev.verifiedSkillsCount + 1,
      }));
      addToast(`Skill "${skillName}" verified with ${score}% on diagnostic test!`, 'success');
    } else {
      addToast(`Skill "${skillName}" added as Unverified (${score}%). Score &gt;= 70% needed to verify.`, 'warning');
    }
  };

  const verifySkill = (skillId: string, level: 1 | 2 | 3 | 4, score?: number) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id === skillId) {
          const newLevel = Math.max(s.verificationLevel, level) as 1 | 2 | 3 | 4;
          const updatedEvidence = s.evidenceList.map((ev) => {
            if (ev.level === level) {
              return { ...ev, status: 'verified' as const, score: score || ev.score || 85, date: new Date().toISOString().split('T')[0] };
            }
            return ev;
          });
          return {
            ...s,
            verified: true,
            verificationLevel: newLevel,
            confidenceScore: Math.min(100, Math.max(s.confidenceScore, score || 85)),
            verifiedDate: new Date().toISOString().split('T')[0],
            evidenceList: updatedEvidence,
          };
        }
        return s;
      })
    );
    addToast(`Skill verified: Level ${level} evidence confirmed!`, 'success');
  };

  const addExtractedSkills = (newSkills: Partial<Skill>[]) => {
    setSkills((prev) => {
      const merged = [...prev];
      newSkills.forEach((ns) => {
        const existingIdx = merged.findIndex((m) => m.name.toLowerCase() === (ns.name || '').toLowerCase());
        if (existingIdx >= 0) {
          merged[existingIdx] = {
            ...merged[existingIdx],
            confidenceScore: ns.confidenceScore || merged[existingIdx].confidenceScore,
            verified: true,
          };
        } else if (ns.name) {
          merged.push({
            id: `skill-${Date.now()}-${Math.random()}`,
            name: ns.name,
            category: (ns.category as any) || 'Programming',
            confidenceScore: ns.confidenceScore || 80,
            verified: false,
            verificationLevel: 1,
            evidenceList: [
              {
                level: 1,
                levelName: 'Level 1: Knowledge',
                name: `${ns.name} Core Concepts`,
                status: 'verified',
                score: ns.confidenceScore || 80,
                date: new Date().toISOString().split('T')[0],
              },
            ],
          });
        }
      });
      return merged;
    });

    setStudentProfile((prev) => ({
      ...prev,
      totalSkillsCount: prev.totalSkillsCount + 2,
      overallScore: 82,
    }));

    addToast('Skills extracted and merged into InterTrack profile.', 'success');
  };

  const addProject = (proj: ProjectEvidence) => {
    setProjects((prev) => [proj, ...prev]);
    addToast('Project evidence added and submitted for peer verification.', 'success');
  };

  const generateAssessmentQuestionSet = (assessmentId: string, customSeed?: string) => {
    const target = assessments.find((a) => a.id === assessmentId);
    if (!target) return undefined;

    const generated = generateUniqueQuestionSet({
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      skillId: target.skillId,
      skillName: target.skillName,
      category: target.category,
      count: 5,
      sessionSeed: customSeed || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    });

    const updatedAssessment: Assessment = {
      ...target,
      questionCount: generated.questions.length,
      questions: generated.questions,
      questionSetId: generated.questionSetId,
      candidateId: studentProfile.id,
      checksum: generated.checksum,
      generatedAt: generated.generatedAt,
    };

    setAssessments((prev) =>
      prev.map((a) => (a.id === assessmentId ? updatedAssessment : a))
    );

    return updatedAssessment;
  };

  const getUniqueQuestionsForSkill = (skillName: string, count = 3) => {
    const generated = generateUniqueQuestionSet({
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      skillName,
      count,
      sessionSeed: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    });

    return {
      questionSetId: generated.questionSetId,
      checksum: generated.checksum,
      questions: generated.questions,
    };
  };

  const submitAssessment = (assessmentId: string, score: number, breakdown: Assessment['breakdown']) => {
    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id === assessmentId) {
          return {
            ...a,
            status: 'completed' as const,
            score,
            passed: score >= 70,
            breakdown,
            completedDate: new Date().toISOString().split('T')[0],
          };
        }
        return a;
      })
    );

    // Auto-verify corresponding skill
    const targetAssessment = assessments.find((a) => a.id === assessmentId);
    if (targetAssessment) {
      verifySkill(targetAssessment.skillId, 2, score);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Assessment Verified & Passed!',
      message: `You scored ${score}% on the ${targetAssessment?.title || 'Technical Assessment'}. Skill verified on your public profile!`,
      timestamp: 'Just now',
      read: false,
      type: 'success',
      link: '/student/skills',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addToast(`Assessment completed! Score: ${score}% - Skill Verified!`, 'success');
  };

  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'postedDate' | 'applicantsCount' | 'isOpen'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      isOpen: true,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    addToast('New opportunity published to student portal!', 'success');
  };

  const applyForOpportunity = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    const existing = applications.find((a) => a.opportunityId === oppId);
    if (existing) {
      addToast('You have already applied for this opportunity.', 'warning');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: oppId,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      company: opp.company,
      role: opp.title,
      appliedDate: new Date().toISOString().split('T')[0],
      matchScore: opp.matchPercentage || 80,
      status: 'Applied',
      stageIndex: 0,
      timeline: [
        { stage: 'Application Submitted', date: 'Today', status: 'completed' },
        { stage: 'AI InterTrack Verification', date: 'In Progress', status: 'current' },
        { stage: 'Technical Assessment', date: 'Pending', status: 'upcoming' },
        { stage: 'Technical Interview', date: 'Pending', status: 'upcoming' },
      ],
    };

    setApplications((prev) => [newApp, ...prev]);
    setStudentProfile((prev) => ({ ...prev, applicationsCount: prev.applicationsCount + 1 }));
    addToast(`Application submitted to ${opp.company} for ${opp.title}!`, 'success');
  };

  const applyBySkillSet = (data: {
    targetRoleTitle: string;
    targetCompany: string;
    selectedSkillNames: string[];
    customPitch?: string;
  }) => {
    // Calculate match score based on selected verified skills
    const matchingSkills = skills.filter((s) => data.selectedSkillNames.includes(s.name));
    const avgScore =
      matchingSkills.length > 0
        ? Math.round(matchingSkills.reduce((acc, curr) => acc + curr.confidenceScore, 0) / matchingSkills.length)
        : 85;

    const newApp: Application = {
      id: `app-skill-${Date.now()}`,
      opportunityId: `custom-skill-opp-${Date.now()}`,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      company: data.targetCompany,
      role: data.targetRoleTitle,
      appliedDate: new Date().toISOString().split('T')[0],
      matchScore: avgScore,
      status: 'Applied',
      stageIndex: 0,
      timeline: [
        { stage: `Skill Application (${data.selectedSkillNames.join(', ')})`, date: 'Today', status: 'completed' },
        { stage: 'InterTrack Cryptographic Verification', date: 'In Progress', status: 'current' },
        { stage: 'Direct Recruiter Review', date: 'Upcoming', status: 'upcoming' },
        { stage: 'Technical Defense / Interview', date: 'Upcoming', status: 'upcoming' },
      ],
    };

    setApplications((prev) => [newApp, ...prev]);
    setStudentProfile((prev) => ({ ...prev, applicationsCount: prev.applicationsCount + 1 }));

    const newNotif: NotificationItem = {
      id: `notif-skill-app-${Date.now()}`,
      title: 'Skill-Based Application Dispatched',
      message: `Your verified profile with skills [${data.selectedSkillNames.join(', ')}] was submitted to ${data.targetCompany} for ${data.targetRoleTitle}.`,
      timestamp: 'Just now',
      read: false,
      type: 'success',
      link: '/student/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast(`Skill-based application submitted to ${data.targetCompany} with ${data.selectedSkillNames.length} verified skills!`, 'success');
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return { ...a, status };
        }
        return a;
      })
    );
    addToast(`Application status updated to "${status}".`, 'info');
  };

  const scheduleInterview = (interviewData: Omit<Interview, 'id' | 'status'>) => {
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`,
      status: 'Scheduled',
    };
    setInterviews((prev) => [newInterview, ...prev]);
    setStudentProfile((prev) => ({ ...prev, interviewsCount: prev.interviewsCount + 1 }));

    // Notify student
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Interview Scheduled: ${interviewData.role}`,
      message: `${interviewData.company} scheduled a ${interviewData.type} interview on ${interviewData.date}.`,
      timestamp: 'Just now',
      read: false,
      type: 'interview',
      link: '/student/interviews',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast(`Interview scheduled with candidate for ${interviewData.date}!`, 'success');
  };

  const toggleRoadmapStep = (stepId: string) => {
    setRoadmap((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          const nextStatus = step.status === 'completed' ? 'in_progress' : step.status === 'in_progress' ? 'completed' : 'in_progress';
          return { ...step, status: nextStatus };
        }
        return step;
      })
    );
    addToast('Roadmap progress updated.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.');
  };

  const updateCandidateStatus = (candidateId: string, status: CandidateDiscoveryItem['status']) => {
    setCandidatesPool((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status } : c))
    );
    addToast(`Candidate status marked as ${status}.`, 'success');
  };

  // Feedback Methods (Visible to All)
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_feedbacks`, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const addFeedback = (item: Omit<FeedbackItem, 'id' | 'createdAt' | 'helpfulCount'>) => {
    const newFeedback: FeedbackItem = {
      ...item,
      id: `fb-${Date.now()}`,
      createdAt: 'Just now',
      helpfulCount: 0,
      verifiedBadge: true,
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
    addToast('Thank you! Your feedback has been published and is visible to all.', 'success');
  };

  const upvoteFeedback = (feedbackId: string) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === feedbackId ? { ...f, helpfulCount: f.helpfulCount + 1 } : f))
    );
    addToast('Marked review as helpful! 👍', 'info');
  };

  const openAIAgentWithPrompt = (prompt?: string) => {
    if (prompt) setAiInitialPrompt(prompt);
    setIsAIAgentOpen(true);
  };

  const resetAllData = () => {
    localStorage.clear();
    setStudentProfile(initialStudentProfile);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setAssessments(initialAssessments);
    setOpportunities(initialOpportunities);
    setApplications(initialApplications);
    setInterviews(initialInterviews);
    setRoadmap(initialRoadmap);
    setNotifications(initialNotifications);
    setCandidatesPool(initialCandidatesPool);
    setFeedbacks(initialFeedback);
    setRoleState('student');
    setIsDemoTourActive(false);
    setDemoTourStep(1);
    addToast('Demo data reset to factory initial states.', 'info');
  };

  // Demo Tour Navigation
  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(1);
    setRoleState('student');
    addToast('Starting guided 17-step end-to-end demo flow!', 'info');
  };

  const nextDemoStep = () => {
    setDemoTourStep((prev) => Math.min(17, prev + 1));
  };

  const prevDemoStep = () => {
    setDemoTourStep((prev) => Math.max(1, prev - 1));
  };

  const stopDemoTour = () => {
    setIsDemoTourActive(false);
    addToast('Exited Guided Tour.', 'info');
  };

  const jumpToDemoStep = (step: number) => {
    setDemoTourStep(step);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        studentProfile,
        updateStudentProfile,
        uploadStudentAvatar,
        createNewProfile,
        skills,
        setSkills,
        verifySkill,
        addNewSkillWithVerification,
        addExtractedSkills,
        projects,
        addProject,
        assessments,
        generateAssessmentQuestionSet,
        getUniqueQuestionsForSkill,
        submitAssessment,
        opportunities,
        addOpportunity,
        applications,
        applyForOpportunity,
        applyBySkillSet,
        updateApplicationStatus,
        interviews,
        scheduleInterview,
        roadmap,
        toggleRoadmapStep,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        candidatesPool,
        updateCandidateStatus,
        institutionStats: institutionData,
        toasts,
        addToast,
        removeToast,
        isDemoTourActive,
        demoTourStep,
        startDemoTour,
        nextDemoStep,
        prevDemoStep,
        stopDemoTour,
        jumpToDemoStep,
        resetAllData,
        feedbacks,
        addFeedback,
        upvoteFeedback,
        isAIAgentOpen,
        setIsAIAgentOpen,
        openAIAgentWithPrompt,
        aiInitialPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
