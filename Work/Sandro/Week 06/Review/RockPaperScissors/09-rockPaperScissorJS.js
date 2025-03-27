
let randomNum = 0;
let aiMove = '';
let result = '';

let score = JSON.parse(localStorage.getItem('Score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
//update dispaly
updateScoreDisplay();

function playGame(playerMove) {
  aimove = computerMove();
  result = '';
  if (playerMove === 'rock') {
    if (aiMove === 'rock') {
      result = 'Tie'
    } else if (aiMove === 'paper') {
      result = 'You Lose'
    } else {
      result = 'You Win'
    }
  } else if (playerMove === 'paper') {
    if (aiMove === 'rock') {
      result = 'You Win'
    } else if (aiMove === 'paper') {
      result = 'Tie'
    } else {
      result = 'You Lose'
    }
  } else if (playerMove === 'scissor') {
    if (aiMove === 'rock') {
      result = 'You Lose'
    } else if (aiMove === 'paper') {
      result = 'You Win'
    } else {
      result = 'Tie'
    }
  }

  if (result === 'You Win') {
    score.wins += 1;
  } else if (result === 'You Lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('Score', JSON.stringify(score));

  //after we play, and save we now update the Screen for the Score
  updateScoreDisplay();
  //and we call two new functions
  displayMoves(playerMove, aiMove);
  displayResult(result);

  //we dont need the alert Pop anymore
  //  alertMessage(aiMove, playerMove, result)

}

function computerMove() {
  randomNum = Math.random();

  if (randomNum >= 0 && randomNum < 1 / 3) {
    aiMove = 'rock'
    // console.log('Rock' +randomNum);
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    aiMove = 'paper'
    //  console.log('Paper'+randomNum)
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    aiMove = 'scissor'
    //  console.log('Scissors'+randomNum)
  }

  console.log(aiMove + randomNum);

  return aiMove;
}

function alertMessage(aiMove, playerMove, result) {

  //with `` you dont need the \n newline you can just use enter.
  alert(`The Computer picked ${aiMove}. You picked ${playerMove}. The result is ${result} 
Wins: ${score.wins}
Losses: ${score.losses}
Ties: ${score.ties}
        `)
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('Score');

  //same thing as with the play game function
  //as we reset the score, we also gonna update our Display

  updateScoreDisplay();
  //we are manualey set the Paragraph for move and result to empty string, so they will disapear on the browser
  //use document.querySelector (ID from Paragraph) .innerHTML to change the content ... 
  document.querySelector('.js-move').innerHTML = '';
  document.querySelector('.js-result').innerHTML = '';
}



//new Function to update the Score Disyplay
function updateScoreDisplay() {
  //document.querySelector(ID).innerHTML = content we wanna show
  //remeber the `` usage allows to format the string too
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}
Losses: ${score.losses}
Ties: ${score.ties}`;

}
//new Function, to show the player the moves for this round
function displayMoves(playerMove, aiMove) {
  document.querySelector('.js-move').innerHTML = `You choose ${playerMove} < > ${aiMove} is what the Computer pick.`
}
//new Function, to show the result
function displayResult(result) {
  document.querySelector('.js-result').innerHTML = `${result}`
}