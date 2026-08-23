import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (shifted right on desktop for 64w sidebar) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Top Header Navigation */}
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page View Wrapper */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-[1920px] mx-auto w-full">
          {children}
        </main>

        {/* Clean Footer */}
        <footer className="px-4 lg:px-8 py-4 border-t border-slate-800/60 bg-slate-950 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">UrbanEye AI</span>
            <span>—</span>
            <span>Mobile Transit Urban Sensing System</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Smart India Hackathon Prototype • Command Center Operations Desk
          </p>
        </footer>
      </div>
    </div>
  );
}
