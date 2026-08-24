const dashboardStats = {
  activeBuses: 128,
  roadDefects: 427,
  trafficAlerts: 14,
  safetyIncidents: 3,
  roadsMonitored: 342
};

const defects = [
  {
    id: "DEF-1001",
    type: "Pothole",
    location: "NH-24 near Sector 62 Flyover, Noida",
    latitude: 28.6280,
    longitude: 77.3649,
    severity: "High",
    confidence: "94%",
    busId: "BUS-102",
    timestamp: "2026-08-24T08:30:00Z",
    status: "New"
  },
  {
    id: "DEF-1002",
    type: "Damaged Surface",
    location: "GT Road near Link Road Intersection",
    latitude: 28.6692,
    longitude: 77.4538,
    severity: "Medium",
    confidence: "91%",
    busId: "BUS-114",
    timestamp: "2026-08-24T09:15:00Z",
    status: "Verified"
  },
  {
    id: "DEF-1003",
    type: "Missing Divider",
    location: "Ring Road near AIIMS Flyover",
    latitude: 28.5672,
    longitude: 77.2100,
    severity: "Critical",
    confidence: "97%",
    busId: "BUS-108",
    timestamp: "2026-08-24T09:45:00Z",
    status: "Assigned"
  },
  {
    id: "DEF-1004",
    type: "Damaged Sign",
    location: "Vikas Marg, Laxmi Nagar",
    latitude: 28.6304,
    longitude: 77.2774,
    severity: "Low",
    confidence: "88%",
    busId: "BUS-120",
    timestamp: "2026-08-24T10:05:00Z",
    status: "Under Repair"
  },
  {
    id: "DEF-1005",
    type: "Waterlogging",
    location: "Minto Road Underpass",
    latitude: 28.6328,
    longitude: 77.2201,
    severity: "High",
    confidence: "96%",
    busId: "BUS-105",
    timestamp: "2026-08-24T10:30:00Z",
    status: "New"
  },
  {
    id: "DEF-1006",
    type: "Missing Crossing",
    location: "Outer Ring Road, Nehru Place",
    latitude: 28.5494,
    longitude: 77.2528,
    severity: "Medium",
    confidence: "90%",
    busId: "BUS-111",
    timestamp: "2026-08-24T11:00:00Z",
    status: "Verified"
  },
  {
    id: "DEF-1007",
    type: "Pothole",
    location: "MG Road near IFFCO Chowk",
    latitude: 28.4720,
    longitude: 77.0726,
    severity: "High",
    confidence: "93%",
    busId: "BUS-133",
    timestamp: "2026-08-24T11:25:00Z",
    status: "New"
  },
  {
    id: "DEF-1008",
    type: "Damaged Surface",
    location: "Mathura Road, Badarpur Border",
    latitude: 28.5039,
    longitude: 77.3045,
    severity: "Medium",
    confidence: "89%",
    busId: "BUS-127",
    timestamp: "2026-08-24T11:50:00Z",
    status: "Resolved"
  }
];

const incidents = [
  {
    id: "INC-1001",
    type: "Hit-and-Run",
    location: "NH-24 Corridor, Ghaziabad",
    latitude: 28.6315,
    longitude: 77.2167,
    vehicleNumber: "UP16 AB 1234",
    vehiclePlate: "UP16 AB 1234",
    confidence: "93%",
    severity: "Critical",
    status: "Active",
    assignedUnit: null,
    timestamp: "2026-08-24T08:45:00Z"
  },
  {
    id: "INC-1002",
    type: "Traffic Collision",
    location: "DND Flyway, Toll Plaza",
    latitude: 28.5833,
    longitude: 77.2625,
    vehicleNumber: "UP-16-XY-9876",
    vehiclePlate: "UP16 XY 9876",
    confidence: "98%",
    severity: "High",
    status: "Active",
    assignedUnit: null,
    timestamp: "2026-08-24T09:20:00Z"
  },
  {
    id: "INC-1003",
    type: "Suspicious Vehicle",
    location: "Airport Road Expressway",
    latitude: 28.5562,
    longitude: 77.1000,
    vehicleNumber: "HR-26-CZ-5544",
    vehiclePlate: "HR26 CZ 5544",
    confidence: "87%",
    severity: "Medium",
    status: "Assigned",
    assignedUnit: "UNIT-02",
    timestamp: "2026-08-24T10:10:00Z"
  },
  {
    id: "INC-1004",
    type: "Road Safety Incident",
    location: "Mehrauli-Gurgaon Road, Chattarpur",
    latitude: 28.5060,
    longitude: 77.1750,
    vehicleNumber: "DL-04-CD-7890",
    vehiclePlate: "DL04 CD 7890",
    confidence: "92%",
    severity: "Medium",
    status: "Resolved",
    assignedUnit: "UNIT-03",
    timestamp: "2026-08-24T10:40:00Z"
  },
  {
    id: "INC-1005",
    type: "Traffic Collision",
    location: "Grand Trunk Road, Shahdara",
    latitude: 28.6730,
    longitude: 77.2890,
    vehicleNumber: "DL-08-EF-4321",
    vehiclePlate: "DL08 EF 4321",
    confidence: "94%",
    severity: "High",
    status: "Active",
    assignedUnit: null,
    timestamp: "2026-08-24T11:15:00Z"
  }
];

module.exports = {
  dashboardStats,
  defects,
  incidents
};
