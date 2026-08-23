import { useState } from 'react';
import { MapPin, Search, Clock, Car, Gauge, Flame } from 'lucide-react';

const mockHotspots = [
  {
    id: 'HS-101',
    location: 'Ring Road near AIIMS Crossing',
    density: 92,
    vehicles: 3410,
    speed: 12,
    status: 'Critical',
    updated: '1 min ago'
  },
  {
    id: 'HS-102',
    location: 'NH-24 near Sector 62 Flyover',
    density: 88,
    vehicles: 2840,
    speed: 18,
    status: 'Critical',
    updated: '2 mins ago'
  },
  {
    id: 'HS-103',
    location: 'Mathura Road - Ashram Chowk',
    density: 81,
    vehicles: 2690,
    speed: 16,
    status: 'Critical',
    updated: '3 mins ago'
  },
  {
    id: 'HS-104',
    location: 'GT Road - Link Road Intersection',
    density: 74,
    vehicles: 2150,
    speed: 24,
    status: 'Heavy',
    updated: '5 mins ago'
  },
  {
    id: 'HS-105',
    location: 'DND Flyway Toll Plaza',
    density: 66,
    vehicles: 2020,
    speed: 28,
    status: 'Heavy',
    updated: '4 mins ago'
  },
  {
    id: 'HS-106',
    location: 'Vikas Marg, Laxmi Nagar',
    density: 58,
    vehicles: 1680,
    speed: 32,
    status: 'Moderate',
    updated: '8 mins ago'
  },
  {
    id: 'HS-107',
    location: 'Connaught Place Outer Circle',
    density: 42,
    vehicles: 1240,
    speed: 40,
    status: 'Normal',
    updated: '10 mins ago'
  }
];

export default function CongestionTable() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredHotspots = mockHotspots.filter((item) => {
    const matchesFilter = filter === 'All' ? true : item.status === filter;
    const matchesSearch =
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
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
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[500px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Congestion Hotspots
              </h3>
              <p className="text-[11px] text-slate-400">
                Monitored bottleneck locations ranked by traffic density
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-44">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {['All', 'Critical', 'Heavy'].map((f) => (
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

        {/* Hotspots Table */}
        <div className="mt-3 overflow-y-auto overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 z-10">
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3">Hotspot Location</th>
                <th className="py-2.5 px-3">Density</th>
                <th className="py-2.5 px-3">Vehicles</th>
                <th className="py-2.5 px-3">Avg Speed</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredHotspots.length > 0 ? (
                filteredHotspots.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate max-w-[170px]">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-200">
                      {item.density}%
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono">
                      <div className="flex items-center space-x-1">
                        <Car className="h-3 w-3 text-slate-500" />
                        <span>{item.vehicles.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-semibold">
                      <div className="flex items-center space-x-1">
                        <Gauge className="h-3 w-3 text-emerald-500" />
                        <span>{item.speed} km/h</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400 whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span>{item.updated}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No matching congestion hotspots found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Tracking {filteredHotspots.length} congested corridors</span>
        <span className="text-[11px] text-cyan-400 font-medium">Auto-refresh: 30s</span>
      </div>
    </div>
  );
}
