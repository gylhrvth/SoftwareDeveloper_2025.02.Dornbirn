// Globale Variablen
const choices = ["schere", "stein", "papier"];
const resultDisplay = document.querySelector("#result");
const scoreDisplay = document.querySelector("#score");
let playerScore = 0;
let computerScore = 0;

// Score Objekt


// Start Game Funktion
function startGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  updateScores(result);
  displayResult(playerChoice, computerChoice, result);
}

// Hilfsfunktionen

// Zufällige Wahl des Computers
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Gewinner bestimmen
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Unentschieden";
  }
  if (
    (playerChoice === "schere" && computerChoice === "papier") ||
    (playerChoice === "stein" && computerChoice === "schere") ||
    (playerChoice === "papier" && computerChoice === "stein")
  ) {
    return "Spieler";
  }
  return "Computer";
}

// Punkte aktualisieren
function updateScores(result) {
  if (result === "Spieler") {
    playerScore++;
    score.win++;
  } else if (result === "Computer") {
    computerScore++;
    score.lose++;
  }
  if (result === "Unentschieden") {
    score.tie++;
  }
}

// Ergebnis anzeigen
function displayResult(playerChoice, computerChoice, result) {
  if (result === "Unentschieden") {
    resultDisplay.textContent = `Unentschieden!`;
  } else {
    resultDisplay.textContent = `${result} gewinnt!
  Spieler wählt: ${playerChoice}
  Computer wählt: ${computerChoice}`;
    scoreDisplay.textContent = `Spieler: ${playerScore} - Computer: ${computerScore}`;
  }
  console.log(`Spieler wählt: ${playerChoice}`);
  console.log(`Computer wählt: ${computerChoice}`);
  console.log(`Ergebnis: ${result}`);
  console.log(`Spieler: ${playerScore} - Computer: ${computerScore}`);
}

