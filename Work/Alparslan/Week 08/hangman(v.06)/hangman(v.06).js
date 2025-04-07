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
    { category: 'mountain', name: 'Montblanc', hint: 'The highest mountain in the Alps.'},
    { category: 'dog', name: 'Labrador', hint: 'A friendly and outgoing breed.'},
    { category: 'dog', name: 'Bulldog', hint: 'A muscular breed with a wrinkled face.'},
    { category: 'dog', name: 'Beagle', hint: 'A small hound breed known for its keen sense of smell.'},
    { category: 'dog', name: 'Poodle', hint: 'A highly intelligent breed with curly fur.'},
    { category: 'dog', name: 'Doberman', hint: 'A breed known for its loyalty and intelligence.'},
    { category: 'dog', name: 'Husky', hint: 'A breed known for its strength and endurance.'},
]; // Stores different word categories
let randomWord = ''

// ------------------ General Function ------------------------------

function startGame() {


  // resetButtons() -> Reset all disabled buttons of the virtual keypad
  resetButtons();
  // resetElements() -> Reset the game screen (word area, counter, images, etc.)
  resetElements();
  // randomWordSelector() -> Selects a random word
  randomWord = randomWordSelector();
  // displayWord -> Show <li>_</li> for each letter in the word
  displayWord(randomWord.name);
  // hangmanImage -> Show the first hangman image 
  hangmanImage(0);

}

// ------------------ My Functions ----------------------------------

// randomWordSelector(randomArray) -> Chooses a random word from a selected array
// Function called inside function startGame()
function randomWordSelector() {
    return arrayPool[Math.floor(Math.random() * arrayPool.length)];
}


//-------------------------------

// displayWord Function -> On Start Game, displays as many "_" as letters has the randomWord
// This is achieved with a loop that uses "i" to itinerate through randomWord.length
// Every itineration adds a <li> element to the <ul> with id: wordList
// In the end, there will be as many <li>_</li> as letters has the randomWord

// Function called inside function startGame()
function displayWord(randomWord) {

    let targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = ""; // Clear any existing <li> elements

    for(let i = 0; i < randomWord.length; i++){

        let createLi = document.createElement("li"); // The argument "li" specifies the type of element to create
        
        createLi.textContent = "_"; // Sets the content of the <li> to "_"

        targetWordList.appendChild(createLi); // Appends the <li> to the targetWordList
    
    }

    console.log(randomWord.length + " <li> elements with underscore will be generated");

}

//---------------------------------

// checkPlayerGuess() -> is defined here, but it's called inside another function: handleKeyPress(letter)
// The function handleKeyPress(letter) happens when the player clicks on a button-letter from the virtual keypad.
// But if the "Start Game" hasn't been clicked, checkPlayerGuess(guessValue) will do nothing because it has no player guessValue to work with.

// checkPlayerGuess() -> It proofs if the choosen letter appears in the lettersInWord array.
// If the choosen letter appears, it returns true and the position(s) of the letter inside the random word
// If choosen letter does not appear, it returns false.
function checkPlayerGuess(guessValue, wordToGuess) {
    console.log("Guessed Letter is: " + guessValue);

    let liElements = wordList.getElementsByTagName("li"); // It targets all the existing <li> elements inside <ul> with ID: wordList
    let matchFound = false; // Flag to track if a match is found. Initially is set to false.

    // Loop through the letters in the word
    for (let i = 0; i < wordToGuess.name.length; i++) {
        if (wordToGuess.name[i] === guessValue.toLowerCase()) {
            console.log("The letter " + guessValue + " appears at Index: " + i);
            // Update the corresponding <li> with the guessed letter
            // Using getElementsByTagName we can specify which element we target with an index, like in an array
            liElements[i].textContent = guessValue; 
            matchFound = true; // Set the flag to true if a match is found
            console.log("matchFound variable will be set to: " + matchFound);
        }
    }

    // Call updateCounterError() to handle the error counter if no match is found
    updateCounterError(matchFound, wordToGuess);

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

function updateCounterError(matchFound, wordToGuess){

    if (!matchFound) {
        console.log("matchFound variable will still equal " + matchFound);
        // Increment the error counter
        const targetWrongGuesses = document.getElementById("wrong-guesses");
        let currentWrongGuesses = targetWrongGuesses.innerText; // Get the current counter value
        //currentWrongGuess is incremented before calling hangmanImage()
        currentWrongGuesses++; // Increment the counter
        targetWrongGuesses.innerText = currentWrongGuesses; // Update the counter in the DOM

        console.log("No matches found. Incrementing wrong guesses counter.");

        // Update the hangman image based on the error counter
        // The hangman image is called after the errorCounter is incremented, ensuring that hangman1 is displayed after the first wrong guess
        hangmanImage(currentWrongGuesses);

         // Call errorCounterLogic() to handle additional logic
         errorCounterLogic(wordToGuess, currentWrongGuesses);

    }

}


//------------------Error Counter Logic Function -----------------------------------

//Sends different messages depending on the choosen array and the number of not matched guesses
// The function is called inside updateCounterError(matchFound) function

function errorCounterLogic(wordToGuess, errorCounter) {
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
        document.getElementById("hint-text").innerText = wordToGuess.category;
        document.getElementById("showResult").innerText = "You know what you're doing, aren't you...?"
    } else if (errorCounter === 5){
        document.getElementById("hint-text").innerText = wordToGuess.hint;
        document.getElementById("showResult").innerText = "Maybe you could really use some hint...?"
    } else if (errorCounter === 6){
        document.getElementById("showResult").innerText = "There you have it"
    } else if (errorCounter === 7){
        document.getElementById("showResult").innerText = "So last chance...?"
    }

}

//resetElements -> Function is called in startGame() function -------------------


function resetElements() {
    // Reset the hint text
    document.getElementById("hint-text").innerText = "You sure don't need one, do you??";

    // Reset the error counter to 0
    document.getElementById("wrong-guesses").innerText = 0; // Update the displayed value

    // Reset the hangman image to stage 0
    hangmanImage(0); // This will display hangman0.png

    // Reset the result text
    document.getElementById("showResult").innerText = "That can't be too difficult...";
}


 //------------------------ COPILOT Functions ------------------------------------------------------------

 //----------------------- Hangman Image (Copilot) -------------------------

 function hangmanImage(errorCounter) {
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
    console.log("New image appended")
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
  checkPlayerGuess(guess, randomWord);

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