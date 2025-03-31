// Erstellt ein Array mit verschiedenen Fruchtnamen als Zeichenketten (Strings). 
const fruits = [  
  'apple',       
  'banana',      
  'cherry',      
  'grape',       
  'kiwi',        
  'lemon',       
  'mango',       
  'orange',      
  'papaya',      
  'raspberry',   
  'strawberry',  
  'watermelon',  
  'pear',        
  'peach',       
  'plum',        
  'apricot',     
  'blueberry',   
  'blackberry',  
  'pomegranate', 
  'fig',         
  'cantaloupe',  
  'nectarine',   
  'dragonfruit'  
];              // ']' schließt das Array ab.



// Deklariert Variablen für das Spiel
let selectedWord = '';   // 'let' deklariert eine veränderbare Variable 'selectedWord', die einen String speichert. Sie ist leer initialisiert.
let displayedWord = '';  // 'let' deklariert eine veränderbare Variable 'displayedWord', die ebenfalls einen String speichert. Sie ist leer initialisiert.
let wrongGuesses = 0;    // 'let' deklariert eine veränderbare Variable 'wrongGuesses', die die Anzahl der falschen Versuche speichert. Initialisiert mit 0.
const maxWrongGuesses = 10; // 'const' deklariert eine Konstante 'maxWrongGuesses', die die maximal erlaubten falschen Versuche speichert. Initialisiert mit 6.



// Funktion zum Starten des Spiels
const startGame = () => {   // 'const startGame' deklariert eine Funktion namens 'startGame', die ohne Parameter arbeitet.
  resetButtons();  // 'resetButtons()' ruft die Funktion 'resetButtons' auf, die deaktivierte Buttons zurücksetzt.
  resetWordBox();  // 'resetWordBox()' ruft die Funktion 'resetWordBox' auf, um die Anzeige des Wortes zu löschen.
  selectRndWord(); // 'selectRndWord()' ruft die Funktion 'selectRndWord' auf, um ein zufälliges Wort aus dem Array 'fruits' zu wählen.
  displayWord();   // 'displayWord()' ruft die Funktion 'displayWord' auf, um das Wort als Unterstriche anzuzeigen.
  wrongGuesses = 0;  // Setzt die Variable 'wrongGuesses' auf 0 zurück, um die Zähler für falsche Versuche zurückzusetzen.
  document.getElementById('wrong-guesses').textContent = wrongGuesses; // 'document.getElementById' sucht das HTML-Element mit der ID 'wrong-guesses' und setzt dessen Textinhalt auf den Wert von 'wrongGuesses'.
};



// Funktion zum Löschen der Wortanzeige im HTML
const resetWordBox = () => document.getElementById('wordlist').innerHTML = ''; 
// 'const resetWordBox' deklariert eine Funktion, die das HTML-Element mit der ID 'wordlist' auswählt und dessen inneren HTML-Inhalt (die Wortanzeige) auf einen leeren String setzt, um das Wort zu löschen.



// Funktion, die ein zufälliges Wort aus dem Array 'fruits' auswählt.
const selectRndWord = () => {  // 'const selectRndWord' deklariert eine Funktion, die ein zufälliges Wort auswählt.
  selectedWord = fruits[Math.floor(Math.random() * fruits.length)]; // 'fruits[Math.floor(Math.random() * fruits.length)]' wählt ein zufälliges Wort aus dem Array 'fruits', indem es eine zufällige Zahl erzeugt, die auf einen Index im Array verweist.
  displayedWord = '_'.repeat(selectedWord.length); // '_'.repeat(selectedWord.length) erstellt eine Zeichenkette aus Unterstrichen, deren Länge der Länge des ausgewählten Wortes entspricht.
};



// Funktion zur Anzeige des Wortes im HTML.
const displayWord = () => {  // 'const displayWord' deklariert eine Funktion zur Anzeige des Wortes.
  const wordBox = document.getElementById('wordlist'); // 'document.getElementById' sucht das HTML-Element mit der ID 'wordlist' und speichert es in der Variable 'wordBox'.
  wordBox.innerHTML = displayedWord                    // 'innerHTML' ist eine Eigenschaft des HTML-Elements, die dessen Inhalt festlegt. Hier wird 'displayedWord' als Inhalt gesetzt.
    .split('')                                         // '.split('')' teilt die Zeichenkette 'displayedWord' in einzelne Zeichen auf und gibt ein Array dieser Zeichen zurück.
    .map(char => `<li>${char}</li>`)                   // '.map(char => `<li>${char}</li>')' erstellt aus jedem Zeichen ein <li>-Element.
    .join('');                                         // '.join('')' fügt die <li>-Elemente wieder zu einer einzigen Zeichenkette zusammen, um sie in das HTML einzufügen.
};



