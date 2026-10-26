import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  Building2,
  GraduationCap,
  School,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  Code2,
  Star,
  Bot,
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  const {
    role,
    setRole,
    studentProfile,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    startDemoTour,
    setIsAIAgentOpen,
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (role === 'student') {
      navigate(`/student/internships?q=${encodeURIComponent(searchQuery)}`);
    } else if (role === 'company') {
      navigate(`/company/applicants?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/institution/students?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleRoleSwitch = (newRole: 'student' | 'company' | 'institution') => {
    setRole(newRole);
    setProfileDropdownOpen(false);
    if (newRole === 'student') navigate('/student/dashboard');
    if (newRole === 'company') navigate('/company/dashboard');
    if (newRole === 'institution') navigate('/institution/dashboard');
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-stone-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                role === 'student'
                  ? 'Search internships, skills, compiler, AI...'
                  : role === 'company'
                  ? 'Search candidates by skill, college, score...'
                  : 'Search department skills, cohorts, reports...'
              }
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 hover:bg-stone-100 focus:bg-white text-stone-900 placeholder:text-stone-400 rounded-lg border border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
            />
          </form>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Copilot Quick Button */}
          <button
            onClick={() => setIsAIAgentOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer shadow-xs"
            title="Ask InterTrack Real-Time AI Agent"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Online Compiler Quick Button */}
          <Link
            to="/student/compiler"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
            title="Open Online Code Compiler"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-700" />
            <span>Compiler</span>
          </Link>

          {/* Customer Reviews Quick Button */}
          <Link
            to="/feedback"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
            title="Public Customer Feedback & Reviews (Visible to All)"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Reviews</span>
          </Link>

          {/* Interactive Guided Demo Button */}
          <button
            onClick={startDemoTour}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tour</span>
          </button>

          {/* Active Role Selector Pill */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleRoleSwitch('student')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                role === 'student'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => handleRoleSwitch('company')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                role === 'company'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company</span>
            </button>
            <button
              onClick={() => handleRoleSwitch('institution')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                role === 'institution'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Institution</span>
            </button>
          </div>

          {/* Notification dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification menu */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-scale-up">
                <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 font-display">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">No notifications yet</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.link) {
                            setNotifDropdownOpen(false);
                            navigate(n.link);
                          }
                        }}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                          {n.type === 'interview' && <Sparkles className="w-4 h-4 text-indigo-500" />}
                          {n.type === 'info' && <Info className="w-4 h-4 text-brand-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${!n.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {n.timestamp}
                          </span>
                        </div>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    to="/student/dashboard"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                  >
                    <span>View Activity Stream</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={
                  role === 'student'
                    ? studentProfile.avatar
                    : role === 'company'
                    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
                    : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
                }
                alt="User Profile"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {role === 'student'
                    ? studentProfile.name
                    : role === 'company'
                    ? 'SecureTech HR Team'
                    : 'Dean Academics (SRM)'}
                </span>
                <span className="text-[10px] uppercase font-bold text-brand-600">
                  {role} View
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Profile Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-scale-up py-1.5">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {role === 'student' ? studentProfile.email : 'hr@securetech.com'}
                  </p>
                </div>

                <div className="py-1">
                  <div className="px-4 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Switch Active Portal
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('student')}
                    className={`w-full px-4 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                      role === 'student' ? 'text-brand-600 font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Student Portal (Jai Krish)
                    </span>
                    {role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('company')}
                    className={`w-full px-4 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                      role === 'company' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company Portal (SecureTech)
                    </span>
                    {role === 'company' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('institution')}
                    className={`w-full px-4 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                      role === 'institution' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <School className="w-4 h-4" />
                      Institution Portal (SRM IST)
                    </span>
                    {role === 'institution' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <Link
                    to="/student/profile"
                    onClick={() => {
                      setRole('student');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-left text-brand-600 font-bold hover:bg-blue-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-brand-600" />
                    <span>Create / Manage Profiles</span>
                  </Link>

                  <Link
                    to="/"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-slate-400" />
                    <span>Back to Public Landing</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
