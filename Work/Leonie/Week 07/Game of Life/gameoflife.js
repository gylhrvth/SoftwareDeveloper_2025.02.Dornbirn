let grid = [];
let rows = 40;
let cols = 40;
let nextGrid = [];

function initializeGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    nextGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() < 0.7 ? 0 : 1; // Randomly initialize cells
        }
    }
}

function checkCell() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0; // Cell dies
            } else if (grid[i][j] == 0 && neighbors == 3) {
                nextGrid[i][j] = 1; // Cell becomes alive
            } else {
                nextGrid[i][j] = grid[i][j]; // Cell remains the same
            }
        }
    }
    [grid, nextGrid] = [nextGrid, grid];
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself
            const row = (x + i + rows) % rows; // Wrap around edges
            const col = (y + j + cols) % cols; // Wrap around edges
            count = count + grid[row][col]; // Count alive neighbors
        }
    }
    return count;

}

function drawGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = ''; // Lösche vorherige Darstellung
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (grid[i][j] === 1 ? ' alive' : '');
            gridContainer.appendChild(cell);
        }
    }
}

function startGame() {
    setInterval(() => {
        drawGrid();
        checkCell();
        
    }, 200); // Update every 100 milliseconds
}

initializeGrid();

