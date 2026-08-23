import { Clock, MapPin, Wrench } from 'lucide-react';

const mockPriorityItems = [
  {
    id: 'WO-8801',
    type: 'Collapses Guard Rail Hazard',
    location: 'Ring Road near AIIMS Crossing',
    severity: 'Critical',
    score: '98/100',
    age: '25 mins ago',
    action: 'Dispatching Crew',
    busId: 'BUS-108'
  },
  {
    id: 'WO-8802',
    type: 'Severe Deep Pothole',
    location: 'NH-24 near Sector 62 Flyover',
    severity: 'High',
    score: '92/100',
    age: '42 mins ago',
    action: 'Work Order Queued',
    busId: 'BUS-102'
  },
  {
    id: 'WO-8803',
    type: 'Monsoon Waterlogging Pit',
    location: 'Mathura Road - Ashram Chowk',
    severity: 'High',
    score: '89/100',
    age: '1 hr ago',
    action: 'Drainage Unit Alerted',
    busId: 'BUS-105'
  },
  {
    id: 'WO-8804',
    type: 'Extensive Surface Cracking',
    location: 'GT Road - Link Road Intersection',
    severity: 'Medium',
    score: '76/100',
    age: '2 hrs ago',
    action: 'Inspection Scheduled',
    busId: 'BUS-114'
  },
  {
    id: 'WO-8805',
    type: 'Damaged Stop Sign',
    location: 'Vikas Marg, Laxmi Nagar',
    severity: 'Low',
    score: '64/100',
    age: '3 hrs ago',
    action: 'Sign Replacement Queued',
    busId: 'BUS-120'
  }
];

export default function PriorityQueue() {
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
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
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Maintenance Priority Queue
              </h3>
              <p className="text-[11px] text-slate-400">
                AI-ranked high-risk road hazards for work-order dispatch
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-1 rounded border border-red-500/30 animate-pulse">
            5 URGENT WORK ORDERS
          </span>
        </div>

        {/* Priority Queue List */}
        <div className="mt-3 space-y-2.5 min-h-0 flex-1 overflow-y-auto pr-1">
          {mockPriorityItems.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 flex-shrink-0">
                  #{idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                      {item.type}
                    </h4>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {item.age}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  {item.score}
                </span>
                <p className="text-[10px] text-emerald-400 font-medium mt-0.5">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Work orders auto-ranked by traffic volume & depth</span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] transition-colors">
          Dispatch All High Priority
        </button>
      </div>
    </div>
  );
}
