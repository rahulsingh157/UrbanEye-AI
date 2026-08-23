import { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Clock,
  MapPin,
  Car,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const mockIncidentList = [
  {
    id: 'INC-1024',
    type: 'Hit-and-Run',
    category: 'Hit-and-Run',
    location: 'NH-24, Ghaziabad',
    plate: 'UP16 AB 1234',
    confidence: '93%',
    time: '22:41 IST',
    severity: 'Critical',
    status: 'Investigating'
  },
  {
    id: 'INC-1025',
    type: 'Rash Driving',
    category: 'Rash Driving',
    location: 'GT Road Express Lane',
    plate: 'DL04 C 9981',
    confidence: '95%',
    time: '22:28 IST',
    severity: 'High',
    status: 'New'
  },
  {
    id: 'INC-1026',
    type: 'Pedestrian Safety',
    category: 'Pedestrian Safety',
    location: 'Ring Road near AIIMS',
    plate: 'HR26 DK 4410',
    confidence: '88%',
    time: '21:50 IST',
    severity: 'Medium',
    status: 'Assigned'
  },
  {
    id: 'INC-1027',
    type: 'Red Light Violation',
    category: 'Other',
    location: 'Vikas Marg, Laxmi Nagar',
    plate: 'DL08 AR 7720',
    confidence: '91%',
    time: '21:15 IST',
    severity: 'Medium',
    status: 'Resolved'
  },
  {
    id: 'INC-1028',
    type: 'Rash Driving',
    category: 'Rash Driving',
    location: 'Mathura Road - Ashram Chowk',
    plate: 'UP14 ET 3390',
    confidence: '96%',
    time: '20:45 IST',
    severity: 'High',
    status: 'Investigating'
  },
  {
    id: 'INC-1029',
    type: 'Hit-and-Run',
    category: 'Hit-and-Run',
    location: 'DND Flyway Toll Plaza',
    plate: 'MP09 CB 1102',
    confidence: '90%',
    time: '19:30 IST',
    severity: 'High',
    status: 'Resolved'
  }
];

export default function IncidentTable() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredIncidents = mockIncidentList.filter((item) => {
    const matchesType = typeFilter === 'All' ? true : item.category === typeFilter;
    const matchesSeverity = severityFilter === 'All' ? true : item.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
    const matchesSearch =
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.plate.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSeverity && matchesStatus && matchesSearch;
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
      case 'Investigating':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Assigned':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[520px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-400" />
              Recent Incidents Log
            </h3>
            <p className="text-[11px] text-slate-400">
              Live ANPR plate detections & safety incident feeds
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-40">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search plate or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Type Dropdown */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All">All Types</option>
              <option value="Hit-and-Run">Hit-and-Run</option>
              <option value="Rash Driving">Rash Driving</option>
              <option value="Pedestrian Safety">Pedestrian Safety</option>
              <option value="Other">Other</option>
            </select>

            {/* Severity Dropdown */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Investigating">Investigating</option>
              <option value="Assigned">Assigned</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Incident Type</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Vehicle Plate</th>
                <th className="py-2.5 px-3">ANPR Conf.</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-400 text-[11px]">
                      {item.id}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                        <span className="truncate max-w-[140px]">{item.type}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="h-3 w-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center space-x-1 font-mono font-bold text-cyan-400 text-[11px]">
                        <Car className="h-3 w-3 text-slate-500" />
                        <span>{item.plate}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                      <div className="flex items-center space-x-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        <span>{item.confidence}</span>
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
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span>{item.time}</span>
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
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No safety incidents match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Showing {filteredIncidents.length} active case files</span>
        <button className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] flex items-center space-x-1 transition-colors">
          <span>Export Incident Reports</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
