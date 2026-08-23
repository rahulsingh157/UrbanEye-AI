import { useState, useEffect } from 'react';
import { Bell, Menu, RefreshCw, Clock } from 'lucide-react';

export default function Topbar({ onToggleSidebar }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Left side: Hamburger button + Page Title */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Urban Intelligence Dashboard
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SIH Sensing Hub
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time city mobility and safety overview
          </p>
        </div>
      </div>

      {/* Right side: Controls, Status & Time */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">System Live</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold">128 Sensing Units</span>
        </div>

        {/* Live Clock */}
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-slate-200">{time}</span>
        </div>

        {/* Refresh Indicator */}
        <button
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
          </button>
        </div>

        {/* Profile Control */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold ring-1 ring-cyan-400/40">
            AI
          </div>
        </div>
      </div>
    </header>
  );
}
