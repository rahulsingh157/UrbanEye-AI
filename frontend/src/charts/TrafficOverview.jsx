import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Activity, Clock } from 'lucide-react';

const mockData = [
  { time: '08:00', density: 78, speed: 22, alerts: 4 },
  { time: '10:00', density: 62, speed: 34, alerts: 2 },
  { time: '12:00', density: 45, speed: 42, alerts: 1 },
  { time: '14:00', density: 50, speed: 38, alerts: 2 },
  { time: '16:00', density: 68, speed: 28, alerts: 3 },
  { time: '18:00', density: 89, speed: 16, alerts: 7 }, // Peak hour
  { time: '20:00', density: 72, speed: 26, alerts: 4 },
  { time: '22:00', density: 38, speed: 48, alerts: 0 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[150px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-400" /> {label} IST
          </span>
          {data.density > 75 && (
            <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/30">
              Peak
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1 text-cyan-400">
            Traffic Density:
          </span>
          <span className="font-bold">{data.density}%</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400">
            Avg Speed:
          </span>
          <span className="font-bold">{data.speed} km/h</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
          <span>Active Alerts:</span>
          <span className="font-semibold text-amber-400">{data.alerts} events</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrafficOverview() {
  const [activeMetric, setActiveMetric] = useState('both');

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[500px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Traffic Density Trends & Transit Speed
            </h3>
            <p className="text-[11px] text-slate-400">
              Aggregated mobile camera telemetry from active bus fleet
            </p>
          </div>
        </div>

        {/* Metric Pill Toggles & Peak indicator */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
            <TrendingUp className="h-3 w-3 mr-1" />
            Peak Rush: 18:00 (89%)
          </span>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveMetric('both')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                activeMetric === 'both'
                  ? 'bg-slate-800 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveMetric('density')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                activeMetric === 'density'
                  ? 'bg-slate-800 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Density
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="pt-3 flex-1 min-h-0 w-full h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              domain={[0, 100]}
            />

            <Tooltip content={<CustomTooltip />} />

            {(activeMetric === 'both' || activeMetric === 'density') && (
              <Area
                type="monotone"
                dataKey="density"
                name="Traffic Density (%)"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#densityGradient)"
              />
            )}

            {(activeMetric === 'both' || activeMetric === 'speed') && (
              <Area
                type="monotone"
                dataKey="speed"
                name="Avg Speed (km/h)"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#speedGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Stats */}
      <div className="pt-3 border-t border-slate-800/60 grid grid-cols-3 text-center gap-2">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">City Avg Speed</p>
          <p className="text-sm font-bold text-emerald-400">31.0 km/h</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Avg Congestion</p>
          <p className="text-sm font-bold text-cyan-400">62.8%</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Alert Frequency</p>
          <p className="text-sm font-bold text-amber-400">2.8 / hr</p>
        </div>
      </div>
    </div>
  );
}
