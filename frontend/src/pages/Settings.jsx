import { useState } from 'react';
import SettingToggle from '../components/SettingToggle';
import SystemStatus from '../components/SystemStatus';
import DangerZone from '../components/DangerZone';
import {
  Bell,
  Cpu,
  ShieldCheck,
  Activity,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Sliders
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // General Settings State
  const [general, setGeneral] = useState({
    platformName: 'UrbanEye AI',
    monitoringRegion: 'Delhi NCR',
    timeZone: 'IST (UTC +5:30)',
    defaultMap: 'CartoDB Dark',
    refreshInterval: '30 seconds'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    criticalIncidents: true,
    trafficCongestion: true,
    roadDefects: true,
    systemHealth: true,
    dailyAnalytics: false
  });

  // Detection Configuration State
  const [detection, setDetection] = useState({
    confidenceThreshold: '85%',
    humanVerification: true,
    autoCriticalAlert: true,
    defectDetection: true,
    incidentDetection: true,
    vehicleDetection: true
  });

  // Privacy & Security State
  const [privacy, setPrivacy] = useState({
    evidenceAccess: 'Authorized Personnel Only',
    anprData: 'Restricted',
    videoRetention: '30 Days',
    auditLogging: true,
    dataMasking: true
  });

  const handleSave = () => {
    setToastMessage('Settings saved locally.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleResetPreferences = () => {
    setGeneral({
      platformName: 'UrbanEye AI',
      monitoringRegion: 'Delhi NCR',
      timeZone: 'IST (UTC +5:30)',
      defaultMap: 'CartoDB Dark',
      refreshInterval: '30 seconds'
    });
    setNotifications({
      criticalIncidents: true,
      trafficCongestion: true,
      roadDefects: true,
      systemHealth: true,
      dailyAnalytics: false
    });
    setDetection({
      confidenceThreshold: '85%',
      humanVerification: true,
      autoCriticalAlert: true,
      defectDetection: true,
      incidentDetection: true,
      vehicleDetection: true
    });
    setPrivacy({
      evidenceAccess: 'Authorized Personnel Only',
      anprData: 'Restricted',
      videoRetention: '30 Days',
      auditLogging: true,
      dataMasking: true
    });
    setToastMessage('Preferences reset to default state.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleClearCache = () => {
    setToastMessage('Local cached session data cleared.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification Banner */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 border border-cyan-500/40 shadow-2xl rounded-xl p-3.5 flex items-center space-x-3 text-xs font-semibold text-white animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-5 lg:p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="h-3.5 w-3.5 mr-1" /> Local State Mode
            </span>
            <span className="text-xs font-medium text-slate-400">
              SIH 2026 • Urban Intelligence Platform
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
            System Settings & Administration
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            Configure sensing grid thresholds, notification preferences, AI confidence guardrails, privacy access policies, and system telemetry.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="z-10 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20 transition-all self-stretch sm:self-auto justify-center"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Globe },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'detection', label: 'AI Detection', icon: Cpu },
          { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
          { id: 'system', label: 'System Status', icon: Activity }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="space-y-5">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                General System Parameters
              </h3>
              <p className="text-[11px] text-slate-400">
                Core command-center region settings & map layout defaults
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Platform Name</label>
                <input
                  type="text"
                  value={general.platformName}
                  onChange={(e) => setGeneral({ ...general, platformName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Monitoring Region</label>
                <input
                  type="text"
                  value={general.monitoringRegion}
                  onChange={(e) => setGeneral({ ...general, monitoringRegion: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Time Zone</label>
                <select
                  value={general.timeZone}
                  onChange={(e) => setGeneral({ ...general, timeZone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="IST (UTC +5:30)">IST (UTC +5:30) - India Standard Time</option>
                  <option value="UTC">UTC - Universal Coordinated Time</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Default Map Tile Layer</label>
                <select
                  value={general.defaultMap}
                  onChange={(e) => setGeneral({ ...general, defaultMap: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="CartoDB Dark">CartoDB Dark Vector Tiles</option>
                  <option value="OpenStreetMap">OpenStreetMap Standard</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">Telemetry Data Refresh Interval</label>
                <select
                  value={general.refreshInterval}
                  onChange={(e) => setGeneral({ ...general, refreshInterval: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="15 seconds">15 seconds (High Frequency)</option>
                  <option value="30 seconds">30 seconds (Standard Grid Balance)</option>
                  <option value="60 seconds">60 seconds (Low Bandwidth)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Bell className="h-4 w-4 text-cyan-400" />
                Notification Preferences
              </h3>
              <p className="text-[11px] text-slate-400">
                Manage automated command-center sound & visual alert dispatch triggers
              </p>
            </div>

            <div className="space-y-3">
              <SettingToggle
                label="Critical Incident Alerts"
                description="Pop up immediate audio-visual alerts for hit-and-run and high-speed offender flags."
                enabled={notifications.criticalIncidents}
                onChange={(val) => setNotifications({ ...notifications, criticalIncidents: val })}
                badge="URGENT"
              />
              <SettingToggle
                label="Traffic Congestion Alerts"
                description="Notify command desk when corridor congestion index exceeds 85%."
                enabled={notifications.trafficCongestion}
                onChange={(val) => setNotifications({ ...notifications, trafficCongestion: val })}
              />
              <SettingToggle
                label="Road Defect Alerts"
                description="Receive instant alerts for severe potholes and infrastructure collapse hazards."
                enabled={notifications.roadDefects}
                onChange={(val) => setNotifications({ ...notifications, roadDefects: val })}
              />
              <SettingToggle
                label="System Health Alerts"
                description="Alert operators if mobile transit camera units or database services disconnect."
                enabled={notifications.systemHealth}
                onChange={(val) => setNotifications({ ...notifications, systemHealth: val })}
              />
              <SettingToggle
                label="Daily Analytics Summary Email"
                description="Receive automated 24-hour citywide mobility & infrastructure digest."
                enabled={notifications.dailyAnalytics}
                onChange={(val) => setNotifications({ ...notifications, dailyAnalytics: val })}
              />
            </div>
          </div>
        )}

        {/* AI Detection Tab */}
        {activeTab === 'detection' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 space-y-4">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  AI Vision & Detection Configuration
                </h3>
                <p className="text-[11px] text-slate-400">
                  Model confidence thresholds & edge detection pipeline settings
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                FUTURE BACKEND PLACEHOLDER
              </span>
            </div>

            <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <strong>Notice:</strong> These settings configure threshold parameters for future YOLO, ANPR, and OpenCV edge inference models.
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">
                    Minimum Detection Confidence Threshold
                  </label>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {detection.confidenceThreshold}
                  </span>
                </div>
                <select
                  value={detection.confidenceThreshold}
                  onChange={(e) => setDetection({ ...detection, confidenceThreshold: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="75%">75% (High Recall / More Detections)</option>
                  <option value="85%">85% (Balanced Threshold - Recommended)</option>
                  <option value="95%">95% (High Precision / Low False Positives)</option>
                </select>
              </div>

              <div className="space-y-3">
                <SettingToggle
                  label="Human Verification Required"
                  description="Require desk operator confirmation before auto-assigning work orders."
                  enabled={detection.humanVerification}
                  onChange={(val) => setDetection({ ...detection, humanVerification: val })}
                />
                <SettingToggle
                  label="Automatic Critical Alert Dispatch"
                  description="Auto-flag offending vehicles captured on 3+ consecutive camera frames."
                  enabled={detection.autoCriticalAlert}
                  onChange={(val) => setDetection({ ...detection, autoCriticalAlert: val })}
                />
                <SettingToggle
                  label="Road Defect Detection Model"
                  description="Enable active pothole and surface crack detection on transit routes."
                  enabled={detection.defectDetection}
                  onChange={(val) => setDetection({ ...detection, defectDetection: val })}
                />
                <SettingToggle
                  label="Incident Detection Model"
                  description="Enable crash, hit-and-run, and rash driving vision models."
                  enabled={detection.incidentDetection}
                  onChange={(val) => setDetection({ ...detection, incidentDetection: val })}
                />
                <SettingToggle
                  label="ANPR Vehicle Detection Model"
                  description="Enable license plate cropping & vehicle identification telemetry."
                  enabled={detection.vehicleDetection}
                  onChange={(val) => setDetection({ ...detection, vehicleDetection: val })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Privacy & Security Tab */}
        {activeTab === 'privacy' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Privacy & Security Compliance
              </h3>
              <p className="text-[11px] text-slate-400">
                Data access controls, ANPR data masking, and raw video retention rules
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-300">
              <Lock className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Sensitive incident and vehicle-identification data should only be accessible to authorized personnel to prevent unauthorized exposure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Evidence Access Control</label>
                <select
                  value={privacy.evidenceAccess}
                  onChange={(e) => setPrivacy({ ...privacy, evidenceAccess: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="Authorized Personnel Only">Authorized Personnel Only</option>
                  <option value="Command Desk Only">Command Desk Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">ANPR Data Restrictions</label>
                <select
                  value={privacy.anprData}
                  onChange={(e) => setPrivacy({ ...privacy, anprData: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="Restricted">Restricted (Masked Plates)</option>
                  <option value="Full Access">Full Access (Law Enforcement)</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">Raw Video Retention Policy</label>
                <select
                  value={privacy.videoRetention}
                  onChange={(e) => setPrivacy({ ...privacy, videoRetention: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="14 Days">14 Days Auto-Purge</option>
                  <option value="30 Days">30 Days Standard Retention</option>
                  <option value="60 Days">60 Days Extended Retention</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <SettingToggle
                label="Audit Logging"
                description="Record operator actions, evidence views, and export logs."
                enabled={privacy.auditLogging}
                onChange={(val) => setPrivacy({ ...privacy, auditLogging: val })}
              />
              <SettingToggle
                label="Automatic Passenger Face Masking"
                description="Automatically blur non-offender passenger faces in camera feeds."
                enabled={privacy.dataMasking}
                onChange={(val) => setPrivacy({ ...privacy, dataMasking: val })}
              />
            </div>
          </div>
        )}

        {/* System Status Tab */}
        {activeTab === 'system' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 shadow-md p-5">
            <SystemStatus />
          </div>
        )}

        {/* Danger Zone Section */}
        <DangerZone
          onReset={handleResetPreferences}
          onClearCache={handleClearCache}
        />
      </div>
    </div>
  );
}
