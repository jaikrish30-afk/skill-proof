import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Building2,
  School,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setRole, startDemoTour } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('jaikrish.kr@srmist.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('student');
    navigate('/student/dashboard');
  };

  const handleDemoLogin = (demoRole: 'student' | 'company' | 'institution') => {
    setRole(demoRole);
    if (demoRole === 'student') navigate('/student/dashboard');
    if (demoRole === 'company') navigate('/company/dashboard');
    if (demoRole === 'institution') navigate('/institution/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-stone-900">
            Skill<span className="text-brand-600">Proof</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          Or{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500">
            create a new evidence-backed account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm rounded-xl border border-stone-200">
          {/* 1-Click Fast Demo Buttons */}
          <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                1-Click Role Logins (Hackathon Demo)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="py-2 px-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 hover:border-blue-300 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('company')}
                className="py-2 px-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 hover:border-indigo-300 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
              >
                <Building2 className="w-4 h-4" />
                <span>Company</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('institution')}
                className="py-2 px-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 hover:border-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
              >
                <School className="w-4 h-4" />
                <span>Institution</span>
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">Or enter credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="name@institution.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-brand-600 hover:text-brand-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
