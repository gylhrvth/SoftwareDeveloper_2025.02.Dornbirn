// the 3 vars we used before to maintain the code.
let randomNum = 0;
let aiMove = "";
let result = "";

//the function playGame, called by a button onclick event
//gets the playerMove
function playGame(playerMove) {
  aimove = computerMove();
  result = "";

  if (playerMove === "rock") {
    if (aiMove === "rock") {
      result = "Tie";
    } else if (aiMove === "paper") {
      result = "You Lose";
    } else {
      result = "You Win";
    }

  } else if (playerMove === "paper") {
    if (aiMove === "rock") {
      result = "You Win";
    } else if (aiMove === "paper") {
      result = "Tie";
    } else {
      result = "You Loose";
    }

  } else if (playerMove === "scissor") {
    if (aiMove === "rock") {
      result = "You Lose";
    } else if (aiMove === "paper") {
      result = "You Win";
    } else {
      result = "Tie";
    }
  }

  alertMessage(aiMove, playerMove, result);
}

function computerMove() {
  randomNum = Math.random();

  if (randomNum >= 0 && randomNum < 1 / 3) {
    aiMove = "rock";
    // console.log('Rock' +randomNum);
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    aiMove = "paper";
    //  console.log('Paper'+randomNum)
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    aiMove = "scissor";
    //  console.log('Scissors'+randomNum)
  }

  console.log(aiMove + randomNum);

  return aiMove;
}

function alertMessage(aiMove, playerMove, result) {
  alert(`The Computer picked ${aiMove}.

You picked ${playerMove}. 

The result is ${result}`);
}
