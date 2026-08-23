import StatCard from '../components/StatCard';
import CriticalIncident from '../components/CriticalIncident';
import VehicleEvidence from '../components/VehicleEvidence';
import IncidentMap from '../maps/IncidentMap';
import IncidentSeverityChart from '../charts/IncidentSeverityChart';
import IncidentTable from '../components/IncidentTable';
import {
  ShieldAlert,
  AlertTriangle,
  Car,
  Camera,
  CheckCircle2
} from 'lucide-react';

export default function Incidents() {
  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/30 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Incident Monitoring Active</span>
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            Safety Incidents & Incident Response
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            Real-time incident detection, ANPR vehicle number-plate identification, offender tracking, and emergency response dispatch monitoring.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 w-full md:w-auto">
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">ANPR Grid</p>
            <p className="text-sm font-bold text-cyan-400 font-mono">18 Tracked</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Critical Cases</p>
            <p className="text-sm font-bold text-red-400 font-mono">1 Active</p>
          </div>
        </div>
      </div>

      {/* Top 5 Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Active Incidents"
          value="3"
          subtext="Currently Monitored"
          trend="1 Critical"
          trendType="up"
          trendText="action needed"
          status="red"
          icon={ShieldAlert}
        />
        <StatCard
          title="Critical Alerts"
          value="1"
          subtext="Immediate Action Needed"
          trend="Hit-and-Run"
          trendType="up"
          trendText="UP16 AB 1234"
          status="red"
          icon={AlertTriangle}
        />
        <StatCard
          title="Hit-and-Run Cases"
          value="7"
          subtext="Tracked Offender Vehicles"
          trend="+2"
          trendType="up"
          trendText="today"
          status="amber"
          icon={Car}
        />
        <StatCard
          title="Vehicles Tracked"
          value="18"
          subtext="ANPR Active Grid"
          trend="93%"
          trendType="up"
          trendText="avg confidence"
          status="cyan"
          icon={Camera}
        />
        <StatCard
          title="Resolved Today"
          value="5"
          subtext="Case Files Closed"
          trend="100%"
          trendType="up"
          trendText="verified"
          status="green"
          icon={CheckCircle2}
        />
      </section>

      {/* Hero Row: Critical Incident Banner (8 cols) + ANPR Vehicle Evidence (4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <CriticalIncident />
        </div>
        <div className="lg:col-span-4">
          <VehicleEvidence />
        </div>
      </section>

      {/* Middle Row: Incident Map (7 cols) + Incident Severity & Response (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <IncidentMap />
        </div>
        <div className="lg:col-span-5">
          <IncidentSeverityChart />
        </div>
      </section>

      {/* Bottom Row: Recent Incidents Log Table (12 cols) */}
      <section className="grid grid-cols-1 gap-5">
        <div className="col-span-12">
          <IncidentTable />
        </div>
      </section>
    </div>
  );
}
