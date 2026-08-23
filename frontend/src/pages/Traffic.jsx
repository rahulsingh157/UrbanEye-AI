import StatCard from '../components/StatCard';
import TrafficDensityChart from '../charts/TrafficDensityChart';
import VehicleCompositionChart from '../charts/VehicleCompositionChart';
import TrafficMap from '../maps/TrafficMap';
import CongestionTable from '../components/CongestionTable';
import RoutePerformance from '../components/RoutePerformance';
import TrafficAlerts from '../components/TrafficAlerts';
import {
  Car,
  Activity,
  AlertTriangle,
  Gauge,
  Route,
  Sparkles
} from 'lucide-react';

export default function Traffic() {
  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-3 w-3 mr-1" /> Mobile Sensing Telemetry
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            Traffic Intelligence & Mobility Telemetry
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            Real-time urban traffic density monitoring, vehicle type classification, congestion bottleneck analysis, and transit route delay tracking.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 w-full md:w-auto">
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Citywide Speed</p>
            <p className="text-sm font-bold text-emerald-400 font-mono">31.0 km/h</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-right flex-1 md:flex-initial">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Monitored Flow</p>
            <p className="text-sm font-bold text-cyan-400 font-mono">12,482 Vehicles</p>
          </div>
        </div>
      </div>

      {/* Top 5 Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Current Traffic Density"
          value="72%"
          subtext="Heavy Traffic Flow"
          trend="+4.2%"
          trendType="up"
          trendText="vs 1 hr ago"
          status="amber"
          icon={Activity}
        />
        <StatCard
          title="Vehicles Detected"
          value="12,482"
          subtext="128 Transit Units"
          trend="+8.4%"
          trendType="up"
          trendText="today"
          status="cyan"
          icon={Car}
        />
        <StatCard
          title="Congested Zones"
          value="14"
          subtext="3 Critical Bottlenecks"
          trend="+2"
          trendType="up"
          trendText="vs prev hr"
          status="red"
          icon={AlertTriangle}
        />
        <StatCard
          title="Average Transit Speed"
          value="31 km/h"
          subtext="Target: 35 km/h"
          trend="-4.2%"
          trendType="down"
          trendText="during rush"
          status="amber"
          icon={Gauge}
        />
        <StatCard
          title="Active Routes"
          value="86"
          subtext="78% Normal Flow"
          trend="92.4%"
          trendType="up"
          trendText="on time"
          status="green"
          icon={Route}
        />
      </section>

      {/* Middle Row: Diurnal Density (7 cols) + Vehicle Composition (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <TrafficDensityChart />
        </div>
        <div className="lg:col-span-5">
          <VehicleCompositionChart />
        </div>
      </section>

      {/* Map & Hotspots Row: Traffic Map (7 cols) + Hotspots Table (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <TrafficMap />
        </div>
        <div className="lg:col-span-5">
          <CongestionTable />
        </div>
      </section>

      {/* Bottom Row: Route Performance (7 cols) + Traffic Alerts (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <RoutePerformance />
        </div>
        <div className="lg:col-span-5">
          <TrafficAlerts />
        </div>
      </section>
    </div>
  );
}
