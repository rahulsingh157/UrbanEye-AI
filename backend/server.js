const express = require('express');
const cors = require('cors');

const dashboardRouter = require('./routes/dashboard');
const defectsRouter = require('./routes/defects');
const incidentsRouter = require('./routes/incidents');
const detectRouter = require('./routes/detect');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parser with error handling for malformed JSON
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'UrbanEye AI Backend'
  });
});

// Routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/defects', defectsRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/detect', detectRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global JSON Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`UrbanEye AI Backend running on http://localhost:${PORT}`);
});
