

let playerNumber = 0;
let cpuNumber = 0;

// ----------- Player Functions ----------- 

function clickRock() {
    let chooseRock = document.getElementById("feedbackText");
    chooseRock.innerText = "You choose Rock!";
    let showPlayerRock = document.getElementById("playerMove");
    showPlayerRock.setAttribute("src", "./assets/icons/rock.png");
    playerNumber = 1;
    playAgainst()
    return playerNumber;
}

function clickPaper() {
    let choosePaper = document.getElementById("feedbackText");
    choosePaper.innerText = "You choose Paper!";
    let showPlayerPaper = document.getElementById("playerMove");
    showPlayerPaper.setAttribute("src", "./assets/icons/paper.png");
    playerNumber = 2;
    playAgainst()
    return playerNumber;
}

function clickScissors() {
    let chooseScissors = document.getElementById("feedbackText");
    chooseScissors.innerText = "You choose Scissors!";
    let showPlayerScissors = document.getElementById("playerMove");
    showPlayerScissors.setAttribute("src", "./assets/icons/scissors.png");
    playerNumber = 3;
    playAgainst()
    return playerNumber;
}

// -------------- CPU Functions ----------------- 


function createRandomNumber(){

    cpuNumber = Math.floor((Math.random()*3) + 1);

}

    
function showCpuSymbol(){

    let showCpuAction = document.getElementById("cpuMove");

    if (cpuNumber == 1){
        showCpuAction.setAttribute("src", "./assets/icons/rock.png");
    } else if(cpuNumber == 2){
        showCpuAction.setAttribute("src", "./assets/icons/paper.png");
    } else if(cpuNumber == 3){
        showCpuAction.setAttribute("src", "./assets/icons/scissors.png");
    }

}

function showOutcome(){
    let outcomeResult = document.getElementById("outcomeText");

    if(playerNumber == cpuNumber){
        outcomeResult.innerText = "Draw"
        outcomeResult.style.backgroundColor = "#5397DB";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 1 && cpuNumber == 2){
        outcomeResult.innerText = "CPU wins!";
        outcomeResult.style.backgroundColor = "#DC5450";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 1 && cpuNumber == 3){
        outcomeResult.innerText = "You win!";
        outcomeResult.style.backgroundColor = "#53C09D";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 2 && cpuNumber == 1){
        outcomeResult.innerText = "You win!";
        outcomeResult.style.backgroundColor = "#53C09D";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 2 && cpuNumber == 3){
        outcomeResult.innerText = "CPU wins!";
        outcomeResult.style.backgroundColor = "#DC5450";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 3 && cpuNumber == 1){
        outcomeResult.innerText = "CPU wins!";
        outcomeResult.style.backgroundColor = "#DC5450";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    } else if(playerNumber == 3 && cpuNumber == 2){
        outcomeResult.innerText = "You win!";
        outcomeResult.style.backgroundColor = "#53C09D";
        outcomeResult.style.color = "white";
        outcomeResult.style.border = "none";
    }

}

// ----------- Outcome Function ------------- //

function playAgainst(){

    if(playerNumber == 0){
        let showHint = document.getElementById("feedbackText");
        showHint.innerText = "You need to choose first!";
    } else {

    createRandomNumber();

    showCpuSymbol();

    showOutcome();
    
    }

}

// ---------- Reset Function --------------- //

function resetGame(){

    playerNumber = 0;
    cpuNumber = 0;

    let chooseReset = document.getElementById("feedbackText");
    chooseReset.innerText = "Your input";

    let showPlayerReset = document.getElementById("playerMove");
    showPlayerReset.setAttribute("src", "./assets/icons/question.png");

    let showCpuReset = document.getElementById("cpuMove");
    showCpuReset.setAttribute("src", "./assets/icons/question.png");

    let outcomeReset = document.getElementById("outcomeText");
    outcomeReset.innerText = "Outcome"
    outcomeReset.style.backgroundColor = "white";
    outcomeReset.style.color = "black";
    outcomeReset.style.border = "solid black 2px";

}

