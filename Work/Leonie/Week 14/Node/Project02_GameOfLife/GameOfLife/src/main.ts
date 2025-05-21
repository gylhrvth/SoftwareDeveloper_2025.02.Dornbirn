const colls = 40;
const rows = 40;


addEventListener("DOMContentLoaded", () => {
  const gameField = document.getElementById("gameField") as HTMLDivElement;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gameField.appendChild(cell);
    }
  }
  const grid = randomizeCells(rows, colls);
  addEventListener("click", (event) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains("cell")) {
      const index = Array.from(gameField.children).indexOf(target);
      const i = Math.floor(index / colls);
      const j = index % colls;
      grid[i][j] = grid[i][j] === 1 ? 0 : 1; // Toggle cell state
      target.classList.toggle("alive");
    }
  }
  )
  // Eventlistener für button
  addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.id === "startButton") {
      startGame(rows, colls, grid);
    }
  }
  )
});



function startGame(rows: number, colls: number, grid: number[][]) {
  let nextGrid = Array.from({ length: rows }, () => Array(colls).fill(0));
  const interval = setInterval(() => {
    nextGrid = checkCell(rows, colls, grid, nextGrid);
    updateGrid(colls, nextGrid);
    if (isGridStable(grid, nextGrid)) {
      clearInterval(interval);
    }
    syncGrid(grid, nextGrid);
  }, 200);
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
      const neighbors = countNeighbors(i, j, rows, colls, grid);
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


function countNeighbors(row: number, coll: number, rows: number, colls: number, grid: number[][]): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = (row + i + rows) % rows; // Wrap-around für Zeilen
      const newColl = (coll + j + colls) % colls; // Wrap-around für Spalten
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

function syncGrid(grid: number[][], nextGrid: number[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = nextGrid[i][j];
    }
  }
}

function isGridStable(grid: number[][], nextGrid: number[][]): boolean {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colls; j++) {
      if (grid[i][j] !== nextGrid[i][j]) {
        return false;
      }
    }
  }
  return true;
}

