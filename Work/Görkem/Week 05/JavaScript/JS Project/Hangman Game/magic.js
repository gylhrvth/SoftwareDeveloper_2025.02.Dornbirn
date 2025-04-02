
const fruits = ['Apfel', 'Banane', 'Kirsche', 'Traube', 'Kiwi', 'Zitrone', 'Mango', 'Orange', 'Papaya', 'Himbeere', 'Erdbeere', 'Wassermelone'];

let randomWord = "";
let wordLetters = [];
let gameActive = false;
let wrongGuesses = 0;
const maxGuesses = 7;

const hints = {
    Apfel: ['Es ist eine rote Frucht', 'Beginnt mit "A"'],
    Banane: ['Es ist eine gelbe Frucht', 'Beginnt mit "B"'],
    Kirsche: ['Es handelt sich um eine kleine, runde Frucht', 'Beginnt mit "K"'],
    Traube: ['Es ist eine kleine Frucht, die in Trauben wächst', 'Beginnt mit "T"'],
    Kiwi: ['Es ist eine braune Frucht mit grünem Inneren', 'Beginnt mit "K"'],
    Zitrone: ['Es ist eine gelbe, saure Frucht', 'Beginnt mit "Z"'],
    Mango: ['Es ist eine tropische Frucht', 'Beginnt mit "M"'],
    Orange: ['Es ist eine Zitrusfrucht', 'Beginnt mit "O"'],
    Papaya: ['Es ist eine tropische Frucht', 'Beginnt mit "P"'],
    Himbeere: ['Es handelt sich um eine rote Beere', 'Beginnt mit "H"'],
    Erdbeere: ['Es ist eine süße, rote Frucht', 'Beginnt mit "E"'],
    Wassermelone: ['Es ist eine große Frucht, die viel Wasser enthält', 'Beginnt mit "W"']
};

// Startet das Spiel, wenn der "Start Game"-Button geklickt wird


function startGame() {
    resetButtons();
    resetWordBox();

    for (let i = 0; i < maxGuesses; i++) {
        document.getElementById(`hangman-${i}`).style.display = 'none';
    }

    const lastAttemptMessage = document.getElementById("last-attempt");
    if (lastAttemptMessage) {
        lastAttemptMessage.classList.add("hidden"); // Versteckt es wieder
        lastAttemptMessage.classList.remove("visible"); 
    }

    const hintContainer = document.getElementById("hint");
    hintContainer.classList.remove("visible");
    hintContainer.textContent = "";

    gameActive = true;
    wrongGuesses = 0;
    updateWrongGuesses();

    randomWord = randomWordSelector(fruits);
    wordLetters = letterSplitter(randomWord);

    console.log("StartGame - Random Word: " + randomWord);

    generateWordList(randomWord);
}

// Wählt zufällig ein Wort aus der Liste der Früchte
function randomWordSelector(randomArray) {
    let index = Math.floor(Math.random() * randomArray.length);
    return randomArray[index];
}

// Teilt das Wort in Buchstaben auf
function letterSplitter(word) {
    return word.split("");
}

// Generiert die Darstellung des gesuchten Wortes
function generateWordList(word) {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = ""; 

    for (let i = 0; i < word.length; i++) {
        const li = document.createElement("li");
        li.textContent = "_";
        wordList.appendChild(li);
    }
}

