import { useState } from 'react';
import {
  ShieldAlert,
  MapPin,
  Clock,
  Bus,
  Eye,
  Navigation,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CriticalIncident({ incident, onUpdateIncident }) {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [updating, setUpdating] = useState(false);

  // Default fallback incident data if not provided
  const item = incident || {
    id: 'INC-1001',
    type: 'Suspected Hit-and-Run',
    location: 'NH-24 Corridor, Ghaziabad',
    vehiclePlate: 'UP16 AB 1234',
    confidence: '93%',
    severity: 'Critical',
    status: 'Active',
    assignedUnit: null,
    timestamp: '22:41:18 IST'
  };

  const handleAssignUnit = async (unitName) => {
    if (!unitName || !onUpdateIncident) return;
    setUpdating(true);
    try {
      await onUpdateIncident(item.id, {
        assignedUnit: unitName,
        status: 'Assigned'
      });
    } catch (err) {
      console.error('Error assigning unit:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleResolve = async () => {
    if (!onUpdateIncident) return;
    setUpdating(true);
    try {
      await onUpdateIncident(item.id, {
        status: 'Resolved'
      });
    } catch (err) {
      console.error('Error resolving incident:', err);
    } finally {
      setUpdating(false);
    }
  };

  const isResolved = item.status === 'Resolved';
  const isAssigned = item.status === 'Assigned' || item.assignedUnit;

  return (
    <div className="rounded-xl border border-red-500/40 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 shadow-xl p-5 relative overflow-hidden flex flex-col justify-between h-[360px]">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div>
        {/* Banner Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
          <div className="flex items-center space-x-2.5">
            <div className={`p-2 rounded-lg border ${isResolved ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse'}`}>
              {isResolved ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Critical Incident Alert
                </h3>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  isResolved
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isAssigned
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                    : 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                }`}>
                  {item.severity} • {item.status} {item.assignedUnit ? `(${item.assignedUnit})` : ''}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                High-priority offender flag logged by mobile transit camera unit
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            CASE ID: {item.id}
          </span>
        </div>

        {/* Incident Summary Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Incident Type */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Incident Type</p>
            <p className="text-sm font-bold text-red-400 mt-1 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              {item.type || 'Hit-and-Run'}
            </p>
          </div>

          {/* Vehicle Number Plate */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Registration Plate</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm font-extrabold font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {item.vehiclePlate || item.vehicleNumber || 'UP16 AB 1234'}
              </span>
              <span className="text-[10px] font-semibold text-emerald-400">{item.confidence || '93%'} ANPR</span>
            </div>
          </div>

          {/* Incident Location */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
            <p className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1 truncate">
              <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
              {item.location || 'NH-24 Corridor'}
            </p>
          </div>

          {/* Time & Camera Source */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Timestamp & Source</p>
            <p className="text-xs font-bold text-slate-200 mt-1 flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-300 font-mono">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {item.timestamp ? String(item.timestamp).substring(0, 19) : '22:41 IST'}
              </span>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                <Bus className="h-3 w-3" />
                BUS-102
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Operational Actions Controls Row */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className={`h-2 w-2 rounded-full ${isResolved ? 'bg-emerald-500' : 'bg-red-500 animate-ping'}`} />
          <span>
            {isResolved
              ? 'Case files resolved & closed'
              : item.assignedUnit
              ? `Dispatched unit: ${item.assignedUnit}`
              : 'Vehicle moving eastbound on NH-24 corridor'}
          </span>
        </div>

        <div className="flex flex-wrap items-center space-x-2.5 w-full sm:w-auto">
          {!isResolved && (
            <div className="flex items-center space-x-1.5">
              <select
                value={item.assignedUnit || selectedUnit}
                onChange={(e) => {
                  setSelectedUnit(e.target.value);
                  handleAssignUnit(e.target.value);
                }}
                disabled={updating}
                className="bg-slate-950 border border-slate-700 text-xs text-cyan-400 font-semibold rounded-lg px-2 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="" disabled>Assign Unit...</option>
                <option value="UNIT-01">UNIT-01 (Highway Patrol)</option>
                <option value="UNIT-02">UNIT-02 (Traffic Control)</option>
                <option value="UNIT-03">UNIT-03 (Rapid Response)</option>
              </select>
            </div>
          )}

          {!isResolved ? (
            <button
              onClick={handleResolve}
              disabled={updating}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center space-x-1.5 shadow-md transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Resolve Incident</span>
            </button>
          ) : (
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Incident Resolved</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
