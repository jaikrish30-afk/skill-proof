import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  User,
  FileText,
  Award,
  CheckSquare,
  FolderGit2,
  Briefcase,
  Send,
  Video,
  Compass,
  Building2,
  Users,
  PlusCircle,
  BarChart3,
  Calendar,
  School,
  LineChart,
  Target,
  FileSpreadsheet,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Code2,
  Star,
  Search,
  Bot,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, setRole, studentProfile, setIsAIAgentOpen } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const studentNav = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Search Internships', path: '/student/internships', icon: Briefcase },
    { label: 'Online Compiler', path: '/student/compiler', icon: Code2 },
    { label: 'Customer Feedback', path: '/student/feedback', icon: Star },
    { label: 'My Applications', path: '/student/applications', icon: Send },
    { label: 'Skills & Proof', path: '/student/skills', icon: Award },
    { label: 'Assessments', path: '/student/assessments', icon: CheckSquare },
    { label: 'Projects Evidence', path: '/student/projects', icon: FolderGit2 },
    { label: 'Interviews', path: '/student/interviews', icon: Video },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Resume & Extract', path: '/student/resume', icon: FileText },
    { label: 'Learning Roadmap', path: '/student/roadmap', icon: Compass },
  ];

  const companyNav = [
    { label: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
    { label: 'Job Roles', path: '/company/jobs', icon: Briefcase },
    { label: 'Create Job Role', path: '/company/jobs/create', icon: PlusCircle },
    { label: 'Candidate Discovery', path: '/company/applicants', icon: Users },
    { label: 'Interviews Pipeline', path: '/company/interviews', icon: Calendar },
    { label: 'Hiring Analytics', path: '/company/analytics', icon: BarChart3 },
    { label: 'Customer Feedback', path: '/company/feedback', icon: Star },
  ];

  const institutionNav = [
    { label: 'Overview', path: '/institution/dashboard', icon: LayoutDashboard },
    { label: 'Students Directory', path: '/institution/students', icon: Users },
    { label: 'Skill Mapping', path: '/institution/skills', icon: LineChart },
    { label: 'Assessments', path: '/institution/assessments', icon: CheckSquare },
    { label: 'Internships', path: '/institution/internships', icon: Briefcase },
    { label: 'Placement Readiness', path: '/institution/placement-readiness', icon: Target },
    { label: 'Industry Demand', path: '/institution/industry-demand', icon: BarChart3 },
    { label: 'Accreditation Reports', path: '/institution/reports', icon: FileSpreadsheet },
    { label: 'Customer Feedback', path: '/institution/feedback', icon: Star },
  ];

  const currentNav =
    role === 'student'
      ? studentNav
      : role === 'company'
      ? companyNav
      : institutionNav;

  return (
    <aside
      className={`relative z-20 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg text-white tracking-tight leading-none">
                Inter<span className="text-brand-400">Track</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                {role} portal
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Badge Indicator */}
      {!collapsed && (
        <div className="p-3 mx-3 my-3 rounded-xl bg-slate-800 border border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400">
              {role === 'student' ? (
                <GraduationCap className="w-4 h-4 text-amber-400" />
              ) : role === 'company' ? (
                <Building2 className="w-4 h-4 text-brand-400" />
              ) : (
                <School className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {role === 'student'
                  ? 'Jai Krish K R'
                  : role === 'company'
                  ? 'SecureTech Solutions'
                  : 'SRM Institute'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {role === 'student'
                  ? 'SRM IST (IT Dept)'
                  : role === 'company'
                  ? 'Industry Recruiter'
                  : 'Academic Administration'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        {currentNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student/dashboard' || item.path === '/company/dashboard' || item.path === '/institution/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Evidence Quality / Quick Switch */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950">
          <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-brand-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence Engine</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              "Don't just list skills. Prove them."
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
