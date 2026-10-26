import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Building2,
  School,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const { setRole } = useApp();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [name, setName] = useState('Jai Krish K R');
  const [email, setEmail] = useState('jaikrish.kr@srmist.edu.in');
  const [org, setOrg] = useState('SRM Institute of Science and Technology');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'student') navigate('/student/dashboard');
    if (selectedRole === 'company') navigate('/company/dashboard');
    if (selectedRole === 'institution') navigate('/institution/dashboard');
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
          Create an Evidence-Backed Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm rounded-xl border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Choose Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('student');
                    setName('Jai Krish K R');
                    setOrg('SRM Institute of Science and Technology');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'student'
                      ? 'bg-blue-50/80 border-brand-500 ring-2 ring-brand-500/20 text-brand-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-brand-600" />
                  <span className="text-xs">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('company');
                    setName('Vikram Malhotra');
                    setOrg('SecureTech Solutions');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'company'
                      ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs">Industry</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('institution');
                    setName('Dr. K. Ramanathan');
                    setOrg('SRM Institute of Science and Technology');
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'institution'
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <School className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Institution</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  />
                </div>
              </div>

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
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {selectedRole === 'student'
                  ? 'University / College Name'
                  : selectedRole === 'company'
                  ? 'Company Name'
                  : 'Institution Name'}
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>
                By registering, your account enables cryptographic skill proof verification,
                assessments tracking, and industry collaboration.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Create {selectedRole.toUpperCase()} Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
