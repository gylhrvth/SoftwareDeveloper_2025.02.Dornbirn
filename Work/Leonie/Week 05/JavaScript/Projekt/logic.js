// generates a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("Target Number is: " + targetNumber);

// initialize tryCount outside the function to keep track of attempts
let tryCount = 0;

// call function checkGuess when the button is clicked
function checkGuess() {
    // initialize variables, constants for dom elements
    const userInput = document.getElementById('userInput').value;
    const feedback = document.getElementById('feedback');
    const result = document.getElementById('result');
    const hangmanImage = document.getElementById('hangmanImage');
    console.log("User Input is: " + userInput);
    console.log("Feedback is: " + feedback);
    console.log("Result is: " + result);

    // check if the user input is empty
    if (!userInput) {
        feedback.textContent = "Bitte geben Sie eine Zahl ein.";
        return;
    }
    console.log("User Input");
    // convert the user input to a number
    // Die 10 in parseInt(userInput, 10) gibt die Basis (Radix) an, die für die Umwandlung des Strings in eine Ganzzahl verwendet wird. In diesem Fall bedeutet die Basis 10, dass der String als Dezimalzahl interpretiert wird.

    let validInput = false;
    let guess = userInput;

    while (validInput == false) {
        // convert the user input to a number, parseInt returns NaN if the input is not a number, 10 is the radix, 
        guess = parseInt(userInput, 10);

        if (!isNaN(guess)) {
            validInput = true;
        } else {
            feedback.textContent = "Sie haben KEINE Zahl eingegeben!";
            return;
        }
    }

    console.log("Guess is: " + guess);
    console.log("Valid Input is: " + validInput);

    // check if the number is between 1 and 100
    if (guess > 100) {
        feedback.textContent = "Die Zahl ist größer als 100!!! Bitte geben Sie eine Zahl ZWISCHEN 1 und 100";
        return;
    }
    if (guess < 1) {
        feedback.textContent = "Die Zahl ist kleiner als 1!!! Bitte geben Sie eine Zahl ZWISCHEN 1 und 100";
        return;
    }

    // check if the user input is correct
    if (guess < targetNumber) {
        ++tryCount;
        feedback.textContent = "Die Zahl ist zu niedrig. Sie haben " + tryCount + " von 6 Versuchen verbraucht";
        console.log("TryCount: " + tryCount);
    } else if (guess > targetNumber) {
        ++tryCount;
        feedback.textContent = "Die Zahl ist zu hoch. Sie haben " + tryCount + " von 6 Versuchen verbraucht";
        console.log("TryCount: " + tryCount);
    } else {
        feedback.textContent = "";
        result.textContent = "Herzlichen Glückwunsch! Sie haben die richtige Zahl erraten!";
    }

    // update hangman image based on tryCount
    hangmanImage.src = `img/hangman-${tryCount}.svg`;

    // check if the user has reached the maximum number of attempts
    if (tryCount >= 6) {
        feedback.textContent = "Sie haben die maximale Anzahl von Versuchen erreicht. Das Spiel ist vorbei.";
        result.textContent = "Die richtige Zahl war: " + targetNumber;
    }
}
