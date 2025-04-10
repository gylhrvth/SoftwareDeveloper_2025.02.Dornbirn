


// ------------------ Global Variables -------------------------------

const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];
const mountains = ['Everest', 'Matterhorn', 'Kilimanjaro', 'Denali', 'Aconcagua', 'Elbrus', 'Annapurna', 'Fuji', 'Teide', 'Erebus', 'Olympus', 'Ararat', 'Montblanc'];
const dogBreeds = ['Labrador', 'Bulldog', 'Beagle', 'Poodle', 'Doberman', 'Husky', 'Rottweiler', 'Malamute', 'Yorkshire', 'Bullterrier', 'Malinois', 'Kangal', 'Dachshund', 'Boxer', 'Akita', 'Appenzeller'];

let arrayPool = [fruits, mountains, dogBreeds];

let randomWord = ""; // Global variable for the selected word
let lettersInWord = [];

let errorCounter = 0;

// ------------------ General Function ------------------------------

function startGame() {

  let randomArray = arrayPool[Math.floor(Math.random() * arrayPool.length)];
  console.log("Selected Array: ", randomArray);
  // resetButtons() -> Reset all disabled buttons of the virtual keypad
  resetButtons();
  // resetWordBox() -> Clear the word-box div where the final word will be displayed
  resetWordBox();
  // randomWordSelector() -> Selects a random word
  randomWordSelector(randomArray);
  // wordSplitter -> Splits the word into letters
  wordSplitter(randomWord);
  // displayWord -> Displays the selected word as many <li>_</li> as letters has the word
  displayWord(randomWord);


}

// ------------------ My Functions ----------------------------------

// randomWordSelector(randomArray) -> Chooses a random word from a selected array
function randomWordSelector(randomArray) {
    console.log("Show Array: " + randomArray);
    let randomIndex = Math.floor(Math.random() * randomArray.length);
    console.log("Random Word Index: " + randomIndex);
    randomWord = randomArray[randomIndex].toLowerCase(); // Chooses a word from a random array and turns it into lowerCase.
    console.log("Random Word Text: " + randomWord);
    return randomWord
}

//----------------------

// wordSplitter(wordToSplit) -> Splits the selected word from randomWordSelector() into letters
function wordSplitter(wordToSplit) {

    lettersInWord = wordToSplit.split("");
    console.log("Letters in Word: " + lettersInWord);
    return lettersInWord;
}

//----------------------

// On Start Game, displays as many "_" as letters has the randomWord
// This is achieved with a loop that uses i to itinerate through randomWord.length
// Every itineration adds a <li> element to the <ul> with id: wordList
// In the end, there will be as many <li> as letters has the randomWord

function displayWord(randomWord) {

    let targetWordList = document.getElementById("wordList");
    targetWordList.innerHTML = ""; // Clear any existing <li> elements

    for(let i = 0; i < randomWord.length; i++){

        let createLi = document.createElement("li"); // The argument "li" specifies the type of element to create
        
        createLi.textContent = "_"; // Sets the content of the <li> to "_"

        targetWordList.appendChild(createLi); // Appends the <li> to the targetWordList
    
    }

}

//----------------------

// The function below, checkPlayerGuess(guessValue), is defined here, but it's called inside another function: handleKeyPress(letter)
// The function handleKeyPress(letter) happens when the player clicks on a button-letter from the virtual keypad.
// But if the "Start Game" hasn't been clicked, checkPlayerGuess(guessValue) will do nothing because it has no player guessValue to work with.

// checkPlayerGuess() -> It proofs if the choosen letter appears in the lettersInWord array.
// If the choosen letter appears, it returns true and the position(s) of the letter inside the random word
// If choosen letter does not appear, it returns false.
function checkPlayerGuess(guessValue){

    console.log("Guessed Letter is: " + guessValue);

    let checkResult = lettersInWord.includes(guessValue.toLowerCase())
    console.log("Letter " + "\"" + guessValue + "\"" + " present inside " + randomWord + ": " + checkResult);
    
    let liElements = wordList.getElementsByTagName("li"); // It targets all the existing <li> elements inside <ul> with ID: wordList

    let target_wrong_guesses = document.getElementById("wrong-guesses");

    let matchFound = false; // Flag to track if a match is found; It begins with false because the value true will be first shown when there is a coincidence  between letter in randomWord and guessValue.
    
    //Variable "i" will act as the index of every letter inside the random word
    // This way, if the value of lettersInWord[i] matches guessValue, the variable "i" will be able to return the exact position of the coincidence, even if it happens more than once.
    for(let i = 0; i < lettersInWord.length; i++){
        if(lettersInWord[i] === guessValue.toLowerCase()){
            console.log("The letter "+ guessValue + " appears at Index: " + i);
            
            liElements[i].textContent = guessValue; // Replace the content of the <li> with the matching [i] with the guessed letter
                                                    // Using getElementsByTagName we can specify which element we target with an index, like in an array
            matchFound = true;
        }

    }

    // If no matches were found, increment the error counter
    // The if statement evaluates always if something is true. In this case, if no matches are found, matchFound will still have the initial value of false.
    // The condition !matchFound will evaluate to true -> When an If statement has a value of true, the code inside the if block will execute, incrementing the errorCounter by one.
    if(!matchFound) { 
        errorCounter++;
        console.log("No matches found. Incrementing error counter.");
    }
        
    
    target_wrong_guesses.innerText = errorCounter;
}



//------------------TO DO Functions (part of the Start Game Function) -----------------------------------


function resetWordBox() {

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