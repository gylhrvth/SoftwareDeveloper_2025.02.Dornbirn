
// Tutorial: https://www.youtube.com/watch?v=Y-GkMjUZsmM


const X_CLASS = 'x'; // This is the class name for the X mark
const CIRCLE_CLASS = 'circle'; // This is the class name for the circle
const HUMAN_PLAYER = X_CLASS; // Human is 'X'
const AI_PLAYER = CIRCLE_CLASS; // AI is 'O'

// The winning combinations are defined as arrays of indices that represent the positions of the cells in the grid.
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Horizontal
    [3, 4, 5], // Horizontal
    [6, 7, 8], // Horizontal
    [0, 3, 6], // Vertical
    [1, 4, 7], // Vertical
    [2, 5, 8], // Vertical
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
]

// The WINNING_COMBINATIONS array provides the indices of the cells that need to be checked for a win.
// These indices are used to access the corresponding cells in the cellElements NodeList.

// The cellElements variable is a NodeList of all the cells in the grid. 
// It is indexed in the same order as the cells appear in the HTML.
const cellElements = document.querySelectorAll('[data-cell]'); //The square brackets indicate that you are selecting elements based on an attribute selector.
const board = document.getElementById('board'); // Get the board element by its ID
const winningMessageElement = document.getElementById('winningMessage'); // Get the winning message element by its ID
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); // Get the winning message text element
const restartMessage = document.getElementById("restartMessage");
let circleTurn // This variable will be used to track the current turn. It will be set to true if it's circle's turn and false if it's X's turn.

    // The { once: true } option ensures that the event listener is removed after it is triggered once.
    // This prevents the same cell from being clicked multiple times.
    // The handleClick function is called when a cell is clicked.
    // The cell is passed as an argument to the function.
    // The handleClick function is defined below.

startGame(); // Call the startGame function to initialize the game

restartMessage.addEventListener('click', startGame); // Add an event listener to the restart button to restart the game when clicked
// The startGame function initializes the game by resetting the board and setting the initial turn

function startGame() {
    circleTurn = false; // Set the initial turn to X (false)
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true}); 
    })
    
    cellElements.forEach(cell => { // The forEach method is avaible on arrays and array-like objects, including NodeLists.
        cell.classList.remove(X_CLASS); // Remove the X class from all cells
        cell.classList.remove(CIRCLE_CLASS); // Remove the circle class from all cells
        cell.removeEventListener('click', handleClick); // Remove the old click event listener from all cells // Prevents the duplication of event listeners when the game is restarted //
        cell.addEventListener('click', handleClick, { once: true}); // Add the click event listener to all cells
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show'); // Hide the winning message
}

function minimax(board, depth, isMaximizing) {
        if (checkWin(AI_PLAYER)) return 10 - depth;
        if (checkWin(HUMAN_PLAYER)) return depth - 10;
        if (isDraw()) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            cellElements.forEach(cell => {
                if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
                    cell.classList.add(AI_PLAYER);
                    const score = minimax(board, depth + 1, false);
                    cell.classList.remove(AI_PLAYER);
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            cellElements.forEach(cell => {
                if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
                    cell.classList.add(HUMAN_PLAYER);
                    const score = minimax(board, depth + 1, true);
                    cell.classList.remove(HUMAN_PLAYER);
                    bestScore = Math.min(score, bestScore);

                }
        });
        return bestScore;
    }
}

function makeBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    cellElements.forEach(cell => {
        if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
            cell.classList.add(AI_PLAYER);
            const score = minimax(cellElements, 0, false);
            cell.classList.remove(AI_PLAYER);
            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }
    })

    if (bestMove) {
        bestMove.classList.add(AI_PLAYER); // Add the AI player's class to the best move cell
        if (checkWin(AI_PLAYER)) {
            endGame(false); // If the AI wins, call the endGame function with false
        } else if (isDraw()) {
            endGame(true); // If it's a draw, call the endGame function with true
        } else {
            circleTurn = false; // Switch back to the player's turn
            setBoardHoverClass(); // Call the setBoardHoverClass function to update the board's hover class
        }
    }
}

