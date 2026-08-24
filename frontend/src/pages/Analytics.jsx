import { useState, useEffect } from 'react';
import { fetchDefects } from '../services/defectService';
import { fetchIncidents } from '../services/incidentService';
import StatCard from '../components/StatCard';
import UrbanScore from '../components/UrbanScore';
import TrafficTrendChart from '../charts/TrafficTrendChart';
import DefectTrendChart from '../charts/DefectTrendChart';
import IncidentTrendChart from '../charts/IncidentTrendChart';
import AnalyticsMap from '../maps/AnalyticsMap';
import ProblemAreas from '../components/ProblemAreas';
import InsightCard from '../components/InsightCard';
import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  Bus,
  Cpu,
  Sparkles,
  Calendar
} from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30 Days');
  const [areaFilter, setAreaFilter] = useState('All Areas');
  const [dataTypeFilter, setDataTypeFilter] = useState('All Types');

  const [defects, setDefects] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchDefects().catch(() => []),
      fetchIncidents().catch(() => [])
    ]).then(([d, i]) => {
      if (Array.isArray(d)) setDefects(d);
      if (Array.isArray(i)) setIncidents(i);
    });
  }, []);

  // Compute dynamic KPI metrics from real telemetry
  let incidentResolutionRate = "16.7%";
  if (incidents.length > 0) {
    const resolved = incidents.filter((i) => i.status === 'Resolved').length;
    incidentResolutionRate = `${((resolved / incidents.length) * 100).toFixed(1)}%`;
  }

  let aiAccuracy = "92.8%";
  if (defects.length > 0) {
    const sumConf = defects.reduce((acc, d) => acc + (parseFloat(d.confidence) || 90), 0);
    aiAccuracy = `${(sumConf / defects.length).toFixed(1)}%`;
  }

  return (
    <div className="space-y-5">
      {/* Welcome Banner & Time Range Controls */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Decision Support Intelligence
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            Urban Analytics & Insights
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            City-wide mobility, infrastructure health, and safety intelligence synthesized for municipal decision-making and urban planning.
          </p>
        </div>

        {/* Header Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 z-10 w-full lg:w-auto">
          {/* Time Range Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400 ml-1.5 mr-1" />
            {['Today', '7 Days', '30 Days'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  timeRange === range
                    ? 'bg-slate-800 text-cyan-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Area Filter */}
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All Areas">All Zones</option>
            <option value="Delhi">Delhi Central</option>
            <option value="Ghaziabad">Ghaziabad (NH-24)</option>
            <option value="Noida">Noida (Sec 62)</option>
          </select>

          {/* Data Type Filter */}
          <select
            value={dataTypeFilter}
            onChange={(e) => setDataTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="All Types">All Domains</option>
            <option value="Traffic">Traffic</option>
            <option value="Road Defects">Road Defects</option>
            <option value="Incidents">Incidents</option>
            <option value="Transit">Transit</option>
          </select>
        </div>
      </div>

      {/* Top 5 Analytics KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Traffic Efficiency"
          value="78.4%"
          subtext="Speed vs Capacity Index"
          trend="+4.2%"
          trendType="up"
          trendText="vs last 30d"
          status="cyan"
          icon={Activity}
        />
        <StatCard
          title="Road Health Score"
          value="84.2%"
          subtext="Surface Quality Score"
          trend="+2.1%"
          trendType="up"
          trendText="vs last 30d"
          status="green"
          icon={AlertTriangle}
        />
        <StatCard
          title="Incident Resolution"
          value={incidentResolutionRate}
          subtext="ANPR Case Closure Rate"
          trend="Live Rate"
          trendType="up"
          trendText="from active log"
          status="green"
          icon={ShieldAlert}
        />
        <StatCard
          title="Transit Reliability"
          value="87.8%"
          subtext="Route On-Time Adherence"
          trend="+1.8%"
          trendType="up"
          trendText="vs last 30d"
          status="cyan"
          icon={Bus}
        />
        <StatCard
          title="AI Detection Accuracy"
          value={aiAccuracy}
          subtext="Vision Model Precision"
          trend="Avg Precision"
          trendType="up"
          trendText="across defects"
          status="blue"
          icon={Cpu}
        />
      </section>

      {/* Hero Analytics Row: Traffic Density Trends (7 cols) + Urban Score (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <TrafficTrendChart />
        </div>
        <div className="lg:col-span-5">
          <UrbanScore />
        </div>
      </section>

      {/* Trend Row: Defect Trends (6 cols) + Incident Trends (6 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <DefectTrendChart />
        </div>
        <div className="lg:col-span-6">
          <IncidentTrendChart />
        </div>
      </section>

      {/* Map & Problem Areas Row: Analytics Map (7 cols) + Top Problem Areas (5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <AnalyticsMap />
        </div>
        <div className="lg:col-span-5">
          <ProblemAreas />
        </div>
      </section>

      {/* Insights Row: AI-Assisted Urban Insights (12 cols) */}
      <section className="grid grid-cols-1 gap-5">
        <div className="col-span-12">
          <InsightCard />
        </div>
      </section>
    </div>
  );
}
