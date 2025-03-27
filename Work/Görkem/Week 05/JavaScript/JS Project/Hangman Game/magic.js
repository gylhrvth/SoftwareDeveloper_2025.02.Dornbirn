const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];

let randomWord = ""; // Global variable for the selected word
let wordLetters = []; // Global variable for the letters of the word

function startGame() {
    resetButtons();
    resetWordBox();

    // Select a random word and split it into letters
    randomWord = randomWordSelector(fruits);
    wordLetters = letterSplitter(randomWord);

    console.log("startGame - Random Word: " + randomWord);
    console.log("startGame - Word Letters: " + wordLetters);

    // Generate the word list (underscores)
    generateWordList(randomWord);
}

function randomWordSelector(randomArray) {
    let localRandomIndex = Math.floor(Math.random() * randomArray.length);
    console.log("Random Word Index: " + localRandomIndex);
    let localRandomWord = randomArray[localRandomIndex];
    console.log("Random Word: " + localRandomWord);
    return localRandomWord;
}

function letterSplitter(randomWord) {
    let wordSplit = randomWord.split("");
    console.log("Letters: " + wordSplit);
    return wordSplit;
}

function generateWordList(randomWord) {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = ""; // Clear any existing <li> elements

    for (let i = 0; i < randomWord.length; i++) {
        const li = document.createElement("li");
        li.textContent = "_"; // Initially set to "_"
        wordList.appendChild(li);
    }
}

function checkGuess(guess) {
    console.log("Guessed Letter is: " + guess);
    let result = wordLetters.includes(guess.toLowerCase()); // Ensure case-insensitivity
    console.log("Letter " + "\"" + guess + "\"" + " present inside " + randomWord + ": " + result);

    const wordList = document.getElementById("wordList");
    const liElements = wordList.getElementsByTagName("li");

    for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === guess.toLowerCase()) {
            console.log("Letter found at index = " + i);
            liElements[i].textContent = guess; // Update the <li> with the guessed letter
        }
    }
}

function handleKeyPress(letter) {
    console.log("Guess = " + letter);

    // Call the checkGuess function with the guessed letter
    checkGuess(letter);

    // Find the button element by its text content and disable it
    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

function resetButtons() {
    const disabledButtons = document.querySelectorAll('button.disabled');
    for (let i = 0; i < disabledButtons.length; i++) {
        disabledButtons[i].disabled = false;
        disabledButtons[i].classList.remove('disabled');
    }
}

function resetWordBox() {
    const wordList = document.getElementById("wordList");
    if (wordList) {
        wordList.innerHTML = ""; // Clear the word list
    }
}


