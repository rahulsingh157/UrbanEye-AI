import {
  ShieldAlert,
  MapPin,
  Clock,
  Bus,
  Eye,
  Navigation,
  UserCheck
} from 'lucide-react';

export default function CriticalIncident() {
  return (
    <div className="rounded-xl border border-red-500/40 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 shadow-xl p-5 relative overflow-hidden flex flex-col justify-between h-[360px]">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div>
        {/* Banner Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Critical Incident Alert
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wider animate-pulse">
                  CRITICAL • UNASSIGNED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                High-priority offender flag logged by mobile transit camera unit
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            CASE ID: INC-1024
          </span>
        </div>

        {/* Incident Summary Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Incident Type */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Incident Type</p>
            <p className="text-sm font-bold text-red-400 mt-1 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              Suspected Hit-and-Run
            </p>
          </div>

          {/* Vehicle Number Plate */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Registration Plate</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm font-extrabold font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                UP16 AB 1234
              </span>
              <span className="text-[10px] font-semibold text-emerald-400">93% ANPR</span>
            </div>
          </div>

          {/* Incident Location */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
            <p className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1 truncate">
              <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
              NH-24 Corridor, Ghaziabad
            </p>
          </div>

          {/* Time & Camera Source */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Timestamp & Source</p>
            <p className="text-xs font-bold text-slate-200 mt-1 flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-300 font-mono">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                22:41:18 IST
              </span>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                <Bus className="h-3 w-3" />
                BUS-102
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span>Vehicle moving eastbound on NH-24 corridor</span>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center space-x-1.5 transition-all">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            <span>View Evidence</span>
          </button>
          <button className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center space-x-1.5 transition-all">
            <Navigation className="h-3.5 w-3.5 text-emerald-400" />
            <span>Track Vehicle</span>
          </button>
          <button className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white flex items-center justify-center space-x-1.5 shadow-md shadow-red-600/20 transition-all">
            <UserCheck className="h-3.5 w-3.5" />
            <span>Assign Unit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
