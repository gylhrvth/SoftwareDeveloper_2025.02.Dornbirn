const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];

// -- global variables --
let lettersPressed = []; // Array to store pressed letters
let selectedWord = null; // Variable to store the selected word
let disabledButtons = document.querySelectorAll('button.disabled');


// -- functions --
// Function to start the game and Reset the game state
// Just calls a bunch of functions, didnt do anything on its own

function startGame() {
  // Reset all disabled buttons
  resetButtons();
  // Clear the word-box div
  resetWordBox();
  // Select a random word
  selectRndWord();
  // Display the selected word
  displayWord();

}
// Main Function to proceed the game.
// This function is called when a letter button is pressed, so every click lets us update the game state
function handleKeyPress(letter) {
  console.log("Letter pressed: " + letter);
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('disabled');
    // Log all disabled buttons
    disabledButtons = document.querySelectorAll('button.disabled');
    console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
    console.log(`Key pressed: ${letter}`);
    // --- added code ---
    // Collect all pressed letters in an array
    lettersPressed.push(letter);
    console.log('Letters pressed:', lettersPressed);

    console.log("Selected word in the button pressed function: " + selectedWord);



  }
}


// Helper functions
// Functions get a job, simply and plain. Does that job and nothing else.
// Name them after the job they do, so you know what they do at first glance.

function resetWordBox() {

}
function resetButtons() {
  for (let i = 0; i < disabledButtons.length; i++) {
    disabledButtons[i].disabled = false;
    disabledButtons[i].classList.remove('disabled');
  }
  console.log('All buttons reset to enabled state.');

}
function displayWord() {
}
function selectRndWord() {
  const randomIndex = Math.floor(Math.random() * fruits.length);
  // later update more arrays with diffrent categories
  selectedWord = fruits[randomIndex];
  // Store the selected word in a global variable or pass it to displayWord function
  console.log("Selected word in function [selectRndWord]: " + selectedWord);
  return selectedWord;

}




