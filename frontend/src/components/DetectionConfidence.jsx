import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Sliders
} from 'lucide-react';

export default function DetectionConfidence({ defects = [] }) {
  const total = defects.length > 0 ? defects.length : 18;
  
  const pendingCount = defects.length > 0
    ? defects.filter(d => d.status === 'New').length
    : 8;
  
  const verifiedCount = defects.length > 0
    ? (total - pendingCount)
    : 10;

  const verifiedPct = total > 0 ? Math.round((verifiedCount / total) * 100) : 56;
  const pendingPct = total > 0 ? (100 - verifiedPct) : 44;

  // Calculate average confidence score dynamically
  let avgConfidence = "92.8%";
  if (defects.length > 0) {
    const sumConf = defects.reduce((acc, d) => {
      const val = parseFloat(d.confidence);
      return acc + (isNaN(val) ? 90 : val);
    }, 0);
    avgConfidence = `${(sumConf / defects.length).toFixed(1)}%`;
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between h-[480px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                AI Detection & Quality Telemetry
              </h3>
              <p className="text-[11px] text-slate-400">
                False-positive mitigation & verification metrics
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
            CONFIDENCE THRESHOLD ≥85%
          </span>
        </div>

        {/* Primary Metric Score */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-950 to-emerald-950/30 border border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Average Detection Confidence
            </p>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                {avgConfidence}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live Precision
              </span>
            </div>
          </div>

          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cpu className="h-6 w-6" />
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="mt-4 space-y-3">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Verified Detections</p>
                <p className="text-[10px] text-slate-400">Confirmed by operations desk</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-400 font-mono">{verifiedPct}%</span>
              <p className="text-[10px] text-slate-400">{verifiedCount} defects</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Pending Verification</p>
                <p className="text-[10px] text-slate-400">Queued for human review</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-amber-400 font-mono">{pendingPct}%</span>
              <p className="text-[10px] text-slate-400">{pendingCount} defects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Callout */}
      <div className="pt-3 border-t border-slate-800/60 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Sliders className="h-3 w-3 text-cyan-400" />
            False Positive Guardrail:
          </span>
          <span className="font-semibold text-slate-200">Multi-Frame Re-Identification</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Spatial & temporal vision tracking ensures high confidence scoring across transit camera captures.
        </p>
      </div>
    </div>
  );
}
