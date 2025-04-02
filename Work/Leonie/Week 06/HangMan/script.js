
let catNumb = 0;
let word = '';
let categorieName = '';
let splitWord = [];
let guess = '';
let wrongGuesses = 0;
let rightGuess = 0;

const wordMatrix = [
  ['Obst', 'Apfel'],
  ['Obst', 'Banane'],
  ['Obst', 'Zitrone'],
  ['Obst', 'Kirsche'],
  ['Obst', 'Erdbeere'],
  ['Automarke', 'Audi'],
  ['Automarke', 'BMW'],
  ['Automarke', 'Mercedes'],
  ['Automarke', 'Volkswagen'],
  ['Automarke', 'Ford'],
  ['Tier', 'Katze'],
  ['Tier', 'Hund'],
  ['Tier', 'Elefant'],
  ['Tier', 'Löwe'],
  ['Tier', 'Tiger'],
  ['Land', 'Österreich'],
  ['Land', 'Deutschland'],
  ['Land', 'Frankreich'],
  ['Land', 'Italien'],
  ['Land', 'Spanien'],
  ['Obst', 'Birne'],
  ['Obst', 'Traube'],
  ['Obst', 'Pfirsich'],
  ['Obst', 'Melone'],
  ['Automarke', 'Toyota'],
  ['Automarke', 'Honda'],
  ['Automarke', 'Nissan'],
  ['Automarke', 'Chevrolet'],
  ['Tier', 'Pferd'],
  ['Tier', 'Schaf'],
  ['Tier', 'Kuh'],
  ['Tier', 'Hase'],
  ['Land', 'Belgien'],
  ['Land', 'Niederlande'],
  ['Land', 'Schweden'],
  ['Land', 'Norwegen'],
]

let score = JSON.parse(localStorage.getItem('Score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}


function startGame() {
  // Reset all disabled buttons
  resetButtons();
  // Clear the word-box div
  resetWordBox();
  // Select a random word and category
  selectRndWord();
  // Split the word into an array of letters
  splitingWord();
  // Display the selected word
  displayWord();
  console.log(`Selected word: ${categorieName} - ${word}`);

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

  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  catNumb = 0;
  // Reset category
}

function checkGuess() {
  let correctGuess = false;
  wordList = document.getElementById('wordlist');
  for (let i = 0; i < splitWord.length; i++) {
    if (splitWord[i] === guess) {
      rightGuess++;
      correctGuess = true;
      wordList.children[i].textContent = guess;
    }
  }
  if (!correctGuess) {
    wrongGuess();
  }
  if (rightGuess === splitWord.length) {
    score.wins++;
    localStorage.setItem('Score', JSON.stringify(score));
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Herzlichen Glückwunsch! Das Wort war: ${word}`;
    setTimeout(() => {
      resetGame();
    }
      , 4000);
  }
}

function wrongGuess() {
  wordList = document.getElementById('wordlist');
  if (wrongGuesses < 6) {
    // Füge einen weiteren falschen Versuch hinzu
    wrongGuesses++;

    const wrongGuessesElement = document.getElementById('wrong-guesses');
    wrongGuessesElement.textContent = `${6 - wrongGuesses}/6`;

    // Ersetze das Bild basierend auf der Anzahl der falschen Versuche
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `../../Week 05/JavaScript/Projekt/img/hangman-${wrongGuesses}.svg`;

  }
  if (wrongGuesses === 3) {
    const hint = document.getElementById('hint-text');
    hint.textContent = `Die Kategorie: ${categorieName}`;
  }
  if (wrongGuesses === 6) {
    score.losses++;
    localStorage.setItem('Score', JSON.stringify(score));
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `../../Week 05/JavaScript/Projekt/img/hangman-${wrongGuesses}.svg`;
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Game over: Du hast verloren! Das Wort war: ${word}`;

    setTimeout(() => {
      resetGame();
    }
      , 4000);
  }
}

function splitingWord() {
  splitWord = word.toUpperCase().split('');

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
  }
}

function selectRndWord() {
  // Wähle ein zufälliges Wort aus dem ausgewählten Array
  let rndNmbr = Math.floor(Math.random() * wordMatrix.length);
  word = wordMatrix[rndNmbr][1];
  categorieName = wordMatrix[rndNmbr][0];


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
  const wordList = document.getElementById('wordlist');

  // Überprüfen, ob <li>-Elemente in der wordlist vorhanden sind
  if (!wordList || wordList.children.length === 0) {
    return; // Beende die Funktion, wenn keine <li>-Elemente vorhanden sind
  }
  if (feedback.textContent !== '') {
    return; // Beende die Funktion, wenn bereits ein Feedback angezeigt wird
  }
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

function showScore() {
  alert(`Wins: ${score.wins}
Losses: ${score.losses}`);
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  localStorage.setItem('Score', JSON.stringify(score));
  alert('Score has been reset');
}