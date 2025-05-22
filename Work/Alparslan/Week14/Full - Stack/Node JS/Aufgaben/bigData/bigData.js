// 📦 Importieren von eingebauten Node.js-Modulen
import fs from 'fs';              // Modul für Dateioperationen
import path from 'path';          // Modul zur Arbeit mit Dateipfaden
import os from 'os';              // Modul für Betriebssysteminformationen

// 🏠 Bestimme das Home-Verzeichnis des aktuellen Benutzers
const startPfad = os.homedir();   // z. B. /home/user oder C:\Users\Name

/**
 * 🔍 Durchsucht ein Verzeichnis (rekursiv) und findet die größte Datei.
 * @param {string} startVerzeichnis - Startpunkt für die Suche
 * @returns {{ pfad: string | null, groesse: number }} - Pfad & Größe der größten Datei
 */
function findeGroessteDatei(startVerzeichnis) {
    // Objekt zur Speicherung der bisher größten Datei
    let groessteDatei = { pfad: null, groesse: 0 };

    /**
     * 🔄 Interne Hilfsfunktion: durchsucht ein einzelnes Verzeichnis rekursiv
     * @param {string} verzeichnis - Der aktuell zu untersuchende Ordner
     */
    function durchsuchen(verzeichnis) {
        let eintraege;

        try {
            // Liest alle Einträge im Verzeichnis synchron aus (mit Typinformationen)
            eintraege = fs.readdirSync(verzeichnis, { withFileTypes: true });
        } catch (err) {
            // Fehler beim Lesen (z. B. keine Berechtigung) → überspringen
            return;
        }

        // Durchlaufen aller Einträge (Dateien oder Unterordner)
        for (const eintrag of eintraege) {
            // Erstelle absoluten Pfad zur Datei oder Ordner
            const kompletterPfad = path.join(verzeichnis, eintrag.name);

            try {
                if (eintrag.isDirectory()) {
                    // Wenn es ein Ordner ist: rekursiv weiter durchsuchen
                    durchsuchen(kompletterPfad);
                } else if (eintrag.isFile()) {
                    // Wenn es eine Datei ist: Größe ermitteln
                    const { size } = fs.statSync(kompletterPfad);

                    // Wenn Datei größer als bisher gefundene → speichern
                    if (size > groessteDatei.groesse) {
                        groessteDatei = { pfad: kompletterPfad, groesse: size };
                    }
                }
            } catch {
                // Fehler beim Zugriff auf einzelne Datei → ignorieren
            }
        }
    }

    // Starte die Durchsuchung mit dem übergebenen Startverzeichnis
    durchsuchen(startVerzeichnis);

    // Rückgabe der größten Datei
    return groessteDatei;
}

// 🧾 Suche starten & Ergebnis speichern
const ergebnis = findeGroessteDatei(startPfad);

// 📢 Ausgabe je nach Erfolg oder Misserfolg
if (ergebnis.pfad) {
    console.log('📁 Größte Datei gefunden:');
    console.log(`🧾 Pfad:   ${ergebnis.pfad}`);
    console.log(`📏 Größe: ${(ergebnis.groesse / (1024 * 1024)).toFixed(2)} MB`);
} else {
    console.log('⚠️  Keine Datei gefunden oder Zugriff verweigert.');
}