function handleClick(e){
    const cell = e.target; // The target of the event is the clicked cell // It is perfectly fine to define cell as a const in this case, even though it will refer to a different cell each time the handleClick function is called. This is because const does not mean the value of the variable cannot change—it means the reference to the variable cannot be reassigned.
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // Determine the current class based on the turn
    placeMark(cell, currentClass); // Call the placeMark function to place the mark in the clicked cell
    if (checkWin(currentClass)){
        endGame(false); // false means game doesn't end with a draw // If the current player wins, call the endGame function with false
    } else if (isDraw()){ // If all cells are filled and no one has won
        endGame(true); // Call the endGame function with true to indicate a draw
    } else {
        swapTurns(); // Call the swapTurns function to switch turns
        setBoardHoverClass(); // Call the setBoardHoverClass function to update the board's hover class
    }
}


// The isDraw function checks if all cells are filled wit either X or circle.
// Returns true if all cells are filled, indicating a draw
function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"; // If it's a draw, set the winning message to "It's a Draw!"

    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    } 
    winningMessageElement.classList.add('show'); // Show the winning message
}
    
function isDraw() {
    // destructuring the cellElements NodeList into an array using the spread operator
    // The spread operator (...) is used to convert the NodeList into an array.
    // This allows us to use array methods like every() on the NodeList.
    return [...cellElements].every(cell => { // every() checks if a condition is met for all elements in the array
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS); // Check if all cells are filled with either X or circle
    }); // Returns true if all cells are filled
} 



function placeMark(cell, currentClass){
    cell.classList.add(currentClass); // Add the current class to the clicked cell
    
}

function swapTurns(){
    circleTurn = !circleTurn; // Toogle the turn
    if(circleTurn) {
        makeBestMove(); // If it's circle's turn, call the makeBestMove function
        if (checkWin(AI_PLAYER)){
            endGame(false); // If the AI wins, call the endGame function with false
        } else if (isDraw()) {
            endGame(true); // If it's a draw, call the endGame function with true
        } else {
            circleTurn = false; // Switch back to the player's turn
            setBoardHoverClass(); // Call the setBoardHoverClass function to update the board's hover class
        }

    } else {
        setBoardHoverClass(); // Call the setBoardHoverClass function to update the board's hover class}   
    }
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn){
        board.classList.add(CIRCLE_CLASS); // Add the circle class to the board
    } else {
        board.classList.add(X_CLASS); // Add the X class to the board
    }

}

        // checkWin function checks if the current player has a winning combination
        // combination is an array of indices that represent a winning combination
        // cellElements is a NodeList of all the cells in the grid
        // currentClass is the class of the current player (either X or circle)
        // cellElements[combination[0]] is the first cell in the winning combination
        // cellElements[combination[1]] is the second cell in the winning combination
        // cellElements[combination[2]] is the third cell in the winning combination
        // cellElements[combination[0]].classList.contains(currentClass) checks if the first cell in the winning combination has the same class as the current player
        // cellElements[combination[1]].classList.contains(currentClass) checks if the second cell in the winning combination has the same class as the current player
        // cellElements[combination[2]].classList.contains(currentClass) checks if the third cell in the winning combination has the same class as the current player
        // If all three cells in the winning combination have the same class as the current player, the function returns true
        // If at least one of the winning combinations is met, the function returns true
        // If none of the winning combinations are met, the function returns false
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => { // some() is used to check if at least one of the winning combinations is met
        return combination.every(index => { // Iterate over each index in the current combination // every() is used to verify that all cells  in a winning combination have the same class
            return cellElements[index].classList.contains(currentClass); // Check if the cell at this index contains the current class // Check if the current class is present in all cells of the winning combination
        })
    }) // Returns true if at least one of the winning combinations is met
}
