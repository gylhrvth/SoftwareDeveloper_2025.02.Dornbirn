import './style.css';

// --- Types and Interfaces ---

// Type for a single cell (alive or dead)
type Cell = boolean;

// Type for the grid (2D array of cells)
type Grid = Cell[][];

// Interface for a grid position (optional, for clarity)
interface Position {
  row: number;
  col: number;
}

// --- Main Code ---

// Get references to HTML elements
const gridDiv = document.getElementById('grid')!;
const randomButton = document.getElementById('random')!;
const startButton = document.getElementById('start')!;
const clearButton = document.getElementById('clear')!;

// These variables control the grid and the game
let gridSize: number = 20; // Number of rows and columns (always square)
let grid: Grid = []; // 2D array for the cells (true = alive, false = dead)
let running: boolean = false; // Is the game running?
let intervalId: ReturnType<typeof setInterval> | null = null;

// This function sets the grid size based on the window size
function setGridSize() {
  const cellPixel: number = 25;
  // Find out how many cells fit in the smallest window side
  const maxCells = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.95 / cellPixel);
  gridSize = Math.max(10, Math.min(maxCells, 40)); // Between 10 and 40
}

// This function creates a new empty grid (all cells dead)
function createEmptyGrid(): Grid {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
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
function countLivingNeighbors(pos: Position): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const newRow = pos.row + dr;
      const newCol = pos.col + dc;
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
  const newGrid: Grid = createEmptyGrid();
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const neighbors = countLivingNeighbors({ row, col });
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