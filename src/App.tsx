import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CustomerFeedbackPage } from './pages/feedback/CustomerFeedbackPage';

// Layout & Global Components
import { AppLayout } from './components/layout/AppLayout';
import { AIAgentDrawer } from './components/common/AIAgentDrawer';

// Live Interview & Meeting Room
import { LiveInterviewRoomPage } from './pages/interview/LiveInterviewRoomPage';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { ResumeExtractionPage } from './pages/student/ResumeExtractionPage';
import { StudentSkillsPage } from './pages/student/StudentSkillsPage';
import { AssessmentsCatalogPage } from './pages/student/AssessmentsCatalogPage';
import { AssessmentTakePage } from './pages/student/AssessmentTakePage';
import { ProjectsEvidencePage } from './pages/student/ProjectsEvidencePage';
import { InternshipSearchPage } from './pages/student/InternshipSearchPage';
import { OpportunitiesPage } from './pages/student/OpportunitiesPage';
import { OpportunityDetailPage } from './pages/student/OpportunityDetailPage';
import { ApplicationsTrackingPage } from './pages/student/ApplicationsTrackingPage';
import { StudentInterviewsPage } from './pages/student/StudentInterviewsPage';
import { LearningRoadmapPage } from './pages/student/LearningRoadmapPage';
import { OnlineCompilerPage } from './pages/student/OnlineCompilerPage';

// Company Portal Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyJobsPage } from './pages/company/CompanyJobsPage';
import { CreateJobPage } from './pages/company/CreateJobPage';
import { CandidateDiscoveryPage } from './pages/company/CandidateDiscoveryPage';
import { CandidateDetailPage } from './pages/company/CandidateDetailPage';
import { CompanyInterviewsPipelinePage } from './pages/company/CompanyInterviewsPipelinePage';
import { CompanyAnalyticsPage } from './pages/company/CompanyAnalyticsPage';

// Institution Portal Pages
import { InstitutionDashboard } from './pages/institution/InstitutionDashboard';
import { InstitutionStudentsDirectoryPage } from './pages/institution/InstitutionStudentsDirectoryPage';
import { InstitutionSkillMappingPage } from './pages/institution/InstitutionSkillMappingPage';
import { InstitutionAssessmentsPage } from './pages/institution/InstitutionAssessmentsPage';
import { InstitutionInternshipsPage } from './pages/institution/InstitutionInternshipsPage';
import { PlacementReadinessPage } from './pages/institution/PlacementReadinessPage';
import { IndustrySkillDemandPage } from './pages/institution/IndustrySkillDemandPage';
import { InstitutionReportsPage } from './pages/institution/InstitutionReportsPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Global Real-Time AI Agent Copilot Drawer & Launcher */}
        <AIAgentDrawer />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/feedback" element={<CustomerFeedbackPage />} />
          <Route path="/interview-room/:roomId" element={<LiveInterviewRoomPage />} />
          <Route path="/interview-room" element={<LiveInterviewRoomPage />} />

          {/* Student Portal Routes */}
          <Route path="/student" element={<AppLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfilePage />} />
            <Route path="resume" element={<ResumeExtractionPage />} />
            <Route path="skills" element={<StudentSkillsPage />} />
            <Route path="assessments" element={<AssessmentsCatalogPage />} />
            <Route path="assessments/:id" element={<AssessmentTakePage />} />
            <Route path="projects" element={<ProjectsEvidencePage />} />
            <Route path="internships" element={<InternshipSearchPage />} />
            <Route path="compiler" element={<OnlineCompilerPage />} />
            <Route path="feedback" element={<CustomerFeedbackPage />} />
            <Route path="opportunities" element={<InternshipSearchPage />} />
            <Route path="opportunities/:id" element={<OpportunityDetailPage />} />
            <Route path="applications" element={<ApplicationsTrackingPage />} />
            <Route path="interviews" element={<StudentInterviewsPage />} />
            <Route path="roadmap" element={<LearningRoadmapPage />} />
          </Route>

          {/* Company Portal Routes */}
          <Route path="/company" element={<AppLayout />}>
            <Route index element={<Navigate to="/company/dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="jobs" element={<CompanyJobsPage />} />
            <Route path="jobs/create" element={<CreateJobPage />} />
            <Route path="applicants" element={<CandidateDiscoveryPage />} />
            <Route path="candidates/:id" element={<CandidateDetailPage />} />
            <Route path="interviews" element={<CompanyInterviewsPipelinePage />} />
            <Route path="analytics" element={<CompanyAnalyticsPage />} />
            <Route path="feedback" element={<CustomerFeedbackPage />} />
          </Route>

          {/* Institution Portal Routes */}
          <Route path="/institution" element={<AppLayout />}>
            <Route index element={<Navigate to="/institution/dashboard" replace />} />
            <Route path="dashboard" element={<InstitutionDashboard />} />
            <Route path="students" element={<InstitutionStudentsDirectoryPage />} />
            <Route path="skills" element={<InstitutionSkillMappingPage />} />
            <Route path="assessments" element={<InstitutionAssessmentsPage />} />
            <Route path="internships" element={<InstitutionInternshipsPage />} />
            <Route path="placement-readiness" element={<PlacementReadinessPage />} />
            <Route path="industry-demand" element={<IndustrySkillDemandPage />} />
            <Route path="reports" element={<InstitutionReportsPage />} />
            <Route path="feedback" element={<CustomerFeedbackPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

