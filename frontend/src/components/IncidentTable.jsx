import { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Clock,
  MapPin,
  Car,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  RotateCw
} from 'lucide-react';

const mockIncidentList = [
  {
    id: 'INC-1001',
    type: 'Hit-and-Run',
    category: 'Hit-and-Run',
    location: 'NH-24 Corridor, Ghaziabad',
    plate: 'UP16 AB 1234',
    confidence: '93%',
    time: '22:41 IST',
    severity: 'Critical',
    status: 'Active',
    assignedUnit: null
  },
  {
    id: 'INC-1002',
    type: 'Traffic Collision',
    category: 'Traffic Collision',
    location: 'DND Flyway Toll Plaza',
    plate: 'UP16 XY 9876',
    confidence: '98%',
    time: '22:28 IST',
    severity: 'High',
    status: 'Active',
    assignedUnit: null
  },
  {
    id: 'INC-1003',
    type: 'Suspicious Vehicle',
    category: 'Suspicious Vehicle',
    location: 'Airport Road Expressway',
    plate: 'HR26 CZ 5544',
    confidence: '87%',
    time: '21:50 IST',
    severity: 'Medium',
    status: 'Assigned',
    assignedUnit: 'UNIT-02'
  },
  {
    id: 'INC-1004',
    type: 'Road Safety Incident',
    category: 'Road Safety Incident',
    location: 'Mehrauli-Gurgaon Road',
    plate: 'DL04 CD 7890',
    confidence: '92%',
    time: '21:15 IST',
    severity: 'Medium',
    status: 'Resolved',
    assignedUnit: 'UNIT-03'
  },
  {
    id: 'INC-1005',
    type: 'Traffic Collision',
    category: 'Traffic Collision',
    location: 'Grand Trunk Road, Shahdara',
    plate: 'DL08 EF 4321',
    confidence: '94%',
    time: '20:45 IST',
    severity: 'High',
    status: 'Active',
    assignedUnit: null
  }
];

export default function IncidentTable({ incidents = [], loading = false, error = null, onUpdateIncident, onRefresh }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const dataList = incidents.length > 0 ? incidents.map(item => ({
    id: item.id,
    type: item.type || 'Safety Incident',
    category: item.type || 'Other',
    location: item.location || 'City Corridor',
    plate: item.vehiclePlate || item.vehicleNumber || 'DL01 AB 0000',
    confidence: item.confidence || '90%',
    time: item.timestamp ? (typeof item.timestamp === 'string' && item.timestamp.includes('IST') ? item.timestamp : new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : '10:00 AM',
    severity: item.severity || 'Medium',
    status: item.status || 'Active',
    assignedUnit: item.assignedUnit || null
  })) : mockIncidentList;

  const filteredIncidents = dataList.filter((item) => {
    const matchesType = typeFilter === 'All' ? true : item.type.includes(typeFilter);
    const matchesSeverity = severityFilter === 'All' ? true : item.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
    const matchesSearch =
      (item.type || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.plate || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.id || '').toLowerCase().includes(search.toLowerCase());

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
      case 'Active':
      case 'New':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Assigned':
      case 'Investigating':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
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
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                title="Refresh incidents feed"
                className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors disabled:opacity-50"
              >
                <RotateCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

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
              <option value="Collision">Collision</option>
              <option value="Suspicious">Suspicious</option>
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
              <option value="Active">Active</option>
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
                <th className="py-2.5 px-3">Status / Unit</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-cyan-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>Fetching live incidents from backend...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredIncidents.length > 0 ? (
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
                    <td className="py-2.5 px-3">
                      <div className="flex flex-col space-y-0.5">
                        <span
                          className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded border w-fit ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                        {item.assignedUnit && (
                          <span className="text-[10px] font-mono text-cyan-400">
                            {item.assignedUnit}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {item.status !== 'Resolved' && onUpdateIncident && (
                          <>
                            <select
                              value={item.assignedUnit || ''}
                              onChange={(e) =>
                                onUpdateIncident(item.id, {
                                  assignedUnit: e.target.value,
                                  status: 'Assigned'
                                })
                              }
                              className="bg-slate-950 border border-slate-800 text-[11px] text-cyan-400 rounded px-1.5 py-0.5 focus:outline-none"
                            >
                              <option value="" disabled>Assign...</option>
                              <option value="UNIT-01">UNIT-01</option>
                              <option value="UNIT-02">UNIT-02</option>
                              <option value="UNIT-03">UNIT-03</option>
                            </select>

                            <button
                              onClick={() =>
                                onUpdateIncident(item.id, { status: 'Resolved' })
                              }
                              title="Mark Resolved"
                              className="p-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 rounded border border-emerald-700/50"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {item.status === 'Resolved' && (
                          <span className="text-[10px] text-emerald-400 font-semibold">Resolved</span>
                        )}
                      </div>
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
