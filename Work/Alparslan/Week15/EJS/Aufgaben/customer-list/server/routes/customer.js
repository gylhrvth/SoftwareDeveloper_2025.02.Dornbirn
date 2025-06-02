const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * Customer Routes
 */

// Kundenübersicht
router.get('/customer', customerController.homepage);
router.get('/add', customerController.addCustomer);

module.exports = router;

