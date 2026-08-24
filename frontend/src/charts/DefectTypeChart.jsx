import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

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
  { label: 'Low', count: 240, color: 'bg-emerald-500', textColor: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
];

const colorMap = {
  'Pothole': '#f97316',
  'Potholes': '#f97316',
  'Damaged Surface': '#fbbf24',
  'Missing Divider': '#818cf8',
  'Missing Crossing': '#38bdf8',
  'Damaged Sign': '#a78bfa',
  'Waterlogging': '#06b6d4',
  'Other Hazards': '#94a3b8'
};

const CustomTooltip = ({ active, payload, totalCount }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const share = totalCount > 0 ? ((data.count / totalCount) * 100).toFixed(1) : 0;
    return (
      <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1 min-w-[150px]">
        <p className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
          <span>{data.name}</span>
          <span style={{ color: data.color }} className="font-bold">{data.count}</span>
        </p>
        <p className="text-[11px] text-slate-400 pt-0.5">
          Share: <strong className="text-slate-200">{share}%</strong> of total
        </p>
      </div>
    );
  }
  return null;
};

export default function DefectTypeChart({ defects = [] }) {
  let defectTypes = mockDefectTypes;
  let severityData = mockSeverity;
  let totalDetections = 427;

  if (Array.isArray(defects) && defects.length > 0) {
    totalDetections = defects.length;

    // Aggregate counts by defect type
    const typeCounts = {};
    const sevCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };

    defects.forEach((d) => {
      const type = d.type || 'Other Hazards';
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      const sev = d.severity || 'Medium';
      if (sevCounts[sev] !== undefined) {
        sevCounts[sev]++;
      } else {
        sevCounts.Medium++;
      }
    });

    defectTypes = Object.keys(typeCounts).map((name) => ({
      name,
      count: typeCounts[name],
      color: colorMap[name] || '#38bdf8'
    }));

    severityData = [
      { label: 'Critical', count: sevCounts.Critical, color: 'bg-red-500', textColor: 'text-red-400', badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
      { label: 'High', count: sevCounts.High, color: 'bg-orange-500', textColor: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
      { label: 'Medium', count: sevCounts.Medium, color: 'bg-yellow-500', textColor: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      { label: 'Low', count: sevCounts.Low, color: 'bg-emerald-500', textColor: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
    ];
  }

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
            {totalDetections} TOTAL DETECTIONS
          </span>
        </div>

        {/* Bar Chart Canvas */}
        <div className="pt-2 w-full h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={defectTypes}
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
              <Tooltip content={<CustomTooltip totalCount={totalDetections} />} cursor={{ fill: '#1e293b50' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                {defectTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Severity Breakdown Bar */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <span>Severity Breakdown</span>
          <span className="text-[10px] text-slate-400">Weighted Risk Index</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {severityData.map((item) => (
            <div
              key={item.label}
              className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex flex-col justify-between"
            >
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{item.label}</span>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs font-extrabold ${item.textColor}`}>{item.count}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.badge}`}>
                  {totalDetections > 0 ? ((item.count / totalDetections) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
