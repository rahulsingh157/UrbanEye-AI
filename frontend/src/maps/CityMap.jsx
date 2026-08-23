import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Clock,
  Bus,
  Layers
} from 'lucide-react';

// Custom Leaflet DivIcon Generators to avoid missing PNG asset issues in Vite bundles
const createCustomIcon = (type, severity) => {
  let bgColor = 'bg-amber-500';
  let borderColor = 'border-amber-300';
  let pulse = '';
  let iconSvg = '⚠️';

  if (type === 'Pothole') {
    bgColor = severity === 'High' ? 'bg-amber-500' : 'bg-yellow-500';
    borderColor = 'border-amber-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  } else if (type === 'Traffic') {
    bgColor = severity === 'High' ? 'bg-red-500' : 'bg-orange-500';
    borderColor = 'border-red-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`;
  } else if (type === 'Incident') {
    bgColor = 'bg-red-600';
    borderColor = 'border-red-100';
    pulse = 'marker-pulse-critical';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m12 8 0 4"/><path d="m12 16 .01 0"/></svg>`;
  } else if (type === 'Infrastructure') {
    bgColor = 'bg-cyan-500';
    borderColor = 'border-cyan-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
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

const mockEvents = [
  {
    id: 'EVT-101',
    title: 'Severe Deep Pothole',
    category: 'Road Defects',
    type: 'Pothole',
    location: 'NH-24 near Sector 62 Flyover',
    coords: [28.6280, 77.3649],
    severity: 'High',
    time: '3 mins ago',
    busId: 'Bus #DL-1P-4021',
    status: 'Pending Dispatch',
    confidence: '96.4%'
  },
  {
    id: 'EVT-102',
    title: 'Heavy Traffic Congestion',
    category: 'Traffic',
    type: 'Traffic',
    location: 'GT Road - Link Road Intersection',
    coords: [28.6692, 77.4538],
    severity: 'High',
    time: '7 mins ago',
    busId: 'Bus #DL-1P-1189',
    status: 'Monitored',
    confidence: '92.1%'
  },
  {
    id: 'EVT-103',
    title: 'Vehicle Collision Hazard',
    category: 'Incidents',
    type: 'Incident',
    location: 'Ring Road near AIIMS Crossing',
    coords: [28.5672, 77.2100],
    severity: 'Critical',
    time: '12 mins ago',
    busId: 'Bus #DL-1P-8802',
    status: 'Alert Sent to Control Room',
    confidence: '98.7%'
  },
  {
    id: 'EVT-104',
    title: 'Damaged Guard Rail',
    category: 'Infrastructure',
    type: 'Infrastructure',
    location: 'Vikas Marg, Laxmi Nagar',
    coords: [28.6304, 77.2774],
    severity: 'Medium',
    time: '25 mins ago',
    busId: 'Bus #DL-1P-3140',
    status: 'Logged for Maintenance',
    confidence: '89.5%'
  },
  {
    id: 'EVT-105',
    title: 'Multiple Surface Cracks',
    category: 'Road Defects',
    type: 'Pothole',
    location: 'Mathura Road - Ashram Chowk',
    coords: [28.5700, 77.2580],
    severity: 'Medium',
    time: '34 mins ago',
    busId: 'Bus #DL-1P-5590',
    status: 'Queued',
    confidence: '91.0%'
  },
  {
    id: 'EVT-106',
    title: 'Traffic Bottleneck / Stalled Bus',
    category: 'Traffic',
    type: 'Traffic',
    location: 'DND Flyway Toll Plaza',
    coords: [28.5611, 77.3021],
    severity: 'Medium',
    time: '41 mins ago',
    busId: 'Bus #DL-1P-7722',
    status: 'Clearing',
    confidence: '94.8%'
  }
];

export default function CityMap() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = selectedCategory === 'All'
    ? mockEvents
    : mockEvents.filter((e) => e.category === selectedCategory);

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
              City Urban Sensing Map
            </h2>
            <p className="text-[11px] text-slate-400">
              Live mobile telemetry & AI detection markers across transit routes
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {['All', 'Road Defects', 'Traffic', 'Incidents', 'Infrastructure'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
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

          {filteredEvents.map((evt) => (
            <Marker
              key={evt.id}
              position={evt.coords}
              icon={createCustomIcon(evt.type, evt.severity)}
            >
              <Popup className="urbaneye-map-popup">
                <div className="p-1 max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {evt.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        evt.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : evt.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {evt.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{evt.title}</h4>

                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Bus className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{evt.busId} (AI Conf: {evt.confidence})</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-400">{evt.status}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md text-[11px] shadow-lg space-y-1.5">
          <p className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Marker Legend
          </p>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-slate-300">Safety Incident (Critical)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-300">Pothole / Road Defect</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-300">Traffic Congestion</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
            <span className="text-slate-300">Infrastructure Defect</span>
          </div>
        </div>
      </div>
    </div>
  );
}
