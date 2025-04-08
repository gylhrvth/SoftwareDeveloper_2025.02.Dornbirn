// ------------------ Global Variables -------------------------------
let arrayPool = [
    { category: 'fruit', name: 'apple', hint: 'It\'s a delicious red fruit.'},
    { category: 'fruit', name: 'banana', hint: 'A yellow fruit that monkeys love.'},
    { category: 'fruit', name: 'cherry', hint: 'A small red fruit often used in desserts.'},
    { category: 'fruit', name: 'grape', hint: 'A small round fruit that can be red, green, or purple.'},
    { category: 'fruit', name: 'kiwi', hint: 'A brown fuzzy fruit with green flesh.'},
    { category: 'fruit', name: 'lemon', hint: 'A sour yellow fruit often used in drinks.'},
    { category: 'fruit', name: 'mango', hint: 'A tropical stone fruit with sweet yellow flesh.'},
    { category: 'fruit', name: 'orange', hint: 'A citrus fruit known for its vitamin C content.'},
    { category: 'fruit', name: 'papaya', hint: 'A tropical fruit with orange flesh and black seeds.'},
    { category: 'fruit', name: 'raspberry', hint: 'A small red fruit that is sweet and tart.'},
    { category: 'fruit', name: 'strawberry', hint: 'A red fruit with seeds on the outside.'},
    { category: 'fruit', name: 'watermelon', hint: 'A large fruit with green skin and red flesh.'},
    { category: 'mountain', name: 'Everest', hint: 'The highest mountain in the world.'},
    { category: 'mountain', name: 'Matterhorn', hint: 'A famous mountain in the Alps.'},
    { category: 'mountain', name: 'Kilimanjaro', hint: 'The highest mountain in Africa.'},
    { category: 'mountain', name: 'Denali', hint: 'The highest mountain in North America.'},
    { category: 'mountain', name: 'Aconcagua', hint: 'The highest mountain in South America.'},
    { category: 'mountain', name: 'Elbrus', hint: 'The highest mountain in Europe.'},
    { category: 'mountain', name: 'Annapurna', hint: 'A mountain in the Himalayas known for its difficulty.'},
    { category: 'mountain', name: 'Fuji', hint: 'A famous mountain in Japan.'},
    { category: 'mountain', name: 'Teide', hint: 'The highest mountain in Spain.'},
    { category: 'mountain', name: 'Erebus', hint: 'A volcano in Antarctica.'},
    { category: 'mountain', name: 'Olympus', hint: 'The highest mountain in Greece.'},
    { category: 'mountain', name: 'Ararat', hint: 'A mountain in Turkey associated with Noah\'s Ark.'},
    { category: 'mountain', name: 'Caucasus', hint: 'The mountain where Martial-art Champions come from.'},
    { category: 'mountain', name: 'Montblanc', hint: 'The highest mountain in the Alps.'},
    { category: 'dog', name: 'Labrador', hint: 'A friendly and outgoing breed.'},
    { category: 'dog', name: 'Bulldog', hint: 'A muscular breed with a wrinkled face.'},
    { category: 'dog', name: 'Beagle', hint: 'A small hound breed known for its keen sense of smell.'},
    { category: 'dog', name: 'Poodle', hint: 'A highly intelligent breed with curly fur.'},
    { category: 'dog', name: 'Doberman', hint: 'A breed known for its loyalty and intelligence.'},
    { category: 'dog', name: 'Husky', hint: 'A breed known for its strength and endurance.'},
    { category: 'dog', name: 'Kangal', hint: 'A turkish breed known for its size,strength and protecting instincts.'},

];

// Variable/Platzhalter speichert aktuell ausgewähltes Wort
let randomWord = '';





// ------------------ Funktionsaufrufe ------------------------------

function startGame() {
  // Setzt die Tasten zurück (alle aktivieren)
  resetButtons();

  // Setzt Spielfeld, Fehlerzähler, Hinweise, Bilder zurück
  resetElements();

  // Wählt ein zufälliges Wort aus dem arrayPool
  randomWord = randomWordSelector();

  // Zeigt für jedes Zeichen im Wort ein "_" auf dem Bildschirm
  displayWord(randomWord.name);

  // Zeigt das erste Bild vom Galgenmännchen (ohne Fehler)
  hangmanImage(0);
}





// ------------------ Funktionen ----------------------------------

// Funktion: Wählt ein zufälliges Wort aus arrayPool
function randomWordSelector() {
    // Math.random() erzeugt eine Zahl zwischen 0 und 1 → wird mit Länge multipliziert → floor rundet ab
    return arrayPool[Math.floor(Math.random() * arrayPool.length)];
}

// Zeigt "_" für jedes Zeichen des zufälligen Wortes an
function displayWord(randomWord) {
    let targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = ""; // Leert die vorherigen Einträge

    for (let i = 0; i < randomWord.length; i++) {
        let createLi = document.createElement("li"); // Erstellt ein <li>-Element
        createLi.textContent = "_"; // Setzt Inhalt auf "_"
        targetWordList.appendChild(createLi); // Fügt das <li> in die Liste ein
    }

    console.log(randomWord.length + " <li> elements with underscore will be generated");
}





