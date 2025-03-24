//generates a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 1000) + 1;
document.getElementById('checkbutton').addEventListener('click', checkGuess)

console.log('target: ', targetNumber)

function convertText2Number(text, minValue, maxValue){
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
    if (result <= minValue || result > maxValue) {
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
    const userInput = document.getElementById('userInput');
    const feedback = document.getElementById('feedback');
    const result = document.getElementById('result');
    
    //convert the user input to a number
    let convert = convertText2Number(userInput.value, 1, 1000)
    if (isNaN(convert.result)){
        feedback.textContent = convert.feedback
        userInput.value = ''
        return
    }

    let guess = convert.result       
    if (guess < targetNumber) { //if the number is lower than the target number, display "The number is too low."
        feedback.textContent = "Die Zahl " + guess + ' ' + " ist zu niedrig.";
    } else if (guess > targetNumber) {   //else if the number is higher than the target number, display "The number is too high."
        feedback.textContent = "Die Zahl " + guess + ' ' + "ist zu hoch.";
    } else {  //otherwise, display "Congratulations! You guessed the right number!"
        feedback.textContent = "";
        waveTextEffect("Herzlichen Glückwunsch!   "+ ' ' + guess +'   '+ "   war die gesuchte Zahl");
    }       
}



/*Wafe Funktion*/
function waveTextEffect(text) {
    const element = document.getElementById("waveText");
    element.innerHTML = text
        .split("")
        .map((char, i) => `<span style="animation-delay:${i * 100}ms">${char === ' '?'&nbsp;':char}</span>`)
        .join("");
}




