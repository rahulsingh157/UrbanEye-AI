import { Bus, Clock, Gauge, Route } from 'lucide-react';

const mockRoutes = [
  {
    id: 'R-101',
    name: 'Route 101 (Anand Vihar → CP Hub)',
    buses: 12,
    speed: 34,
    delay: '+2 min',
    condition: 'Normal',
    coverage: '98%'
  },
  {
    id: 'R-204',
    name: 'Route 204 (Noida Sec 62 → AIIMS)',
    buses: 9,
    speed: 19,
    delay: '+14 min',
    condition: 'Heavy',
    coverage: '94%'
  },
  {
    id: 'R-308',
    name: 'Route 308 (GT Road Corridor)',
    buses: 15,
    speed: 26,
    delay: '+6 min',
    condition: 'Moderate',
    coverage: '96%'
  },
  {
    id: 'R-412',
    name: 'Route 412 (DND Flyway Express)',
    buses: 11,
    speed: 42,
    delay: '+0 min',
    condition: 'Optimal',
    coverage: '99%'
  },
  {
    id: 'R-505',
    name: 'Route 505 (Outer Ring Expressway)',
    buses: 8,
    speed: 16,
    delay: '+18 min',
    condition: 'Critical',
    coverage: '91%'
  },
  {
    id: 'R-618',
    name: 'Route 618 (Mathura Road Transit)',
    buses: 14,
    speed: 22,
    delay: '+9 min',
    condition: 'Heavy',
    coverage: '95%'
  }
];

export default function RoutePerformance() {
  const getConditionBadge = (condition) => {
    switch (condition) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Heavy':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Route className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Route Transit Performance
              </h3>
              <p className="text-[11px] text-slate-400">
                Active bus route delays & speed telemetry
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
            86 MONITORED ROUTES
          </span>
        </div>

        {/* Routes Table */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3">Transit Route</th>
                <th className="py-2.5 px-3">Active Buses</th>
                <th className="py-2.5 px-3">Avg Speed</th>
                <th className="py-2.5 px-3">Schedule Delay</th>
                <th className="py-2.5 px-3 text-right">Traffic Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockRoutes.map((route) => (
                <tr
                  key={route.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-semibold text-slate-200">
                    <div className="flex items-center space-x-2">
                      <Bus className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate max-w-[200px]">{route.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">
                    {route.buses} buses
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Gauge className="h-3 w-3 text-emerald-500" />
                      <span>{route.speed} km/h</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span
                        className={
                          route.delay.includes('+14') || route.delay.includes('+18')
                            ? 'text-red-400'
                            : route.delay.includes('+6') || route.delay.includes('+9')
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }
                      >
                        {route.delay}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getConditionBadge(
                        route.condition
                      )}`}
                    >
                      {route.condition}
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
        <span>Average fleet schedule adherence: <strong className="text-emerald-400 font-mono">92.4%</strong></span>
        <span className="text-[11px] text-slate-500">Updated 1 min ago</span>
      </div>
    </div>
  );
}
