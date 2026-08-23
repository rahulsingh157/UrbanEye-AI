import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { ShieldAlert, Activity } from 'lucide-react';

const mockSeverityData = [
  { name: 'Critical', count: 3, color: '#ef4444' },
  { name: 'High', count: 8, color: '#f97316' },
  { name: 'Medium', count: 14, color: '#eab308' },
  { name: 'Low', count: 21, color: '#10b981' },
];

const mockResponseStatus = [
  { label: 'New', count: 4, badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { label: 'Assigned', count: 5, badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { label: 'Investigating', count: 8, badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { label: 'Resolved', count: 12, badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1 min-w-[140px]">
        <p className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
          <span>{data.name} Severity</span>
          <span style={{ color: data.color }} className="font-bold">{data.count} cases</span>
        </p>
        <p className="text-[10px] text-slate-400 pt-0.5">
          Share: <strong className="text-slate-200">{((data.count / 46) * 100).toFixed(1)}%</strong> of active log
        </p>
      </div>
    );
  }
  return null;
};

export default function IncidentSeverityChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[500px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Severity Hierarchy & Response Status
              </h3>
              <p className="text-[11px] text-slate-400">
                Incident categorization & police dispatch metrics
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-1 rounded border border-red-500/30">
            46 INCIDENTS LOGGED
          </span>
        </div>

        {/* Severity Chart Canvas */}
        <div className="pt-2 w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockSeverityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b50' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                {mockSeverityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Response Status Section */}
      <div className="pt-3 border-t border-slate-800/60 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            Investigation & Response Pipeline
          </p>
          <span className="text-[10px] text-slate-400 font-mono">29 Active / 12 Closed</span>
        </div>

        {/* Status Grid Badges */}
        <div className="grid grid-cols-4 gap-2 text-center pt-1">
          {mockResponseStatus.map((item) => (
            <div
              key={item.label}
              className={`p-2 rounded-lg border flex flex-col items-center justify-center ${item.badge}`}
            >
              <span className="text-[10px] font-semibold uppercase">{item.label}</span>
              <span className="text-base font-bold font-mono mt-0.5">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
