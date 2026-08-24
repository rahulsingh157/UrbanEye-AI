import { useState, useEffect, useCallback } from 'react';
import { fetchDefects } from '../services/defectService';
import { fetchIncidents } from '../services/incidentService';
import StatCard from '../components/StatCard';
import CityMap from '../maps/CityMap';
import TrafficOverview from '../charts/TrafficOverview';
import RecentAlerts from '../components/RecentAlerts';
import SystemHealth from '../components/SystemHealth';
import {
  Bus,
  AlertTriangle,
  Car,
  ShieldAlert,
  MapPin,
  Sparkles,
  RotateCw,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [defects, setDefects] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [defectsData, incidentsData] = await Promise.all([
        fetchDefects().catch(() => null),
        fetchIncidents().catch(() => null)
      ]);

      let hasSuccess = false;

      if (defectsData && Array.isArray(defectsData)) {
        setDefects(defectsData);
        hasSuccess = true;
      }
      if (incidentsData && Array.isArray(incidentsData)) {
        setIncidents(incidentsData);
        hasSuccess = true;
      }

      if (!hasSuccess) {
        setError('Backend service unreachable. Displaying cached local telemetry & fallback records.');
        setIsOffline(true);
      } else {
        setIsOffline(false);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Backend service unreachable. Displaying cached local telemetry & fallback records.');
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Dynamic calculations with fallback defaults
  const totalDefectsCount = defects.length > 0 ? defects.length : 427;
  const highPriorityDefectsCount = defects.length > 0
    ? defects.filter(d => d.severity === 'Critical' || d.severity === 'High').length
    : 12;

  const activeIncidentsCount = incidents.length > 0
    ? incidents.filter(i => i.status !== 'Resolved').length
    : 3;
  const criticalIncidentsCount = incidents.length > 0
    ? incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length
    : 1;

  const totalAnomaliesCount = (defects.length > 0 || incidents.length > 0)
    ? (defects.length + incidents.length)
    : 444;

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-3 w-3 mr-1" /> Mobile Transit Vision Unit
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            City Transit Sensing & Urban Intelligence Command
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            Live surveillance data synthesized from onboard bus camera units, tracking road hazards, surface defects, traffic bottlenecks, and safety incidents across city routes.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 w-full md:w-auto">
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Active Sensing Grid</p>
            <p className="text-sm font-bold text-emerald-400">96.8% Operational</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Anomalies</p>
            <p className="text-sm font-bold text-cyan-400">{totalAnomaliesCount} Events</p>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-50"
            title="Refresh dashboard statistics"
          >
            <RotateCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Prominent Offline / Demo Mode Indicator */}
      {isOffline && (
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
            onClick={loadDashboardData}
            className="px-3 py-1 bg-amber-900 hover:bg-amber-800 border border-amber-600 rounded text-amber-100 font-semibold transition-colors flex-shrink-0 text-xs shadow-xs"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Top 5 Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Active Buses"
          value="128"
          subtext="135 Total Fleet"
          trend="+8.4%"
          trendType="up"
          trendText="today"
          status="cyan"
          icon={Bus}
        />
        <StatCard
          title="Road Defects Detected"
          value={String(totalDefectsCount)}
          subtext={`${highPriorityDefectsCount} High Priority`}
          trend="+14"
          trendType="up"
          trendText="today"
          status="amber"
          icon={AlertTriangle}
        />
        <StatCard
          title="Traffic Alerts"
          value="14"
          subtext="3 Heavy Congestion"
          trend="-2"
          trendType="down"
          trendText="vs last hr"
          status="amber"
          icon={Car}
        />
        <StatCard
          title="Active Safety Incidents"
          value={String(activeIncidentsCount)}
          subtext={`${criticalIncidentsCount} Critical • ${incidents.length > 0 ? incidents.length : 6} Total Logged`}
          trend="Action Needed"
          trendType="up"
          trendText="live grid"
          status="red"
          icon={ShieldAlert}
        />
        <StatCard
          title="Roads Monitored"
          value="342 km"
          subtext="94.2% Coverage"
          trend="+18 km"
          trendType="up"
          trendText="today"
          status="green"
          icon={MapPin}
        />
      </section>

      {/* Middle Grid: Map (7 cols) + Traffic Analytics (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <CityMap />
        </div>
        <div className="lg:col-span-5">
          <TrafficOverview />
        </div>
      </section>

      {/* Bottom Grid: Recent Alerts Table (8 cols) + System Health (4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <RecentAlerts defects={defects} incidents={incidents} />
        </div>
        <div className="lg:col-span-4">
          <SystemHealth />
        </div>
      </section>
    </div>
  );
}
