// const colls = 40;
// const rows = 40;


addEventListener("DOMContentLoaded", () => {
  const rowsInput = document.getElementById("rows") as HTMLInputElement;
  const collsInput = document.getElementById("columns") as HTMLInputElement;
  const speedInput = document.getElementById("speed") as HTMLInputElement;
  const startButton = document.getElementById("startButton") as HTMLButtonElement;
  const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
  // Initiales Grid erstellen
  updateGridStyle(parseInt(rowsInput.value), parseInt(collsInput.value));
  recreateGridStyle(parseInt(rowsInput.value), parseInt(collsInput.value));

  const grid = randomizeCells(parseInt(rowsInput.value), parseInt(collsInput.value));


  // Eventlistener für Änderungen an den Eingabefeldern
  rowsInput.addEventListener("change", () => {
    const rows = parseInt(rowsInput.value);
    const colls = parseInt(collsInput.value);
    updateGridStyle(rows, colls);
    recreateGridStyle(rows, colls);
  });

  collsInput.addEventListener("change", () => {
    const rows = parseInt(rowsInput.value);
    const colls = parseInt(collsInput.value);
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

  // Eventlistener für den Start-Button
  startButton.addEventListener("click", () => {
    const speed = parseInt(speedInput.value);
    const rows = parseInt(rowsInput.value);
    const colls = parseInt(collsInput.value);
    startGame(rows, colls, grid, speed);

  });

  // Eventlistener für Restart-Button
  restartButton.addEventListener("click", () => {
    randomizeCells(parseInt(rowsInput.value), parseInt(collsInput.value));
  });
});



function startGame(rows: number, colls: number, grid: number[][], speed: number) {
  const stopButton = document.getElementById("stopButton") as HTMLButtonElement;
  let nextGrid = Array.from({ length: rows }, () => Array(colls).fill(0));
  const interval = setInterval(() => {
    nextGrid = checkCell(rows, colls, grid, nextGrid);
    updateGrid(colls, nextGrid);
    if (isGridStable(grid, nextGrid, rows, colls)) {
      clearInterval(interval);
    }
    [grid, nextGrid] = syncGrid(grid, nextGrid);

    // Eventlistener für den Stop-Button
    stopButton.addEventListener("click", () => {
      clearInterval(interval);
    });

  }, speed);
}

function randomizeCells(rows: number, colls: number): number[][] {
  const grid = Array.from({ length: rows }, () => Array(colls).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      grid[i][j] = Math.random() < 0.7 ? 0 : 1; // Randomly initialize cells
      const cell = document.querySelectorAll(".cell")[i * colls + j] as HTMLDivElement;
      if (grid[i][j] === 1) {
        cell.classList.add("alive");
      } else {
        cell.classList.remove("alive");
      }
    }
  }
  return grid;
}

function checkCell(rows: number, colls: number, grid: number[][], nextGrid: number[][]): number[][] {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      const neighbors = countNeighbors(i, j, grid);
      if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0; // Cell dies
      } else if (grid[i][j] === 0 && neighbors === 3) {
        nextGrid[i][j] = 1; // Cell becomes alive
      } else {
        nextGrid[i][j] = grid[i][j]; // Cell remains the same
      }
    }
  }
  return nextGrid;
}


function countNeighbors(row: number, coll: number, grid: number[][]): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      // Wrap ariund the edges
      const newRow = (row + i + grid.length) % grid.length;
      const newColl = (coll + j + grid[0].length) % grid[0].length;

      count += grid[newRow][newColl];
    }
  }
  return count;
}

function updateGrid(colls: number, nextGrid: number[][]) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const i = Math.floor(index / colls);
    const j = index % colls;
    if (nextGrid[i][j] === 1) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove("alive");
    }
  });
}

function syncGrid(grid: number[][], nextGrid: number[][]): [number[][], number[][]] {
  return [nextGrid, grid];
}

function isGridStable(grid: number[][], nextGrid: number[][], rows: number, colls: number): boolean {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      if (grid[i][j] !== nextGrid[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function updateGridStyle(rows: number, colls: number) {
  const gameField = document.getElementById("gameField") as HTMLDivElement;
  gameField.style.gridTemplateColumns = `repeat(${colls}, 20px)`;
  gameField.style.gridTemplateRows = `repeat(${rows}, 20px)`;
  console.log("Grid style updated");
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
  randomizeCells(rows, colls);
}

