const word = "GYULA"; // Das zu erratende Wort
const maxAttempts = 7; // Maximale Anzahl der Fehlversuche
let attempts = 0; // Aktuelle Anzahl der Fehlversuche
let guessedLetters = []; // Liste der erratenen Buchstaben

const wordElement = document.getElementById('word');
const letterDisplay = document.getElementById('letter-display');
const falseGuessCount = document.getElementById('false-guess-count');
const hangmanImage = document.getElementById('hangman-image');
const keyboard = document.getElementById('keyboard');

// Initialisiere das Spiel
function initGame() {
    // Erstelle die Buchstabenanzeige
    for (let i = 0; i < word.length; i++) {
        const li = document.createElement('li');
        li.classList.add('letter');
        li.textContent = '_';
        letterDisplay.appendChild(li);
    }

    // Erstelle die Tastatur
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(i);
        button.addEventListener('click', () => handleGuess(button.textContent));
        keyboard.appendChild(button);
    }
}

// Überprüfe die Benutzereingabe
function handleGuess(letter) {
    if (guessedLetters.includes(letter) || attempts >= maxAttempts) {
        return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        // Aktualisiere die Buchstabenanzeige
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                letterDisplay.children[i].textContent = letter;
            }
        }

        // Überprüfe, ob das Wort vollständig erraten wurde
        if (Array.from(letterDisplay.children).every(li => li.textContent !== '_')) {
            alert('Herzlichen Glückwunsch! Sie haben das Wort erraten.');
        }
    } else {
        attempts++;
        falseGuessCount.textContent = `${attempts} / ${maxAttempts}`;
        hangmanImage.src = `img/hangman-${attempts}.svg`;

        // Überprüfe, ob die maximale Anzahl der Fehlversuche erreicht wurde
        if (attempts >= maxAttempts) {
            alert('Spiel vorbei! Das Wort war: ' + word);
        }
    }
}

// Starte das Spiel
initGame();