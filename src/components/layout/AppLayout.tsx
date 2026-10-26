import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { DemoTourBar } from '../common/DemoTourBar';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 17-step Guided Interactive Demo Tour Bar */}
      <DemoTourBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Left Sidebar */}
        <Sidebar />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/60">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
