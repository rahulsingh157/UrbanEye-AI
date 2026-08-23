import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Layers, MapPin } from 'lucide-react';

const mockHotspotClusters = [
  {
    id: 'HOT-01',
    zone: 'NH-24 Corridor Cluster',
    coords: [28.6280, 77.3649],
    radius: 18,
    type: 'Multi-Hazard (Traffic + Potholes)',
    severity: 'Critical Risk',
    color: '#ef4444',
    incidents: 8,
    defects: 42,
    density: '88%'
  },
  {
    id: 'HOT-02',
    zone: 'Ring Road AIIMS Crossing Cluster',
    coords: [28.5672, 77.2100],
    radius: 16,
    type: 'Safety & Congestion Hotspot',
    severity: 'Critical Risk',
    color: '#ef4444',
    incidents: 12,
    defects: 28,
    density: '92%'
  },
  {
    id: 'HOT-03',
    zone: 'Sector 62 Industrial Belt',
    coords: [28.6270, 77.3750],
    radius: 14,
    type: 'High Defect Concentration',
    severity: 'High Risk',
    color: '#f97316',
    incidents: 3,
    defects: 58,
    density: '65%'
  },
  {
    id: 'HOT-04',
    zone: 'GT Road Link Corridor',
    coords: [28.6692, 77.4538],
    radius: 13,
    type: 'Traffic Bottleneck Spike',
    severity: 'High Risk',
    color: '#f97316',
    incidents: 5,
    defects: 19,
    density: '74%'
  },
  {
    id: 'HOT-05',
    zone: 'Mathura Road Ashram Chowk',
    coords: [28.5700, 77.2580],
    radius: 15,
    type: 'Waterlogging & Congestion',
    severity: 'High Risk',
    color: '#f97316',
    incidents: 4,
    defects: 31,
    density: '81%'
  },
  {
    id: 'HOT-06',
    zone: 'Connaught Place Outer Ring',
    coords: [28.6315, 77.2167],
    radius: 10,
    type: 'Stable / Moderate Flow',
    severity: 'Low Risk',
    color: '#10b981',
    incidents: 1,
    defects: 9,
    density: '42%'
  }
];

export default function AnalyticsMap() {
  const [filter, setFilter] = useState('All');

  const filteredClusters = filter === 'All'
    ? mockHotspotClusters
    : mockHotspotClusters.filter((h) => h.severity.includes(filter));

  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 shadow-md overflow-hidden flex flex-col h-[500px]">
      {/* Header Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Urban Hotspot Geographic Analysis
            </h2>
            <p className="text-[11px] text-slate-400">
              Spatial concentration clusters of traffic, defects, and safety anomalies
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {['All', 'Critical', 'High', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filter === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative flex-1 w-full h-full min-h-0 z-10">
        <MapContainer
          center={[28.6139, 77.2800]}
          zoom={11}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredClusters.map((cluster) => (
            <CircleMarker
              key={cluster.id}
              center={cluster.coords}
              radius={cluster.radius}
              pathOptions={{
                color: cluster.color,
                fillColor: cluster.color,
                fillOpacity: 0.45,
                weight: 2
              }}
            >
              <Popup className="urbaneye-map-popup">
                <div className="p-1 max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {cluster.id}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${cluster.color}20`,
                        borderColor: `${cluster.color}40`,
                        color: cluster.color
                      }}
                    >
                      {cluster.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                    {cluster.zone}
                  </h4>

                  <p className="text-[11px] text-slate-300">
                    Category: <strong className="text-white">{cluster.type}</strong>
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center pt-1 border-t border-slate-800">
                    <div className="p-1 rounded bg-slate-950">
                      <span className="text-slate-400 block">Density</span>
                      <strong className="text-cyan-400 font-mono">{cluster.density}</strong>
                    </div>
                    <div className="p-1 rounded bg-slate-950">
                      <span className="text-slate-400 block">Defects</span>
                      <strong className="text-amber-400 font-mono">{cluster.defects}</strong>
                    </div>
                    <div className="p-1 rounded bg-slate-950">
                      <span className="text-slate-400 block">Incidents</span>
                      <strong className="text-red-400 font-mono">{cluster.incidents}</strong>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md text-[11px] shadow-lg space-y-1.5">
          <p className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Concentration Legend
          </p>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-slate-300">Critical Multi-Hazard Hotspot</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-300">High Defect / Bottleneck Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Stable Condition Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
