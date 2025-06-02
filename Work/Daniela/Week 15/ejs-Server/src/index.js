
require('dotenv').config();           // Lädt Umgebungsvariablen aus der .env-Datei ins process.env Objekt

const express = require('express');   // Importiert das Express-Framework
const path = require('path');         // Importiert das path-Modul für Pfad-Operationen
/*
path-Modul 
Was ist das path-Modul?
path ist ein integriertes Node.js-Modul (du musst es nicht extra installieren).

Es hilft dir, Datei- und Verzeichnis-Pfade plattformübergreifend richtig zu erstellen und zu verarbeiten.
Denn Windows benutzt z.B. Backslashes \ in Pfaden, Linux/Mac aber Slashes /.
path sorgt dafür, dass dein Code überall richtig mit Pfaden funktioniert, ohne dass du dich darum kümmern musst.
*/
const app = express();                // Erstellt eine Express-App (Server-Instanz)
const PORT = process.env.PORT || 3333; // Definiert den Server-Port, aus .env oder Standard 3333

// Macht den Ordner 'public' für statische Dateien (CSS, JS, Bilder) zugänglich
app.use(express.static(path.join(__dirname, 'public')));

// Aktiviert das Auslesen von URL-kodierten Daten aus HTML-Formularen (POST-Requests)
app.use(express.urlencoded({ extended: true }));

// Setzt EJS als Template Engine für das Rendern von Views (HTML mit Variablen)
app.set('view engine', 'ejs');
//Du sagst dem Express-Server: "Ich will EJS benutzen, um HTML-Seiten dynamisch zu rendern."

// Gibt den Pfad zum Ordner 'views' an, wo die EJS-Dateien liegen
app.set('views', path.join(__dirname, '..', 'views'));


// Importiere und verwende externe Routen
const mainRoutes = require('./routes/mainRoutes');
const kontaktRoutes = require('./routes/kontaktRoutes');

app.use('/', mainRoutes);
app.use('/kontakt', kontaktRoutes);

//404 kommt immer zuletzt!
//Express prüft Routen von oben nach unten.
// Middleware für alle nicht gefundenen Routen (404 Fehlerseite)
app.use((_req, res) => {
    res.status(404).render('404', { title: 'Seite nicht gefunden' }); // Rendert '404.ejs' mit Status 404
});

// Startet den Server und hört auf dem definierten PORT
app.listen(PORT, () => {
    console.log(`✅ Server läuft auf http://localhost:${PORT}`); // Ausgabe im Terminal zur Bestätigung
});
