const express = require('express');
const multer = require('multer');
const router = express.Router();
const { analyzeImage } = require('../services/detectionService');

// Use memory storage for uploaded images in prototype mode
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/detect
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalName = req.file ? req.file.originalname : 'upload.jpg';

    // Call the isolated detection service
    const result = await analyzeImage(fileBuffer, originalName);

    res.status(200).json(result);
  } catch (error) {
    console.error('Detection service error:', error);
    res.status(500).json({ error: 'Detection service unavailable.' });
  }
});

module.exports = router;
