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

const initialAlerts = [
  {
    id: 'ALT-8901',
    type: 'Pothole Detected',
    category: 'Road Defects',
    location: 'NH-24 near Sector 62 Flyover',
    severity: 'High',
    time: '4 mins ago',
    status: 'Pending Dispatch',
    busId: 'Bus #DL-1P-4021',
  },
  {
    id: 'ALT-8902',
    type: 'Heavy Congestion',
    category: 'Traffic',
    location: 'GT Road - Link Road Intersection',
    severity: 'Medium',
    time: '11 mins ago',
    status: 'Monitored',
    busId: 'Bus #DL-1P-1189',
  },
  {
    id: 'ALT-8903',
    type: 'Traffic Incident / Collision',
    category: 'Incidents',
    location: 'GT Road Express Lane',
    severity: 'Critical',
    time: '18 mins ago',
    status: 'Alert Sent',
    busId: 'Bus #DL-1P-8802',
  },
  {
    id: 'ALT-8904',
    type: 'Missing Road Sign',
    category: 'Road Defects',
    location: 'Link Road Sector 18',
    severity: 'Low',
    time: '32 mins ago',
    status: 'Queued',
    busId: 'Bus #DL-1P-3140',
  },
  {
    id: 'ALT-8905',
    type: 'Deep Trench Hazard',
    category: 'Road Defects',
    location: 'Ashram Chowk Underpass',
    severity: 'High',
    time: '45 mins ago',
    status: 'Assigned',
    busId: 'Bus #DL-1P-5590',
  },
  {
    id: 'ALT-8906',
    type: 'Signal Malfunction',
    category: 'Traffic',
    location: 'Connaught Place Outer Ring',
    severity: 'Medium',
    time: '1 hr ago',
    status: 'In Repair',
    busId: 'Bus #DL-1P-7722',
  },
];

export default function RecentAlerts() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredAlerts = initialAlerts.filter((item) => {
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
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Traffic':
        return <Car className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />;
      case 'Incidents':
        return <ShieldAlert className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />;
      default:
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Recent Mobility & Safety Alerts
            </h3>
            <p className="text-[11px] text-slate-400">
              Live anomaly feeds captured by mobile bus vision modules
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-44">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search alert..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {['All', 'Critical', 'Road Defects', 'Traffic'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    filter === f
                      ? 'bg-slate-800 text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Table / List */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2 px-3">Event Type</th>
                <th className="py-2 px-3">Location</th>
                <th className="py-2 px-3">Severity</th>
                <th className="py-2 px-3">Detection Unit</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(alert.category)}
                        <span className="truncate max-w-[130px] lg:max-w-[160px]">
                          {alert.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="h-3 w-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate max-w-[150px]">{alert.location}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                      {alert.busId}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span>{alert.time}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No matching alerts found for selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredAlerts.length} recent urban anomalies</span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1 transition-colors">
          <span>View All Logged Events</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
