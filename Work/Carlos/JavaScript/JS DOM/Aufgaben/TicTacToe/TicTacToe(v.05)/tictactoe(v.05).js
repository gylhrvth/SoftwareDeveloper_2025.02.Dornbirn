// ==============================
// Constants and Variables
// ==============================

// Class names for X and O
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Player roles
const HUMAN_PLAYER = X_CLASS; // Human player is X
const AI_PLAYER = CIRCLE_CLASS; // AI player is O

// Winning combinations (indices of cells that form a win)
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

// DOM elements
const cellElements = document.querySelectorAll('[data-cell]'); // All cells in the grid
const board = document.getElementById('board'); // The game board
const playerVsPlayerButton = document.getElementById('playerVsPlayer'); // Button for Player vs Player mode
const chooseAIDifficultyButton = document.getElementById('chooseAIDifficulty');
const playerVsAIButton = document.getElementById('playerVsAI'); // Button for Player vs AI mode
const aiDifficultyDropdown = document.getElementById('aiDifficulty'); // Dropdown for AI difficulty
let selectedDifficulty = null; // Track the selected difficulty
const winningMessageElement = document.getElementById('winningMessage'); // Winning message container
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); // Winning message text
const restartMessage = document.getElementById("restartMessage"); // Restart button

// Game state variables
let isAI = false; // Flag to track if the game is against AI
let circleTurn = false; // Tracks the current turn (true for O, false for X)

// ==============================
// Initialization
// ==============================

/**
 * Initialize the game on page load.
 */
function initializeGame() {
    disableBoard(); // Disable the board initially
    setupEventListeners(); // Set up all event listeners
}

/**
 * Disable the board.
 */
function disableBoard() {
    board.classList.add('disabled'); // Add the 'disabled' class to the board
}

// Call the initialize function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);

/**
 * Set up all event listeners for buttons and dropdowns.
 */
function setupEventListeners() {
    // Dropdown-related event listeners
    chooseAIDifficultyButton.addEventListener('click', toggleDropdownVisibility);
    aiDifficultyDropdown.addEventListener('change', handleDifficultySelection);

    // Game mode buttons
    playerVsPlayerButton.addEventListener('click', () => {
        isAI = false; // Set mode to Player vs Player
        startGameMode();
    });

    playerVsAIButton.addEventListener('click', () => {
        startPlayerVsAIMode();
    });

    // Restart button
    restartMessage.addEventListener('click', resetGameState);
}

/**
 * Toggle the visibility of the dropdown menu.
 */
function toggleDropdownVisibility() {
    aiDifficultyDropdown.classList.toggle('show'); // Toggle the dropdown visibility
}

/**
 * Handle difficulty selection from the dropdown.
 */
function handleDifficultySelection() {
    selectedDifficulty = aiDifficultyDropdown.value; // Get the selected difficulty
    console.log(`Selected difficulty: ${selectedDifficulty}`); // Log the selected difficulty
    aiDifficultyDropdown.classList.remove('show'); // Hide the dropdown after selection
}

/**
 * Start the game in Player vs AI mode.
 */
function startPlayerVsAIMode() {
    if (!selectedDifficulty) {
        selectedDifficulty = 'normal'; // Default to "Normal" if no difficulty is selected
        console.log('No difficulty selected. Defaulting to Normal.');
    }
    console.log(`Starting game with difficulty: ${selectedDifficulty}`); // Log the selected difficulty
    isAI = true; // Set mode to Player vs AI
    aiDifficultyDropdown.disabled = true; // Disable the dropdown to prevent changes during the game
    startGameMode(); // Start the game
}

/**
 * Reset the game state when the restart button is clicked.
 */
function resetGameState() {
    board.classList.add('disabled'); // Disable the board
    document.querySelector('.game-mode-buttons').classList.remove('hidden'); // Show game mode buttons
    winningMessageElement.classList.remove('show'); // Hide the winning message
    aiDifficultyDropdown.disabled = false; // Re-enable the dropdown
    aiDifficultyDropdown.classList.add('hidden'); // Hide the dropdown
    selectedDifficulty = null; // Reset the selected difficulty
}

// ==============================
// Game Functions
// ==============================

// Start a new game mode
function startGameMode() {
    document.querySelector('.game-mode-buttons').classList.add('hidden'); // Hide the buttons
    board.classList.remove('disabled'); // Enable the board

    const aiDifficultyDropdown = document.getElementById('aiDifficulty');
    if (isAI) {
        aiDifficultyDropdown.disabled = true; // Disable the dropdown after the game starts
    }

    startGame(); // Start the game
}

// Initialize the game
function startGame() {
    circleTurn = false; // Set the initial turn to X
    cellElements.forEach(cell => {
        cell.classList.remove(HUMAN_PLAYER, AI_PLAYER, 'winning-x', 'winning-o'); // Reset cell classes
        cell.removeEventListener('click', handleClick); // Remove old event listeners
        cell.addEventListener('click', handleClick, { once: true }); // Add new event listeners
    });
    setBoardHoverClass(); // Set hover effect
    winningMessageElement.classList.remove('show'); // Hide the winning message
}

