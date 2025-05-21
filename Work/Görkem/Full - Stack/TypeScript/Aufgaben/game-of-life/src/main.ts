// Conway's Game of Life - TypeScript/DOM-Implementierung
// Interaktives, responsives Spielfeld mit Start/Stop, Dark Mode und Geschwindigkeitsregler

type Grid = number[][];

const app = document.querySelector<HTMLDivElement>('#app');
const cellSize = 18;
let rows: number, cols: number; // Anzahl der Zeilen und Spalten im Grid
let grid: Grid;
let running = true; // Gibt an, ob die Simulation läuft
let animationFrameId: number;

// Erzeuge das Grid-Container-DIV
const gridContainer = document.createElement('div');
gridContainer.id = 'grid';

if (app) {
  // Überschrift
  const heading = document.createElement('h1');
  heading.textContent = 'Game of Life';

  // Controls-Container
  const controls = document.createElement('div');
  controls.id = 'controls';
  controls.style.textAlign = 'center';
  controls.style.marginBottom = '10px';

  // Buttons
  const startStopBtn = document.createElement('button');
  startStopBtn.id = 'startStopBtn';
  startStopBtn.textContent = 'Start/Stop';

  const restartBtn = document.createElement('button');
  restartBtn.id = 'restartBtn';
  restartBtn.textContent = 'Neustart';

  const darkModeBtn = document.createElement('button');
  darkModeBtn.id = 'darkModeBtn';
  darkModeBtn.textContent = 'Dark Mode';

  // Speed Slider
  const speedLabel = document.createElement('label');
  speedLabel.style.marginLeft = '16px';
  speedLabel.textContent = 'Speed: ';
  const speedSlider = document.createElement('input');
  speedSlider.type = 'range';
  speedSlider.id = 'speedSlider';
  speedSlider.min = '1';
  speedSlider.max = '60';
  speedSlider.value = '20';
  speedSlider.style.verticalAlign = 'middle';
  speedLabel.appendChild(speedSlider);

  // Buttons und Slider zu Controls hinzufügen
  controls.appendChild(startStopBtn);
  controls.appendChild(restartBtn);
  controls.appendChild(darkModeBtn);
  controls.appendChild(speedLabel);

  // Alles ins App-DIV einfügen
  app.appendChild(heading);
  app.appendChild(controls);
  app.appendChild(gridContainer);
}

let speed = 20;
const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
if (speedSlider) {
  speed = Number(speedSlider.value);
  speedSlider.addEventListener('input', () => {
    speed = Number(speedSlider.value);
  });
}

function getGridSize(): { rows: number; cols: number; cellSize: number } {
  const minCellSize = 10; 
  const maxCellSize = 24; 
  const padding = 80; 
  const maxCols = 40; 
  const maxRows = 40; 

  let cols = Math.floor(window.innerWidth / maxCellSize);
  let rows = Math.floor((window.innerHeight - padding) / maxCellSize);

  cols = Math.min(cols, maxCols);
  rows = Math.min(rows, maxRows);

// Berechnet die optimale Grid-Größe und Zellgröße basierend auf Fenstergröße
  const cellSize = Math.max(
    minCellSize,
    Math.min(
      Math.floor(window.innerWidth / cols),
      Math.floor((window.innerHeight - padding) / rows)
    )
  );

  return { rows, cols, cellSize };
}
// Erstellt ein neues (zufälliges) Grid
function createGrid(rows: number, cols: number): Grid {
  return Array.from({length: rows}, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
}
// Zeichnet das Grid im DOM
function renderInitialGrid(): void {
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
  gridContainer.innerHTML = '';

  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (grid[r][c]) cell.classList.add('alive');
      cell.dataset.row = r.toString();
      cell.dataset.col = c.toString();
      cell.style.width = `${cellSize-2}px`;
      cell.style.height = `${cellSize-2}px`;
      cell.style.border = "1px solid #ccc";
      gridContainer.appendChild(cell);
    }
  }
}
// Aktualisiert die Darstellung der Zellen im DOM
function updateGridDOM(): void {
  const allCells = gridContainer.querySelectorAll<HTMLDivElement>('.cell');
  allCells.forEach(cell => {
    const r = parseInt(cell.dataset.row!);
    const c = parseInt(cell.dataset.col!);
    const alive = grid[r][c];
    cell.classList.toggle('alive', alive === 1);
  });
}
// Zählt die lebenden Nachbarn einer Zelle
function countNeighbors(r: number, c: number): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++){
    for (let dc = -1; dc <= 1; dc++){
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        count += grid[nr][nc];
    }
  }
}
return count;
}
// Berechnet die nächste Generation nach den Spielregeln
function nextGeneration(): void{
  const next: Grid = grid.map(arr => [...arr]);
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      const neighbors = countNeighbors(r, c);
      if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) next[r][c] = 0;
      else if (grid[r][c] === 0 && neighbors === 3) next[r][c] = 1;
    }
  }
  grid = next;
}
// Haupt-Loop: Steuert die Animation und Geschwindigkeit
function loop(): void {
  if (running) {
    nextGeneration();
    updateGridDOM();
  }
   setTimeout(() => {
    animationFrameId = requestAnimationFrame(loop);
  }, 1000 / speed);
}
// Setzt das Grid bei Größenänderung neu auf
function resizeGrid(): void {
  const size = getGridSize();
  if (size.rows !== rows || size.cols !== cols){
    rows = size.rows;
    cols = size.cols;
    grid = createGrid(rows, cols);
    renderInitialGrid();
  }
}

function toggleCell(r: number, c: number): void {
  grid[r][c] = grid[r][c] ? 0 : 1;
  updateGridDOM();
}

// Klick auf eine Zelle toggelt deren Zustand (lebendig/tot)
gridContainer.addEventListener('click', (e) => {
  const target = e.target as HTMLDivElement;
  if (!target.classList.contains('cell')) return;
  const r = parseInt(target.dataset.row!);
  const c = parseInt(target.dataset.col!);
  toggleCell(r, c);
});

// Leertaste startet/stoppt die Simulation
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    running = !running;
  if (running) {
      requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationFrameId);
    }
  }
});
// Start/Stop-Button
document.getElementById('startStopBtn')?.addEventListener('click', () => {
  running = !running;
  if (running) {
    requestAnimationFrame(loop);
  } else {
    cancelAnimationFrame(animationFrameId);
  }
});
// Neustart-Button: Neues zufälliges Grid
document.getElementById('restartBtn')?.addEventListener('click', () => {
  grid = createGrid(rows, cols); // neues zufälliges Grid
  renderInitialGrid();
  updateGridDOM();
});

document.getElementById('darkModeBtn')?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
// Fenstergröße ändert sich → Grid neu berechnen
window.addEventListener("resize", () => {
  resizeGrid();
  updateGridDOM();
});

// Initial starten
const size = getGridSize();
rows = size.rows;
cols = size.cols;
grid = createGrid(rows, cols);
renderInitialGrid();
requestAnimationFrame(loop);

// Initiales Setup: Grid berechnen, erzeugen und Animation starten













