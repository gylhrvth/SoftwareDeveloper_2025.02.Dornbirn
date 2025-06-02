const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * Customer Routes
 */


router.get('/customer', customerController.homepage);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.post('/delete/:id', customerController.deleteCustomer);

module.exports = router;