// Prüft, ob der Buchstabe im Wort enthalten ist
function checkPlayerGuess(guessValue, wordToGuess) {
    console.log("Guessed Letter is: " + guessValue);
    let liElements = wordList.getElementsByTagName("li");
    let matchFound = false;

    // Umwandlung des Wortes und der Eingabe in KLeinbuchstaben
    let lowerCaseWord = wordToGuess.name.toLowerCase();
    let lowerCaseGuess = guessValue.toLowerCase();

    for (let i = 0; i < lowerCaseWord.length; i++) {
        if (lowerCaseWord[i] === lowerCaseGuess) {
            liElements[i].textContent = guessValue;
            matchFound = true;
            console.log("matchFound variable will be set to: " + matchFound);
        }
    }

    // Aktualisiert den Fehlerzähler, wenn kein Treffer
    updateCounterError(matchFound, wordToGuess);

    // Prüft, ob der Spieler gewonnen hat
    winnerLogic();
}





// Überprüft, ob alle Buchstaben erraten wurden
function winnerLogic() {
    const allLettersRevealed = Array.from(document.querySelectorAll("#wordList li"))
        .every(li => li.textContent !== "_");

    if (allLettersRevealed) {
        document.getElementById("hint-text").innerText = "Yaaaay";
        document.getElementById("showResult").innerText = "You did it!!!";

        document.querySelectorAll('.key-pad button').forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
        return;
    }
}





// Aktualisiert die Fehleranzahl, wenn falscher Buchstabe eingegeben wurde
function updateCounterError(matchFound, wordToGuess) {
    if (!matchFound) {
        const targetWrongGuesses = document.getElementById("wrong-guesses");
        let currentWrongGuesses = targetWrongGuesses.innerText;
        currentWrongGuesses++;
        targetWrongGuesses.innerText = currentWrongGuesses;

        console.log("No matches found. Incrementing wrong guesses counter.");

        // Aktualisiert Galgenmännchen-Bild
        hangmanImage(currentWrongGuesses);

        // Reagiert auf bestimmten Fehlerstände
        errorCounterLogic(wordToGuess, currentWrongGuesses);
    }
}





// Gibt Hinweise und Endbildschirm je nach Fehleranzahl
function errorCounterLogic(wordToGuess, errorCounter) {
    if (errorCounter >= 8) {
        errorCounter = 8;
        document.getElementById("wrong-guesses").innerText = errorCounter;
        document.getElementById("showResult").innerText = "GAME OVER!!!";
        document.getElementById("showResult").style.color = "rgb(255, 134, 134)";

        // Tasten deaktivieren
        const allPadButtons = document.querySelectorAll('.key-pad button');
        allPadButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
    } else if (errorCounter === 3) {
        document.getElementById("hint-text").innerText = wordToGuess.category;
        document.getElementById("showResult").innerText = "You know what you're doing, aren't you...?"
    } else if (errorCounter === 5) {
        document.getElementById("hint-text").innerText = wordToGuess.hint;
        document.getElementById("showResult").innerText = "Maybe you could really use some hint...?"
    } else if (errorCounter === 6) {
        document.getElementById("showResult").innerText = "There you have it"
    } else if (errorCounter === 7) {
        document.getElementById("showResult").innerText = "So last chance...?"
    }
}





// Setzt Spielfeld und Textinhalte zurück
function resetElements() {
    document.getElementById("hint-text").innerText = "You sure don't need one, do you??";
    document.getElementById("wrong-guesses").innerText = 0;
    hangmanImage(0);
    document.getElementById("showResult").innerText = "That can't be too difficult...";
}





// Zeigt das Galgenmännchen-Bild je nach Fehleranzahl
function hangmanImage(errorCounter) {
    const hangmanStages = [
        "./assets/pictures/hangman0.png",
        "./assets/pictures/hangman1.png",
        "./assets/pictures/hangman2.png",
        "./assets/pictures/hangman3.png",
        "./assets/pictures/hangman4.png",
        "./assets/pictures/hangman5.png",
        "./assets/pictures/hangman6.png",
        "./assets/pictures/hangman7.png",
        "./assets/pictures/hangman8.png"
    ];

    const targetHangmanBox = document.querySelector(".hangman-box");
    targetHangmanBox.innerHTML = "";

    const hangmanImg = document.createElement("img");
    hangmanImg.src = hangmanStages[errorCounter];
    hangmanImg.alt = `Hangman Stage ${errorCounter}`;
    hangmanImg.style.width = "70%";
    hangmanImg.style.height = "auto";

    targetHangmanBox.appendChild(hangmanImg);
    console.log("New image appended");
}





// Reaktiviert alle Tasten
function resetButtons() {
    const disabledButtons = document.querySelectorAll('button.disabled');
    for (let i = 0; i < disabledButtons.length; i++) {
        disabledButtons[i].disabled = false;
        disabledButtons[i].classList.remove('disabled');
    }
}





// Wird aufgerufen, wenn eine Taste gedrückt wird
function handleKeyPress(letter) {
    let guess = letter;
    console.log("Guess = " + guess);
    checkPlayerGuess(guess, randomWord);

    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');

        const disabledButtons = document.querySelectorAll('button.disabled');
        console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
        console.log(`Key pressed: ${letter}`);
    }
}
