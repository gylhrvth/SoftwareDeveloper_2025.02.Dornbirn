const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * Customer Routes
 */

router.get('/customer', (req, res) => {
  res.render('customer/index', {
    title: 'Kunden',
    description: 'Alle Kunden im Überblick'
  });
});

module.exports = router;

