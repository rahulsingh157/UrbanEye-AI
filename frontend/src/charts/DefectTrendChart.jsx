import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { AlertTriangle, TrendingDown } from 'lucide-react';

const mockDefectTrends = [
  { week: 'W1 (Jul)', potholes: 220, surface: 140, signs: 35, waterlogging: 45 },
  { week: 'W2 (Jul)', potholes: 205, surface: 132, signs: 30, waterlogging: 38 },
  { week: 'W3 (Aug)', potholes: 195, surface: 120, signs: 28, waterlogging: 22 },
  { week: 'W4 (Aug)', potholes: 184, surface: 112, signs: 24, waterlogging: 15 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = data.potholes + data.surface + data.signs + data.waterlogging;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[160px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1">
          <span className="font-bold text-slate-200">{label} Defect Log</span>
          <span className="font-bold text-amber-400 font-mono">{total} Total</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-amber-400">Potholes:</span>
          <span className="font-bold">{data.potholes}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-yellow-400">Surface Damage:</span>
          <span className="font-bold">{data.surface}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-purple-400">Missing Signs:</span>
          <span className="font-bold">{data.signs}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-cyan-400">Waterlogging:</span>
          <span className="font-bold">{data.waterlogging}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function DefectTrendChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Road Defect Progression & Repair Trends
            </h3>
            <p className="text-[11px] text-slate-400">
              4-week longitudinal tracking of road degradation & maintenance velocity
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
          <TrendingDown className="h-3 w-3 mr-1" />
          -16.3% Defect Volume (Improving)
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="pt-2 flex-1 min-h-0 w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockDefectTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="potholeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="surfaceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

            <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />

            <Tooltip content={<CustomTooltip />} />

            <Area type="monotone" dataKey="potholes" name="Potholes" stroke="#f97316" strokeWidth={2} fill="url(#potholeGrad)" />
            <Area type="monotone" dataKey="surface" name="Surface Damage" stroke="#fbbf24" strokeWidth={2} fill="url(#surfaceGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Road infrastructure health condition is <strong className="text-emerald-400">IMPROVING</strong></span>
        <span className="text-[11px] text-slate-500">4-week rolling window</span>
      </div>
    </div>
  );
}
