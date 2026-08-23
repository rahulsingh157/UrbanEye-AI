import {
  Camera,
  Cpu,
  Radio,
  Navigation,
  CheckCircle2
} from 'lucide-react';

const healthMetrics = [
  {
    id: 'cameras',
    label: 'Bus Cameras Online',
    value: '124 / 128',
    percentage: 96.8,
    statusText: '96.8% Fleet Active',
    status: 'normal',
    icon: Camera,
    subText: '4 cameras under maintenance'
  },
  {
    id: 'ai-engine',
    label: 'AI Detection Inference',
    value: '42 FPS avg',
    percentage: 94.0,
    statusText: 'Optimal (18ms latency)',
    status: 'normal',
    icon: Cpu,
    subText: 'YOLOv8 Edge Acceleration'
  },
  {
    id: 'stream',
    label: 'Telemetry Data Stream',
    value: '0.2s lag',
    percentage: 98.5,
    statusText: 'Mock Stream Active',
    status: 'normal',
    icon: Radio,
    subText: '5G Mobile Gateway Link'
  },
  {
    id: 'gps',
    label: 'GPS & Telematics',
    value: '99.4%',
    percentage: 99.4,
    statusText: 'Strong Signal Lock',
    status: 'normal',
    icon: Navigation,
    subText: 'Real-time bus positioning'
  }
];

export default function SystemHealth() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[460px]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                System Operational Health
              </h3>
              <p className="text-[11px] text-slate-400">
                Sensing hardware & edge telemetry pipeline
              </p>
            </div>
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ALL SYSTEMS NORMAL
          </span>
        </div>

        {/* Health Items */}
        <div className="mt-3 space-y-3 min-h-0 flex-1 overflow-y-auto pr-1">
          {healthMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded-md bg-slate-900 text-cyan-400 border border-slate-800">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.subText}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono">
                      {item.value}
                    </span>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      {item.statusText}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer System Spec */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span>Node: <strong className="text-slate-200">Edge-Zone-01</strong></span>
        <span>Version: <strong className="text-slate-200">v1.4.2-SIH</strong></span>
      </div>
    </div>
  );
}
