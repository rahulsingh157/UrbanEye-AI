import { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Car,
  Search,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

const defaultAlerts = [
  {
    id: 'ALT-8901',
    type: 'Pothole Detected',
    category: 'Road Defects',
    location: 'NH-24 near Sector 62 Flyover',
    severity: 'High',
    time: '4 mins ago',
    status: 'New',
    busId: 'BUS-102',
  },
  {
    id: 'ALT-8902',
    type: 'Hit-and-Run Incident',
    category: 'Incidents',
    location: 'NH-24 Corridor, Ghaziabad',
    severity: 'Critical',
    time: '12 mins ago',
    status: 'Active',
    busId: 'BUS-102',
  },
  {
    id: 'ALT-8903',
    type: 'Waterlogging Hazard',
    category: 'Road Defects',
    location: 'Minto Road Underpass',
    severity: 'High',
    time: '25 mins ago',
    status: 'New',
    busId: 'BUS-105',
  },
  {
    id: 'ALT-8904',
    type: 'Missing Divider Danger',
    category: 'Road Defects',
    location: 'Ring Road near AIIMS Flyover',
    severity: 'Critical',
    time: '35 mins ago',
    status: 'Assigned',
    busId: 'BUS-108',
  },
  {
    id: 'ALT-8905',
    type: 'Traffic Collision',
    category: 'Incidents',
    location: 'DND Flyway Toll Plaza',
    severity: 'High',
    time: '45 mins ago',
    status: 'Active',
    busId: 'BUS-112',
  },
  {
    id: 'ALT-8906',
    type: 'Damaged Stop Sign',
    category: 'Road Defects',
    location: 'Vikas Marg, Laxmi Nagar',
    severity: 'Low',
    time: '1 hr ago',
    status: 'Under Repair',
    busId: 'BUS-120',
  },
];

const formatAge = (ts) => {
  if (!ts) return 'Recent';
  try {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    const mins = Math.floor((new Date() - d) / 60000);
    if (mins < 60) return `${Math.max(1, mins)} mins ago`;
    return `${Math.floor(mins / 60)} hrs ago`;
  } catch (e) {
    return 'Recent';
  }
};

export default function RecentAlerts({ defects = [], incidents = [] }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  let alerts = defaultAlerts;

  if ((defects && defects.length > 0) || (incidents && incidents.length > 0)) {
    const defectAlerts = defects.map((d) => ({
      id: d.id,
      type: `${d.type} Detected`,
      category: 'Road Defects',
      location: d.location,
      severity: d.severity,
      time: formatAge(d.timestamp),
      status: d.status,
      busId: d.busId || 'BUS-100'
    }));

    const incidentAlerts = incidents.map((i) => ({
      id: i.id,
      type: `${i.type} Incident`,
      category: 'Incidents',
      location: i.location,
      severity: i.severity,
      time: formatAge(i.timestamp),
      status: i.status,
      busId: 'ANPR Grid'
    }));

    alerts = [...defectAlerts, ...incidentAlerts].slice(0, 10);
  }

  const filteredAlerts = alerts.filter((item) => {
    const matchesFilter =
      filter === 'All'
        ? true
        : filter === 'Critical'
        ? item.severity === 'Critical'
        : item.category === filter;

    const matchesSearch =
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Incidents':
        return <ShieldAlert className="h-3.5 w-3.5 text-red-400" />;
      case 'Traffic':
        return <Car className="h-3.5 w-3.5 text-cyan-400" />;
      default:
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[450px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-cyan-400" />
              Live System Alerts Log
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time anomaly stream from transit visual telemetry
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-44">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {['All', 'Critical', 'Road Defects', 'Incidents'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    filter === cat
                      ? 'bg-slate-800 text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="mt-3 overflow-y-auto min-h-0 flex-1 space-y-2 pr-1">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0">
                    {getCategoryIcon(alert.category)}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                        {alert.type}
                      </h4>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getSeverityBadge(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                      <span className="flex items-center space-x-1 truncate">
                        <MapPin className="h-3 w-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{alert.location}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">{alert.busId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {alert.status}
                  </span>
                  <p className="text-[10px] text-slate-400 flex items-center justify-end space-x-1">
                    <Clock className="h-2.5 w-2.5 text-slate-500" />
                    <span>{alert.time}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              No alerts match the selected filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredAlerts.length} system alerts</span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] flex items-center space-x-1 transition-colors">
          <span>View Full Logs</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
