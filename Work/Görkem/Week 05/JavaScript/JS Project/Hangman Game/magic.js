
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

function startGame() {
    resetButtons();
    resetWordBox();

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

function randomWordSelector(randomArray) {
    let index = Math.floor(Math.random() * randomArray.length);
    return randomArray[index];
}

function letterSplitter(word) {
    return word.split("");
}

function generateWordList(word) {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = ""; 

    for (let i = 0; i < word.length; i++) {
        const li = document.createElement("li");
        li.textContent = "_";
        wordList.appendChild(li);
    }
}

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

        // Tipp nach 3 und 6 Fehlversuchen geben
        if (wrongGuesses === 3) {
            giveHint(randomWord, false);  // allgemeiner Tipp
        } else if (wrongGuesses === 6) {
            giveHint(randomWord, true);   // detaillierter Tipp
        }

        // Beende das Spiel, wenn die maximale Anzahl an Fehlversuchen erreicht ist
        if (wrongGuesses >= maxGuesses) {
            gameActive = false;
            alert("Game Over! Das Wort war: " + randomWord);
        }
    } else {
        checkWin();  // Überprüfe, ob das Spiel gewonnen wurde
    }
}

function giveHint(word, finalHint = false) {
    const hintContainer = document.getElementById("hint");

    // Setze den Hinweis zurück, bevor ein neuer gezeigt wird
    hintContainer.classList.remove("visible");
    hintContainer.textContent = "";

    // Zeige den ersten Hinweis (z. B. Farbe, Eigenschaft)
    if (!finalHint) {
        hintContainer.textContent = hints[word][0];
        hintContainer.classList.add("visible");  // Sichtbar machen
    }
    // Zeige den letzten Hinweis (z. B. Anfangsbuchstabe)
    else {
        hintContainer.textContent = hints[word][1];
        hintContainer.classList.add("visible");  // Sichtbar machen
    }
}

function checkWin() {
    const wordList = document.getElementById("wordList");
    const letters = Array.from(wordList.getElementsByTagName("li")).map(li => li.textContent);
    
    if (!letters.includes("_")) {
        gameActive = false;
        alert("Glückwunsch! Du hast das Wort erraten: " + randomWord);
    }
}

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

function updateWrongGuesses() {
    const wrongGuessesDisplay = document.getElementById("wrong-guesses");
    if (wrongGuessesDisplay) {
        wrongGuessesDisplay.textContent = wrongGuesses + " / " + maxGuesses;
    }
}

function resetButtons() {
    const disabledButtons = document.querySelectorAll('button.disabled');
    disabledButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}

function resetWordBox() {
    const wordList = document.getElementById("wordList");
    if (wordList) {
        wordList.innerHTML = "";
    }
}







