// Typendefinition
type Cell = number;
type Grid = Cell[][];
type Pattern = [Cell, Cell][];


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
      domCell.classList.toggle("alive", cell === 1);
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
    cell.classList.toggle("alive", nextGrid[i][j] === 1);
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

addEventListener("DOMContentLoaded", () => {
  const rowsInput = document.getElementById("rows") as HTMLInputElement;
  const collsInput = document.getElementById("columns") as HTMLInputElement;
  const speedInput = document.getElementById("speed") as HTMLInputElement;
  const startButton = document.getElementById("startButton") as HTMLButtonElement;
  const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
  let rows: number = parseInt(rowsInput.value);
  let colls: number = parseInt(collsInput.value);

  // Initiales Grid erstellen
  updateGridStyle(rows, colls);
  recreateGridStyle(rows, colls);

  // Hier erstellen wir das Grid, aber ohne es zu randomisieren
  let grid: Grid = Array.from({ length: rows }, () => Array(colls).fill(0));

  // Nur beim ersten Mal randomisieren
  grid = randomizeCells(rows, colls);

  // ... rest of your event listeners ...

  // Eventlistener für Änderungen an den Eingabefeldern
  rowsInput.addEventListener("change", () => {
    rows = parseInt(rowsInput.value);
    grid = Array.from({ length: rows }, () => Array(colls).fill(0)); // Neues leeres Grid
    updateGridStyle(rows, colls);
    recreateGridStyle(rows, colls);
  });

  collsInput.addEventListener("change", () => {
    colls = parseInt(collsInput.value);
    grid = Array.from({ length: rows }, () => Array(colls).fill(0)); // Neues leeres Grid
    updateGridStyle(rows, colls);
    recreateGridStyle(rows, colls);
  });

  // Eventlistener für Klicks auf Zellen
  const gameField = document.getElementById("gameField") as HTMLDivElement;
  gameField.addEventListener("click", (event) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains("cell")) {
      target.classList.toggle("alive");
      const index = Array.from(gameField.children).indexOf(target);
      const row = Math.floor(index / parseInt(collsInput.value));
      const coll = index % parseInt(collsInput.value);
      grid[row][coll] = grid[row][coll] === 1 ? 0 : 1; // Toggle cell state
    }
  });

  // Start-Button Event Listener
  startButton.addEventListener("click", () => {
    const speed = parseInt(speedInput.value);
    // Hier wird das existierende Grid verwendet, ohne es neu zu randomisieren
    startGame(rows, colls, speed);
  });

  // Restart-Button ist der einzige Ort, wo wir das Grid neu randomisieren
  restartButton.addEventListener("click", () => {
    grid = randomizeCells(parseInt(rowsInput.value), parseInt(collsInput.value));
  });
});
