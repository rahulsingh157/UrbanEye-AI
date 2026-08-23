import { useState } from 'react';
import { AlertOctagon, RotateCcw, Trash2, X, AlertTriangle } from 'lucide-react';

export default function DangerZone({ onReset, onClearCache }) {
  const [activeModal, setActiveModal] = useState(null); // 'reset' | 'clear' | null

  const handleConfirm = () => {
    if (activeModal === 'reset') {
      onReset();
    } else if (activeModal === 'clear') {
      onClearCache();
    }
    setActiveModal(null);
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-950/10 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2.5 pb-3 border-b border-red-500/20">
        <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
          <AlertOctagon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-400 tracking-tight">
            Danger Zone
          </h3>
          <p className="text-[11px] text-slate-400">
            Irreversible preference reset & local session data clearing
          </p>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-200">Reset Local Preferences</h4>
          <p className="text-[11px] text-slate-400">Restores all UI toggles and parameters back to factory defaults.</p>
        </div>
        <button
          type="button"
          onClick={() => setActiveModal('reset')}
          className="px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Preferences</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-200">Purge Cached Session Data</h4>
          <p className="text-[11px] text-slate-400">Clears client-side cached telemetry filters and session logs.</p>
        </div>
        <button
          type="button"
          onClick={() => setActiveModal('clear')}
          className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-red-600/20 transition-all"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Local Data</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Confirm Maintenance Action</h3>
                <p className="text-[11px] text-slate-400">
                  {activeModal === 'reset'
                    ? 'Are you sure you want to reset all preferences to defaults?'
                    : 'Are you sure you want to clear all local session data?'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
