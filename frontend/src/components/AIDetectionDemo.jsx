const API_BASE_URL = 'https://urbaneye-ai-backend.onrender.com/api/detect';

import { useState } from 'react';
import {
  Sparkles,
  Upload,
  Scan,
  AlertTriangle,
  MapPin,
  Bus,
  ShieldCheck,
  Clock,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
  PlusCircle,
  Check
} from 'lucide-react';

export default function AIDetectionDemo({ onDefectAdded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // States for "Add to Defect Log"
  const [adding, setAdding] = useState(false);
  const [addedDefectId, setAddedDefectId] = useState(null);
  const [addError, setAddError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setAddedDefectId(null);
      setAddError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setAddedDefectId(null);
    setAddError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/detect`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Detection endpoint returned an error');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Detection analysis error:', err);
      setError('Detection service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToDefectLog = async () => {
    if (!result) return;

    setAdding(true);
    setAddError(null);

    const defectPayload = {
      type: result.type || 'Pothole',
      location: result.location || 'Unknown Location',
      latitude: result.latitude !== undefined ? result.latitude : 28.628,
      longitude: result.longitude !== undefined ? result.longitude : 77.3649,
      severity: result.severity || 'High',
      confidence: typeof result.confidence === 'number' ? `${result.confidence}%` : (result.confidence || '92%'),
      busId: result.busId || 'BUS-102',
      timestamp: result.timestamp || new Date().toISOString(),
      status: 'New'
    };

    try {
      const response = await fetch(`${API_BASE_URL}/defects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(defectPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to create defect');
      }

      const created = await response.json();
      setAddedDefectId(created.id || 'DEF-LOGGED');

      if (typeof onDefectAdded === 'function') {
        onDefectAdded();
      }
    } catch (err) {
      console.error('Error adding defect to log:', err);
      setAddError('Unable to add defect to monitoring system.');
    } finally {
      setAdding(false);
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A';
    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) return ts;
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      return ts;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            AI Road Defect Detection
          </h3>
          <p className="text-[11px] text-slate-400">
            Upload an image from a transit camera unit to trigger prototype inference analysis
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Vision Unit v1.0
        </span>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
        {/* Left Side: Upload & Preview (5 cols) */}
        <div className="md:col-span-5 flex flex-col space-y-3">
          <div className="relative border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 bg-slate-950/60 flex flex-col items-center justify-center min-h-[160px] text-center transition-colors group">
            {previewUrl ? (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={previewUrl}
                  alt="Defect Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-slate-900/90 text-cyan-400 px-3 py-1 rounded text-xs border border-cyan-500/30 font-semibold">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full justify-center">
                <div className="p-2.5 rounded-full bg-slate-900 text-slate-400 group-hover:text-cyan-400 border border-slate-800 transition-colors">
                  <Upload className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-300">
                    Click to upload image
                  </p>
                  <p className="text-[10px] text-slate-500">JPG, PNG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Image...</span>
              </>
            ) : (
              <>
                <Scan className="h-4 w-4" />
                <span>Analyze Image</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Detection Results & Actions (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-center bg-slate-950/40 rounded-xl p-4 border border-slate-800/80 min-h-[200px]">
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-xs bg-red-950/30 p-3 rounded-lg border border-red-900/50">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!error && !result && !loading && (
            <div className="flex flex-col items-center justify-center text-center space-y-2 text-slate-500 py-6">
              <ImageIcon className="h-8 w-8 text-slate-600" />
              <p className="text-xs font-medium text-slate-400">No Analysis Done Yet</p>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Select an image from a transit camera feed and click Analyze Image to view AI detection metrics.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center space-y-3 py-6 text-center">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              </div>
              <p className="text-xs font-semibold text-cyan-400">Running Computer Vision Model Inference...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Defect Detected
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Confidence: {typeof result.confidence === 'number' ? `${result.confidence}%` : result.confidence}
                </span>
              </div>

              {/* Grid of Results */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Detection Type</p>
                  <p className="text-sm font-extrabold text-amber-400 flex items-center gap-1 mt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {result.type}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Severity</p>
                  <p className="text-sm font-extrabold text-red-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {result.severity} Severity
                  </p>
                </div>

                <div className="col-span-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Location</p>
                  <p className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{result.location}</span>
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Bus Sensing Unit</p>
                  <p className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Bus className="h-3.5 w-3.5 text-slate-400" />
                    {result.busId}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Inference Time</p>
                  <p className="text-xs font-mono text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {formatTimestamp(result.timestamp)}
                  </p>
                </div>
              </div>

              {/* Action Button & Status Feedback */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col space-y-2">
                {addError && (
                  <div className="text-[11px] text-red-400 bg-red-950/40 border border-red-900/50 p-2 rounded flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{addError}</span>
                  </div>
                )}

                {addedDefectId ? (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Defect added to monitoring system</span>
                    </div>
                    <span className="font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                      ID: {addedDefectId}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToDefectLog}
                    disabled={adding}
                    className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
                  >
                    {adding ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding Defect...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4" />
                        <span>Add to Defect Log</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
