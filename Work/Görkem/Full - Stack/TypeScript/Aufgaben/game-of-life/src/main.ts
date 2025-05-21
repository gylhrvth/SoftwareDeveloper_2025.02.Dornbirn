
type Grid = number[][];

const app = document.querySelector<HTMLDivElement>('#app');
const cellSize = 18;
const gridPadding = 32;
let rows: number, cols: number;
let grid: Grid;
let running = true;
let animationFrameId: number;

const gridContainer = document.createElement('div');
gridContainer.id = 'grid';
if (app) {
  app.innerHTML = `
    <h1>Game of Life</h1>
    <div id="controls" style="text-align:center; margin-bottom:10px;">
      <button id="startStopBtn">Start/Stop</button>
      <button id="restartBtn">Neustart</button>
    </div>
  `;
  app.appendChild(gridContainer);
}

function getGridSize(): { rows: number; cols: number; cellSize: number } {
  const minCellSize = 10; // Minimum für Touch-Bedienung
  const maxCellSize = 24; // Maximum für große Bildschirme
  const padding = 80; // Platz für Überschrift/Buttons
  const maxCols = 40; // Maximalspalten für mobile
  const maxRows = 40; // Maximalzeilen für mobile

  let cols = Math.floor(window.innerWidth / maxCellSize);
  let rows = Math.floor((window.innerHeight - padding) / maxCellSize);

  cols = Math.min(cols, maxCols);
  rows = Math.min(rows, maxRows);

  // Berechne die optimale Zellgröße, damit das Grid genau passt
  const cellSize = Math.max(
    minCellSize,
    Math.min(
      Math.floor(window.innerWidth / cols),
      Math.floor((window.innerHeight - padding) / rows)
    )
  );

  return { rows, cols, cellSize };
}

function createGrid(rows: number, cols: number): Grid {
  return Array.from({length: rows}, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
}

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

function updateGridDOM(): void {
  const allCells = gridContainer.querySelectorAll<HTMLDivElement>('.cell');
  allCells.forEach(cell => {
    const r = parseInt(cell.dataset.row!);
    const c = parseInt(cell.dataset.col!);
    const alive = grid[r][c];
    cell.classList.toggle('alive', alive === 1);
  });
}

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

function loop(): void {
  if (running) {
    nextGeneration();
    updateGridDOM();
  }
  animationFrameId = requestAnimationFrame(loop);
}

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

// Klickbare Zellen aktivieren
gridContainer.addEventListener('click', (e) => {
  const target = e.target as HTMLDivElement;
  if (!target.classList.contains('cell')) return;
  const r = parseInt(target.dataset.row!);
  const c = parseInt(target.dataset.col!);
  toggleCell(r, c);
});

// Space zum Start/Stop
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
  grid = createGrid(rows, cols); // neues zufälliges Grid
  renderInitialGrid();
  updateGridDOM();
});

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













