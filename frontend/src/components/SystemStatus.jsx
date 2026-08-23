import {
  Cpu,
  MapPin,
  Bus,
  Server,
  Database,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

const mockSystemTelemetry = [
  {
    id: 'sys-01',
    name: 'AI Detection Engine',
    status: 'Online',
    type: 'online',
    metric: '99.9% Uptime',
    latency: '14ms latency',
    icon: Cpu
  },
  {
    id: 'sys-02',
    name: 'GIS Services',
    status: 'Online',
    type: 'online',
    metric: 'Tile Layer Active',
    latency: '8ms latency',
    icon: MapPin
  },
  {
    id: 'sys-03',
    name: 'Transit Sensing Units',
    status: '128 Online',
    type: 'online',
    metric: '128 / 130 Active',
    latency: 'Cellular 5G',
    icon: Bus
  },
  {
    id: 'sys-04',
    name: 'Backend API Gateway',
    status: 'Connected',
    type: 'online',
    metric: 'WebSocket Sync',
    latency: '12ms latency',
    icon: Server
  },
  {
    id: 'sys-05',
    name: 'Telemetry Database',
    status: 'Healthy',
    type: 'online',
    metric: 'Storage 42%',
    latency: '2ms latency',
    icon: Database
  }
];

export default function SystemStatus() {
  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Infrastructure System Telemetry
          </h3>
          <p className="text-[11px] text-slate-400">
            Real-time operational status of core sensing & analytical microservices
          </p>
        </div>

        <button className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all">
          <RefreshCw className="h-3 w-3 text-cyan-400 animate-spin" />
          <span>Ping Services</span>
        </button>
      </div>

      {/* Grid of System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockSystemTelemetry.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-400">{item.metric}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.status}</span>
                </span>
                <p className="text-[9px] font-mono text-slate-500 mt-1">{item.latency}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
