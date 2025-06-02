const express = require('express');
const router = express.Router();
const kontaktController = require('../controllers/kontaktController');

//Zeigt das Kontaktformular an 
router.get('/', (req, res) => {
    res.render('kontakt', {title4: 'Kontakt'});
});

//Verarbeitet die Formular-Daten (POST)
router.post('/', kontaktController.handlePost);

module.exports = router;