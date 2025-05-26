// Import der Typendefinitionen und Event-System
import {
  type Cell,
  type Grid,
  type Pattern,
  setupEventListeners,
  EVENTS,
  type GameStartEvent,
  type GridUpdateEvent
} from "./eventAndTypes";

// Game-Logik-Funktionen
function startGame(rows: number, colls: number, speed: number) {
  // Grid aus dem DOM rekonstruieren
  let grid: Grid = Array.from({ length: rows }, () => Array(colls).fill(0));
  const cells = document.querySelectorAll('.cell');
  
  cells.forEach((cell, index) => {
    const row: number = Math.floor(index / colls);
    const col: number = index % colls;
    grid[row][col] = cell.classList.contains('alive') ? 1 : 0;
  });

  const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
  let nextGrid: Grid = Array.from({ length: rows }, () => Array(colls).fill(0));
  
  const interval = setInterval(() => {
    nextGrid = checkCell(grid);
    updateGrid(colls, nextGrid);
    if (isGridStable(grid, nextGrid)) {
      clearInterval(interval);
    }
    [grid, nextGrid] = syncGrid(grid, nextGrid);

    stopButton.addEventListener("click", () => {
      clearInterval(interval);
    });
  }, speed);
}

function randomizeCells(rows: number, colls: number): Grid {
  const grid: Grid = Array.from({ length: rows }, () =>
    Array.from({ length: colls }, (): Cell => Math.random() < 0.7 ? 0 : 1)
  );
  
  // Update DOM
  grid.forEach((row: Cell[], i: number) => {
    row.forEach((cell: Cell, j: number) => {
      const domCell = document.querySelectorAll(".cell")[i * colls + j] as HTMLDivElement;
      if (domCell) {
        domCell.classList.toggle("alive", cell === 1);
      }
    });
  });
  
  return grid;
}

function checkCell(grid: Grid): Grid {
  return grid.map((row: Cell[], i: number): Cell[] =>
    row.map((cell: Cell, j: number): Cell => {
      const neighbors: number = countNeighbors(i, j, grid);
      if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
      if (cell === 0 && neighbors === 3) return 1;
      return cell;
    })
  );
}

function countNeighbors(row: number, coll: number, grid: Grid): number {
  let count = 0;

  // Definiere die relativen Positionen der Nachbarn
  const neighbors: Pattern = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  // Iteriere über die Nachbarn mit forEach
  neighbors.forEach(([i, j]) => {
    const newRow = (row + i + grid.length) % grid.length; // Wrap-around für Zeilen
    const newColl = (coll + j + grid[0].length) % grid[0].length; // Wrap-around für Spalten
    count += grid[newRow][newColl];
  });

  return count;
}

function updateGrid(colls: number, nextGrid: Grid) {
  Array.from(document.querySelectorAll(".cell")).forEach((cell, index) => {
    const i = Math.floor(index / colls);
    const j = index % colls;
    if (nextGrid[i] && nextGrid[i][j] !== undefined) {
      cell.classList.toggle("alive", nextGrid[i][j] === 1);
    }
  });
}

function syncGrid(grid: Grid, nextGrid: Grid): [Grid, Grid] {
  return [nextGrid, grid];
}

function isGridStable(grid: Grid, nextGrid: Grid): boolean {
  return grid.every((row, i) =>
    row.every((_cell, j) => grid[i][j] === nextGrid[i][j])
  );
}

function updateGridStyle(rows: number, colls: number) {
  const gameField = document.getElementById("gameField") as HTMLDivElement;
  gameField.style.gridTemplateColumns = `repeat(${colls}, 1fr)`;
  gameField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function recreateGridStyle(rows: number, colls: number) {
  const gameField = document.getElementById("gameField") as HTMLDivElement;
  gameField.innerHTML = ""; // Clear the existing grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gameField.appendChild(cell);
    }
  }
}

// Event-Listener für die vom Event-System ausgelösten Events
function setupGameLogicEventListeners() {
  // Game Start Event
  window.addEventListener(EVENTS.GAME_START, ((event: GameStartEvent) => {
    const { rows, cols, speed } = event.detail;
    startGame(rows, cols, speed);
  }) as EventListener);

  // Grid Update Event
  window.addEventListener(EVENTS.GRID_UPDATE, ((event: GridUpdateEvent) => {
    const { rows, cols } = event.detail;
    updateGridStyle(rows, cols);
    recreateGridStyle(rows, cols);
  }) as EventListener);

  // Randomize Event
  window.addEventListener(EVENTS.RANDOMIZE, ((event: CustomEvent) => {
    const { rows, cols } = event.detail;
    randomizeCells(rows, cols);
  }) as EventListener);
}

// Initialisierung
setupEventListeners();
setupGameLogicEventListeners();
