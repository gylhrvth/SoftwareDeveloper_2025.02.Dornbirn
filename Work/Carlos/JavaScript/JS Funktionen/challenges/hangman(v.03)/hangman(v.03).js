// ------------------ Global Variables -------------------------------

const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];
const mountains = ['Everest', 'Matterhorn', 'Kilimanjaro', 'Denali', 'Aconcagua', 'Elbrus', 'Annapurna', 'Fuji', 'Teide', 'Erebus', 'Olympus', 'Ararat', 'Montblanc'];
const dogBreeds = ['Labrador', 'Bulldog', 'Beagle', 'Poodle', 'Doberman', 'Husky', 'Rottweiler', 'Malamute', 'Yorkshire', 'Bullterrier', 'Malinois', 'Kangal', 'Dachshund', 'Boxer', 'Akita', 'Appenzeller'];

let arrayPool = [fruits, mountains, dogBreeds];

let randomWord = ""; // Global variable for the selected word
let lettersInWord = [];
let randomArray = null;
let errorCounter = 0;

// ------------------ General Function ------------------------------

function startGame() {


  // resetButtons() -> Reset all disabled buttons of the virtual keypad
  resetButtons();
  // resetWordBox() -> Clear the word-box div where the final word will be displayed
  resetElements();
  // randomWordSelector() -> Selects a random word
  randomWordSelector(randomArray);
  // wordSplitter -> Splits the word into letters
  wordSplitter(randomWord);
  // displayWord -> Displays the selected word as many <li>_</li> as letters has the word
  displayWord(randomWord);

  hangmanImage();


  

}

// ------------------ My Functions ----------------------------------

// randomWordSelector(randomArray) -> Chooses a random word from a selected array
// Function called inside function startGame()
function randomWordSelector(randomArray) {
    console.log("Show Array: " + randomArray);
    let randomIndex = Math.floor(Math.random() * randomArray.length);
    console.log("Random Word Index: " + randomIndex);
    randomWord = randomArray[randomIndex].toLowerCase(); // Chooses a word from a random array and turns it into lowerCase.
    console.log("Random Word Text: " + randomWord);
    return randomWord
}

//-------------------------------

// wordSplitter(wordToSplit) -> Splits the selected word from randomWordSelector() into letters
// Function called inside function startGame()
function wordSplitter(wordToSplit) {

    lettersInWord = wordToSplit.split("");
    console.log("Letters in Word: " + lettersInWord);
    return lettersInWord;
}

//-------------------------------

// displayWord Function -> On Start Game, displays as many "_" as letters has the randomWord
// This is achieved with a loop that uses i to itinerate through randomWord.length
// Every itineration adds a <li> element to the <ul> with id: wordList
// In the end, there will be as many <li> as letters has the randomWord

// Function called inside function startGame()
function displayWord(randomWord) {

    let targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = ""; // Clear any existing <li> elements

    for(let i = 0; i < randomWord.length; i++){

        let createLi = document.createElement("li"); // The argument "li" specifies the type of element to create
        
        createLi.textContent = "_"; // Sets the content of the <li> to "_"

        targetWordList.appendChild(createLi); // Appends the <li> to the targetWordList
    
    }

}

//---------------------------------

// checkPlayerGuess -> is defined here, but it's called inside another function: handleKeyPress(letter)
// The function handleKeyPress(letter) happens when the player clicks on a button-letter from the virtual keypad.
// But if the "Start Game" hasn't been clicked, checkPlayerGuess(guessValue) will do nothing because it has no player guessValue to work with.

// checkPlayerGuess() -> It proofs if the choosen letter appears in the lettersInWord array.
// If the choosen letter appears, it returns true and the position(s) of the letter inside the random word
// If choosen letter does not appear, it returns false.
function checkPlayerGuess(guessValue) {
    console.log("Guessed Letter is: " + guessValue);

    let liElements = wordList.getElementsByTagName("li"); // It targets all the existing <li> elements inside <ul> with ID: wordList
    let matchFound = false; // Flag to track if a match is found

    // Loop through the letters in the word
    for (let i = 0; i < lettersInWord.length; i++) {
        if (lettersInWord[i] === guessValue.toLowerCase()) {
            console.log("The letter " + guessValue + " appears at Index: " + i);
            // Update the corresponding <li> with the guessed letter
            // Using getElementsByTagName we can specify which element we target with an index, like in an array
            liElements[i].textContent = guessValue; 
            matchFound = true; // Set the flag to true if a match is found
        }
    }

    // Call updateCounterError() to handle the error counter if no match is found
    updateCounterError(matchFound);

    // Call winnerLogic() to check if the player has won
    winnerLogic();
}

//--------------------------------

// winnerLogic() -> Proofs if all the user inputs match the letters of the word and displays a win message
// It also disables the key-pad after a win.
// This function is called in checkPlayerGuess(guessValue) function.

function winnerLogic(){
    // Check if all <li> elements have a symbol different from "_"
    const allLettersRevealed = Array.from(document.querySelectorAll("#wordList li"))
        .every(li => li.textContent !== "_");

    // Part made with Copilot ---> When user finds out all the letters, vicory message
    if (allLettersRevealed) {
        document.getElementById("hint-text").innerText = "Yaaaay";
        document.getElementById("showResult").innerText = "You did it!!!";

        // Disable all key-pad buttons when the word is guessed
        document.querySelectorAll('.key-pad button').forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
        return; // Exit the function to avoid further checks
    }
}