function handleClick(e) {
    const cell = e.target; // The clicked cell
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // Determine the current class based on the turn
    placeMark(cell, currentClass); // Place the mark in the clicked cell

    if (checkWin(currentClass)) {
        endGame(false); // End the game with a winner
    } else if (isDraw()) {
        endGame(true); // End the game with a draw
    } else {
        swapTurns(); // Switch turns
        if (isAI && circleTurn) {
            board.classList.add('disabled'); // Disable the board during the AI's turn
            setTimeout(() => {
                makeBestMove(); // If it's AI's turn, make the best move
                board.classList.remove('disabled'); // Re-enable the board after the AI's move
            }, 800); // Delay for AI's move
        }
    }
}

// Place a mark in the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass); // Add the current class to the clicked cell
}

// Swap turns
function swapTurns() {
    circleTurn = !circleTurn; // Toggle the turn
    setBoardHoverClass(); // Update the board's hover class
}

// Set hover effect for the board
function setBoardHoverClass() {
    board.classList.remove(X_CLASS, CIRCLE_CLASS); // Remove existing hover classes
    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS); // Add the current hover class
}

// ==============================
// Game End Functions
// ==============================

// End the game
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"; // Display draw message
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`; // Display winner message
        highlightWinningCombination(circleTurn ? AI_PLAYER : HUMAN_PLAYER); // Highlight the winning combination
    }
    winningMessageElement.classList.add('show'); // Show the winning message
    board.classList.add('disabled'); // Disable the board
    document.querySelector('.game-mode-buttons').classList.remove('hidden'); // Show game mode buttons

    if (isAI) {
        aiDifficultyDropdown.disabled = false; // Re-enable the dropdown
        selectedDifficulty = null; // Reset the selected difficulty
    }
}

// Highlight the winning combination
function highlightWinningCombination(currentPlayer) {
    WINNING_COMBINATIONS.forEach(combination => {
        if (combination.every(index => cellElements[index].classList.contains(currentPlayer))) {
            combination.forEach(index => {
                cellElements[index].classList.add(currentPlayer === HUMAN_PLAYER ? 'winning-x' : 'winning-o'); // Highlight the winning cells
            });
        }
    });
}

// ==============================
// Utility Functions
// ==============================

// Check if there is a winner
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => cellElements[index].classList.contains(currentClass));
    });
}

// Check if the game is a draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

// ==============================
// AI Functions
// ==============================

// Make the best move for the AI
function makeBestMove() {
    const difficulty = document.getElementById('aiDifficulty').value; // Get selected difficulty
    console.log(`Selected difficulty: ${difficulty}`); // Log the selected difficulty
    let bestMove;

    if (difficulty === 'random') {
        // Random move
        const availableCells = Array.from(cellElements).filter(cell => 
            !cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)
        );
        bestMove = availableCells[Math.floor(Math.random() * availableCells.length)];
    } else {
        // Minimax-based move
        let bestScore = -Infinity;
        const depth = difficulty === 'easy' ? 1 : difficulty === 'normal' ? 3 : Infinity; // Adjust depth

        cellElements.forEach(cell => {
            if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
                cell.classList.add(AI_PLAYER); // Simulate AI move
                const score = minimax(cellElements, 0, false, depth); // Evaluate the move
                cell.classList.remove(AI_PLAYER); // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = cell;
                }
            }
        });
    }

    if (bestMove) {
        bestMove.classList.add(AI_PLAYER); // Make the best move
        if (checkWin(AI_PLAYER)) {
            endGame(false); // End the game if AI wins
        } else if (isDraw()) {
            endGame(true); // End the game if it's a draw
        } else {
            circleTurn = false; // Switch back to the player's turn
            setBoardHoverClass(); // Update the hover effect
        }
    }
}

// Minimax algorithm for AI
function minimax(board, depth, isMaximizing, maxDepth = Infinity) {
    if (checkWin(AI_PLAYER)) return 10 - depth; // AI wins
    if (checkWin(HUMAN_PLAYER)) return depth - 10; // Human wins
    if (isDraw()) return 0; // Draw
    if (depth >= maxDepth) return 0; // Stop recursion at max depth

    if (isMaximizing) {
        let bestScore = -Infinity;
        cellElements.forEach(cell => {
            if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
                cell.classList.add(AI_PLAYER); // Simulate AI move
                const score = minimax(board, depth + 1, false, maxDepth); // Evaluate the move
                cell.classList.remove(AI_PLAYER); // Undo the move
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        cellElements.forEach(cell => {
            if (!cell.classList.contains(HUMAN_PLAYER) && !cell.classList.contains(AI_PLAYER)) {
                cell.classList.add(HUMAN_PLAYER); // Simulate human move
                const score = minimax(board, depth + 1, true, maxDepth); // Evaluate the move
                cell.classList.remove(HUMAN_PLAYER); // Undo the move
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}