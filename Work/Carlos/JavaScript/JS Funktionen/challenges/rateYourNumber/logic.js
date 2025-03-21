 
 
 //generates a random number between 1 and 100
 const targetNumber = Math.floor(Math.random() * 100) + 1;
 console.log("Target Number is: " + targetNumber);

 let clickCount = 0; // The cliickCount must be declared outside the checkGuess Function. Otherwise, everytime I click the button, clickCount reinitializes to 0.


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

     if (!isNaN(guess)){
        if(guess > 100 || guess < 1){
            feedback.textContent = "Die Zahl liegt außerhalb des akzeptierten Bereichs.";
            feedback.style.color = "red";
            return;
        } else {
       validInput = true;
        } 
    } else {
       feedback.textContent = "Sie haben KEINE Zahl eingegeben!";
       feedback.style.color = "red";
       return;
     }
   }

    /*else if (guess > 100 || guess < 1){
    feedback.textContent = "“Die Zahl liegt außerhalb des akzeptierten Bereichs.”";
   }*/

   console.log("Guess is: " + guess);
   console.log("Valid Input is: " + validInput);

   //TODO: check if the number is between 1 and 100

   //check if the user input is correct
   //if the number is lower than the target number, display "The number is too low."
   
   function countClicks(){
    clickCount++;
    
    let counterSpan = document.getElementById("counter");
    counterSpan.innerText = clickCount;
   }

  
   if(validInput == true){

    countClicks();


   if(guess == targetNumber){
    feedback.textContent = "";
    result.textContent = "Herzlichen Glückwunsch! Sie haben die richtige Zahl erraten!";
   }

   else if ((guess > targetNumber && ((guess - targetNumber) <= 5)) || 
         (targetNumber > guess && ((targetNumber - guess) <= 5))) {
         
        if (guess > targetNumber && ((guess - targetNumber) <= 5)) {
            feedback.textContent = "Du bist fast richtig, die Geheimzahl ist noch etwas kleiner!!!";
        } else if (targetNumber > guess && ((targetNumber - guess) <= 5)) {
            feedback.textContent = "Du bist fast richtig, die Geheimzahl ist noch etwas größer!!!";
        }
    // Set feedback color to orange (It overrides the css file style, so I have to set again color blue for the other else if statements.)
    feedback.style.color = "orange";

    } else if (guess < targetNumber && guess > 0) {
        feedback.textContent = "Die Zahl ist zu niedrig.";
        feedback.style.color = "blue"; // Optional: Set color for other feedback
    } else if (guess > targetNumber && guess <= 100) {
        feedback.textContent = "Die Zahl ist zu hoch.";
       feedback.style.color = "blue"; // Optional: Set color for other feedback
    }

    if (clickCount > 7){
        feedback.style.backgroundColor = "black";
        feedback.style.color = "red";
        feedback.style.padding = "5px";
        feedback.style.fontWeight = "800";
        feedback.textContent = "GAME OVER";
    
     }

 } 

}
   
   
