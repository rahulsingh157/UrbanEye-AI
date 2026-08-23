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

const mockHourlyDensity = [
  { time: '06:00', density: 34, vehicles: 3200, speed: 46, status: 'Normal' },
  { time: '08:00', density: 78, vehicles: 9800, speed: 22, status: 'Heavy' },
  { time: '10:00', density: 62, vehicles: 7400, speed: 34, status: 'Moderate' },
  { time: '12:00', density: 45, vehicles: 5600, speed: 42, status: 'Normal' },
  { time: '14:00', density: 52, vehicles: 6100, speed: 38, status: 'Moderate' },
  { time: '16:00', density: 69, vehicles: 8300, speed: 28, status: 'Heavy' },
  { time: '18:00', density: 89, vehicles: 12480, speed: 16, status: 'Critical Peak' },
  { time: '20:00', density: 72, vehicles: 9100, speed: 26, status: 'Heavy' },
  { time: '22:00', density: 38, vehicles: 4100, speed: 48, status: 'Normal' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[170px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-400" /> {label} IST
          </span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
              data.density > 80
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : data.density > 60
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}
          >
            {data.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-cyan-400 font-medium">Density:</span>
          <span className="font-bold">{data.density}%</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-slate-400 font-medium">Est. Vehicles:</span>
          <span className="font-bold font-mono">{data.vehicles.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-emerald-400 font-medium">Transit Speed:</span>
          <span className="font-bold">{data.speed} km/h</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrafficDensityChart() {
  const [timeRange, setTimeRange] = useState('24h');

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
              Diurnal Traffic Density & Transit Flow Trends
            </h3>
            <p className="text-[11px] text-slate-400">
              Citywide mobility telemetry aggregated across all active bus routes
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-semibold">
            <TrendingUp className="h-3 w-3 mr-1" />
            Evening Rush Peak: 18:00 (89%)
          </span>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['Today', '24h', 'Weekly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  timeRange === range
                    ? 'bg-slate-800 text-cyan-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="pt-3 flex-1 min-h-0 w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockHourlyDensity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#0284c7" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
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
              unit="%"
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="density"
              name="Traffic Density (%)"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#trafficGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Indicators */}
      <div className="pt-3 border-t border-slate-800/60 grid grid-cols-4 text-center gap-2">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Morning Spike</p>
          <p className="text-xs font-bold text-amber-400">08:00 (78%)</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Midday Trough</p>
          <p className="text-xs font-bold text-emerald-400">12:00 (45%)</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Evening Peak</p>
          <p className="text-xs font-bold text-red-400">18:00 (89%)</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Night Drop</p>
          <p className="text-xs font-bold text-cyan-400">22:00 (38%)</p>
        </div>
      </div>
    </div>
  );
}
