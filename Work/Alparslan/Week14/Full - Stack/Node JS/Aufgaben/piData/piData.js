 //Version 1 mit 10 Kommastellen
 /*
 // generate-pi modul verwenden 

import pi from 'generate-pi';

// PI(π) mit 'n' Nachkommastellen ermitteln

// PI(π) mit 10 Nachkommastellen bestimmen
const piString = pi.get(10);
// 3.1415926535

console.log("pi mit 10 Nachkomastellen");
console.log(piString);

// Terminal: npm run dev
*/








//Version 2, User gibt an wieviel Kommastellen


// 📦 Import des generate-pi-Moduls
import pi from 'generate-pi';

// 📥 Import von Node.js-eigenem Modul für Benutzereingaben
import readline from 'readline';

// 🧠 Funktion zur Eingabeaufforderung im Terminal
function frage(nachricht) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(nachricht, (antwort) => {
            rl.close();
            resolve(antwort);
        });
    });
}

// 🚀 Hauptfunktion: fragt Benutzer, zeigt PI
async function run() {
    try {
        // 🗣 Eingabeaufforderung im Terminal
        const eingabe = await frage("Wie viele Nachkommastellen von PI willst du? ");

        // 🔢 Umwandlung der Eingabe in eine Ganzzahl
        const nachkommastellen = parseInt(eingabe, 10);

        // ❗ Fehlerprüfung: ist es eine gültige Zahl?
        if (isNaN(nachkommastellen) || nachkommastellen < 0) {
            console.log("❌ Bitte gib eine gültige, nicht-negative Zahl ein.");
            return;
        }

        // 🧮 PI berechnen mit gewünschter Stellenanzahl
        const piString = pi.get(nachkommastellen);

        // 📤 Ausgabe im Terminal
        console.log(`\nPI mit ${nachkommastellen} Nachkommastellen:`);
        console.log(piString);
    } catch (error) {
        console.error("⚠️ Fehler:", error.message);
    }
}

// 📞 Funktion ausführen
run();


// Terminal npm run dev
