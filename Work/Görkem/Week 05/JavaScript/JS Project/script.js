// creat a variable
let attempts = 0;
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guess = document.getElementById('guess');                                      // Holt das Eingabefeld mit der ID 'guess'
const submit = document.getElementById('submit');                                   // Holt den Button mit der ID 'submit'
const hint = document.getElementById('hint');                                      // Holt das Element mit der ID 'hint', in dem Hinweise wie "Too high!" angezeigt werden
const attemptsText = document.getElementById('attempts');                         // Holt das Element mit der ID 'attempts', das die Anzahl der Versuche anzeigt
//*console.log(guess, submit);*//

// Event listeners
submit.addEventListener('click', checkGuess);                                    // Füge einen Event Listener hinzu, der auf den Klick des Buttons wartet

function checkGuess() {
    const userValue = Number (guess.value);                                      // Der Wert des Eingabefelds mit der ID 'guess' wird abgerufen und in eine Zahl umgewandelt
    attempts++;                                                                 // Anzahl der Versuche erhöhen

    // If- Statment
    if(userValue === randomNumber) {                                            // Überprüfen, ob die Eingabe mit der Zufallszahl übereinstimmt
        hint.textContent = "🎉 Congratulations, you guessed it :-)";           // Falls richtig, Erfolgsmeldung anzeigen und Konfetti abfeuern
        fireConfetti();
    } else if (userValue < randomNumber) {                                     // Falls die Eingabe kleiner als die Zufallszahl ist, Hinweis geben
        hint.textContent = "Too low! Try again.";
    } else {                                                                   // Falls die Eingabe größer als die Zufallszahl ist, Hinweis geben
        hint.textContent = "Too high! Try again.";
    }

    attemptsText.textContent =
    "Attempts: " + attempts;                                                   // Die Anzahl der Versuche wo im HTML aktualisiert
}
// Konfetti function
function fireConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}



