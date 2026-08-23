import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { PieChart } from 'lucide-react';

const mockComposition = [
  { name: 'Cars', count: 6420, percentage: 51.4, color: '#38bdf8' },
  { name: 'Motorcycles', count: 2350, percentage: 18.8, color: '#818cf8' },
  { name: 'Buses', count: 1840, percentage: 14.7, color: '#34d399' },
  { name: 'Autos', count: 1120, percentage: 9.0, color: '#fbbf24' },
  { name: 'Trucks', count: 752, percentage: 6.1, color: '#f87171' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1 min-w-[150px]">
        <p className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
          <span>{data.name}</span>
          <span style={{ color: data.color }} className="font-bold">{data.percentage}%</span>
        </p>
        <div className="flex items-center justify-between text-slate-300 pt-1">
          <span className="text-slate-400">Total Count:</span>
          <span className="font-bold font-mono">{data.count.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function VehicleCompositionChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PieChart className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Vehicle Type Composition
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time classification from onboard camera feeds
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          12,482 TOTAL
        </span>
      </div>

      {/* Bar Chart Canvas */}
      <div className="pt-3 flex-1 min-h-0 w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={mockComposition}
            margin={{ top: 10, right: 20, left: 15, bottom: 0 }}
          >
            <XAxis type="number" stroke="#64748b" fontSize={11} hide />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={85}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b50' }} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
              {mockComposition.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Composition Legend Pills */}
      <div className="pt-3 border-t border-slate-800/60 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mockComposition.slice(0, 4).map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60"
            >
              <div className="flex items-center space-x-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 font-medium truncate">{item.name}</span>
              </div>
              <span className="font-bold text-white font-mono text-[11px]">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
