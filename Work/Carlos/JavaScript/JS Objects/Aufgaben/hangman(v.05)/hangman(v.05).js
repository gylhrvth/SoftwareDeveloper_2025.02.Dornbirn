// ------------------ Global Variables -------------------------------

const arrayPool = [
    { category: 'fruits', word: 'apple', hint: 'an _____ a day keeps the doctor away' },
    { category: 'fruits', word: 'banana', hint: 'Can be some kind of republic' },
    { category: 'fruits', word: 'cherry', hint: 'Dieter sings it' },

    { category: 'mountains', word: 'Everest', hint: 'The highest mountain in the world' },
    { category: 'mountains', word: 'Matterhorn', hint: 'A famous mountain in the Alps' },
    { category: 'mountains', word: 'Kilimanjaro', hint: 'The highest mountain in Africa' },

    { category: 'Dog Breeds', word: 'Labrador', hint: 'Loves eating and swimming' },
    { category: 'Dog Breeds', word: 'Husky', hint: 'It likes it cold' },
    { category: 'Dog Breeds', word: 'Rottweiler', hint: 'Better ask before entering' },

    { category: 'Music Artists', word: 'Bob Dylan', hint: 'Like a rolling stone' },
    { category: 'Music Artists', word: 'Bruce Springsteen', hint: 'Born in the USA' },
    { category: 'Music Artists', word: 'Taylor Swift', hint: 'Shake it off!' }

];

let randomWord = ""; // Stores the randomly selected word
let lettersInWord = []; // Stores the letters of the selected word
let errorCounter = 0; // Tracks the number of incorrect guesses

// ------------------ Main Game Functions ----------------------------

// Start the game
function startGame() {
    resetButtons(); // Reset all disabled buttons of the virtual keypad
    resetElements(); // Reset the game screen (word area, counter, images, etc.)
    randomWordSelector(arrayPool); // Select a random word
    wordSplitter(randomWord); // Split the word into letters
    displayWord(randomWord); // Display underscores for each letter in the word
    hangmanImage(); // Show the first hangman image
}

// Select a random word from the arrayPool
function randomWordSelector(arrayPool) {
    const randomIndex = Math.floor(Math.random() * arrayPool.length); // The random index is used to select a random object from the arrayPool.
    const selectedObject = arrayPool[randomIndex]; // Get a random object from the arrayPool -> Contains the category, word and hint.

    randomWord = selectedObject.word.toLowerCase(); // The word is extracted from the object and converted to lowercase.

    console.log("Selected Word: " + randomWord);
    console.log("Category: " + selectedObject.category);
    console.log("Hint: " + selectedObject.hint);

    return randomWord; // Return the selected word
}

// Split the selected word into letters
function wordSplitter(wordToSplit) {
    lettersInWord = wordToSplit.split("");
    console.log("Letters in Word: " + lettersInWord);
    return lettersInWord;
}

// Display underscores (or empty space) for each letter in the word
function displayWord(randomWord) {
    const targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = ""; // Clear any existing <li> elements

    for (let i = 0; i < randomWord.length; i++) {
        const createLi = document.createElement("li");

        if (randomWord[i] >= 'a' && randomWord[i] <= 'z'){
            createLi.textContent = '_'
        } else {
            createLi.textContent = randomWord[i] // Prints everything which is not a letter as it is represented on the string. (Empty space will be shown as empty space like in the string)
        }
        /*Alternative Lösung
        // if (randomWord[i] === " ") {
        //     createLi.textContent = " "; // Set the content of the <li> to " " (for guesses with two words or more)
        // } else {
        //     createLi.textContent = "_"; // Set the content of the <li> to "_"
        // } */

        targetWordList.appendChild(createLi); // Append the <li> to the targetWordList
    }

    console.log(randomWord.length + " <li> elements with underscores generated");
}

// ------------------ Player Interaction Functions -------------------

// Handle key press from the virtual keypad
function handleKeyPress(letter) {
    console.log("Guess = " + letter);
    checkPlayerGuess(letter);

    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

// Check if the guessed letter is in the word
function checkPlayerGuess(guessValue) {
    console.log("Guessed Letter: " + guessValue);

    const liElements = wordList.getElementsByTagName("li");
    let matchFound = false;

    for (let i = 0; i < lettersInWord.length; i++) {
        if (lettersInWord[i] === guessValue.toLowerCase()) {
            liElements[i].textContent = guessValue;
            matchFound = true;
        }
    }

    updateCounterError(matchFound); // Update error counter if no match is found
    winnerLogic(); // Check if the player has won
}

// Check if the player has guessed all letters
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
    }
}

// ------------------ Error Handling Functions -----------------------

// Update the error counter if the guess is incorrect
function updateCounterError(matchFound) {
    if (!matchFound) {
        errorCounter++;
        document.getElementById("wrong-guesses").innerText = errorCounter;
        hangmanImage(); // Update the hangman image
        errorCounterLogic(); // Handle additional logic based on error count
    }
}

// Handle logic based on the error counter
function errorCounterLogic() {
    if (errorCounter >= 8) {
        document.getElementById("showResult").innerText = "GAME OVER!!!";
        document.getElementById("showResult").style.color = "rgb(255, 134, 134)";

        document.querySelectorAll('.key-pad button').forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });

        } else if (errorCounter === 3){
            document.getElementById("showResult").innerText = "You know what you're doing, aren't you...?"
            
        
        } else if (errorCounter === 5){
            document.getElementById("hint-text").innerText = "Uuuuh...";
            document.getElementById("showResult").innerText = "Maybe you could really use some hint...?"
    
        }
        
        else if (errorCounter === 6) {
        const currentWordObject = arrayPool.find(item => item.word.toLowerCase() === randomWord);
        if (currentWordObject && currentWordObject.hint) {
            document.getElementById("hint-text").innerText = currentWordObject.hint;
        } else {
            document.getElementById("hint-text").innerText = "No hint available!";
        }
    }
}

// ------------------ Reset and Utility Functions --------------------

// Reset the game elements
function resetElements() {
    document.getElementById("hint-text").innerText = "You sure don't need one, do you??";
    errorCounter = 0;
    document.getElementById("wrong-guesses").innerText = errorCounter;
    hangmanImage(); // Reset hangman image
    document.getElementById("showResult").innerText = "That can't be too difficult...";
    document.getElementById("showResult").style.color = "#b5b5b5"; // Reset the color to default
}

// Reset all disabled buttons
function resetButtons() {
    document.querySelectorAll('button.disabled').forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}

// Update the hangman image based on the error counter
function hangmanImage() {
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
    targetHangmanBox.innerHTML = ""; // Clear any existing image

    const hangmanImg = document.createElement("img");
    hangmanImg.src = hangmanStages[errorCounter];
    hangmanImg.alt = `Hangman Stage ${errorCounter}`;
    hangmanImg.style.width = "70%";
    hangmanImg.style.height = "auto";

    targetHangmanBox.appendChild(hangmanImg);
    console.log(`Image ${errorCounter} appended`)
}