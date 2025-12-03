const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const apiRoutes = require('./routes/api');
const indexRoutes = require('./routes/index');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: config.cors.origin,
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════╗
    ║                                           ║
    ║   🚀 ${config.app.name} Server Started 🚀   ║
    ║                                           ║
    ║   Environment: ${config.nodeEnv.padEnd(24)} ║
    ║   Port: ${PORT.toString().padEnd(32)} ║
    ║   Version: ${config.app.version.padEnd(29)} ║
    ║                                           ║
    ║   Server URL: http://localhost:${PORT}      ║
    ║   API URL: http://localhost:${PORT}/api    ║
    ║   Health: http://localhost:${PORT}/api/health ║
    ║                                           ║
    ╚═══════════════════════════════════════════╝
  `);
});

module.exports = app;
