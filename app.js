const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const admissionsRoutes = require('./routes/admissionsRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Logging
app.use(morgan('dev'));

// Body Parser
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/admissions', admissionsRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler (must be registered after routes)
app.use(errorHandler);

module.exports = app;
