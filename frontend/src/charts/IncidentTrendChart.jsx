import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { ShieldAlert, TrendingDown } from 'lucide-react';

const mockIncidentTrends = [
  { week: 'W1 (Jul)', hitAndRun: 12, rashDriving: 24, other: 18, resolved: 38 },
  { week: 'W2 (Jul)', hitAndRun: 10, rashDriving: 22, other: 16, resolved: 40 },
  { week: 'W3 (Aug)', hitAndRun: 8, rashDriving: 19, other: 15, resolved: 39 },
  { week: 'W4 (Aug)', hitAndRun: 7, rashDriving: 16, other: 12, resolved: 35 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = data.hitAndRun + data.rashDriving + data.other;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[160px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1">
          <span className="font-bold text-slate-200">{label} Safety Log</span>
          <span className="font-bold text-red-400 font-mono">{total} Incidents</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-red-400">Hit-and-Run:</span>
          <span className="font-bold">{data.hitAndRun}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-orange-400">Rash Driving:</span>
          <span className="font-bold">{data.rashDriving}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-yellow-400">Other Hazards:</span>
          <span className="font-bold">{data.other}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800">
          <span>Resolved Cases:</span>
          <span className="font-bold text-emerald-400">{data.resolved} closed</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function IncidentTrendChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Safety Incident & ANPR Enforcement Trends
            </h3>
            <p className="text-[11px] text-slate-400">
              Weekly incident breakdown (Hit-and-Run, Rash Driving) & case resolution rates
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
          <TrendingDown className="h-3 w-3 mr-1" />
          -12.0% Incidents (7-day trend)
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="pt-2 flex-1 min-h-0 w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockIncidentTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="hitAndRun" name="Hit-and-Run" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} barSize={28} />
            <Bar dataKey="rashDriving" name="Rash Driving" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} barSize={28} />
            <Bar dataKey="other" name="Other Hazards" stackId="a" fill="#eab308" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Average resolution timeline: <strong className="text-emerald-400 font-mono">4.2 hours</strong></span>
        <span className="text-[11px] text-slate-500">30-day enforcement logs</span>
      </div>
    </div>
  );
}
