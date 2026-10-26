import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Layers,
  Building2,
  School,
  Menu,
  X,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, startDemoTour, setIsAIAgentOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleQuickLogin = (selectedRole: 'student' | 'company' | 'institution') => {
    setRole(selectedRole);
    if (selectedRole === 'student') navigate('/student/dashboard');
    if (selectedRole === 'company') navigate('/company/dashboard');
    if (selectedRole === 'institution') navigate('/institution/dashboard');
  };

  const handleStartGuidedDemo = () => {
    startDemoTour();
    navigate('/student/dashboard');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white relative shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="absolute -bottom-1 -right-1 bg-stone-900 rounded-full p-0.5 border border-white">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-stone-900 flex items-center gap-0.5">
                Inter<span className="text-brand-600">Track</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500 -mt-0.5 hidden sm:block">
                Smart Internship & Skill Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-xs sm:text-sm font-semibold transition-colors hover:text-brand-600 ${
                location.pathname === '/' ? 'text-brand-600 font-bold' : 'text-stone-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/student/internships"
              className={`text-xs sm:text-sm font-semibold transition-colors hover:text-brand-600 ${
                location.pathname.includes('internship') ? 'text-brand-600 font-bold' : 'text-stone-600'
              }`}
            >
              Search Internships
            </Link>
            <Link
              to="/student/compiler"
              className={`text-xs sm:text-sm font-semibold transition-colors hover:text-brand-600 ${
                location.pathname.includes('compiler') ? 'text-brand-600 font-bold' : 'text-stone-600'
              }`}
            >
              Online Compiler
            </Link>
            <Link
              to="/feedback"
              className={`text-xs sm:text-sm font-semibold transition-colors hover:text-brand-600 ${
                location.pathname === '/feedback' ? 'text-brand-600 font-bold' : 'text-stone-600'
              }`}
            >
              Customer Reviews
            </Link>
            <button
              onClick={() => setIsAIAgentOpen(true)}
              className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Copilot</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Guided Demo Button */}
            <button
              onClick={handleStartGuidedDemo}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Guided Demo</span>
            </button>

            <div className="h-5 w-px bg-stone-200" />

            <Link
              to="/login"
              className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-brand-600 transition-colors"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleStartGuidedDemo}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>Demo</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              How It Works
            </a>
            <a
              href="#for-students"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              For Students
            </a>
            <a
              href="#for-companies"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              For Companies
            </a>
            <a
              href="#for-institutions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
            >
              For Institutions
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3">
              1-Click Demo Portals
            </div>
            <div className="grid grid-cols-3 gap-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRoleQuickLogin('student');
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-center"
              >
                Student
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRoleQuickLogin('company');
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-center"
              >
                Company
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRoleQuickLogin('institution');
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-center"
              >
                Institution
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-brand-600 font-semibold text-white shadow-md shadow-brand-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
