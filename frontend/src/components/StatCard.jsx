import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const statusThemes = {
  blue: {
    bg: 'from-blue-950/40 to-slate-900/60',
    border: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accent: 'bg-blue-500',
    trendBg: 'bg-blue-500/10 text-blue-400',
  },
  green: {
    bg: 'from-emerald-950/40 to-slate-900/60',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accent: 'bg-emerald-500',
    trendBg: 'bg-emerald-500/10 text-emerald-400',
  },
  amber: {
    bg: 'from-amber-950/40 to-slate-900/60',
    border: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accent: 'bg-amber-500',
    trendBg: 'bg-amber-500/10 text-amber-400',
  },
  red: {
    bg: 'from-red-950/40 to-slate-900/60',
    border: 'border-red-500/30',
    iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    accent: 'bg-red-500',
    trendBg: 'bg-red-500/10 text-red-400',
  },
  cyan: {
    bg: 'from-cyan-950/40 to-slate-900/60',
    border: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    accent: 'bg-cyan-500',
    trendBg: 'bg-cyan-500/10 text-cyan-400',
  },
};

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  trendText,
  status = 'cyan', // 'blue' | 'green' | 'amber' | 'red' | 'cyan'
}) {
  const theme = statusThemes[status] || statusThemes.cyan;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${theme.bg} border ${theme.border} p-5 backdrop-blur-md transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-slate-950/50 group`}
    >
      {/* Accent Indicator Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accent}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            {title}
          </p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {value}
            </span>
          </div>
        </div>

        {/* Card Icon */}
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105 ${theme.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Card Footer / Trend section */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs">
          {trendType === 'up' && (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${theme.trendBg}`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </span>
          )}
          {trendType === 'down' && (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${theme.trendBg}`}>
              <TrendingDown className="h-3 w-3 mr-1" />
              {trend}
            </span>
          )}
          {trendType === 'neutral' && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
              <Minus className="h-3 w-3 mr-1" />
              {trend}
            </span>
          )}
          {trendText && (
            <span className="text-[11px] text-slate-400 truncate">{trendText}</span>
          )}
        </div>

        {subtext && (
          <span className="text-[11px] text-slate-400 font-medium">{subtext}</span>
        )}
      </div>
    </div>
  );
}
