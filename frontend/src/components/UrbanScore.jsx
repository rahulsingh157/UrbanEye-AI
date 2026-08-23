import { Activity, Shield, Bus, Award } from 'lucide-react';

const scoreBreakdown = [
  {
    category: 'Traffic Efficiency',
    score: 82,
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    icon: Activity,
    detail: 'Average corridor speeds & peak congestion index'
  },
  {
    category: 'Road Infrastructure',
    score: 86,
    color: 'bg-amber-500',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    icon: Activity,
    detail: 'Surface defect density & repair dispatch velocity'
  },
  {
    category: 'Safety & ANPR Index',
    score: 91,
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    icon: Shield,
    detail: 'Offender tracking & incident resolution rate'
  },
  {
    category: 'Transit Reliability',
    score: 89,
    color: 'bg-blue-500',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    icon: Bus,
    detail: 'Bus route schedule adherence & coverage'
  }
];

export default function UrbanScore() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[480px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Urban Condition Score
              </h3>
              <p className="text-[11px] text-slate-400">
                Composite decision-support index for city planning
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            SYNTHETIC INDEX
          </span>
        </div>

        {/* Hero Score Badge */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-950 to-cyan-950/40 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Citywide Urban Health Index
            </p>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                87 <span className="text-sm font-normal text-slate-400">/ 100</span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                EXCELLENT
              </span>
            </div>
          </div>

          <div className="h-14 w-14 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 flex items-center justify-center font-mono font-extrabold text-white text-base shadow-lg shadow-cyan-500/10">
            87%
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="mt-4 space-y-2.5">
          {scoreBreakdown.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60"
              >
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Icon className={`h-3.5 w-3.5 ${item.textColor}`} />
                    {item.category}
                  </span>
                  <span className={`font-mono font-bold ${item.textColor}`}>
                    {item.score} / 100
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer Footer */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span>Weighted score based on 30-day mobile telemetry</span>
        <span className="text-slate-500">Updated today</span>
      </div>
    </div>
  );
}
