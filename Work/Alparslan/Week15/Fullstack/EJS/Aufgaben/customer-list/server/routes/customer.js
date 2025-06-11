const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * Customer Routes
 */

// Kundenübersicht (Hauptseite für /customer)
router.get('/', customerController.homepage);

// Formular für neuen Kunden
router.get('/add', customerController.addCustomer);

router.post('/add', customerController.createCustomer);




module.exports = router;
