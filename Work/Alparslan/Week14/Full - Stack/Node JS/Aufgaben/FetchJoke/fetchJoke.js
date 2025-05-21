
async function fetchJoke(){
    try{
        const response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming')
        const data = await response.json();

        if (data.type === "single"){
            console.log("Witz:", data.joke);
        } else if (data.type === "twopart"){
            console.log("Frage:", data.setup);
            console.log("Antwort:", data.delivery);
        } else {
            console.log(data);
        }
    } catch (error){
        console.error('Fehler beim Laden der Daten:', error);
    }
}
    fetchJoke();

    // im Terminal: npm run dev





    

/* Obiger Code ist unten nochmals mit Kommentaren:

// 🧠 Definiert eine asynchrone Funktion namens 'fetchJoke'
// Diese Funktion ruft über das Internet einen Witz von einer API ab
async function fetchJoke() {
    try {
        // 🌐 Holt Daten von der JokeAPI über das Internet
        // Die URL ruft einen zufälligen Programmierwitz ab
        const response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming');

        // 📦 Wandelt die HTTP-Antwort in ein echtes JavaScript-Objekt um
        const data = await response.json();

        // 🔍 Prüft, ob der Witz einzeilig ist (Typ "single")
        if (data.type === "single") {
            // 🧾 Gibt den Witz direkt im Terminal aus
            console.log("Witz:", data.joke);

        // 📂 Prüft, ob der Witz zweiteilig ist (Typ "twopart")
        } else if (data.type === "twopart") {
            // ❓ Zeigt zuerst die Frage oder Setup-Zeile
            console.log("Frage:", data.setup);

            // 😂 Dann zeigt es die Auflösung oder Pointe
            console.log("Antwort:", data.delivery);

        // ⚠️ Wenn es ein unbekannter Typ ist, gib das ganze Datenobjekt aus
        } else {
            console.log(data);
        }

    // 🛑 Fehlerbehandlung, falls beim Abrufen oder Verarbeiten der Daten etwas schiefläuft
    } catch (error) {
        // 🧯 Gibt die Fehlermeldung im Terminal aus
        console.error('Fehler beim Laden der Daten:', error);
    }
}

// 🚀 Ruft die Funktion auf, damit sie ausgeführt wird
fetchJoke();

*/

// 💡 Hinweis (kein Code): Du startest dieses Skript im Terminal mit:
// npm run dev 
