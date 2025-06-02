// Zwischenspeicher für Kontaktformular-Daten (nur im RAM)
const kontaktDaten = [];

// POST-Anfrage vom Kontaktformular wird hier verarbeitet
function handlePost(req, res) {
  const formData = req.body;              // Holt Daten aus dem Formular
  kontaktDaten.push(formData);            // Speichert sie im Array
  console.log('📥 Neue Nachricht:', formData);
  res.redirect('/');                      // Nach dem Absenden zurück zur Startseite
}

// Gibt die gesammelten Daten zurück (für Admin-Seite)
function getKontaktDaten() {
  return kontaktDaten;
}

module.exports = {
  handlePost,
  getKontaktDaten
};
