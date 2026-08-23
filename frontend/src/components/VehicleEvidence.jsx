import { Camera, ShieldCheck, Lock } from 'lucide-react';

export default function VehicleEvidence() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[360px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                ANPR Vehicle Evidence
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated license plate & vehicle identification telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            <Lock className="h-3 w-3" />
            <span>RESTRICTED ACCESS</span>
          </div>
        </div>

        {/* ANPR Vehicle Identification Grid */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {/* Mock Camera Crop Preview Box */}
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="w-full h-24 rounded bg-slate-900 border border-slate-800/80 flex flex-col items-center justify-center relative p-2">
              <span className="text-[10px] text-slate-500 uppercase font-mono mb-1">Optical Frame Capture</span>
              <div className="px-3 py-1 bg-slate-950 rounded border-2 border-amber-400/80 shadow-md flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-mono font-extrabold text-sm text-amber-300 tracking-wider">
                  UP16 AB 1234
                </span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 mt-1">Plate Confidence: 93%</span>
            </div>
            <div className="w-full flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span>Cam Source: BUS-102</span>
              <span>Crop ID: #8912</span>
            </div>
          </div>

          {/* Telemetry Details */}
          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Vehicle Type:</span>
              <span className="font-bold text-white">White Sedan</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Model Match:</span>
              <span className="font-bold text-slate-200">Hyundai Verna</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">AI Vision Conf:</span>
              <span className="font-bold text-emerald-400 font-mono">91%</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Seen Window:</span>
              <span className="font-bold text-slate-300 font-mono text-[10px]">22:41:18 - 22:41:42</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Compliance Footer */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-cyan-400" />
          Evidence Access: Authorized Personnel Only
        </span>
        <span className="text-slate-500">GDPR / Data Masked</span>
      </div>
    </div>
  );
}
