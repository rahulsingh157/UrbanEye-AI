import { MapPin, TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';

const mockProblemAreas = [
  {
    id: 'PA-01',
    location: 'NH-24 Corridor, Ghaziabad',
    trafficScore: 'High (88%)',
    roadHealth: 68,
    incidents: 8,
    risk: 'Critical',
    trend: '+4%',
    trendType: 'up'
  },
  {
    id: 'PA-02',
    location: 'Ring Road AIIMS Crossing',
    trafficScore: 'High (92%)',
    roadHealth: 71,
    incidents: 12,
    risk: 'Critical',
    trend: '+6%',
    trendType: 'up'
  },
  {
    id: 'PA-03',
    location: 'Sector 62 Industrial Belt',
    trafficScore: 'Moderate (65%)',
    roadHealth: 58,
    incidents: 3,
    risk: 'High',
    trend: '+2%',
    trendType: 'up'
  },
  {
    id: 'PA-04',
    location: 'GT Road Expressway Line',
    trafficScore: 'Heavy (74%)',
    roadHealth: 79,
    incidents: 5,
    risk: 'High',
    trend: '0%',
    trendType: 'neutral'
  },
  {
    id: 'PA-05',
    location: 'Mathura Road - Ashram Chowk',
    trafficScore: 'Heavy (81%)',
    roadHealth: 64,
    incidents: 4,
    risk: 'High',
    trend: '-3%',
    trendType: 'down'
  },
  {
    id: 'PA-06',
    location: 'Connaught Place Outer Ring',
    trafficScore: 'Normal (42%)',
    roadHealth: 92,
    incidents: 1,
    risk: 'Low',
    trend: '-5%',
    trendType: 'down'
  }
];

export default function ProblemAreas() {
  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[500px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Top Urban Problem Areas
              </h3>
              <p className="text-[11px] text-slate-400">
                Corridor risk ranking & composite multi-hazard score
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-1 rounded border border-red-500/30">
            6 RANKED CORRIDORS
          </span>
        </div>

        {/* Table */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Traffic</th>
                <th className="py-2.5 px-3">Road Health</th>
                <th className="py-2.5 px-3">Incidents</th>
                <th className="py-2.5 px-3">Overall Risk</th>
                <th className="py-2.5 px-3 text-right">30d Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockProblemAreas.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-semibold text-slate-200">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">{item.location}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-cyan-400 font-semibold text-[11px]">
                    {item.trafficScore}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold">
                    <span className={item.roadHealth < 70 ? 'text-amber-400' : 'text-emerald-400'}>
                      {item.roadHealth} / 100
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-300">
                    {item.incidents} cases
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadge(
                        item.risk
                      )}`}
                    >
                      {item.risk}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center font-mono font-bold text-[11px] ${
                        item.trendType === 'up'
                          ? 'text-red-400'
                          : item.trendType === 'down'
                          ? 'text-emerald-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.trendType === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {item.trendType === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {item.trendType === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
                      {item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Corridors evaluated against 30-day baseline</span>
        <span className="text-[11px] text-cyan-400 font-medium">Ranked by Priority Score</span>
      </div>
    </div>
  );
}
