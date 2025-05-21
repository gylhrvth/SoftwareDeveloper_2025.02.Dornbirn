
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
const gridSize = 30;
let grid = new Array(gridSize * gridSize).fill(false);
const cells: HTMLDivElement[] = [];

// Initialize heading and controls
headingDiv.innerHTML = `<h1>Game of Life</h1>`;
const controlsDiv = document.createElement('div');
controlsDiv.id = "controls";
headingDiv.appendChild(controlsDiv);

// Create buttons utility
function createButton(text: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = text;
  return btn;
}

// Create controls
const restartBtn = createButton("Restart");
const startStopBtn = createButton("Stop");
const darkModeBtn = createButton("Dark Mode");

const seedLabel = document.createElement('label');
seedLabel.htmlFor = 'seedInput';
seedLabel.textContent = 'Seeds: ';

const seedInput = document.createElement('input');
seedInput.type = 'number';
seedInput.id = 'seedInput';
seedInput.min = '1';
seedInput.max = '300';
seedInput.value = '20';

controlsDiv.append(restartBtn, startStopBtn, darkModeBtn, seedLabel, seedInput);

// Build grid cells and event listeners once
for (let i = 0; i < grid.length; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => {
    grid[i] = !grid[i];
    updateDOMCell(i);
  });
  app.appendChild(cell);
  cells.push(cell);
}

// Efficiently update only the changed cell in DOM
function updateDOMCell(i: number) {
  cells[i].classList.toggle('alive', grid[i]);
}

// Update all cells DOM (for batch updates)
function updateDOM() {
  grid.forEach((alive, i) => updateDOMCell(i));
}

// Calculate alive neighbors of a cell at index i
function countAliveNeighbors(i: number): number {
  const row = Math.floor(i / gridSize);
  const col = i % gridSize;
  let count = 0;

  // Iterate neighbors offsets without the center (0,0)
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue;
      const nr = row + r;
      const nc = col + c;
      if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
        if (grid[nr * gridSize + nc]) count++;
      }
    }
  }
  return count;
}

// Compute next generation grid efficiently in one pass
function nextGeneration() {
  const newGrid = new Array(gridSize * gridSize);
  for (let i = 0; i < grid.length; i++) {
    const neighbors = countAliveNeighbors(i);
    newGrid[i] = grid[i] ? neighbors === 2 || neighbors === 3 : neighbors === 3;
  }
  grid = newGrid;
  updateDOM();
}

// Animation loop with throttling by interval
let lastUpdate = 0;
const interval = 600;
let running = true;

function animate(time = 0) {
  if (!running) return;
  if (time - lastUpdate >= interval) {
    nextGeneration();
    lastUpdate = time;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Button event handlers
startStopBtn.addEventListener('click', () => {
  running = !running;
  startStopBtn.textContent = running ? "Stop" : "Start";
  if (running) requestAnimationFrame(animate);
});

restartBtn.addEventListener('click', () => {
  grid.fill(false);
  const seeds = Math.min(Math.max(parseInt(seedInput.value) || 20, 1), 300);

  for (let i = 0; i < seeds; i++) {
    // Random row and col excluding edges
    const row = Math.floor(Math.random() * (gridSize - 2)) + 1;
    const col = Math.floor(Math.random() * (gridSize - 2)) + 1;

    // Seed a horizontal line of 3 cells, carefully avoiding index errors
    const centerIndex = row * gridSize + col;
    [centerIndex - 1, centerIndex, centerIndex + 1].forEach(idx => grid[idx] = true);
  }

  updateDOM();

  if (!running) {
    running = true;
    startStopBtn.textContent = "Stop";
    requestAnimationFrame(animate);
  }
});

darkModeBtn.addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.toggle('dark-mode');
  darkModeBtn.textContent = html.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});




