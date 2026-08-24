const express = require('express');
const router = express.Router();
const { defects } = require('../data/mockData');

// GET /api/defects
router.get('/', (req, res) => {
  try {
    res.json(defects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve road defects' });
  }
});

// POST /api/defects
router.post('/', (req, res) => {
  try {
    const newDefect = req.body;

    if (!newDefect || typeof newDefect !== 'object') {
      return res.status(400).json({ error: 'Invalid defect data payload' });
    }

    const confidenceVal = typeof newDefect.confidence === 'number'
      ? `${newDefect.confidence}%`
      : (newDefect.confidence || '90%');

    const createdDefect = {
      id: newDefect.id || `DEF-${1000 + defects.length + 1}`,
      type: newDefect.type || 'Pothole',
      location: newDefect.location || 'Unknown Location',
      latitude: newDefect.latitude !== undefined ? Number(newDefect.latitude) : 28.6139,
      longitude: newDefect.longitude !== undefined ? Number(newDefect.longitude) : 77.2090,
      severity: newDefect.severity || 'Medium',
      confidence: confidenceVal,
      busId: newDefect.busId || 'BUS-100',
      timestamp: newDefect.timestamp || new Date().toISOString(),
      status: newDefect.status || 'New'
    };

    defects.push(createdDefect);
    res.status(201).json(createdDefect);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create road defect record' });
  }
});

module.exports = router;
