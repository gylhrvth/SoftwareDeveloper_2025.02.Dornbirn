
// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


import './style.css' 


const headingDiv = document.getElementById("heading")!;
const app = document.querySelector<HTMLDivElement>('#app')!;

const GRID_SIZE = 30;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;
const SEED_MIN = 1;
const SEED_MAX = 300;
const ANIMATION_INTERVAL = 600;

let grid = new Array(CELL_COUNT).fill(false);
const cells: HTMLDivElement[] = [];

headingDiv.innerHTML = `<h1>Game of Life</h1>`;

// Controls container
const controlsDiv = document.createElement('div');
controlsDiv.id = "controls";
headingDiv.appendChild(controlsDiv);

// Utility to create buttons
function createButton(text: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = text;
  return btn;
}

// Controls elements
const restartBtn = createButton("Restart");
const startStopBtn = createButton("Stop");
const darkModeBtn = createButton("Dark Mode");

const seedLabel = document.createElement('label');
seedLabel.htmlFor = 'seedInput';
seedLabel.textContent = 'Seeds: ';

const seedInput = document.createElement('input');
seedInput.type = 'number';
seedInput.id = 'seedInput';
seedInput.min = SEED_MIN.toString();
seedInput.max = SEED_MAX.toString();
seedInput.value = '20';

controlsDiv.append(restartBtn, startStopBtn, darkModeBtn, seedLabel, seedInput);

// Build grid cells once with click toggling
for (let i = 0; i < CELL_COUNT; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => {
    grid[i] = !grid[i];
    updateCell(i);
  });
  app.appendChild(cell);
  cells.push(cell);
}

// Update a single cell's visual state
function updateCell(index: number) {
  cells[index].classList.toggle('alive', grid[index]);
}

// Update all cells in batch
function updateAllCells() {
  for (let i = 0; i < CELL_COUNT; i++) {
    updateCell(i);
  }
}

// Count alive neighbors around a cell
function countAliveNeighbors(index: number): number {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  let count = 0;

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue;
      const nr = row + r;
      const nc = col + c;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
        if (grid[nr * GRID_SIZE + nc]) count++;
      }
    }
  }

  return count;
}

let running = true;
let lastTimestamp = 0;

function nextGeneration() {
  const newGrid = new Array(CELL_COUNT);

  for (let i = 0; i < CELL_COUNT; i++) {
    const aliveNeighbors = countAliveNeighbors(i);
    const isAlive = grid[i];
    newGrid[i] = isAlive ? (aliveNeighbors === 2 || aliveNeighbors === 3) : (aliveNeighbors === 3);
  }

  grid = newGrid;
  updateAllCells();
}

function animate(timestamp = 0) {
  if (!running) return;

  if (timestamp - lastTimestamp >= ANIMATION_INTERVAL) {
    nextGeneration();
    lastTimestamp = timestamp;
  }

  requestAnimationFrame(animate);
}

// Initial start of animation loop
requestAnimationFrame(animate);

// Button handlers
startStopBtn.addEventListener('click', () => {
  running = !running;
  startStopBtn.textContent = running ? "Stop" : "Start";

  if (running) {
    lastTimestamp = performance.now(); // reset timing to avoid jump
    requestAnimationFrame(animate);
  }
});

restartBtn.addEventListener('click', () => {
  grid.fill(false);

  let seeds = parseInt(seedInput.value);
  if (isNaN(seeds) || seeds < SEED_MIN) seeds = SEED_MIN;
  if (seeds > SEED_MAX) seeds = SEED_MAX;

  for (let i = 0; i < seeds; i++) {
    // Random position avoiding edges
    const row = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    const col = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    const centerIndex = row * GRID_SIZE + col;

    // Seed a horizontal line of 3 alive cells (if inside grid)
    [centerIndex - 1, centerIndex, centerIndex + 1].forEach(idx => {
      if (idx >= 0 && idx < CELL_COUNT) grid[idx] = true;
    });
  }

  updateAllCells();

  if (!running) {
    running = true;
    startStopBtn.textContent = "Stop";
    lastTimestamp = performance.now();
    requestAnimationFrame(animate);
  }
});

darkModeBtn.addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.toggle('dark-mode');
  darkModeBtn.textContent = html.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});




