require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const logger = require('./config/logger');
const { testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { sendSuccess, sendError } = require('./helpers/response');

// Import Route Modules
const authRoutes = require('./routes/authRoutes');
const superadminRoutes = require('./routes/superadminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const staffRoutes = require('./routes/staffRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const masterRoutes = require('./routes/masterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP Request Logging
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

// Serve Uploads Directory Statistically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  return sendSuccess(res, 'Hospital Management System Backend is Online', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/superadmin', superadminRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/patient', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/masters', masterRoutes);

// 404 Route Handler for undefined endpoints
app.use('*', (req, res) => {
  return sendError(res, `API route '${req.originalUrl}' not found.`, 404);
});

// Centralized Global Error Handler Middleware
app.use(errorHandler);

// Boot Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    logger.info('========================================================');
    logger.info('🏥 HMS Backend Server running on http://localhost:%s', PORT);
    logger.info('🔗 API Base: http://localhost:%s/api/v1', PORT);
    logger.info('========================================================');

    // Test MySQL Connection
    await testConnection();
  });
}

module.exports = app;
