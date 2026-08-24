import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Clock,
  Bus,
  Layers,
  ShieldCheck
} from 'lucide-react';

const createCustomDefectIcon = (type, severity) => {
  let bgColor = 'bg-amber-500';
  let borderColor = 'border-amber-200';
  let pulse = '';
  let iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

  if (severity === 'Critical') {
    bgColor = 'bg-red-600';
    borderColor = 'border-red-100';
    pulse = 'marker-pulse-critical';
  } else if (type === 'Waterlogging') {
    bgColor = 'bg-cyan-500';
    borderColor = 'border-cyan-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`;
  } else if (type === 'Traffic Signs' || type === 'Damaged Sign') {
    bgColor = 'bg-purple-500';
    borderColor = 'border-purple-200';
    iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`;
  } else if (type === 'Road Surface' || type === 'Damaged Surface') {
    bgColor = 'bg-yellow-500';
    borderColor = 'border-yellow-200';
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

const mockDefectLocations = [
  {
    id: 'DEF-101',
    title: 'Severe Deep Pothole',
    category: 'Potholes',
    type: 'Pothole',
    location: 'NH-24 near Sector 62 Flyover',
    coords: [28.6280, 77.3649],
    severity: 'High',
    time: '10:32 AM',
    busId: 'BUS-102 (DL-1P-4021)',
    confidence: '94%',
    status: 'New'
  },
  {
    id: 'DEF-102',
    title: 'Extensive Surface Cracking',
    category: 'Road Surface',
    type: 'Road Surface',
    location: 'GT Road - Link Road Intersection',
    coords: [28.6692, 77.4538],
    severity: 'Medium',
    time: '09:45 AM',
    busId: 'BUS-114 (DL-1P-1189)',
    confidence: '91%',
    status: 'Verified'
  },
  {
    id: 'DEF-103',
    title: 'Collapses Guard Rail Hazard',
    category: 'Infrastructure',
    type: 'Infrastructure',
    location: 'Ring Road near AIIMS Crossing',
    coords: [28.5672, 77.2100],
    severity: 'Critical',
    time: '11:15 AM',
    busId: 'BUS-108 (DL-1P-8802)',
    confidence: '98%',
    status: 'Assigned'
  },
  {
    id: 'DEF-104',
    title: 'Damaged Stop Sign',
    category: 'Traffic Signs',
    type: 'Traffic Signs',
    location: 'Vikas Marg, Laxmi Nagar',
    coords: [28.6304, 77.2774],
    severity: 'Low',
    time: '08:20 AM',
    busId: 'BUS-120 (DL-1P-3140)',
    confidence: '89%',
    status: 'Under Repair'
  },
  {
    id: 'DEF-105',
    title: 'Monsoon Waterlogging Pit',
    category: 'Waterlogging',
    type: 'Waterlogging',
    location: 'Mathura Road - Ashram Chowk',
    coords: [28.5700, 77.2580],
    severity: 'High',
    time: '10:10 AM',
    busId: 'BUS-105 (DL-1P-5590)',
    confidence: '96%',
    status: 'New'
  },
  {
    id: 'DEF-106',
    title: 'Missing Median Divider Sign',
    category: 'Traffic Signs',
    type: 'Traffic Signs',
    location: 'DND Flyway Toll Plaza',
    coords: [28.5611, 77.3021],
    severity: 'Medium',
    time: '07:50 AM',
    busId: 'BUS-112 (DL-1P-7722)',
    confidence: '92%',
    status: 'Resolved'
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

export default function DefectMap({ defects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const rawList = defects.length > 0
    ? defects.map((d) => ({
        id: d.id,
        title: d.type || d.title || 'Road Defect',
        category: getCategoryFromType(d),
        type: d.type,
        location: d.location,
        coords: (d.latitude !== undefined && d.longitude !== undefined)
          ? [Number(d.latitude), Number(d.longitude)]
          : (d.coords || [28.6139, 77.2090]),
        severity: d.severity,
        time: formatTime(d.timestamp || d.time),
        busId: d.busId,
        confidence: d.confidence,
        status: d.status
      }))
    : mockDefectLocations;

  const filteredDefects = selectedCategory === 'All'
    ? rawList
    : rawList.filter((d) => d.category === selectedCategory);

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
              Geographic Defect Distribution Map
            </h2>
            <p className="text-[11px] text-slate-400">
              Live mobile camera detection markers across city bus corridors
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {['All', 'Potholes', 'Road Surface', 'Traffic Signs', 'Waterlogging'].map((cat) => (
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

          {filteredDefects.map((def) => (
            <Marker
              key={def.id}
              position={def.coords}
              icon={createCustomDefectIcon(def.type, def.severity)}
            >
              <Popup className="urbaneye-map-popup">
                <div className="p-1 max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {def.type}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        def.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : def.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {def.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{def.title}</h4>

                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{def.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Bus className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{def.busId}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                      <span>Confidence: <strong className="text-emerald-400 font-mono">{def.confidence}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span>Detected at {def.time}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-400">{def.status}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md text-[11px] shadow-lg space-y-1.5">
          <p className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Defect Marker Legend
          </p>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-slate-300">Critical Hazard</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-300">Pothole</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Surface Damage</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
            <span className="text-slate-300">Waterlogging</span>
          </div>
        </div>
      </div>
    </div>
  );
}
