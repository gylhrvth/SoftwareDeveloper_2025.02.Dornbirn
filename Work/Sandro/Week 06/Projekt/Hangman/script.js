const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];

// Disable all buttons on initial load
window.onload = () => {
  const buttons = document.querySelectorAll('.key-pad button');
  buttons.forEach(button => {
    button.disabled = true;
    button.classList.add('disabled');
  });
};

//--global variables--//
let selectedWord = null;
let hint = '';


function startGame() {
  // hide button
  hideStartButton();
  // load pictures
  initializeHangmanImage();
  // Reset all disabled buttons
  resetButtons();
  // Clear the word-box div
  resetWordBox();
  // set counter to 6
  resetHint();
  // Reset the Hint box
  resetCounter();
  // Select a random word
  selectRndWord();
  // Display the selected word
  displayWord();
  // Display Container
  showContainer();

}
function showContainer() {
  const elements = ['.main-container', '.hangman-box', '.word-box', '.hint-box', '.info-box'];
  elements.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = 'flex';
    }
  });
}

function hideStartButton() {
  const startButton = document.querySelector('#start-game');
  if (startButton) {
    startButton.style.display = 'none'; // Hide the button
    startButton.disabled = true; // Disable the button
  }
}

function resetHint() {
  const hintBox = document.querySelector('.hint-box #hint');
  hintBox.textContent = ''; // Clear the hint box
  hint = ''; // Reset the hint variable}
}

function resetCounter() {
  const infoBox = document.querySelector('.info-box #counter');
  infoBox.textContent = 6;
}

function resetWordBox() {
  const wordBox = document.querySelector('.word-box #wordlist');
  wordBox.innerHTML = '';
}

function displayWord() {
  console.log('Selected word:', selectedWord);
  // Write the selected word to the word-box div
  let letters = selectedWord.toUpperCase().split('');

  const wordBox = document.querySelector('.word-box #wordlist');
  for (let i = 0; i < selectedWord.length; i++) {
    const li = document.createElement('li');
    li.textContent = letters[i]; // Placeholder for each letter
    wordBox.appendChild(li);
  }


}

function selectRndWord() {
  selectedWord = fruits[Math.floor(Math.random() * fruits.length)];
  //console.log('Selected word:', selectedWord);
  return selectedWord;
}

function resetButtons() {
  const disabledButtons = document.querySelectorAll('button.disabled');
  for (let i = 0; i < disabledButtons.length; i++) {
    disabledButtons[i].disabled = false;
    disabledButtons[i].classList.remove('disabled');
  }

}

function handleKeyPress(letter) {
  letter = letter.toUpperCase();
  console.log("Letter = " + letter);
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('disabled');
    // Log all disabled buttons
    const disabledButtons = document.querySelectorAll('button.disabled');
    console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
    console.log(`Key pressed: ${letter}`);
  }
  checkGuess(letter);
  updateHangmanImage();
  checkWinCondition();
  showHint();

}

function checkGuess(guess) {
  const wordBox = document.querySelector('.word-box #wordlist');
  const letters = wordBox.querySelectorAll('li');
  let found = false;

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toUpperCase() === guess.toUpperCase()) {
      letters[i].style.color = 'green'; // Change color to green
      letters[i].classList.add('animate-correct'); // Add a CSS class for animation
      found = true;
    }
  }

  if (found) {
    console.log(`The letter "${guess}" is in the word.`);
  } else {
    updateCounter();
    console.log(`The letter "${guess}" is not in the word.`);
  }


}

function showEndGamePopup(message) {
  // Create a popup container
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.width = '100%';
  popup.style.height = '100%';
  popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  popup.style.display = 'flex';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.style.zIndex = '1000';

  // Create a message box
  const messageBox = document.createElement('div');
  messageBox.style.backgroundColor = 'white';
  messageBox.style.padding = '20px';
  messageBox.style.borderRadius = '10px';
  messageBox.style.textAlign = 'center';
  messageBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

  // Add the message
  const messageText = document.createElement('p');
  messageText.textContent = message;
  messageText.style.fontSize = '24px';
  messageText.style.marginBottom = '20px';
  messageBox.appendChild(messageText);

  // Add a restart button
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart Game';
  restartButton.style.padding = '10px 20px';
  restartButton.style.fontSize = '18px';
  restartButton.style.cursor = 'pointer';
  restartButton.addEventListener('click', () => {
    popup.remove();
    startGame();
  });
  messageBox.appendChild(restartButton);

  popup.appendChild(messageBox);
  document.body.appendChild(popup);
}

function checkWinCondition() {
  const wordBox = document.querySelector('.word-box #wordlist');
  const letters = wordBox.querySelectorAll('li');
  let allRevealed = true;

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].style.color !== 'green') {
      allRevealed = false;
      break;
    }
  }

  if (allRevealed) {
    showEndGamePopup('Congratulations! You won!');
  }
}
function showHint() {
  const infoBox = document.querySelector('.info-box #counter');
  const counter = parseInt(infoBox.textContent) || 6;
  console.log('Hint-boxCounter:', counter);
  console.log('Selected word:', selectedWord);
  console.log('Hint:', hint);

  if (selectedWord === 'apple') {
    hint = "Its mostly Red, but sometimes green, yellow or pink";
  }
  if (selectedWord === 'banana') {
    hint = "Its yellow and long";
  }
  if (selectedWord === 'cherry') {
    hint = "Its red and small";
  }
  if (selectedWord === 'grape') {
    hint = "Its small and round";
  }
  if (selectedWord === 'kiwi') {
    hint = "Its brown and hairy";
  }
  if (selectedWord === 'lemon') {
    hint = "Its yellow and sour";
  }
  if (selectedWord === 'mango') {
    hint = "Its yellow and sweet";
  }
  if (selectedWord === 'orange') {
    hint = "Its orange and round";
  }
  if (selectedWord === 'papaya') {
    hint = "Its orange and long";
  }
  if (selectedWord === 'raspberry') {
    hint = "Its red and small";
  }
  if (selectedWord === 'strawberry') {
    hint = "Its red and small";
  }
  if (selectedWord === 'watermelon') {
    hint = "Its green and red";
  }

  if (counter === 2) {
    const hintBox = document.querySelector('.hint-box #hint');
    hintBox.textContent = hint;
  }
}

function updateCounter() {
  const infoBox = document.querySelector('.info-box #counter');
  let counter = parseInt(infoBox.textContent) || 6;

  if (counter > 0) {
    counter--;
    infoBox.textContent = counter;
  }

  if (counter === 0) {
    console.log('Game Over');
    setTimeout(() => {
      showEndGamePopup('Game Over! You lost!');
    }, 1000);
  }
}

function updateHangmanImage() {
  const hangmanBox = document.querySelector('.hangman-box img');
  const infoBox = document.querySelector('.info-box #counter');
  const wrongGuesses = 6 - parseInt(infoBox.textContent) || 0;

  if (wrongGuesses >= 0 && wrongGuesses <= 6) {
    hangmanBox.src = `img/hangman-${wrongGuesses}.svg`;
  }
}

function initializeHangmanImage() {
  const hangmanBox = document.querySelector('.hangman-box');
  hangmanBox.innerHTML = '<img src="img/hangman-0.svg" alt="Hangman">';
}