// Funktion zum Zurücksetzen der deaktivierten Buttons.
const resetButtons = () => {  // 'const resetButtons' deklariert eine Funktion, die alle deaktivierten Buttons zurücksetzt.
  document.querySelectorAll('button.disabled').forEach(button => { // 'document.querySelectorAll' sucht alle HTML-Buttons mit der Klasse 'disabled' und führt eine Schleife für jeden dieser Buttons aus.
    button.disabled = false;  // 'button.disabled = false' setzt die Eigenschaft 'disabled' jedes Buttons auf 'false', um ihn zu aktivieren.
    button.classList.remove('disabled'); // 'button.classList.remove('disabled')' entfernt die CSS-Klasse 'disabled' vom Button, um die Deaktivierung visuell zu entfernen.
  });
};



// Funktion zum Verarbeiten des Tastendrucks.
const handleKeyPress = letter => {  // 'const handleKeyPress' deklariert eine Funktion, die auf einen Tastendruck reagiert und den Buchstaben als Parameter übernimmt.
  if (wrongGuesses >= maxWrongGuesses) return; // Überprüft, ob die maximale Anzahl falscher Versuche erreicht wurde. Falls ja, bricht die Funktion ab.
  
  const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`); // 'document.querySelector' sucht den Button, der die Funktion 'handleKeyPress' mit dem übergebenen Buchstaben aufruft.
  if (button) {  // Überprüft, ob der Button existiert (d.h. ob der Buchstabe ein gültiger Button ist).
    button.disabled = true;  // Deaktiviert den Button, damit der Buchstabe nicht nochmal eingegeben werden kann.
    button.classList.add('disabled'); // Fügt die CSS-Klasse 'disabled' zum Button hinzu, um ihn visuell zu deaktivieren.
    console.log(`Guess = ${letter}`); // Gibt den geratenen Buchstaben in der Konsole aus.
    console.log('Disabled buttons:', Array.from(document.querySelectorAll('button.disabled')).map(btn => btn.textContent)); // Listet alle deaktivierten Buttons auf.
    console.log(`Key pressed: ${letter}`); // Gibt den gedrückten Buchstaben in der Konsole aus.
    
    let newDisplayedWord = ''; // 'let newDisplayedWord' deklariert eine Variable, die das neu angezeigte Wort speichert.
    let correctGuess = false;  // 'let correctGuess' deklariert eine Variable, die angibt, ob der geratene Buchstabe korrekt war. Anfangs auf 'false' gesetzt.

    for (let i = 0; i < selectedWord.length; i++) { // Schleife durch jedes Zeichen des ausgewählten Wortes.
      if (selectedWord[i].toUpperCase() === letter.toUpperCase()) { // Vergleicht den aktuellen Buchstaben des ausgewählten Wortes mit dem geratenen Buchstaben, wobei Groß- und Kleinschreibung ignoriert werden.
        newDisplayedWord += selectedWord[i]; // Fügt den richtigen Buchstaben zur neuen Anzeige hinzu.
        correctGuess = true; // Setzt 'correctGuess' auf 'true', wenn der Buchstabe korrekt war.
      } else {
        newDisplayedWord += displayedWord[i]; // Beibehaltung des ursprünglichen Zeichens (Unterstrich oder korrekt erratener Buchstabe).
      }
    }
    displayedWord = newDisplayedWord; // Setzt das angezeigte Wort auf das aktualisierte 'newDisplayedWord'.
    displayWord(); // Ruft die Funktion 'displayWord' auf, um das Wort anzuzeigen.

    if (!correctGuess) { // Falls der geratene Buchstabe nicht korrekt war:
      document.getElementById('wrong-guesses').textContent = ++wrongGuesses; // Erhöht die Anzahl der falschen Versuche und aktualisiert die Anzeige der falschen Versuche.
    }

    checkGameOver(); // Ruft die Funktion 'checkGameOver' auf, um zu überprüfen, ob das Spiel gewonnen oder verloren wurde.
  }
};



// Funktion zur Überprüfung, ob das Spiel gewonnen oder verloren wurde.
const checkGameOver = () => {  // 'const checkGameOver' deklariert eine Funktion zur Überprüfung des Spielstatus.
  if (displayedWord === selectedWord) {  // Überprüft, ob das angezeigte Wort dem ausgewählten Wort entspricht. Falls ja, wurde das Spiel gewonnen.
    alert('Herzlichen Glückwunsch!! Du hast das Wort erraten!! 🎉'); // Zeigt eine Gewinnnachricht an.
    startGame(); // Startet das Spiel neu, indem 'startGame()' aufgerufen wird.
  } else if (wrongGuesses >= maxWrongGuesses) { // Falls die maximale Anzahl falscher Versuche erreicht wurde:
    alert(`GAME OVER, Das Spiel ist vorbei!!! Das gesuchte Wort war: ${selectedWord} 😞`); // Zeigt eine Nachrichtenbox mit dem gesuchten Wort an und informiert, dass das Spiel verloren wurde.
    startGame(); // Startet das Spiel neu.
  }
};











