import './style.css';

// Get references to HTML elements
const gridDiv = document.getElementById('grid')!;
const randomButton = document.getElementById('random')!;
const startButton = document.getElementById('start')!;
const clearButton = document.getElementById('clear')!;
//The '!' operator is used to assert that the element is not null.
// This is a TypeScript feature that tells the compiler that you are sure the value will not be null or undefined.

// These variables control the grid and the game
let gridSize: number = 20; // Number of rows and columns (always square)
let grid: boolean[][] = []; // 2D array for the cells (true = alive, false = dead)
//TypeScript annotation: boolean[][] means a 2D array of booleans
let running: boolean = false; // Is the game running?
let intervalId: number | null = null; // For the animation

// This function sets the grid size based on the window size
function setGridSize() {
  const cellPixel:number = 25;
  // Find out how many cells fit in the smallest window side
  const maxCells = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.95 / cellPixel);
  gridSize = Math.max(10, Math.min(maxCells, 40)); // Between 10 and 40
}

// This function creates a new empty grid (all cells dead)
function createEmptyGrid(): boolean[][] {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  // The outer Array.from creates an array of rows. 
  // The arrow function () => Array(gridSize).fill(false)); is called once for each row, creating a new array filled with false values.
}

// This function shows the grid on the page
function showGrid() {
  gridDiv.innerHTML = '';
  gridDiv.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell' + (grid[row][col] ? ' alive' : '');
      // When you click a cell, it toggles between alive and dead

      cellDiv.addEventListener('click', () => {
        grid[row][col] = !grid[row][col];
        showGrid();
      });
      gridDiv.appendChild(cellDiv);
    }
  }
}

// This function counts how many living neighbors a cell has
function countLivingNeighbors(row: number, col: number): number {
  let count = 0;
  // dr = delta row (change in row), dc = delta column (change in column)
  // Loop through the 8 possible neighbors
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // Skip the cell itself
      const newRow = row + dr;
      const newCol = col + dc;
      // Check if neighbor is inside the grid and alive
      if (
        newRow >= 0 && newRow < gridSize &&
        newCol >= 0 && newCol < gridSize &&
        grid[newRow][newCol]
      ) {
        count++;
      }
    }
  }
  return count;
}

// This function creates the next generation of the grid
function nextGeneration() {
  const newGrid = createEmptyGrid();
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const neighbors = countLivingNeighbors(row, col);
      if (grid[row][col]) {
        // Alive cell: survives with 2 or 3 neighbors
        newGrid[row][col] = neighbors === 2 || neighbors === 3;
      } else {
        // Dead cell: becomes alive with exactly 3 neighbors
        newGrid[row][col] = neighbors === 3;
      }
    }
  }
  grid = newGrid;
  showGrid();
}

// This function fills the grid randomly with alive cells
function randomizeGrid() {
  grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => Math.random() > 0.7)
  );
  showGrid();
}

// This function clears the grid (all cells dead)
function clearGrid() {
  grid = createEmptyGrid();
  showGrid();
}

// This function starts or stops the game
function toggleGame() {
  if (running) {
    running = false;
    startButton.textContent = 'Start';
    if (intervalId !== null) clearInterval(intervalId);
  } else {
    running = true;
    startButton.textContent = 'Pause';
    intervalId = setInterval(nextGeneration, 100);
  }
}

// When the window is resized, keep the grid square and copy as much as possible
window.addEventListener('resize', () => {
  const oldGrid = grid;
  setGridSize();
  grid = createEmptyGrid();
  for (let row = 0; row < Math.min(gridSize, oldGrid.length); row++) {
    for (let col = 0; col < Math.min(gridSize, oldGrid[0].length); col++) {
      grid[row][col] = oldGrid[row][col];
    }
  }
  showGrid();
});

// Button event listeners
randomButton.addEventListener('click', randomizeGrid);
clearButton.addEventListener('click', clearGrid);
startButton.addEventListener('click', toggleGame);

// Initial setup
setGridSize();
grid = createEmptyGrid();
showGrid();