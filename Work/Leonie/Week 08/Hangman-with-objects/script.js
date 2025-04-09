let word = '';
let categorieName = '';
let wordhint = '';
let splitWord = [];
let guess = '';
let wrongGuesses = 0;
let rightGuess = 0;

const wordMatrix = [
  {category: 'Animals', words: 'Katze', hint: 'Tier'},
  {category: 'Animals', words: 'Hund', hint: 'Tier'},
  {category: 'Animals', words: 'Maus', hint: 'Tier'},
  {category: 'Animals', words: 'Vogel', hint: 'Tier'},
  {category: 'Animals', words: 'Fisch', hint: 'Tier'},
  {category: 'Animals', words: 'Pferd', hint: 'Tier'},
  {category: 'Animals', words: 'Elefant', hint: 'Tier'},
  {category: 'Animals', words: 'Löwe', hint: 'Tier'},
  {category: 'Cars', words: 'VW', hint: 'Automarke'},
  {category: 'Cars', words: 'BMW', hint: 'Automarke'},
  {category: 'Cars', words: 'Mercedes', hint: 'Automarke'},
  {category: 'Cars', words: 'Audi', hint: 'Automarke'},
  {category: 'Cars', words: 'Porsche', hint: 'Automarke'},
  {category: 'Cars', words: 'Opel', hint: 'Automarke'},
  {category: 'Cars', words: 'Ford', hint: 'Automarke'},
  {category: 'Cars', words: 'Nissan', hint: 'Automarke'},
  {category: 'Countries', words: 'Deutschland', hint: 'Land'},
  {category: 'Countries', words: 'Oesterreich', hint: 'Land'},
  {category: 'Countries', words: 'Schweiz', hint: 'Land'},
  {category: 'Countries', words: 'Frankreich', hint: 'Land'},
  {category: 'Countries', words: 'Italien', hint: 'Land'},
  {category: 'Countries', words: 'Spanien', hint: 'Land'},
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
  // Reset category
}

function playAgain() {
  // Verstecke das Popup
  const popup = document.querySelector('.popup');
  const boxtransp = document.querySelector('.boxtransp');

  if (popup) {
    popup.style.display = 'none'; // Setze das Display auf 'none'
  }

  if (boxtransp) {
    boxtransp.style.display = 'none'; // Setze das Display auf 'none'
  }

  // Reset all disabled buttons
  resetGame();
  startGame();
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
    // Zeige das Popup
    showPopup();
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Herzlichen Glückwunsch! Das Wort war: ${word}`;

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
    hint.textContent = `Die Kategorie: ${wordhint}`;
  }
  if (wrongGuesses === 6) {
    score.losses++;
    localStorage.setItem('Score', JSON.stringify(score));
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `../../Week 05/JavaScript/Projekt/img/hangman-${wrongGuesses}.svg`;
    // Zeige das Popup
    showPopup();
    const feedback = document.getElementById('feedback');
    feedback.textContent = `Game over: Du hast verloren! Das Wort war: ${word}`;
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
  const randomIndex = Math.floor(Math.random() * wordMatrix.length);
  const randomWordObject = wordMatrix[randomIndex];
  categorieName = randomWordObject.category;
  word = randomWordObject.words;
  wordhint = randomWordObject.hint;

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
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('disabled');
    // Log all disabled buttons
    const disabledButtons = document.querySelectorAll('button.disabled');
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

function showPopup() {
  const popup = document.querySelector('.popup');
  const boxtransp = document.querySelector('.boxtransp');

  if (popup) {
    popup.style.display = 'block'; // Zeige das Popup
  }
  if (boxtransp) {
    boxtransp.style.display = 'block'; // Zeige den transparenten Hintergrund
  }
}

function closePopup() {
  const popup = document.querySelector('.popup');
  const boxtransp = document.querySelector('.boxtransp');

  if (popup) {
    popup.style.display = 'none'; // Zeige das Popup
  }
  if (boxtransp) {
    boxtransp.style.display = 'none'; // Zeige den transparenten Hintergrund
  }
  resetGame();
}
  
