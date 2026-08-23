import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { AlertTriangle, Layers } from 'lucide-react';

const mockDefectTypes = [
  { name: 'Potholes', count: 184, color: '#f97316' },
  { name: 'Damaged Surface', count: 112, color: '#fbbf24' },
  { name: 'Missing Divider', count: 46, color: '#818cf8' },
  { name: 'Missing Crossing', count: 38, color: '#38bdf8' },
  { name: 'Damaged Sign', count: 24, color: '#a78bfa' },
  { name: 'Waterlogging', count: 15, color: '#06b6d4' },
  { name: 'Other Hazards', count: 8, color: '#94a3b8' },
];

const mockSeverity = [
  { label: 'Critical', count: 8, color: 'bg-red-500', textColor: 'text-red-400', badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { label: 'High', count: 42, color: 'bg-orange-500', textColor: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { label: 'Medium', count: 137, color: 'bg-yellow-500', textColor: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { label: 'Low', count: 240, color: 'bg-emerald-500', textColor: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1 min-w-[150px]">
        <p className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
          <span>{data.name}</span>
          <span style={{ color: data.color }} className="font-bold">{data.count}</span>
        </p>
        <p className="text-[11px] text-slate-400 pt-0.5">
          Share: <strong className="text-slate-200">{((data.count / 427) * 100).toFixed(1)}%</strong> of total
        </p>
      </div>
    );
  }
  return null;
};

export default function DefectTypeChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[480px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Defect Category Distribution & Severity
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated detection breakdown across urban transit corridors
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30">
            427 TOTAL DETECTIONS
          </span>
        </div>

        {/* Bar Chart Canvas */}
        <div className="pt-2 w-full h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={mockDefectTypes}
              margin={{ top: 5, right: 20, left: 25, bottom: 0 }}
            >
              <XAxis type="number" stroke="#64748b" fontSize={11} hide />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b50' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                {mockDefectTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Severity Breakdown Section */}
      <div className="pt-3 border-t border-slate-800/60 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            Defect Severity Hierarchy
          </p>
          <span className="text-[10px] text-slate-400 font-mono">100% Categorized</span>
        </div>

        {/* Severity Progress Stack */}
        <div className="w-full h-2 rounded-full bg-slate-950 flex overflow-hidden border border-slate-800">
          <div className="h-full bg-red-500" style={{ width: `${(8 / 427) * 100}%` }} title="Critical: 8" />
          <div className="h-full bg-orange-500" style={{ width: `${(42 / 427) * 100}%` }} title="High: 42" />
          <div className="h-full bg-yellow-500" style={{ width: `${(137 / 427) * 100}%` }} title="Medium: 137" />
          <div className="h-full bg-emerald-500" style={{ width: `${(240 / 427) * 100}%` }} title="Low: 240" />
        </div>

        {/* Severity Grid Badges */}
        <div className="grid grid-cols-4 gap-2 text-center pt-1">
          {mockSeverity.map((item) => (
            <div
              key={item.label}
              className={`p-1.5 rounded-lg border flex flex-col items-center justify-center ${item.badge}`}
            >
              <span className="text-[10px] font-semibold uppercase">{item.label}</span>
              <span className="text-sm font-bold font-mono mt-0.5">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
