const express = require('express');
const router = express.Router();
const { getHealth, getWelcome } = require('../controllers/apiController');

// API Routes
router.get('/', getWelcome);
router.get('/health', getHealth);

module.exports = router;
