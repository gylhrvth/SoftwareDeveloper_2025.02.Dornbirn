

import './style.css';

// --- Types & Constants ---
type Cell = boolean; // true = alive, false = dead
type Grid = Cell[][];
const ROWS = 30;
const COLS = 30;

// --- DOM Elements ---
const gridDiv = document.getElementById('grid')!;
const clearButton = document.getElementById('clear')!;
const randomizeButton = document.getElementById('randomize')!;
const startButton = document.getElementById('start')!;
const stopButton = document.getElementById('stop')!;
const speedRange = document.getElementById('speedRange') as HTMLInputElement;
const speedValue = document.getElementById('speedValue')!;
// The '!' operator asserts that the element is not null, which is safe here because we know these elements exist in the HTML.

// --- Grid State ---
let grid: Grid = createEmptyGrid();

let running = false;
let intervalId: ReturnType<typeof setInterval> | null = null;
//let intervalId: number | null = null; -> error (Type 'Timeout' is not assignable to type 'number').
// This happens in some TypeScript environments (especially with Node.js types). SetInterval returns a value of type 'Timeout' instead of type 'number'.
let STEP_INTERVAL = 500; // ms between generations

// --- Grid Logic ---

function createEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false))
}

function renderGrid(grid: Grid): void {
  gridDiv.innerHTML = '';
  gridDiv.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
  gridDiv.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;

    for(let row = 0; row < ROWS; row++){
      for(let col = 0; col < COLS; col++){
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell' + (grid[row][col] ? ' alive' : '');
        cellDiv.addEventListener('click', () => {
          grid[row][col] = !grid[row][col];
          renderGrid(grid);
        });
        gridDiv.appendChild(cellDiv);
      }
    }

}

function clearGrid(): void {
  grid = createEmptyGrid();
  renderGrid(grid);
}

// Math.random() generates  a random number between 0 (inclusive) and 1 (exclusive)
// If the number is less than 0.3, the cell is set to true (alive)
// If the number is 0.3 or greater, the cell is set to false (dead)
// Each cell has a 30% chance of being alive
function randomizeGrid(): void {
  grid = Array.from({ length: ROWS }, () => 
    Array.from({ length: COLS }, () => 
      Math.random() < 0.3) // The '<' operator will return either true or false for each cell
  );
  renderGrid(grid);
}

function nextGeneration(): void {
  const newGrid: Grid = createEmptyGrid(); // This creates a new grid (all cells dead) that will be filled with the next generation values.

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col ++) {
      const alive = grid[row][col]; // alive stores whether the current cell is alive (true) or dead (false).
      let neighbors = 0; // Count of alive neighbors
      // Count 'alive' neighbors inside inner loop
      // dr (differential row) and dc (differential column) loop through -1,0,1 to check all 8 neighbors around the cell.
      // So at the first iteration, dr = -1 (it will iterate through the row below the cell being checked) 
      // and dc = -1 (it will iterate through the column to the left of the cell being checked). And so on for the 8 neighbors around the cell.
      for(let dr = -1; dr <=1; dr++){
        for(let dc = -1; dc <=1; dc++){
          if (dr === 0 && dc === 0) continue; // skip the cell itself
          const neighborRow = row + dr;
          const neighborColumn = col + dc;
          // The code below checks if neighbor is inside the grid and alive
          // Only rows inside the valid range (from 0 to ROWS) and columns (from 0 to COLS), AND alive (grid[row][col] = true) will be counted.
          // This avoid counting neighbors outside the grid or dead neighbors.
          if((
            neighborRow >= 0 && neighborRow < ROWS) && (neighborColumn >= 0 && neighborColumn < COLS) && grid[neighborRow][neighborColumn]){
            neighbors++;
          }
        }
      }

      // Apply Game of Life Rules (We are still inside the first inner loop 'col')
      if(alive){
        // If I am alive, do I have 2 or 3 living neighbors? If yes, I survive. If not, I die.
        newGrid[row][col] = neighbors === 2 || neighbors === 3; 
      } else { // if alive is not true (dead cell)
        newGrid[row][col] = neighbors === 3; // If a dead cell has 3 neighbors, then the condition is true and the cell gets true (alive) as a new value.
      }
    }
  }

  grid = newGrid; // newGrid holds the calculated state for the next generation, and replaces the old grid values (grid).
  // This means, grid contains now the values of newGrid.

  renderGrid(grid);
  // Draws the new values of the new generation on the screen.

}

function startSimulation(): void {
  if (!running) { // it checks if the simulation is not already running. This prevents starting multiple intervals if the user clicks 'start' more than once.
    running = true; // Marks the simulation as 'running'
    intervalId = setInterval(nextGeneration, STEP_INTERVAL);
    updateControlButtons();
  }
}

// Before startSimulation() runs, intervalId is null.
// After startSimulation runs, intervalId holds the internal timer ID returned by setInterval.
// This ID is used later to stop the timer with clearInterval(intervalId).

function stopSimulation(): void {
  running = false;
  if (intervalId !== null) {
    clearInterval(intervalId); // clearInterval is a built-in JavaScript function that stops the timer set by setInterval.
    // It takes the intervalId as an argument to stop the specific timer.
    intervalId = null;
    // After stopping the timer, we set intervalId back to null to indicate that the simulation is no longer running.
    // This allows us to start a new timer later if the user clicks 'start' again.
  }
  updateControlButtons(); 
  // Updates the control buttons to reflect the current state of the simulation.
  // The function is outside the if(intervalId !== null) block to ensure that the buttons are updated even if no timer was running.
}

// --- Helper Functions ---

function updateControlButtons() {
  if (running) {
    startButton.style.display = 'none';
    stopButton.style.display = '';
  } else {
    startButton.style.display = '';
    stopButton.style.display = 'none';
  }
}

// --- Event Listeners ---

function setupEventListeners() {
  clearButton.addEventListener('click', clearGrid);
  randomizeButton.addEventListener('click', randomizeGrid);
  startButton.addEventListener('click', startSimulation);
  stopButton.addEventListener('click', stopSimulation);

  speedRange.addEventListener('input', handleSpeedChange);
}

function handleSpeedChange() {
  STEP_INTERVAL = Number(speedRange.value);
  speedValue.textContent = `${STEP_INTERVAL} ms`;

  if (running) {
    clearInterval(intervalId!);
    intervalId = setInterval(nextGeneration, STEP_INTERVAL);
  }
}

// --- Initial Render ---
renderGrid(grid);
updateControlButtons();
setupEventListeners();
speedRange.value = STEP_INTERVAL.toString();// Sets the slider to the default value (500 ms) when the page loads.
speedValue.textContent = `${STEP_INTERVAL} ms`; //Sets the display text to the default value (500 ms) when the page loads.
