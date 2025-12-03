const config = require('../config');

// @desc    Get API status
// @route   GET /api/health
// @access  Public
const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    data: {
      appName: config.app.name,
      version: config.app.version,
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
    },
  });
};

// @desc    Get welcome message
// @route   GET /api
// @access  Public
const getWelcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to ${config.app.name} API`,
    data: {
      version: config.app.version,
      endpoints: {
        health: '/api/health',
        docs: '/api/docs',
      },
    },
  });
};

module.exports = {
  getHealth,
  getWelcome,
};
