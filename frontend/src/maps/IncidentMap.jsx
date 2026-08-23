import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Clock,
  Bus,
  Layers,
  Car,
  ShieldCheck
} from 'lucide-react';

const createCustomIncidentIcon = (type, severity) => {
  let bgColor = 'bg-amber-500';
  let borderColor = 'border-amber-200';
  let pulse = '';
  let iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m12 8 0 4"/><path d="m12 16 .01 0"/></svg>`;

  if (type === 'Hit-and-Run' || severity === 'Critical') {
    bgColor = 'bg-red-600';
    borderColor = 'border-red-100';
    pulse = 'marker-pulse-critical';
  } else if (type === 'Rash Driving') {
    bgColor = 'bg-orange-500';
    borderColor = 'border-orange-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`;
  } else if (type === 'Pedestrian Safety') {
    bgColor = 'bg-yellow-500';
    borderColor = 'border-yellow-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m13 4 2 2-3 4-2-2z"/><path d="M7 21v-4l3-3"/><path d="M14 17l4 4"/><circle cx="13" cy="4" r="1"/></svg>`;
  }

  const html = `
    <div class="relative flex items-center justify-center">
      <div class="w-8 h-8 rounded-full ${bgColor} text-white border-2 ${borderColor} shadow-lg flex items-center justify-center ${pulse}">
        ${iconSvg}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const mockIncidentLocations = [
  {
    id: 'INC-1024',
    title: 'Suspected Hit-and-Run',
    category: 'Hit-and-Run',
    type: 'Hit-and-Run',
    location: 'NH-24 Corridor, Ghaziabad',
    coords: [28.6280, 77.3649],
    severity: 'Critical',
    time: '22:41:18 IST',
    plate: 'UP16 AB 1234',
    vehicle: 'White Hyundai Verna',
    busId: 'BUS-102 (Cam #1)',
    confidence: '93%',
    status: 'Investigating'
  },
  {
    id: 'INC-1025',
    title: 'Extreme Rash Driving / Weaving',
    category: 'Rash Driving',
    type: 'Rash Driving',
    location: 'GT Road Express Lane',
    coords: [28.6692, 77.4538],
    severity: 'High',
    time: '22:28:04 IST',
    plate: 'DL04 C 9981',
    vehicle: 'Black Honda City',
    busId: 'BUS-114',
    confidence: '95%',
    status: 'New'
  },
  {
    id: 'INC-1026',
    title: 'Near-Miss Pedestrian Hazard',
    category: 'Pedestrian Safety',
    type: 'Pedestrian Safety',
    location: 'Ring Road near AIIMS Crossing',
    coords: [28.5672, 77.2100],
    severity: 'Medium',
    time: '21:50:30 IST',
    plate: 'HR26 DK 4410',
    vehicle: 'Grey Maruti Swift',
    busId: 'BUS-108',
    confidence: '88%',
    status: 'Assigned'
  },
  {
    id: 'INC-1027',
    title: 'Red-Light Violation Surge',
    category: 'Other',
    type: 'Other',
    location: 'Vikas Marg, Laxmi Nagar',
    coords: [28.6304, 77.2774],
    severity: 'Medium',
    time: '21:15:10 IST',
    plate: 'DL08 AR 7720',
    vehicle: 'Red Kia Seltos',
    busId: 'BUS-120',
    confidence: '91%',
    status: 'Resolved'
  },
  {
    id: 'INC-1028',
    title: 'Overspeeding Transit Corridor',
    category: 'Rash Driving',
    type: 'Rash Driving',
    location: 'Mathura Road - Ashram Chowk',
    coords: [28.5700, 77.2580],
    severity: 'High',
    time: '20:45:00 IST',
    plate: 'UP14 ET 3390',
    vehicle: 'Blue Mahindra Thar',
    busId: 'BUS-105',
    confidence: '96%',
    status: 'Investigating'
  }
];

export default function IncidentMap() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIncidents = selectedCategory === 'All'
    ? mockIncidentLocations
    : mockIncidentLocations.filter((i) => i.category === selectedCategory);

  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 shadow-md overflow-hidden flex flex-col h-[500px]">
      {/* Header Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Safety Incidents Telemetry Map
            </h2>
            <p className="text-[11px] text-slate-400">
              Real-time incident markers & offending vehicle tracking
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {['All', 'Hit-and-Run', 'Rash Driving', 'Pedestrian Safety', 'Other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-red-500 text-white font-bold shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
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

          {filteredIncidents.map((inc) => (
            <Marker
              key={inc.id}
              position={inc.coords}
              icon={createCustomIncidentIcon(inc.type, inc.severity)}
            >
              <Popup className="urbaneye-map-popup">
                <div className="p-1 max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      {inc.type}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        inc.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : inc.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{inc.title}</h4>

                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Car className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{inc.vehicle} (<strong className="text-cyan-300 font-mono">{inc.plate}</strong>)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{inc.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Bus className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{inc.busId}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>ANPR Conf: <strong className="text-emerald-400 font-mono">{inc.confidence}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span>{inc.time}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-400">{inc.status}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md text-[11px] shadow-lg space-y-1.5">
          <p className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Incident Marker Legend
          </p>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-slate-300">Hit-and-Run (Critical)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-300">Rash Driving</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Pedestrian Safety Hazard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
