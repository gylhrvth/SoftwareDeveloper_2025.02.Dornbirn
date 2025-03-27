const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon']; // Array mit verschiedenen Früchten
let selectedWord = '', displayedWord = '', wrongGuesses = 0; // Deklaration und Initialisierung der Variablen für das ausgewählte Wort, das angezeigte Wort und die Anzahl der falschen Versuche

const startGame = () => { // Funktion zum Starten des Spiels
  resetButtons(); // Setzt alle deaktivierten Buttons zurück
  resetWordBox(); // Löscht den Inhalt der Wort-Box
  selectRndWord(); // Wählt ein zufälliges Wort aus dem Array fruits
  displayWord(); // Zeigt das ausgewählte Wort als Unterstriche an
  wrongGuesses = 0; // Setzt die Anzahl der falschen Versuche zurück
  document.getElementById('wrong-guesses').textContent = wrongGuesses; // Aktualisiert die Anzeige der falschen Versuche
};

const resetWordBox = () => document.getElementById('wordlist').innerHTML = ''; // Funktion zum Löschen des Inhalts der Wort-Box

const selectRndWord = () => { // Funktion zum Auswählen eines zufälligen Wortes
  selectedWord = fruits[Math.floor(Math.random() * fruits.length)]; // Wählt ein zufälliges Wort aus dem Array fruits
  displayedWord = '_'.repeat(selectedWord.length); // Erstellt eine Zeichenfolge aus Unterstrichen, die die gleiche Länge wie das ausgewählte Wort hat
};

const displayWord = () => { // Funktion zum Anzeigen des ausgewählten Wortes
  const wordBox = document.getElementById('wordlist'); // Sucht das HTML-Element mit der ID wordlist
  wordBox.innerHTML = displayedWord.split('').map(char => `<li>${char}</li>`).join(''); // Wandelt die Zeichenfolge displayedWord in eine Liste von <li>-Elementen um und fügt sie in die Wort-Box ein
};

const resetButtons = () => { // Funktion zum Zurücksetzen der deaktivierten Buttons
  document.querySelectorAll('button.disabled').forEach(button => { // Sucht alle deaktivierten Buttons
    button.disabled = false; // Aktiviert den Button
    button.classList.remove('disabled'); // Entfernt die CSS-Klasse disabled vom Button
  });
};

const handleKeyPress = letter => { // Funktion zum Verarbeiten des Tastendrucks
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`); // Sucht den Button, der die Funktion handleKeyPress mit dem Parameter letter aufruft
  if (button) { // Überprüft, ob der Button existiert
    button.disabled = true; // Deaktiviert den Button
    button.classList.add('disabled'); // Fügt die CSS-Klasse disabled zum Button hinzu
    console.log(`Guess = ${letter}`); // Gibt den geratenen Buchstaben in der Konsole aus
    console.log('Disabled buttons:', Array.from(document.querySelectorAll('button.disabled')).map(btn => btn.textContent)); // Gibt die Texte der deaktivierten Buttons in der Konsole aus
    console.log(`Key pressed: ${letter}`); // Gibt den gedrückten Buchstaben in der Konsole aus

    let newDisplayedWord = '', correctGuess = false; // Deklaration und Initialisierung der Variablen für das neue angezeigte Wort und die Überprüfung des korrekten Buchstabens
    for (let i = 0; i < selectedWord.length; i++) { // Schleife, die durch jedes Zeichen im ausgewählten Wort iteriert
      newDisplayedWord += selectedWord[i] === letter ? letter : displayedWord[i]; // Fügt den geratenen Buchstaben zur neuen Zeichenfolge hinzu, wenn er korrekt ist, ansonsten den Unterstrich
      correctGuess = correctGuess || selectedWord[i] === letter; // Überprüft, ob der Buchstabe korrekt geraten wurde
    }
    displayedWord = newDisplayedWord; // Aktualisiert die Zeichenfolge displayedWord
    displayWord(); // Zeigt die aktualisierte Zeichenfolge an

    if (!correctGuess) { // Überprüft, ob der Buchstabe falsch geraten wurde
      document.getElementById('wrong-guesses').textContent = ++wrongGuesses; // Erhöht die Anzahl der falschen Versuche und aktualisiert die Anzeige
    }
  }
};









