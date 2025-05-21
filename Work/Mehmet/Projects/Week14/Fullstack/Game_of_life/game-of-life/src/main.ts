
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


// --- Überschrift und Buttons erstellen ---
const headingDiv = document.getElementById("heading")!;

// Überschrift
const head = document.createElement('h1');
head.innerText = "Game of Life";
headingDiv.appendChild(head);

// Container für Buttons
const controlsDiv = document.createElement('div');
controlsDiv.id = "controls";
headingDiv.appendChild(controlsDiv);

// Restart Button
const restartBtn = document.createElement('button');
restartBtn.innerText = "Restart";
controlsDiv.appendChild(restartBtn);

// Start/Stop Button
const startStopBtn = document.createElement('button');
startStopBtn.innerText = "Stop";
controlsDiv.appendChild(startStopBtn);


// --- Grid Setup ---
const app = document.querySelector<HTMLDivElement>('#app')!;
const gridSize = 30; // 30x30 Grid

let grid = new Array(gridSize * gridSize).fill(false);
const cells: HTMLDivElement[] = [];

// Zellen erzeugen
for (let i = 0; i < grid.length; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  
  // Klick: Zustand toggeln
  cell.addEventListener('click', () => {
    grid[i] = !grid[i];
    updateDOM();
  });

  app.appendChild(cell);
  cells.push(cell);
}

// Zufällige Startmuster (Blinker) setzen
function setRandomSeeds(numSeeds: number) {
  grid.fill(false);
  for (let s = 0; s < numSeeds; s++) {
    const row = Math.floor(Math.random() * (gridSize - 2)) + 1;
    const col = Math.floor(Math.random() * (gridSize - 2)) + 1;

    grid[row * gridSize + col - 1] = true;
    grid[row * gridSize + col] = true;
    grid[row * gridSize + col + 1] = true;
  }
}

setRandomSeeds(25);
updateDOM();

// DOM Update
function updateDOM() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) cells[i].classList.add('alive');
    else cells[i].classList.remove('alive');
  }
}

// Nachbarn zählen
function countAliveNeighbors(index: number): number {
  const neighbors = [
    -gridSize - 1, -gridSize, -gridSize + 1,
    -1,             /* index */  +1,
    gridSize - 1,  gridSize,  gridSize + 1
  ];

  let count = 0;
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  for (const offset of neighbors) {
    const neighborIndex = index + offset;
    const nRow = Math.floor(neighborIndex / gridSize);
    const nCol = neighborIndex % gridSize;

    if (
      neighborIndex >= 0 && neighborIndex < grid.length &&
      Math.abs(nRow - row) <= 1 &&
      Math.abs(nCol - col) <= 1
    ) {
      if (grid[neighborIndex]) count++;
    }
  }

  return count;
}

// Nächste Generation berechnen
function nextGeneration() {
  const newGrid = new Array(grid.length).fill(false);

  for (let i = 0; i < grid.length; i++) {
    const aliveNeighbors = countAliveNeighbors(i);

    if (grid[i]) {
      newGrid[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
    } else {
      newGrid[i] = aliveNeighbors === 3;
    }
  }

  grid = newGrid;
  updateDOM();
}

// Animation mit requestAnimationFrame
let lastUpdate = 0;
const interval = 600; // ms
let running = true;

startStopBtn.addEventListener('click', () => {
  running = !running;
  startStopBtn.innerText = running ? "Stop" : "Start";
  if (running) requestAnimationFrame(animate);
});

restartBtn.addEventListener('click', () => {
  setRandomSeeds(25);
  updateDOM();
  if (!running) {
    running = true;
    startStopBtn.innerText = "Stop";
    requestAnimationFrame(animate);
  }
});

function animate(time = 0) {
  if (!running) return;
  if (time - lastUpdate > interval) {
    nextGeneration();
    lastUpdate = time;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);





