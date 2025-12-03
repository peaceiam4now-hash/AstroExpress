require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  app: {
    name: process.env.APP_NAME || 'AstroExpress',
    version: process.env.APP_VERSION || '1.0.0',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'dev',
  },
};
