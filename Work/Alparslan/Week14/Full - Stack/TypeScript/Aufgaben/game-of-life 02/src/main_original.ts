//--------------------------------------------------------------------
// Css importieren
import './style.css';

//Grundstrucktur für HTML in #app setzen
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Game of Life</h1>
  <div id="grid-container"></div>
  <div id="controls"></div>
`;



//--------------------------------------------------------------------
//Globale Variablen
const cellSize = 20;
let grid: boolean[][]; // Gitter

//--------------------------------------------------------------------
// 1. Gitter dynamisch initialisieren
function createGrid(rows: number, cols: number): boolean[][] {
    return Array(rows).fill(0).map(() =>
        Array(cols).fill(0).map(() => false)
    );
}
//-------------------------------------------------------------
// 1.1. Pattern-Logic
function applyPattern(grid: boolean[][], pattern: [number, number][], offsetRow = 0, offsetCol = 0): void {
    pattern.forEach(([r, c]) => {
        const row = r + offsetRow;
        const col = c + offsetCol;
        if (row < grid.length && col < grid[0].length) {
            grid[row][col] = true;
        }
    });
}

// Herz-Muster
const heartPattern: [number, number][] = [
    [0, 1], [0, 3],
    [1, 0], [1, 2], [1, 4],
    [2, 0], [2, 4],
    [3, 1], [3, 3],
    [4, 2],
];

// Smiley-Muster
const smileyPattern: [number, number][] = [
    [0, 1], [0, 3],
    [1, 1], [1, 3],
    [3, 0], [3, 1], [3, 3], [3, 4],
    [4, 1], [4, 3],
];

// Dino-Muster
const dinoPattern: [number, number][] = [
    [21, 17],[20, 18],[19, 19],
    [19, 20],[19, 21],[20, 22],
    [21, 22],[22, 17],[22, 18],
    [22, 19],[23, 20],[22, 23],
    [22, 24],[23, 25],[24, 25],
    [25, 26],[25, 27],[25, 28],
    [24, 29],[23, 30],[26, 25],
    [27, 25],[27, 24],[25, 22],
    [26, 22],[25, 22],[27, 22],
    [27, 21],[24, 20],[25, 21],
    [25, 19],[25, 18]
];

const daniPattern: [number, number][]=[
    [25, 10], [24, 10], [23, 10], [22, 10],
    [21, 9], [21, 10], [21, 11],
    [22, 12], [23, 13], [24, 13], [25, 12],
    [26, 11], [26, 10], [26, 9],
    [26, 14], [25, 14], [24, 15], [23, 15],
    [22, 16], [21, 16], [21, 17], [22, 17],
    [23, 18], [24, 18], [25, 19], [26, 19],
    [25, 16], [25, 17], [26, 21], [25, 21],
    [24, 21], [23, 21], [22, 21], [21, 21],
    [22, 22], [23, 23], [24, 24], [25, 25],
    [24, 26], [23, 26], [22, 26], [21, 26],
    [26, 26], [26, 28], [25, 28], [24, 28],
    [22, 28], [21, 28]
];
//--------------------------------------------------------------------
// 2. Gitter anzeigen (HTML)
function renderGrid(grid: boolean[][]) {
    let html = '<table class="game-grid">';
    for (let i = 0; i < grid.length; i++) {
        html += '<tr>';
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j] ? 'alive' : 'dead';
            html += `<td class="${cell}" data-row="${i}" data-col="${j}"></td>`;
        }
        html += '</tr>';
    }
    html += '</table>';

    document.querySelector<HTMLDivElement>('#grid-container')!.innerHTML = html;

    // Klickfunktion auf jede Zelle
    document.querySelectorAll<HTMLTableCellElement>('td').forEach(cell => {
        cell.addEventListener('click', () => {
            const row = Number(cell.dataset.row);
            const col = Number(cell.dataset.col);
            console.log(`[${row}, ${col}]`);  // Zeile um koordinaten zu sehen
            grid[row][col] = !grid[row][col]; // Zustand wechseln
            renderGrid(grid); // neu zeichnen
        });
    });
}
//----------------------------Game-Logic---------------------------------------------

// 3. Logic: Nachbarn zählen
function countAliveNeighbors(grid: boolean[][], row: number, col: number): number {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // sich selbst ignorieren
            const newRow = row + i;
            const newCol = col + j;

            if (
                newRow >= 0 && newRow < grid.length &&
                newCol >= 0 && newCol < grid[0].length
            ) {
                if (grid[newRow][newCol]) count++;
            }
        }
    }

    return count;
};
//---------------------------------------------
// 4. next Generation berechnen
function getNextGeneration(grid: boolean[][]): boolean[][] {
    const nextGrid: boolean[][] = [];

    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            const aliveNeighbors = countAliveNeighbors(grid, i, j);
            const currentCell = grid[i][j];

            if (currentCell) {
                // Regel 1-3
                nextGrid[i][j] = aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                // Regel 4
                nextGrid[i][j] = aliveNeighbors === 3;
            }
        }
    }

    return nextGrid;
}
//------------------------------------------------------------------------------------------------------------------
// 5. Gitter grösse anpassen
function updateGridSize() {
    const rows = Math.floor(window.innerHeight / cellSize);
    const cols = Math.floor(window.innerWidth / cellSize);
    grid = createGrid(rows, cols);
    renderGrid(grid);
}
// 6. EventListener: Bildschirmgeösse ändern
window.addEventListener('resize', () => {
    updateGridSize();
});
//-----------------------------------------------------------------------------------------

// 7. Play-Button and animation start
let intervalId: number | null = null;

const playButton = document.createElement('button');
playButton.textContent = '▶ Start';
playButton.addEventListener('click', () => {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            grid = getNextGeneration(grid);
            renderGrid(grid);
        }, 300);
        playButton.textContent = '⏸ Pause';
    } else {
        clearInterval(intervalId);
        intervalId = null;
        playButton.textContent = '▶ Start';
    }
});

// 🧡 Herz-Button
const heartButton = document.createElement('button');
heartButton.textContent = '❤️ Herz';
heartButton.addEventListener('click', () => {
    updateGridSize(); // leeres Gitter
    const offsetRow = Math.floor((grid.length - 5) / 2);
    const offsetCol = Math.floor((grid[0].length - 5) / 2);
    applyPattern(grid, heartPattern, offsetRow, offsetCol);
    renderGrid(grid);
});

// 😊 Smiley-Button
const smileyButton = document.createElement('button');
smileyButton.textContent = '😊 Smiley';
smileyButton.addEventListener('click', () => {
    updateGridSize(); // leeres Gitter
    const offsetRow = Math.floor((grid.length - 5) / 2);
    const offsetCol = Math.floor((grid[0].length - 5) / 2);
    applyPattern(grid, smileyPattern, offsetRow, offsetCol);
    renderGrid(grid);
});

// 🦖 Dino-Button
const dinoButton = document.createElement('button');
dinoButton.textContent = '🦖 Dino';
dinoButton.addEventListener('click', () => {
    updateGridSize();// leeres Gitter
    const offsetRow = Math.floor((grid.length - 9)/ 14);
    const offsetCol = Math.floor((grid[0].length - 9)/ 14);
    applyPattern(grid, dinoPattern, offsetRow, offsetCol);
    renderGrid(grid);

});

// dani-Button
const daniButton = document.createElement('button');
daniButton.textContent = 'DANI';
daniButton.addEventListener('click', () => {
    updateGridSize();// leeres Gitter
    const offsetRow = Math.floor((grid.length - 6)/ 20);
    const offsetCol = Math.floor((grid[0].length - 6)/ 20);
    applyPattern(grid, daniPattern, offsetRow, offsetCol);
    renderGrid(grid);

});

// Buttons ins UI
const controls = document.querySelector<HTMLDivElement>('#controls')!;
controls.appendChild(playButton);
controls.appendChild(heartButton);
controls.appendChild(smileyButton);
controls.appendChild(dinoButton);
controls.appendChild(daniButton);


// Button in HTML einfügen
document.querySelector<HTMLDivElement>('#controls')!.appendChild(playButton);
//---------------------------------------------------------------------------------------------------
// 8. Initial starten
updateGridSize(); //Grid wird erstellt und gerendert
