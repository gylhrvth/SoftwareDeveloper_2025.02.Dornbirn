let text = ""; // Globale Variable für den bereinigten Text
let words = []; // Globale Variable für die Wörter des Textes

// Funktion zur Analyse des Textes
function startAnalysis() {
    const feedback = document.getElementById("feedback");
    const initalText = document.getElementById("initalText").value;

    if (initalText.length < 20) {
        feedback.textContent = "Bitte geben Sie einen Text ein, der mindestens 20 Zeichen enthält.";
        return;
    }

    const clearSquareBracket = initalText.replace(/[^a-zA-ZäöüÄÖÜß ]/g, "");
    text = clearSquareBracket
        .replace(/\s+/g, " ")
        .replace(/^\s+/, "")
        .replace(/\s+$/, "");

    words = splitText(text); // Initialisiere die globale Variable `words`
    //console.log("Bereinigter Text:", text);
    startPrint(); // Ergebnisse anzeigen
}

// Funktion zum Aufteilen des Textes in Wörter
function splitText(text) {
    return text.split(" ");
}

// Funktion zur Anzeige der Ergebnisse
function startPrint() {
    const length = document.getElementById("length");
    const wordsFind = document.getElementById("wordsFind");
    const wordsLength = document.getElementById("wordsLength");
    const shortWord = document.getElementById("shortWord");
    const longWord = document.getElementById("longWord");
    const firstWord = document.getElementById("firstWord");
    const lastWord = document.getElementById("lastWord");
    const countMarie = document.getElementById("countMarie");

    length.textContent = text.length;
    wordsFind.textContent = words[0] + ", " + (words[4] || "N/A") + ", " + (words[19] || "N/A");
    wordsLength.textContent = words.length;
    shortWord.textContent = shortestWord(words);
    longWord.textContent = longestWord(words);
    firstWord.textContent = firstWordDE(words);
    lastWord.textContent = lastDEword(words);
    countMarie.textContent = marieCount(words);
}

// Funktion zur Ermittlung des kürzesten Wortes
function shortestWord(words) {
    let shortestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortestWord.length) {
            shortestWord = words[i];
        }
    }
    return shortestWord;
}

// Funktion zur Ermittlung des längsten Wortes
function longestWord(words) {
    let longestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }
    return longestWord;
}

// Funktion zur Ermittlung des ersten Wortes (alphabetisch)
function firstWordDE(words) {
    let firstDEword = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].localeCompare(firstDEword, "de") < 0) {
            firstDEword = words[i];
        }
    }
    return firstDEword;
}

// Funktion zur Ermittlung des letzten Wortes (alphabetisch)
function lastDEword(words) {
    // Filtere nur Wörter mit deutschen Buchstaben
    const germanWords = words.filter(word => /^[a-zA-ZäöüÄÖÜß]+$/.test(word));
    console.log(germanWords);

    if (germanWords.length === 0) {
        return "Keine deutschen Wörter gefunden";
    }

    let lastDEword = germanWords[0];
    for (let i = 1; i < germanWords.length; i++) {
        if (germanWords[i].localeCompare(lastDEword, "de") > 0) {
            lastDEword = germanWords[i];
            
        }
    }
    return lastDEword;
}

// Funktion zur Zählung des Wortes "Marie"
function marieCount(words) {
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase() === "marie") {
            count++;
        }
    }
    return count;
}

// Event-Listener für den Button
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("analysButton");
    button.addEventListener("click", startAnalysis);
});
