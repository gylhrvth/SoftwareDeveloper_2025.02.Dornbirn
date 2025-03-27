//generates a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
console.log("Target Number is: " + targetNumber);

//call function checkGuess when the button is clicked
function checkGuess() {
  //initialize variables, constants for dom elements
  const userInput = document.getElementById('userInput').value;
  const feedback = document.getElementById('feedback');
  const result = document.getElementById('result');
  console.log("User Input is: " + userInput);
  console.log("Feedback is: " + feedback);
  console.log("Result is: " + result);


  //check if the user input is empty
  if (!userInput) {
    feedback.textContent = "Bitte geben Sie eine Zahl ein.";
    return;
  }
  console.log("User Input");
  //convert the user input to a number
  //Die 10 in parseInt(userInput, 10) gibt die Basis (Radix) an, die für die Umwandlung des Strings in eine Ganzzahl verwendet wird. In diesem Fall bedeutet die Basis 10, dass der String als Dezimalzahl interpretiert wird.


  let validInput = false;
  let guess = userInput;

  while (validInput == false) {
    //convert the user input to a number, parseInt returns NaN if the input is not a number, 10 is the radix, 
    guess = parseInt(userInput, 10);

    //if else statement to check if the input is a number
    if (!isNaN(guess)) {
      //if statement to check if the number is between 1 and 100
      if (guess >= 1 && guess <= 100) {
        validInput = true;
        //else to stay in the loop, with a feedback message, if the number is not between 1 and 100
      } else {
        feedback.textContent = "Die Zahl muss zwischen 1 und 100 liegen!";
        return;
      }
      //else to stay in the loop, with a feedback message, if the input is not a number
    } else {
      feedback.textContent = "Sie haben KEINE Zahl eingegeben!";
      return;
    }
  }

  console.log("Guess is: " + guess);
  console.log("Valid Input is: " + validInput);

  //TODO: check if the number is between 1 and 100

  //check if the user input is correct
  //if the number is lower than the target number, display "The number is too low."
  if (guess < targetNumber) {
    feedback.textContent = "Die Zahl ist zu niedrig.";
    //else if the number is higher than the target number, display "The number is too high."
  } else if (guess > targetNumber) {
    feedback.textContent = "Die Zahl ist zu hoch.";
    //otherwise, display "Congratulations! You guessed the right number!"
  } else {
    feedback.textContent = "";
    result.textContent = "Herzlichen Glückwunsch! Sie haben die richtige Zahl erraten!";
  }

}



