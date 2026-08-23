import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  AlertTriangle,
  ShieldAlert,
  BarChart3,
  Settings,
  Eye,
  X,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'traffic', label: 'Traffic', icon: Car, path: '/traffic', badge: 'Live' },
  { id: 'defects', label: 'Road Defects', icon: AlertTriangle, path: '#', badge: '12 new' },
  { id: 'incidents', label: 'Incidents', icon: ShieldAlert, path: '#', badge: '1 crit' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900/95 border-r border-slate-800/80 backdrop-blur-md flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          {/* Header & Logo */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30 group-hover:scale-105 transition-transform">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-lg text-white tracking-tight">UrbanEye</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">Transit Sensing Platform</p>
              </div>
            </Link>

            {/* Close button on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              aria-label="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sensing System Status Badge */}
          <div className="mx-4 my-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">Transit Sensing Grid</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              ACTIVE
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 space-y-1 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => {
                    if (item.path === '#') {
                      e.preventDefault();
                    } else if (isOpen) {
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.badge.includes('crit')
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : item.badge.includes('new')
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : isActive
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section at Bottom */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex-shrink-0">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="relative flex-shrink-0">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs border border-indigo-400/30">
                  CD
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Command Desk</p>
                <p className="text-[10px] text-slate-400 truncate">City Transport Auth.</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
