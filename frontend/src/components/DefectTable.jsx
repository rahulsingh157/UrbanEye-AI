import { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Clock,
  MapPin,
  Bus,
  ShieldCheck,
  ChevronRight,
  RotateCw
} from 'lucide-react';

const mockDefectList = [
  {
    id: 'DEF-8901',
    type: 'Pothole Hazard',
    category: 'Potholes',
    location: 'NH-24 near Sector 62 Flyover',
    severity: 'High',
    confidence: '94%',
    busId: 'BUS-102',
    time: '10:32 AM',
    status: 'New'
  },
  {
    id: 'DEF-8902',
    type: 'Road Surface Cracking',
    category: 'Road Surface',
    location: 'GT Road - Link Road Intersection',
    severity: 'Medium',
    confidence: '91%',
    busId: 'BUS-114',
    time: '09:45 AM',
    status: 'Verified'
  },
  {
    id: 'DEF-8903',
    type: 'Collapses Guard Rail',
    category: 'Road Surface',
    location: 'Ring Road near AIIMS Crossing',
    severity: 'Critical',
    confidence: '98%',
    busId: 'BUS-108',
    time: '11:15 AM',
    status: 'Assigned'
  },
  {
    id: 'DEF-8904',
    type: 'Damaged Traffic Stop Sign',
    category: 'Traffic Signs',
    location: 'Vikas Marg, Laxmi Nagar',
    severity: 'Low',
    confidence: '89%',
    busId: 'BUS-120',
    time: '08:20 AM',
    status: 'Under Repair'
  },
  {
    id: 'DEF-8905',
    type: 'Monsoon Waterlogging Pit',
    category: 'Waterlogging',
    location: 'Mathura Road - Ashram Chowk',
    severity: 'High',
    confidence: '96%',
    busId: 'BUS-105',
    time: '10:10 AM',
    status: 'New'
  },
  {
    id: 'DEF-8906',
    type: 'Missing Median Divider Sign',
    category: 'Traffic Signs',
    location: 'DND Flyway Toll Plaza',
    severity: 'Medium',
    confidence: '92%',
    busId: 'BUS-112',
    time: '07:50 AM',
    status: 'Resolved'
  },
  {
    id: 'DEF-8907',
    type: 'Faded Zebra Crossing Lines',
    category: 'Road Markings',
    location: 'Connaught Place Outer Ring',
    severity: 'Low',
    confidence: '88%',
    busId: 'BUS-118',
    time: '06:40 AM',
    status: 'Verified'
  }
];

const getCategoryFromType = (item) => {
  if (item.category) return item.category;
  const t = (item.type || '').toLowerCase();
  if (t.includes('pothole')) return 'Potholes';
  if (t.includes('surface') || t.includes('crack') || t.includes('rail')) return 'Road Surface';
  if (t.includes('sign') || t.includes('divider') || t.includes('crossing')) return 'Traffic Signs';
  if (t.includes('water')) return 'Waterlogging';
  return 'Road Surface';
};

const formatTime = (ts) => {
  if (!ts) return 'N/A';
  if (typeof ts === 'string' && (ts.includes('AM') || ts.includes('PM'))) return ts;
  try {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return String(ts);
  }
};

export default function DefectTable({ defects = [], loading = false, error = null, onRefresh }) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [search, setSearch] = useState('');

  const dataList = defects.length > 0 ? defects : mockDefectList;

  const filteredDefects = dataList.filter((item) => {
    const itemCategory = getCategoryFromType(item);
    const matchesCategory =
      categoryFilter === 'All' ? true : itemCategory === categoryFilter;
    const matchesSeverity =
      severityFilter === 'All' ? true : item.severity === severityFilter;
    const matchesSearch =
      (item.type || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.id || '').toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSeverity && matchesSearch;
  });

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Verified':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Assigned':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Under Repair':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[520px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Recent Road Defects Log
            </h3>
            <p className="text-[11px] text-slate-400">
              Live AI detection logs with confidence scoring & verification status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                title="Refresh defects feed"
                className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors disabled:opacity-50"
              >
                <RotateCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

            {/* Search Input */}
            <div className="relative flex-1 sm:w-44">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search location or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Category Filter Pills */}
            <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs overflow-x-auto">
              {['All', 'Potholes', 'Road Surface', 'Traffic Signs', 'Waterlogging'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat
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

        {/* Table View */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3">Defect Type</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Detected By</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-cyan-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>Fetching live defects from backend...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-red-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="font-semibold">Unable to fetch defects from server</p>
                      <p className="text-xs text-slate-400">{error}</p>
                      {onRefresh && (
                        <button
                          onClick={onRefresh}
                          className="mt-1 px-3 py-1 bg-slate-800 text-cyan-400 rounded text-xs hover:bg-slate-700 transition-colors"
                        >
                          Retry Connection
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : filteredDefects.length > 0 ? (
                filteredDefects.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span className="truncate max-w-[150px]">{item.type}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="h-3 w-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate max-w-[170px]">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(
                          item.severity
                        )}`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                      <div className="flex items-center space-x-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        <span>{item.confidence}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                      <div className="flex items-center space-x-1">
                        <Bus className="h-3 w-3 text-slate-500" />
                        <span>{item.busId}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span>{formatTime(item.timestamp || item.time)}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No road defects match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredDefects.length} detected road defects</span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] flex items-center space-x-1 transition-colors">
          <span>Export Defect Reports</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
