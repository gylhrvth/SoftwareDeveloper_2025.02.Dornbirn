const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];
let word = '';
let splitWord = [];
let indexLetter = 0;
let guess = '';
let wrongGuesses = 0;
let rightGuess = 0;

function startGame() {
  // Reset all disabled buttons
  resetButtons();
  // Clear the word-box div
  resetWordBox();
  // Select a random word
  selectRndWord();
  // Split the word into an array of letters
  splitingWord();
  // Display the selected word
  displayWord();


}
function resetGame() {
  // Reset all disabled buttons
  resetButtons();
  // Clear the word-box div
  resetWordBox();

  // Reset wrongGuesses
  wrongGuesses = 0;
  const wrongGuessesElement = document.getElementById('wrong-guesses');
  wrongGuessesElement.textContent = `6 /6`;
  // Reset rightGuess
  rightGuess = 0;
  // Reset hangman image
  const hangmanImage = document.getElementById('hangman-image');
  hangmanImage.src = '../../Week 05/JavaScript/Projekt/img/hangman-0.svg';
  // Reset hint
  const hint = document.getElementById('hint-text');
  hint.textContent = '';
}

function checkGuess() {
  let correctGuess = false;
  wordList = document.getElementById('wordlist');
  for (let i = 0; i < splitWord.length; i++) {
    if (splitWord[i] === guess) {
      rightGuess++;
      console.log('Right guesses:', rightGuess);
      correctGuess = true;
      wordList.children[i].textContent = guess;
    }
  }
  if (!correctGuess) {
    wrongGuesses++;
    //console.log('Wrong guesses:', wrongGuesses);

    const wrongGuessesElement = document.getElementById('wrong-guesses');
    wrongGuessesElement.textContent = `${6 - wrongGuesses}/6`;

    // Ersetze das Bild basierend auf der Anzahl der falschen Versuche
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `../../Week 05/JavaScript/Projekt/img/hangman-${wrongGuesses}.svg`;
  }

  if (wrongGuesses === 3) {
    const hint = document.getElementById('hint-text');
    hint.textContent = 'This is a fruit';

  }

  if (wrongGuesses === 6) {
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `../../Week 05/JavaScript/Projekt/img/hangman-${wrongGuesses}.svg`;
    
    setTimeout(() => {
      alert(`Game over: You lost! The word was: ${word}`);
      resetGame();
    }
    , 100);

  }

  if (rightGuess === splitWord.length) {
    setTimeout(() => {
      alert(`Congratulations! You won! The word was: ${word}`);
      resetGame();
    }
    , 100);
  }
}

function splitingWord() {
  splitWord = word.toUpperCase().split('');
  console.log('Split word:', splitWord);

}

function resetWordBox() {
  const wordList = document.getElementById('wordlist');
  wordList.innerHTML = '';

}


function displayWord() {
  const wordList = document.getElementById('wordlist');
  wordList.innerHTML = ''; // Leere die Liste, falls sie bereits gefüllt ist

  for (let i = 0; i < word.length; i++) {
    const li = document.createElement('li');
    li.textContent = '_'; // Platzhalter für den Buchstaben
    wordList.appendChild(li);
    console.log('Wordlist:', wordList);
  }
}

function selectRndWord() {
  let rndNmbr = Math.floor(Math.random() * fruits.length);
  word = fruits[rndNmbr];
  console.log("Word = " + word);
  return word;
}

function resetButtons() {
  const disabledButtons = document.querySelectorAll('button.disabled');
  for (let i = 0; i < disabledButtons.length; i++) {
    disabledButtons[i].disabled = false;
    disabledButtons[i].classList.remove('disabled');
  }

}

function handleKeyPress(letter) {
  guess = letter;
  console.log("Guess = " + guess);
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('disabled');
    // Log all disabled buttons
    const disabledButtons = document.querySelectorAll('button.disabled');
    console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
    console.log(`Key pressed: ${letter}`);
    checkGuess();

  }
}


