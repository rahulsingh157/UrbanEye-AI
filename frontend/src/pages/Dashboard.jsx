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
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
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
            <p className="text-sm font-bold text-cyan-400">444 Events</p>
          </div>
        </div>
      </div>

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
          value="427"
          subtext="12 High Priority"
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
          title="Safety Incidents"
          value="3"
          subtext="1 Critical Alert"
          trend="0"
          trendType="neutral"
          trendText="unassigned"
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
          <RecentAlerts />
        </div>
        <div className="lg:col-span-4">
          <SystemHealth />
        </div>
      </section>
    </div>
  );
}
