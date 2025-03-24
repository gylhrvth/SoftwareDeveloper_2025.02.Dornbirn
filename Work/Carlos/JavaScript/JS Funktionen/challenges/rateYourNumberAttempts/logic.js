//generates a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("Target Number is: " + targetNumber);

let clickCount = 7; // The cliickCount must be declared outside the checkGuess Function. Otherwise, everytime I click the button, clickCount reinitializes to 0.

//call function checkGuess when the button is clicked
function checkGuess() {
  //initialize variables, constants for dom elements
  const userInput = document.getElementById("userInput").value;
  const feedback = document.getElementById("feedback");
  const result = document.getElementById("result");
  console.log("User Input is: " + userInput);
  console.log("Feedback is: " + feedback);
  console.log("Result is: " + result);

  //check if the user input is empty
  if (!userInput) {
    feedback.textContent = "Bitte geben Sie eine Zahl ein.";
    feedback.classList.remove(...feedback.classList);
    feedback.classList.add("error")
    return;
  }
  console.log("User Input");
  //convert the user input to a number
  //Die 10 in parseInt(userInput, 10) gibt die Basis (Radix) an, die für die Umwandlung des Strings in eine Ganzzahl verwendet wird. In diesem Fall bedeutet die Basis 10, dass der String als Dezimalzahl interpretiert wird.

  let guess = userInput;

    //convert the user input to a number, parseInt returns NaN if the input is not a number, 10 is the radix,
    guess = parseInt(userInput, 10);
    if (isNaN(guess)) {
        feedback.textContent = "Sie haben KEINE Zahl eingegeben!";
        feedback.classList.remove(...feedback.classList);
        feedback.classList.add("error")
        return;
    }

    if (guess > 100 || guess < 1) {
        feedback.textContent =
          "Die Zahl liegt außerhalb des akzeptierten Bereichs.";
          feedback.classList.remove(...feedback.classList);
          feedback.classList.add("error")
        return;
    }
    console.log("Guess is: " + guess);

    checkMyGuess(guess)
}
  //TODO: check if the number is between 1 and 100

  //check if the user input is correct
  //if the number is lower than the target number, display "The number is too low."

function updateCounter(){
    let gameOverDiv = document.getElementById("gameOver");
    let counterSpan = document.getElementById("counter");
    counterSpan.innerText = clickCount;

    if (clickCount < 1) {
      gameOverDiv.textContent = "GAME OVER";
      gameOverDiv.classList.remove(...gameOverDiv.classList)
      gameOverDiv.classList.add("active")
    }


}

  function checkMyGuess(userGuess) {
    feedback.classList.remove(...feedback.classList);
    if (userGuess == targetNumber) {
        feedback.textContent = "";
        result.textContent = "Herzlichen Glückwunsch! Du hast die richtige Zahl erraten!";
    } else {
        --clickCount
        updateCounter()
        if (userGuess > targetNumber) {
            if (userGuess - targetNumber <= 5){
                feedback.textContent =
                "Du bist fast richtig, die Geheimzahl ist noch etwas kleiner!!!";
                feedback.classList.add('close')
            } else {
                feedback.textContent = "Die Zahl ist zu hoch.";
            }
        } else {
            if (targetNumber - userGuess <= 5){
                feedback.textContent =
                "Du bist fast richtig, die Geheimzahl ist noch etwas größer!!!";
                feedback.classList.add('close')
            } else {
                feedback.textContent = "Die Zahl ist zu niedrig.";
            }
        }
    }
}
  

  function resetButton() {
    // Reset the input field
    const userInput = document.getElementById("userInput");
    userInput.value = "";

    // Reset the feedback and result messages
    const feedback = document.getElementById("feedback");
    feedback.textContent = "Ihr Feedback erscheint hier.";
    feedback.style.backgroundColor = "";
    feedback.style.color = "";

    const result = document.getElementById("result");
    result.textContent = "";

    // Reset the attempts counter
    clickCount = 7; // Reset clickCount to its initial value
    const counterSpan = document.getElementById("counter");
    counterSpan.innerText = clickCount;

    // Clear the "GAME OVER" message
    const gameOver = document.getElementById("gameOver");
    gameOver.textContent = "";
    gameOver.style.backgroundColor = "";
    gameOver.style.color = "";
  }

