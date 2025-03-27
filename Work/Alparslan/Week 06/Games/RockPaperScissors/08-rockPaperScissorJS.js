
let randomNum = 0;
let aiMove = '';
let result = '';


//Object score has 3 values, win-lose-tie, all set to zero
//as in the first state of the project we dont need any other thing to save a score but if we wanna store this in DB we have to rebuild our structure
/*
const score = {
  wins: 0,
  losses: 0,
  ties: 0,

}
*/
//to save the score values in a DB or Local we use JSON.parse
//localStorage.getItem(name) calls the file were the values are stored


let score = JSON.parse(localStorage.getItem('Score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}


//console.log is your friend !!!
console.log(localStorage.getItem('Score'));

//playGameFunction stays the almost the same, exceped for a few lines, were we update the score
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

  //if we get a result we now use this to update the score
  if (result === 'You Win') {
    score.wins += 1;
  } else if (result === 'You Lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }
  //after updating the score, we save it with a name '' and JSON.stringyfy(variable)
  //localStorage.setItem to save the object score
  //'name' , JSON.stringyfy(object)

  localStorage.setItem('Score', JSON.stringify(score));


  //we call a new function with all the information we need
  //to print a PopUp message
  alertMessage(aiMove, playerMove, result)

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
  //one odd thing, JS has is the usage uf 3 diffrent styles to make a string
  // "", '', `` are all legitimate styles, but have diffrent pros and cons
  //for summery, the "" is not the best couse, many other syntax uses this, so mostly use '' for String
  //in some cases, `` can help you with format your lines.
  //with `` you dont need the \n newline you can just use enter.
  alert(`The Computer picked ${aiMove}. You picked ${playerMove}. The result is ${result} 
Wins: ${score.wins}
Losses: ${score.losses}
Ties: ${score.ties}
        `)
}

//last but not least we create a function that we connect with a new 4th button
//to reset the score object and set all the variables to zero.
function resetScore() {

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;


  //localStorage.removeItem to update the DB file, or delet it for sure.
  //new problem we encounter, we have to set up the beginning, if we delete this and try to open a file, that is not there...
  //change the object and wrap it in a if (object is zero), build it, else just use object

  localStorage.removeItem('Score');     //reset also the localstorage value (new problem with all is set to null if we start and have no safe)

}

