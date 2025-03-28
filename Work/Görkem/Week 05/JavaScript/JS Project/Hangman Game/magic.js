
const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];

let randomWord = "";
let wordLetters = [];
let gameActive = false;
let wrongGuesses = 0;
const maxGuesses = 7;

function startGame() {
    resetButtons();
    resetWordBox();

    gameActive = true;
    wrongGuesses = 0;
    updateWrongGuesses();

    randomWord = randomWordSelector(fruits);
    wordLetters = letterSplitter(randomWord);

    console.log("startGame - Random Word: " + randomWord);

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

    guess = guess.toLowerCase();
    console.log("Guessed Letter: " + guess);
    
    let correctGuess = false;
    const wordList = document.getElementById("wordList");
    const liElements = wordList.getElementsByTagName("li");

    for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === guess) {
            liElements[i].textContent = guess;
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        wrongGuesses++;
        updateWrongGuesses();

        if (wrongGuesses >= maxGuesses) {
            gameActive = false;
            alert("Game Over! Das Wort war: " + randomWord);
        }
    } else {
        checkWin();
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



