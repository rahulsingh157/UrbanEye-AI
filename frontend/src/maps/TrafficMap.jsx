import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import {
  MapPin,
  Clock,
  Car,
  Layers,
  Gauge
} from 'lucide-react';

const mockTrafficZones = [
  {
    id: 'TRF-01',
    location: 'NH-24 near Sector 62 Flyover',
    coords: [28.6280, 77.3649],
    density: 88,
    vehicles: 2840,
    speed: 18,
    status: 'Critical',
    time: '2 mins ago'
  },
  {
    id: 'TRF-02',
    location: 'GT Road - Link Road Intersection',
    coords: [28.6692, 77.4538],
    density: 74,
    vehicles: 2150,
    speed: 24,
    status: 'Heavy',
    time: '5 mins ago'
  },
  {
    id: 'TRF-03',
    location: 'Ring Road near AIIMS Crossing',
    coords: [28.5672, 77.2100],
    density: 92,
    vehicles: 3410,
    speed: 12,
    status: 'Critical',
    time: '1 min ago'
  },
  {
    id: 'TRF-04',
    location: 'Vikas Marg, Laxmi Nagar',
    coords: [28.6304, 77.2774],
    density: 58,
    vehicles: 1680,
    speed: 32,
    status: 'Moderate',
    time: '8 mins ago'
  },
  {
    id: 'TRF-05',
    location: 'DND Flyway Toll Plaza',
    coords: [28.5611, 77.3021],
    density: 66,
    vehicles: 2020,
    speed: 28,
    status: 'Heavy',
    time: '4 mins ago'
  },
  {
    id: 'TRF-06',
    location: 'Connaught Place Outer Circle',
    coords: [28.6315, 77.2167],
    density: 42,
    vehicles: 1240,
    speed: 40,
    status: 'Normal',
    time: '10 mins ago'
  },
  {
    id: 'TRF-07',
    location: 'Mathura Road - Ashram Chowk',
    coords: [28.5700, 77.2580],
    density: 81,
    vehicles: 2690,
    speed: 16,
    status: 'Critical',
    time: '3 mins ago'
  }
];

export default function TrafficMap() {
  const [filter, setFilter] = useState('All');

  const filteredZones = filter === 'All'
    ? mockTrafficZones
    : mockTrafficZones.filter((z) => z.status === filter);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Critical':
        return '#ef4444'; // Red
      case 'Heavy':
        return '#f97316'; // Orange
      case 'Moderate':
        return '#eab308'; // Yellow
      default:
        return '#10b981'; // Green
    }
  };

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
              Citywide Traffic Congestion Map
            </h2>
            <p className="text-[11px] text-slate-400">
              Real-time density telemetry & speed monitoring zones
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {['All', 'Critical', 'Heavy', 'Moderate', 'Normal'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filter === status
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {status}
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

          {filteredZones.map((zone) => {
            const color = getMarkerColor(zone.status);
            return (
              <CircleMarker
                key={zone.id}
                center={zone.coords}
                radius={zone.density > 80 ? 14 : zone.density > 60 ? 11 : 8}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.55,
                  weight: 2
                }}
              >
                <Popup className="urbaneye-map-popup">
                  <div className="p-1 max-w-xs space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {zone.id}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded border"
                        style={{
                          backgroundColor: `${color}20`,
                          borderColor: `${color}40`,
                          color
                        }}
                      >
                        {zone.status} ({zone.density}%)
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{zone.location}</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-400 text-[10px]">Volume:</span>
                        <p className="font-bold text-white font-mono flex items-center gap-1">
                          <Car className="h-3 w-3 text-cyan-400" />
                          {zone.vehicles.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Avg Speed:</span>
                        <p className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                          <Gauge className="h-3 w-3 text-emerald-400" />
                          {zone.speed} km/h
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                      <span>Last Updated:</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="h-3 w-3" /> {zone.time}
                      </span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md text-[11px] shadow-lg space-y-1.5">
          <p className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Traffic Status Legend
          </p>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-300">Critical Congestion (&gt;80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-300">Heavy Traffic (65%-80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Moderate Traffic (50%-65%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Normal Flow (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
