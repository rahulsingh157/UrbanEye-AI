const express = require('express');
const router = express.Router();
const { dashboardStats } = require('../data/mockData');

// GET /api/dashboard
router.get('/', (req, res) => {
  try {
    res.json(dashboardStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dashboard statistics' });
  }
});

module.exports = router;
