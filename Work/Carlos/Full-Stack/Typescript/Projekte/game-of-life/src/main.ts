//npm run dev (to start project)
//npm run build (to build project)

import './style.css';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const cellSize = 15;
let rows = 0;
let cols = 0;
let running = false;
let animationId: number | null = null;

// Initialize grid
let grid: number[][] = [];

function resizeCanvasAndGrid() {
  // Set canvas size to fit window, minus some margin
  canvas.width = Math.floor(window.innerWidth * 0.95);
  canvas.height = Math.floor(window.innerHeight * 0.7);

  rows = Math.floor(canvas.height / cellSize);
  cols = Math.floor(canvas.width / cellSize);

  // If grid exists, keep as much state as possible
  const oldGrid = grid;
  grid = Array.from({ length: rows }, (_, x) =>
    Array.from({ length: cols }, (_, y) =>
      oldGrid && oldGrid[x] && oldGrid[x][y] ? oldGrid[x][y] : 0
    )
  );
  drawGrid();
}

// Helper to clone a 2D array
function cloneGrid(grid: number[][]): number[][] {
  return grid.map(row => [...row]);
}

// Count live neighbors
function countNeighbors(grid: number[][], x: number, y: number): number {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
        count += grid[nx][ny];
      }
    }
  }
  return count;
}

// Compute next generation
function nextGeneration() {
  const newGrid = cloneGrid(grid);
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const neighbors = countNeighbors(grid, x, y);
      if (grid[x][y] === 1) {
        if (neighbors === 2 || neighbors === 3) {
          newGrid[x][y] = 1;
        } else {
          newGrid[x][y] = 0;
        }
      } else {
        if (neighbors === 3) {
          newGrid[x][y] = 1;
        }
      }
    }
  }
  grid = newGrid;
}

// Draw the grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      ctx.beginPath();
      ctx.rect(y * cellSize, x * cellSize, cellSize, cellSize);
      ctx.fillStyle = grid[x][y] ? '#222' : '#fff';
      ctx.fill();
      ctx.strokeStyle = '#eee';
      ctx.stroke();
    }
  }
}

// Animation loop
function loop() {
  nextGeneration();
  drawGrid();
  if (running) {
    animationId = requestAnimationFrame(loop);
  }
}

// Toggle simulation
function toggle() {
  running = !running;
  if (running) {
    animationId = requestAnimationFrame(loop);
  } else if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Randomize grid
function randomize() {
  grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
  drawGrid();
}

// Clear grid
function clearGrid() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  drawGrid();
}

// Toggle cell on click
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const y = Math.floor((e.clientX - rect.left) / cellSize);
  const x = Math.floor((e.clientY - rect.top) / cellSize);
  if (x >= 0 && x < rows && y >= 0 && y < cols) {
    grid[x][y] = grid[x][y] ? 0 : 1;
    drawGrid();
  }
});

// Button event listeners
(document.getElementById('toggle') as HTMLButtonElement).onclick = toggle;
(document.getElementById('random') as HTMLButtonElement).onclick = randomize;
(document.getElementById('clear') as HTMLButtonElement).onclick = clearGrid;

// Handle window resize
window.addEventListener('resize', () => {
  resizeCanvasAndGrid();
});

// Initial setup
resizeCanvasAndGrid();