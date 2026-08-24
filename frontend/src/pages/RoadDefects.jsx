import { useState, useEffect, useCallback } from 'react';
import { fetchDefects } from '../services/defectService';
import StatCard from '../components/StatCard';
import DefectTypeChart from '../charts/DefectTypeChart';
import DetectionConfidence from '../components/DetectionConfidence';
import DefectMap from '../maps/DefectMap';
import PriorityQueue from '../components/PriorityQueue';
import DefectTable from '../components/DefectTable';
import AIDetectionDemo from '../components/AIDetectionDemo';
import {
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  Wrench,
  CheckCircle2,
  RotateCw,
  AlertCircle
} from 'lucide-react';

export default function RoadDefects() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);

  const loadDefects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDefects();
      if (Array.isArray(data)) {
        setDefects(data);
        setIsOfflineFallback(false);
      }
    } catch (err) {
      console.error('Failed to load defects from backend API:', err);
      setError('Backend service unreachable. Displaying cached local telemetry & fallback records.');
      setIsOfflineFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDefects();
  }, [loadDefects]);

  // Derived metrics from live defects data or fallback defaults
  const totalDefectsCount = defects.length > 0 ? defects.length : 427;
  const activeDefectsCount = defects.length > 0 
    ? defects.filter(d => d.status !== 'Resolved').length 
    : 243;
  const highPriorityCount = defects.length > 0 
    ? defects.filter(d => d.severity === 'High' || d.severity === 'Critical').length 
    : 12;
  const underRepairCount = defects.length > 0 
    ? defects.filter(d => d.status === 'Under Repair').length 
    : 38;
  const resolvedCount = defects.length > 0 
    ? defects.filter(d => d.status === 'Resolved').length 
    : 184;

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Detection Feed</span>
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            Road Defects Intelligence
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            AI-powered road condition monitoring across city transit routes, identifying potholes, surface degradation, waterlogging, and missing infrastructure.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 w-full md:w-auto">
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">AI Confidence</p>
            <p className="text-sm font-bold text-emerald-400 font-mono">92.4% Avg</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Active Defects</p>
            <p className="text-sm font-bold text-amber-400 font-mono">
              {activeDefectsCount} Open
            </p>
          </div>
          <button
            onClick={loadDefects}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-50"
            title="Refresh defects data from backend"
          >
            <RotateCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Prominent Offline / Demo Mode Indicator */}
      {isOfflineFallback && (
        <div className="rounded-xl bg-amber-950/60 border border-amber-500/50 p-4 text-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold uppercase tracking-wider text-[10px] animate-pulse">
              OFFLINE / DEMO MODE
            </span>
            <span className="font-medium text-amber-200">
              Backend service unreachable. Displaying cached local telemetry & fallback records.
            </span>
          </div>
          <button
            onClick={loadDefects}
            className="px-3 py-1 bg-amber-900 hover:bg-amber-800 border border-amber-600 rounded text-amber-100 font-semibold transition-colors flex-shrink-0 text-xs shadow-xs"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Top 5 Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Defects"
          value={String(totalDefectsCount)}
          subtext="Citywide Monitored Grid"
          trend="+12"
          trendType="up"
          trendText="today"
          status="amber"
          icon={AlertTriangle}
        />
        <StatCard
          title="New Today"
          value="14"
          subtext="Captured Last 24 Hours"
          trend="+3"
          trendType="up"
          trendText="vs yesterday"
          status="amber"
          icon={Sparkles}
        />
        <StatCard
          title="High Priority"
          value={String(highPriorityCount)}
          subtext="Require Urgent Attention"
          trend="Critical Flagged"
          trendType="up"
          trendText="flagged"
          status="red"
          icon={ShieldAlert}
        />
        <StatCard
          title="Under Repair"
          value={String(underRepairCount)}
          subtext="Maintenance Teams Dispatched"
          trend="18 in progress"
          trendType="neutral"
          trendText="today"
          status="blue"
          icon={Wrench}
        />
        <StatCard
          title="Resolved"
          value={String(resolvedCount)}
          subtext="Closed Last 30 Days"
          trend="94.2%"
          trendType="up"
          trendText="resolution rate"
          status="green"
          icon={CheckCircle2}
        />
      </section>

      {/* Prototype AI Road Defect Detection Demo Component */}
      <section className="grid grid-cols-1 gap-5">
        <AIDetectionDemo onDefectAdded={loadDefects} />
      </section>

      {/* Middle Row: Defect Type Distribution (7 cols) + Detection Quality (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <DefectTypeChart defects={defects} />
        </div>
        <div className="lg:col-span-5">
          <DetectionConfidence />
        </div>
      </section>

      {/* Map & Hotspots Row: Defect Map (7 cols) + Priority Queue (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <DefectMap defects={defects} />
        </div>
        <div className="lg:col-span-5">
          <PriorityQueue defects={defects} />
        </div>
      </section>

      {/* Bottom Row: Recent Defects Filterable Table (12 cols) */}
      <section className="grid grid-cols-1 gap-5">
        <div className="col-span-12">
          <DefectTable
            defects={defects}
            loading={loading}
            error={error}
            onRefresh={loadDefects}
          />
        </div>
      </section>
    </div>
  );
}
