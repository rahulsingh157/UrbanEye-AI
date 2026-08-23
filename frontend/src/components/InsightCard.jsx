import { Sparkles, TrendingDown, Lightbulb, AlertTriangle, Route } from 'lucide-react';

const mockInsights = [
  {
    id: 'INS-01',
    title: 'NH-24 Traffic Bottleneck Optimization',
    explanation: 'NH-24 shows sustained evening congestion (89% peak) between 17:30 - 19:30. Re-timing traffic signal cycles at Sector 62 intersection is recommended.',
    category: 'Traffic Flow',
    priority: 'High Priority',
    color: 'border-red-500/30 bg-red-950/20 text-red-400',
    icon: Lightbulb
  },
  {
    id: 'INS-02',
    title: 'Sector 62 Defect Concentration Spike',
    explanation: 'Sector 62 industrial belt has an above-average concentration of deep surface potholes (42 logged). Dispatching a focused maintenance team will reduce route delays by ~8%.',
    category: 'Road Maintenance',
    priority: 'Medium Priority',
    color: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
    icon: AlertTriangle
  },
  {
    id: 'INS-03',
    title: 'Safety Incident Reduction Trend',
    explanation: 'Safety incident frequency has decreased by 12% over the previous 7-day period following increased ANPR telemetry coverage on GT Road.',
    category: 'Public Safety',
    priority: 'Positive Trend',
    color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
    icon: TrendingDown
  },
  {
    id: 'INS-04',
    title: 'Route 204 Schedule Delay Correlation',
    explanation: 'Bus Fleet Route 204 delays (+14 min avg) closely correlate with Ashram Chowk waterlogging spikes. Priority drainage repair will restore 95% transit reliability.',
    category: 'Transit Optimization',
    priority: 'Actionable',
    color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400',
    icon: Route
  }
];

export default function InsightCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                AI-Assisted Urban Insights & Decision Support
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated policy recommendations synthesized from multi-modal mobile sensing feeds
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
            4 SYNTHESIZED INSIGHTS
          </span>
        </div>

        {/* Insights Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInsights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Icon className="h-3.5 w-3.5 text-cyan-400" />
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.color}`}>
                      {item.priority}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Insight ID: {item.id}</span>
                  <span className="text-cyan-400 font-medium cursor-pointer hover:underline">
                    View Impact Model →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Insights auto-generated from 30-day cross-correlated sensing feeds</span>
        <span className="text-[11px] text-slate-500">Updated today at 08:00 IST</span>
      </div>
    </div>
  );
}
