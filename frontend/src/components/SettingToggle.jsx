export default function SettingToggle({ label, description, enabled, onChange, badge }) {
  return (
    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between gap-4">
      <div className="space-y-0.5 min-w-0 flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-xs font-bold text-slate-200">{label}</h4>
          {badge && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-slate-400 leading-snug">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? 'bg-cyan-500 shadow-md shadow-cyan-500/20' : 'bg-slate-800'
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
