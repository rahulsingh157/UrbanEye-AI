import {
  AlertTriangle,
  Clock,
  MapPin,
  TrendingDown,
  Bell,
  CheckCircle2
} from 'lucide-react';

const mockTrafficAlerts = [
  {
    id: 'ALT-TRF-01',
    message: 'Critical Congestion Surge Detected',
    location: 'NH-24 near Sector 62 Flyover',
    time: '2 mins ago',
    severity: 'Critical',
    detail: 'Average corridor speed dropped to 18 km/h. High vehicle buildup.',
    icon: AlertTriangle
  },
  {
    id: 'ALT-TRF-02',
    message: 'Speed Threshold Alarm (<15 km/h)',
    location: 'Ring Road near AIIMS Crossing',
    time: '5 mins ago',
    severity: 'Critical',
    detail: 'Transit speed severely impacted (12 km/h avg). 3,400+ vehicles queued.',
    icon: TrendingDown
  },
  {
    id: 'ALT-TRF-03',
    message: 'Significant Bus Schedule Delay',
    location: 'Route 204 Corridor',
    time: '14 mins ago',
    severity: 'High',
    detail: '+14 minute delay recorded across 9 active bus units.',
    icon: Clock
  },
  {
    id: 'ALT-TRF-04',
    message: 'Traffic Bottleneck Event',
    location: 'DND Flyway Toll Plaza',
    time: '22 mins ago',
    severity: 'Medium',
    detail: 'Toll plaza queue backing up 800m. Moderate slowing.',
    icon: AlertTriangle
  },
  {
    id: 'ALT-TRF-05',
    message: 'Congestion Clearing Trend',
    location: 'Connaught Place Outer Ring',
    time: '35 mins ago',
    severity: 'Low',
    detail: 'Traffic flow restoring to normal (40 km/h avg speed).',
    icon: CheckCircle2
  }
];

export default function TrafficAlerts() {
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return {
          badge: 'bg-red-500/20 text-red-400 border-red-500/30',
          iconBg: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
      case 'High':
        return {
          badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        };
      case 'Medium':
        return {
          badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          iconBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
      default:
        return {
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        };
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Real-Time Traffic Alerts
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated bottleneck & speed threshold notifications
              </p>
            </div>
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
            2 CRITICAL
          </span>
        </div>

        {/* Alerts List */}
        <div className="mt-3 space-y-2.5 min-h-0 flex-1 overflow-y-auto pr-1">
          {mockTrafficAlerts.map((alert) => {
            const Icon = alert.icon;
            const style = getSeverityStyle(alert.severity);
            return (
              <div
                key={alert.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-start space-x-3 cursor-pointer group"
              >
                <div className={`p-2 rounded-lg border flex-shrink-0 mt-0.5 ${style.iconBg}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                      {alert.message}
                    </h4>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${style.badge}`}>
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {alert.detail}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-1.5 border-t border-slate-900">
                    <span className="flex items-center gap-1 text-slate-400 truncate max-w-[160px]">
                      <MapPin className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Monitored threshold speed: <strong className="text-slate-200">20 km/h</strong></span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] transition-colors">
          Dismiss All
        </button>
      </div>
    </div>
  );
}
