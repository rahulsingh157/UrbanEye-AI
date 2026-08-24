const express = require('express');
const router = express.Router();
const { incidents } = require('../data/mockData');

// GET /api/incidents
router.get('/', (req, res) => {
  try {
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve incident records' });
  }
});

// POST /api/incidents
router.post('/', (req, res) => {
  try {
    const newIncident = req.body;

    if (!newIncident || typeof newIncident !== 'object') {
      return res.status(400).json({ error: 'Invalid incident data payload' });
    }

    const createdIncident = {
      id: newIncident.id || `INC-${1000 + incidents.length + 1}`,
      type: newIncident.type || 'Road Safety Incident',
      location: newIncident.location || 'Unknown Location',
      latitude: newIncident.latitude !== undefined ? Number(newIncident.latitude) : 28.6139,
      longitude: newIncident.longitude !== undefined ? Number(newIncident.longitude) : 77.2090,
      vehicleNumber: newIncident.vehicleNumber || newIncident.vehiclePlate || 'DL-01-XX-0000',
      vehiclePlate: newIncident.vehiclePlate || newIncident.vehicleNumber || 'DL-01-XX-0000',
      confidence: newIncident.confidence || '90%',
      severity: newIncident.severity || 'Medium',
      status: newIncident.status || 'Active',
      assignedUnit: newIncident.assignedUnit || null,
      timestamp: newIncident.timestamp || new Date().toISOString()
    };

    incidents.push(createdIncident);
    res.status(201).json(createdIncident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incident record' });
  }
});

// PATCH /api/incidents/:id
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedUnit } = req.body;

    const incident = incidents.find((item) => item.id === id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    if (status !== undefined) {
      incident.status = status;
    }
    if (assignedUnit !== undefined) {
      incident.assignedUnit = assignedUnit;
    }

    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update incident record' });
  }
});

module.exports = router;
