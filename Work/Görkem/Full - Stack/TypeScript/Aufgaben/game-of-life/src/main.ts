// Conway's Game of Life - TypeScript/DOM-Implementierung
// Interaktives, responsives Spielfeld mit Start/Stop, Dark Mode und Geschwindigkeitsregler

// 1. Typen & globale Variablen
type Grid = number[][];
const app = document.querySelector<HTMLDivElement>('#app');
let rows: number, cols: number;
let grid: Grid;
let speed = 20;
let running = true;
let animationFrameId: number;

// 2. DOM-Elemente erstellen
const gridContainer = document.createElement('div');
gridContainer.id = 'grid';

if (app) {
  app.innerHTML = `
    <h1>Game of Life</h1>
    <div id="controls" style="text-align:center; margin-bottom:10px;">
      <button id="startStopBtn">Start/Stop</button>
      <button id="restartBtn">Neustart</button>
      <button id="darkModeBtn">Dark Mode</button>
      <label style="margin-left:16px;">
        Speed: <input type="range" id="speedSlider" min="1" max="60" value="20" style="vertical-align:middle;">
      </label>
    </div>
  `;
  app.appendChild(gridContainer);
}

// 3. Funktionen
function setupSpeedSlider(): void {
  const speedSliderElem = document.getElementById('speedSlider') as HTMLInputElement;
  if (speedSliderElem) {
    speed = Number(speedSliderElem.value);
    speedSliderElem.addEventListener('input', () => {
      speed = Number(speedSliderElem.value);
    });
  }
}

function getGridSize(): { rows: number; cols: number; cellSize: number } {
  const padding = 80;
  const maxCols = 40;
  const maxRows = 40;
  let cols = Math.min(Math.floor((window.innerWidth - 32) / 18), maxCols);
  let rows = Math.min(Math.floor((window.innerHeight - padding) / 18), maxRows);
  const cellSize = Math.floor(
    Math.min(
      (window.innerWidth - 32) / cols,
      (window.innerHeight - padding) / rows
    )
  );
  return { rows, cols, cellSize };
}

function createGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
}

function renderInitialGrid(grid: Grid, gridContainer: HTMLDivElement, cellSize: number): void {
  const rows = grid.length;
  const cols = grid[0].length;
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
  gridContainer.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (grid[r][c]) cell.classList.add('alive');
      cell.dataset.row = r.toString();
      cell.dataset.col = c.toString();
      cell.style.width = `${cellSize - 2}px`;
      cell.style.height = `${cellSize - 2}px`;
      cell.style.border = "1px solid #ccc";
      gridContainer.appendChild(cell);
    }
  }
}

function updateGridDOM(grid: Grid, gridContainer: HTMLDivElement): void {
  const allCells = gridContainer.querySelectorAll<HTMLDivElement>('.cell');
  allCells.forEach(cell => {
    const r = parseInt(cell.dataset.row!);
    const c = parseInt(cell.dataset.col!);
    const alive = grid[r][c];
    cell.classList.toggle('alive', alive === 1);
  });
}

function countNeighbors(grid: Grid, r: number, c: number): number {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        count += grid[nr][nc];
      }
    }
  }
  return count;
}

function nextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
  const next: Grid = grid.map(arr => [...arr]);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = countNeighbors(grid, r, c);
      if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) next[r][c] = 0;
      else if (grid[r][c] === 0 && neighbors === 3) next[r][c] = 1;
    }
  }
  return next;
}

function loop(): void {
  if (running) {
    grid = nextGeneration(grid);
    updateGridDOM(grid, gridContainer);
  }
  setTimeout(() => {
    animationFrameId = requestAnimationFrame(loop);
  }, 1000 / speed);
}

function resizeGrid(): void {
  const size = getGridSize();
  if (size.rows !== rows || size.cols !== cols) {
    rows = size.rows;
    cols = size.cols;
    grid = createGrid(rows, cols);
    renderInitialGrid(grid, gridContainer, size.cellSize);
    updateGridDOM(grid, gridContainer);
  }
}

function toggleCell(r: number, c: number): void {
  grid[r][c] = grid[r][c] ? 0 : 1;
  updateGridDOM(grid, gridContainer);
}

// 4. EventListener
gridContainer.addEventListener('click', (e) => {
  const target = e.target as HTMLDivElement;
  if (!target.classList.contains('cell')) return;
  const r = parseInt(target.dataset.row!);
  const c = parseInt(target.dataset.col!);
  toggleCell(r, c);
});

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

document.getElementById('startStopBtn')?.addEventListener('click', () => {
  running = !running;
  if (running) {
    requestAnimationFrame(loop);
  } else {
    cancelAnimationFrame(animationFrameId);
  }
});

document.getElementById('restartBtn')?.addEventListener('click', () => {
  grid = createGrid(rows, cols);
  renderInitialGrid(grid, gridContainer, getGridSize().cellSize);
  updateGridDOM(grid, gridContainer);
});

document.getElementById('darkModeBtn')?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

window.addEventListener("resize", () => {
  resizeGrid();
  updateGridDOM(grid, gridContainer);
});

// 5. Initialisierung / Hauptprogramm
setupSpeedSlider();
const size = getGridSize();
rows = size.rows;
cols = size.cols;
grid = createGrid(rows, cols);
renderInitialGrid(grid, gridContainer, size.cellSize);
requestAnimationFrame(loop);













