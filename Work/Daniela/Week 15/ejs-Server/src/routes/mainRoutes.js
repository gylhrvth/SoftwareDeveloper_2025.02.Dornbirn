const express = require('express');
const router = express.Router();        //Router-Objekt von express erstellen 

//Startseite - rendert index.ejs mit Variablen 
router.get('/', (req, res) =>{
    res.render('index', {title: 'EJS-Daniela', title2: 'Startseite'});
});

//versuch-Seite für Button 
router.get('/versuch', (req, res) => {
  res.render('versuch', { title3: 'Versuch' });
});

//Help-Site
router.get('/help', (req, res) => {
  res.render('help', { title4: 'Help yourselfe' });
});

// Admin-Ansicht, zeigt alle abgeschickten Kontaktformulare
const { getKontaktDaten } = require('../controllers/kontaktController');
router.get('/admin', (req, res) => {
  const daten = getKontaktDaten(); // Holt gespeicherte Daten
  res.render('admin', { daten });
});

module.exports = router;