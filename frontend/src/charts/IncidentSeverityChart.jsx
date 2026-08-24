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

const defaultSeverityData = [
  { name: 'Critical', count: 2, color: '#ef4444' },
  { name: 'High', count: 2, color: '#f97316' },
  { name: 'Medium', count: 2, color: '#eab308' },
  { name: 'Low', count: 0, color: '#10b981' },
];

const defaultResponseStatus = [
  { label: 'Active', count: 3, badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { label: 'Assigned', count: 2, badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { label: 'Resolved', count: 1, badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
];

const CustomTooltip = ({ active, payload, totalIncidents }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = totalIncidents > 0 ? totalIncidents : 6;
    const share = ((data.count / total) * 100).toFixed(1);
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1 min-w-[140px]">
        <p className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
          <span>{data.name} Severity</span>
          <span style={{ color: data.color }} className="font-bold">{data.count} cases</span>
        </p>
        <p className="text-[10px] text-slate-400 pt-0.5">
          Share: <strong className="text-slate-200">{share}%</strong> of active log
        </p>
      </div>
    );
  }
  return null;
};

export default function IncidentSeverityChart({ incidents = [] }) {
  let severityData = defaultSeverityData;
  let responseStatus = defaultResponseStatus;
  let totalIncidents = 6;
  let activeCount = 5;
  let resolvedCount = 1;

  if (Array.isArray(incidents) && incidents.length > 0) {
    totalIncidents = incidents.length;

    const sevCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    const statCounts = { Active: 0, Assigned: 0, Resolved: 0 };

    incidents.forEach((i) => {
      const s = i.severity || 'Medium';
      if (sevCounts[s] !== undefined) sevCounts[s]++;
      else sevCounts.Medium++;

      const st = i.status || 'Active';
      if (st === 'Resolved') {
        statCounts.Resolved++;
      } else if (st === 'Assigned') {
        statCounts.Assigned++;
      } else {
        statCounts.Active++;
      }
    });

    activeIncidentsCount:
    activeCount = statCounts.Active + statCounts.Assigned;
    resolvedCount = statCounts.Resolved;

    severityData = [
      { name: 'Critical', count: sevCounts.Critical, color: '#ef4444' },
      { name: 'High', count: sevCounts.High, color: '#f97316' },
      { name: 'Medium', count: sevCounts.Medium, color: '#eab308' },
      { name: 'Low', count: sevCounts.Low, color: '#10b981' },
    ];

    responseStatus = [
      { label: 'Active', count: statCounts.Active, badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
      { label: 'Assigned', count: statCounts.Assigned, badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
      { label: 'Resolved', count: statCounts.Resolved, badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    ];
  }

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
            {totalIncidents} INCIDENTS LOGGED
          </span>
        </div>

        {/* Severity Chart Canvas */}
        <div className="pt-2 w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip totalIncidents={totalIncidents} />} cursor={{ fill: '#1e293b50' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                {severityData.map((entry, index) => (
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
          <span className="text-[10px] text-slate-400 font-mono">
            {activeCount} Active / {resolvedCount} Closed
          </span>
        </div>

        {/* Status Grid Badges */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          {responseStatus.map((item) => (
            <div
              key={item.label}
              className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-0.5"
            >
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{item.label}</span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded border ${item.badge}`}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
