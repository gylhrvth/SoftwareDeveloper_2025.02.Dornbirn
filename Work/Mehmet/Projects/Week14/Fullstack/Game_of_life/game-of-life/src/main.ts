
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



// this is just the for appending the heading to the id= heading div in index.html
const head = document.createElement('h1');
head.innerText = "Game of Life";
document.getElementById("heading")!.appendChild(head);

const restartBtn = document.createElement('button');
restartBtn.innerText = "Restart";
restartBtn.style.marginLeft = "12px";
document.getElementById("heading")!.appendChild(restartBtn);

const startStopBtn = document.createElement('button');
startStopBtn.innerText = "Stop";
document.getElementById("heading")!.appendChild(startStopBtn);


const app = document.querySelector<HTMLDivElement>('#app')!;
const gridSize = 30; // Größe des Gitters (30x30)

// Spielfeld-Daten: Array von booleans (true = lebendig, false = tot)
let grid = new Array(gridSize * gridSize).fill(false);

// Array für DOM-Zellen, damit wir sie schnell updaten können
const cells: HTMLDivElement[] = [];

// --- Zellen erzeugen und ins DOM einfügen ---
for (let i = 0; i < grid.length; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  // Klick auf Zelle schaltet Status alive/tot um
  cell.addEventListener('click', () => {
    grid[i] = !grid[i]; // Zustand im Array toggeln
    updateDOM();        // DOM anpassen, um Farbe zu aktualisieren
  });

  app.appendChild(cell);
  cells.push(cell);
}

// --- Start-Muster setzen ---
// --- Zufällige Startmuster setzen ---
const numSeeds = 25; // Anzahl der Startmuster (hier 5, beliebig änderbar)
for (let s = 0; s < numSeeds; s++) {
  // Zufällige Position im Grid (nicht am Rand)
  const row = Math.floor(Math.random() * (gridSize - 2)) + 1;
  const col = Math.floor(Math.random() * (gridSize - 2)) + 1;
  // Einfaches Muster: "Blinker" (drei Zellen in einer Reihe)
  grid[row * gridSize + col - 1] = true;
  grid[row * gridSize + col] = true;
  grid[row * gridSize + col + 1] = true;
}


// DOM einmal initial updaten
updateDOM();


// --- Funktion: DOM an den Zustand im Array anpassen --- 
function updateDOM() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      cells[i].classList.add('alive');
    } else {
      cells[i].classList.remove('alive');
    }
  }
}


// --- Funktion: Anzahl lebender Nachbarn für eine Zelle berechnen --- 
function countAliveNeighbors(index: number): number {
  // Relative Positionen der 8 Nachbarn um die Zelle herum
  const neighbors = [
    -gridSize - 1, -gridSize, -gridSize + 1,
    -1,            /* index */  +1,
    gridSize - 1,  gridSize,  gridSize + 1
  ];

  let count = 0;
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  for (const offset of neighbors) {
    const neighborIndex = index + offset;
    const nRow = Math.floor(neighborIndex / gridSize);
    const nCol = neighborIndex % gridSize;

    // Prüfen, ob Nachbar im gültigen Bereich ist
    // und nicht über den linken oder rechten Rand hinausgeht
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


// --- Funktion: nächste Generation berechnen --- 
function nextGeneration() {
  const newGrid = new Array(grid.length).fill(false);

  for (let i = 0; i < grid.length; i++) {
    const aliveNeighbors = countAliveNeighbors(i);

    if (grid[i]) {
      // Regeln für lebende Zellen: bleiben nur bei 2 oder 3 Nachbarn leben
      newGrid[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
    } else {
      // Regeln für tote Zellen: werden lebendig, wenn genau 3 Nachbarn leben
      newGrid[i] = aliveNeighbors === 3;
    }
  }

  // Spielfeld aktualisieren
  grid = newGrid;
  updateDOM();
}


// --- Animation: Steuerung der automatischen Updates mit requestAnimationFrame --- 

let lastUpdate = 0;          // Zeit des letzten Updates (in ms)
const interval = 600;        // Zeitintervall zwischen Updates (500ms = 0.5s)


let running = true;
startStopBtn.addEventListener('click', () => {
  running = !running;
  startStopBtn.innerText = running ? "Stop" : "Start";
  if (running) requestAnimationFrame(animate);
});

// Animation anpassen:
function animate(time = 0) {
  if (!running) return; // <--- Animation pausieren, wenn nicht running
  if (time - lastUpdate > interval) {
    nextGeneration();
    lastUpdate = time;
  }
  requestAnimationFrame(animate);
}


// Animation starten
requestAnimationFrame(animate);





