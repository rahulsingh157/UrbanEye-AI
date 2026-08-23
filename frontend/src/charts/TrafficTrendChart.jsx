import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Activity, Clock } from 'lucide-react';

const mockWeeklyTraffic = [
  { day: 'Mon', density: 76, speed: 24, volume: 11800 },
  { day: 'Tue', density: 79, speed: 21, volume: 12400 },
  { day: 'Wed', density: 84, speed: 18, volume: 13100 },
  { day: 'Thu', density: 81, speed: 20, volume: 12800 },
  { day: 'Fri', density: 88, speed: 15, volume: 14200 },
  { day: 'Sat', density: 62, speed: 32, volume: 9400 },
  { day: 'Sun', density: 48, speed: 41, volume: 7200 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[160px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1">
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-400" /> {label}day Trend
          </span>
          <span className="text-[10px] font-bold text-cyan-400 font-mono">
            {data.volume.toLocaleString()} veh.
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-cyan-400 font-medium">Traffic Density:</span>
          <span className="font-bold">{data.density}%</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-emerald-400 font-medium">Avg Speed:</span>
          <span className="font-bold">{data.speed} km/h</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrafficTrendChart() {
  const [metricView, setMetricView] = useState('both');

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[480px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Diurnal & Weekly Traffic Density Trends
            </h3>
            <p className="text-[11px] text-slate-400">
              Longitudinal mobility index aggregated over Monday – Sunday
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-semibold">
            <TrendingUp className="h-3 w-3 mr-1" />
            Friday Peak Congestion (88%)
          </span>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setMetricView('both')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                metricView === 'both'
                  ? 'bg-slate-800 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setMetricView('density')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                metricView === 'density'
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
      <div className="pt-3 flex-1 min-h-0 w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockWeeklyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

            <XAxis
              dataKey="day"
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

            {(metricView === 'both' || metricView === 'density') && (
              <Area
                type="monotone"
                dataKey="density"
                name="Traffic Density (%)"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trendGradient)"
              />
            )}

            {(metricView === 'both' || metricView === 'speed') && (
              <Line
                type="monotone"
                dataKey="speed"
                name="Avg Speed (km/h)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 3 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend */}
      <div className="pt-3 border-t border-slate-800/60 grid grid-cols-3 text-center gap-2">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Weekday Avg</p>
          <p className="text-xs font-bold text-cyan-400 font-mono">81.6% Density</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Weekend Avg</p>
          <p className="text-xs font-bold text-emerald-400 font-mono">55.0% Density</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Speed Recovery</p>
          <p className="text-xs font-bold text-amber-400 font-mono">+16 km/h Sun</p>
        </div>
      </div>
    </div>
  );
}