function updateHangmanImage() {
    // Zuerst alle Bilder ausblenden
    for (let i = 0; i < maxGuesses; i++) {
        const image = document.getElementById(`hangman-${i}`);
        image.style.display = 'none'; // Alle Bilder ausblenden
    }

    // Das erste Bild (Galgen mit Seil) beim ersten Fehlversuch anzeigen
    if (wrongGuesses >= 1) {
        document.getElementById('hangman-0').style.display = 'block'; // Zeige das Bild mit Galgen und Seil
    }

    // Alle anderen Bilder ab dem zweiten Fehlversuch
    if (wrongGuesses >= 2) {
        document.getElementById('hangman-1').style.display = 'block'; // Zeige Kopf
    }
    if (wrongGuesses >= 3) {
        document.getElementById('hangman-2').style.display = 'block'; // Zeige Oberkörper
    }
    if (wrongGuesses >= 4) {
        document.getElementById('hangman-3').style.display = 'block'; // Zeige Arme
    }
    if (wrongGuesses >= 5) {
        document.getElementById('hangman-4').style.display = 'block'; // Zeige Beine
    }
    if (wrongGuesses >= 6) {
        document.getElementById('hangman-5').style.display = 'block'; // Zeige Todesbild (kompletter Körper)
    }
    if (wrongGuesses >= 7) {
        document.getElementById('hangman-6').style.display = 'block'; // Letztes Bild (Game Over)
    }
    
}
// Überprüft, ob der geratene Buchstabe korrekt ist
function checkGuess(guess) {
    if (!gameActive) return;

    // Konvertiere den Ratebuchstaben in Kleinbuchstaben
    guess = guess.toLowerCase();
    console.log("Guessed Letter: " + guess);

    let correctGuess = false;
    const wordList = document.getElementById("wordList");
    const liElements = wordList.getElementsByTagName("li");

    // Vergleiche den geratenen Buchstaben mit jedem Buchstaben im Wort
    for (let i = 0; i < wordLetters.length; i++) {
        // Wenn der Buchstabe übereinstimmt, setze den Buchstaben im Wort
        if (wordLetters[i].toLowerCase() === guess) {  // Achte darauf, dass beide Buchstaben in Kleinbuchstaben sind
            liElements[i].textContent = guess;
            correctGuess = true;
        }
    }

    // Wenn der Buchstabe falsch ist
    if (!correctGuess) {
        wrongGuesses++;
        updateWrongGuesses();
        updateHangmanImage();

        // Tipp nach 3 und 6 Fehlversuchen geben
        if (wrongGuesses === 3) {
            giveHint(randomWord, false);  // allgemeiner Tipp
        }
        if (wrongGuesses === 6) {
            const lastAttemptMessage = document.getElementById("last-attempt");
            lastAttemptMessage.classList.remove("hidden");
            setTimeout(() => lastAttemptMessage.classList.add("visible"), 100); // Verzögerung für sanfte Animation
        }
    

        // Beende das Spiel, wenn die maximale Anzahl an Fehlversuchen erreicht ist
        if (wrongGuesses >= maxGuesses) {
            gameActive = false;
            setTimeout(() => {
                alert("Game Over! Das Wort war: " + randomWord);
            }, 50)
        }
    } else {
        checkWin();  // Überprüfe, ob das Spiel gewonnen wurde
    }
}

// Gibt einen Hinweis basierend auf den Fehlversuchen
function giveHint(word, finalHint = false) {
    const hintContainer = document.getElementById("hint");

    // Setze den Hinweis zurück, bevor ein neuer gezeigt wird
    hintContainer.classList.remove("visible");
    hintContainer.textContent = "";

    // Zeige den ersten oder letzten Hinweis
    hintContainer.textContent = finalHint ? hints[word][1] : hints[word][0];
    hintContainer.classList.add("visible");  // Sichtbar machen

    // Hinweis nach 3 Sekunden ausblenden
    setTimeout(() => {
        hintContainer.classList.remove("visible");
        hintContainer.textContent = "";
    }, 3000);
}

// Überprüft, ob der Spieler das Wort erraten hat
function checkWin() {
    const wordList = document.getElementById("wordList");
    const letters = Array.from(wordList.getElementsByTagName("li")).map(li => li.textContent);
    
    if (!letters.includes("_")) {
        gameActive = false;
        alert("Glückwunsch! Du hast das Wort erraten: " + randomWord);
    }
}

// Handhabt das Drücken eines Buchstabens auf der Tastatur
function handleKeyPress(letter) {
    if (!gameActive) {
        console.log("Spiel nicht gestartet! Bitte zuerst auf 'StartGame' klicken.");
        return;
    }

    checkGuess(letter);

    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

// Aktualisiert die Anzahl der falschen Versuche
function updateWrongGuesses() {
    const wrongGuessesDisplay = document.getElementById("wrong-guesses");
    if (wrongGuessesDisplay) {
        wrongGuessesDisplay.textContent = wrongGuesses + " / " + maxGuesses;
    }
}

// Setzt die Buttons zurück (aktualisiert die Ansicht)
function resetButtons() {
    const disabledButtons = document.querySelectorAll('button.disabled');
    disabledButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}

// Setzt das Wort zurück (löscht das aktuelle Wort)
function resetWordBox() {
    const wordList = document.getElementById("wordList");
    if (wordList) {
        wordList.innerHTML = "";
    }
}












