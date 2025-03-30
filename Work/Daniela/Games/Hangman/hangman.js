// JS for Hangman 
const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'raspberry', 'strawberry', 'watermelon'];

let randomWord = "";
let letterArray = [];




function startGame() {
    // Reset all disabled buttons
    resetButtons();
    // Clear the word-box div
    resetWordBox();
    // Select a random word
    selectRndWord();
    // Display the selected word
    displayWord();


}

function resetWordBox() {
    document.getElementById("wordList").innerText = "";
}
function displayWord() {
    console.log('RandomWord in function display' + randomWord);
    document.getElementById("wordList").innerText = randomWord;

    letterArray = randomWord.split("");
    console.log(letterArray);

    let underscore = "_ ".repeat(randomWord.length).trim();         

    document.getElementById("wordList").innerText = underscore;
    console.log()

    return underscore;

}
function selectRndWord() {
    let randomIndex = Math.floor(Math.random() * fruits.length);
    randomWord = fruits[randomIndex];
    console.log(randomWord);

    return randomWord;
}
function resetButtons() {
    const disabledButtons = document.querySelectorAll('button.disabled');
    for (let i = 0; i < disabledButtons.length; i++) {
        disabledButtons[i].disabled = false;
        disabledButtons[i].classList.remove('disabled');
    }

}

function handleKeyPress(letter) {
    
    let guess = letter.toLowerCase();
    console.log("check guess:" + guess)

    const button = document.querySelector(`button[onclick="handleKeyPress('${guess}')"]`);

    if (button) {
        button.disabled = true;
        button.classList.add('disabled');
        // Log all disabled buttons
        const disabledButtons = document.querySelectorAll('button.disabled');
        console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
        console.log(`Key pressed: ${guess}`);

    }
    checkLetterInclude(guess);


}

function checkLetterInclude(guess){
console.log("checkFunction:"+ guess);
console.log("check function:"+randomWord);
console.log("Check Array:"+ letterArray)


/*let include = randomWord.includes(letter);
console.log("Include:"+ include);*/

let include = letterArray.includes(guess);
console.log("Include:"+ include);




}


// ----------------------wordBox-----------------------------

//-----------------------wordList

/*this funktion should generating a random Word from the fruits array,
after that it should generates as much underscores as letters in the word 
function hideRandomWord(){
    let randomIndex = Math.floor(Math.random() * fruits.length);     //generate random Index
    let randomWord = fruits[randomIndex];                           //get word from Array: Fruit
    
    let underscore = "_ ".repeat(randomWord.length).trim();         //replace letters to underscore
    
    document.getElementById("wordList").innerText  = underscore;
    console.log()
    
    return randomWord;
    
}

//--------------------------wordlist

//here we are generatin a random Word out of the Array called fruids

/*let randomIndex = Math.floor(Math.random() * fruits.length);     //generate random Index
let randomWord = fruits[randomIndex];                           //get word from Array: Fruit
console.log(randomWord);
//document.getElementById("wordList").innerText = randomWord;
//now take randomWord and split it to letters 

let letter = randomWord.split("");
console.log(letter);
document.getElementById("wordList").innerText = letter.join(" ");*/



/*document.addEventListener("DOMContentLoaded",
    function generateLetters() {
        let randomIndex = Math.floor(Math.random() * fruits.length);
        let randomWord = fruits[randomIndex];

        console.log(randomWord);

        let letter = randomWord.split("");
        console.log(letter);

        document.getElementById("wordList").innerText = letter.join(" ");
    }
);

//-----------------------------guess



let letter = [];

function displayWord() {
    let randomIndex = Math.floor(Math.random() * fruits.length);     //generate random Index
    let randomWord = fruits[randomIndex];                            //get word from Array: Fruit
    console.log(randomWord);
   
    let letter = randomWord.split("");
    console.log(letter);

   
    let underscore = "_ ".repeat(randomWord.length).trim();         //replace letters to underscore

    document.getElementById("wordList").innerText = underscore;

    return randomWord;
}

*/
/* let guess = letter;
    console.log("Guess = " + guess);

    const button = document.querySelector(`button[onclick="handleKeyPress('${letter}')"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('disabled');

        // Log all disabled buttons
        const disabledButtons = document.querySelectorAll('button.disabled');
        console.log('Disabled buttons:', Array.from(disabledButtons).map(btn => btn.textContent));
        console.log(`Key pressed: ${letter}`);

    }

    // Überprüfe, ob der geratenen Buchstabe im Wort vorhanden ist
    if (currentWord.includes(guess)) {
        console.log("Richtiger Buchstabe!");

        // Aktualisiere das angezeigte Wort
        let updatedWord = updateWordDisplay(guess);
        document.getElementById("wordList").innerText = updatedWord;
    } else {
        console.log("Falscher Buchstabe!");
        // Erhöhe die Anzahl der falschen Versuche
        increaseWrongGuesses();
    }

}
// Funktion zum Aktualisieren der Wortanzeige
function updateWordDisplay(guess) {
    let updatedDisplay = "";
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
            updatedDisplay += guess + " ";  // Zeige den geratenen Buchstaben
        } else {
            updatedDisplay += "_ ";  // Zeige einen Unterstrich
        }
    }
    return updatedDisplay.trim();
}

// Funktion zum Erhöhen der falschen Versuche
let wrongGuesses = 0;

function increaseWrongGuesses() {
    wrongGuesses++;
    document.getElementById("wrong-guesses").innerText = wrongGuesses;
}*/






