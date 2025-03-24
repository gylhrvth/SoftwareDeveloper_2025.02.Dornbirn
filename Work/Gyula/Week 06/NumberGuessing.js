        //generates a random number between 1 and 100
        const targetNumber = Math.floor(Math.random() * 1000) + 1;
        document.getElementById('checkbutton').addEventListener('click', checkGuess())

        function convertText2Number(text){
            //check if the user input is empty
            if (!text) {
                return {
                    feedback: "Bitte geben Sie eine Zahl ein.",
                    result: NaN
                }
            }

            let result = parseInt(text, 10);
            if (isNaN(result)) {
                return {
                    feedback: "Sie haben KEINE Zahl eingegeben!",
                    result: NaN
                }            
            }
            if (result <= 0 || result > 1000) {
                return {
                    feedback: "Sie haben einen ungültigen Wert Eingegeben!",
                    result: NaN
                }
            }

            return {
                feedback: '',
                result: result                
            }
        }

        //call function checkGuess when the button is clicked
        function checkGuess() {
            //initialize variables, constants for dom elements
            const userInput = document.getElementById('userInput').value;
            const feedback = document.getElementById('feedback');
            const result = document.getElementById('result');

            
            //convert the user input to a number
            //Die 10 in parseInt(userInput, 10) gibt die Basis (Radix) an, die für die Umwandlung des Strings in eine Ganzzahl verwendet wird. In diesem Fall bedeutet die Basis 10, dass der String als Dezimalzahl interpretiert wird.

            let convert = convertText2Number(userInput)
        
            if (isNaN(convert.result)){
                feedback.value = convert.feedback
                userInput.value = ''
                return
            }
            console.log(convert)
/*
            console.log("Guess is: " + guess);
            console.log("Valid Input is: " + validInput);

            //TODO: check if the number is between 1 and 100

            // Anwendung:
            const target = document.getElementById("waveText");

            //check if the user input is correct
            //if the number is lower than the target number, display "The number is too low."
            if (guess < targetNumber) {
                feedback.textContent = "Die Zahl " + guess + '. ' + " ist zu niedrig.";
                //else if the number is higher than the target number, display "The number is too high."
            } else if (guess > targetNumber) {
                feedback.textContent = "Die Zahl " + guess + '. ' + "ist zu hoch.";
                //otherwise, display "Congratulations! You guessed the right number!"
            } else {
                feedback.textContent = "";
                waveTextEffect("Herzlichen Glückwunsch!   "+ '  ' + guess +'   '+ "   war die gesuchte Zahl", target);
            }
   */             
        }



        /*Wafe Funktion*/

        function waveTextEffect(text, element) {
            element.innerHTML = text
                .split("")
                .map((char, i) => `<span style="animation-delay:${i * 100}ms">${char}</span>`)
                .join("");
        }