//---------------------------------

// updateCounterError(); -> Updates the counter if the user gives a wrong input

function updateCounterError(matchFound){

    if (!matchFound) {
        // Increment the error counter
        const targetWrongGuesses = document.getElementById("wrong-guesses");
        let currentWrongGuesses = targetWrongGuesses.innerText; // Get the current counter value
        //currentWrongGuess is incremented before calling hangmanImage()
        currentWrongGuesses++; // Increment the counter
        targetWrongGuesses.innerText = currentWrongGuesses; // Update the counter in the DOM

        // Sync errorCounter with the DOM value
         errorCounter = currentWrongGuesses;

        console.log("No matches found. Incrementing wrong guesses counter.");

        // Update the hangman image based on the error counter
        // The hangman image is called after the errorCounter is incremented, ensuring that hangman1 is displayed after the first wrong guess
        hangmanImage();

         // Call errorCounterLogic() to handle additional logic
         errorCounterLogic();

    }

}


//------------------Error Counter Logic Function -----------------------------------

//Sends different messages depending on the choosen array and the number of not matched guesses
// The function is called inside updateCounterError(matchFound) function

function errorCounterLogic() {
    if(errorCounter >= 8){
        errorCounter = 8;
        document.getElementById("wrong-guesses").innerText = errorCounter;
        document.getElementById("showResult").innerText = "GAME OVER!!!";
        document.getElementById("showResult").style.color="rgb(255, 134, 134)";

        // Disable all key-pad buttons if Game Over
        const allPadButtons = document.querySelectorAll('.key-pad button');
        allPadButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
    } 

    else if (errorCounter === 3){
        document.getElementById("showResult").innerText = "You know what you're doing, aren't you...?"
        }
    
    else if (errorCounter === 5){
        document.getElementById("hint-text").innerText = "Uuuuh...";
        document.getElementById("showResult").innerText = "Maybe you could really use some hint...?"

    }

    else if (errorCounter === 6){
        document.getElementById("showResult").innerText = "There you have it"
        if (randomArray === arrayPool[0]){
        document.getElementById("hint-text").innerText = "Sweet Vitamines!!";
        } 
        else if(randomArray === arrayPool[1]){
        document.getElementById("hint-text").innerText = "I'm getting altitude sickness...";
        }
        else if(randomArray === arrayPool[2]){
        document.getElementById("hint-text").innerText = "Wuff Wuff!!";
        }
    }

    else if (errorCounter === 7){
        document.getElementById("showResult").innerText = "So last chance...?"

    }

}

//resetElements -> Function is called in startGame() function -------------------


function resetElements() {
    // Reset the hint text
    document.getElementById("hint-text").innerText = "You sure don't need one, do you??";

    // Select a random array and log it
    randomArray = arrayPool[Math.floor(Math.random() * arrayPool.length)];
    console.log("Selected Array: ", randomArray);

    // Reset the error counter to 0
    errorCounter = 0;
    document.getElementById("wrong-guesses").innerText = errorCounter; // Update the displayed value

    // Reset the hangman image to stage 0
    hangmanImage(); // This will display hangman0.png

    // Reset the result text
    document.getElementById("showResult").innerText = "That can't be too difficult...";
}


 //------------------------ COPILOT Functions ------------------------------------------------------------

 //----------------------- Hangman Image (Copilot) -------------------------

 function hangmanImage() {
    const hangmanStages = [
        "./assets/pictures/hangman0.png", // Stage 0
        "./assets/pictures/hangman1.png", // Stage 1
        "./assets/pictures/hangman2.png", // Stage 2
        "./assets/pictures/hangman3.png", // Stage 3
        "./assets/pictures/hangman4.png", // Stage 4
        "./assets/pictures/hangman5.png", // Stage 5
        "./assets/pictures/hangman6.png", // Stage 6
        "./assets/pictures/hangman7.png", // Stage 7
        "./assets/pictures/hangman8.png"  // Stage 8 (Game Over)
    ];

    const targetHangmanBox = document.querySelector(".hangman-box");
    targetHangmanBox.innerHTML = ""; // Clear any existing image

    // Create and append the new image based on the errorCounter
    const hangmanImg = document.createElement("img");
    hangmanImg.src = hangmanStages[errorCounter]; // Use errorCounter to determine the image
    hangmanImg.alt = `Hangman Stage ${errorCounter}`;
    hangmanImg.style.width = "70%"; // Adjust the size as needed
    hangmanImg.style.height = "auto";

    targetHangmanBox.appendChild(hangmanImg);
}


//------------------ Sandros Functions -------------------------------

function resetButtons() {
  const disabledButtons = document.querySelectorAll('button.disabled');
  for (let i = 0; i < disabledButtons.length; i++) {
    disabledButtons[i].disabled = false;
    disabledButtons[i].classList.remove('disabled');
  }

}

//--------------------------------

function handleKeyPress(letter) {
  let guess = letter;
  console.log("Guess = " + guess);

  // Call checkPlayerGuess(guessValue) and use "guess" as an argument
  checkPlayerGuess(guess);

  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('disabled');
    // Log all disabled buttons
    const disabledButtons = document.querySelectorAll('button.disabled');
    console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
    console.log(`Key pressed: ${letter}`);

  }
}

//---------------------------------------------------------------------