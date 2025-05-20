

import fs from 'fs';
import path from 'path';
import os from 'os';

const startPfad = os.homedir();

function findeGroessteDatei(startVerzeichnis){
    let groessteDatei = { pfad: null, groesse: 0};

    function durchsuchen(verzeichnis){
        let eintraege;
        try{
            eintraege = fs.readdirSync(verzeichnis,{ withFileTypes: true });
        } catch (err) {
            return;
        }
        
        for(const eintrag of eintraege){
            const kompletterPfad = path.join(verzeichnis, eintrag.name);
            try {
                if (eintrag.isDirectory()){
                    durchsuchen(kompletterPfad);
                } else if (eintrag.isFile()){
                    const { size } = fs.statSync(kompletterPfad);  // Rekursion für Ordner
                    if (size > groessteDatei.groesse) {
                        groessteDatei = { pfad: kompletterPfad, groesse: size};
                    }
                }
            } catch {    // Ignorieren: z. B. Zugriffsfehler oder kaputte Symlinks
                        
            }
        }
    }

    durchsuchen(startVerzeichnis);
    return groessteDatei;
}

if (ergebnis.pfad) {
    console.log('📁 Größte Datei gefunden:');
    console.log(`🧾 Pfad:   ${ergebnis.pfad}`);
    console.log(`📏 Größe: ${(ergebnis.groesse / (1024 * 1024)).toFixed(2)} MB`);
} else {
    console.log('⚠️  Keine Datei gefunden oder Zugriff verweigert.');
}


