import './style.css';

// Typdefinitionen
type Cell = boolean;
type Grid = Cell[][];
type Pattern = [number, number][];
interface GridDimensions {
  rows: number;
  cols: number;
}
interface Button {
    text: string;
    pauseText?: string;
    pattern?: Pattern;
}

// Konstanten
const CELL_SIZE:number = 20;
const ANIMATION_INTERVAL:number = 300;
const BUTTON_CONFIGS: Button[] = [
    {
        text: '▶ Start',
        pauseText: '⏸ Pause',
    },
    {
        text: '❤️ Herz',
        pattern: [
            [0, 1], [0, 3], [1, 0], [1, 2], [1, 4],
            [2, 0], [2, 4], [3, 1], [3, 3], [4, 2]
        ] as Pattern
    },
    {
        text: '😊 Smiley',
        pattern: [
            [0, 1], [0, 3], [1, 1], [1, 3],
            [3, 0], [3, 1], [3, 3], [3, 4],
            [4, 1], [4, 3]
        ] as Pattern
    }
] as const;

let grid: Grid;
let intervalId: number | null = null;

// Grid-Erstellung mit Array-Funktionen
// https://www.w3schools.com/js/js_array_iteration.asp
const createGrid = ({ rows, cols }: GridDimensions): Grid =>
    Array(rows).fill(0).map(() =>
        Array(cols).fill(0).map(() => false)
    );
/* alternative:
https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/

sample:
let newArray = Array.from({ length: 7 }, (value, index) => index);
console.log(newArray); // [0,1,2,3,4,5,6]

code:
Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );
 */

const applyPattern = (grid: Grid, pattern: Pattern, offsetRow = 0, offsetCol = 0): void => {
  pattern.forEach(([r, c]) => {
    const [row, col] = [r + offsetRow, c + offsetCol];
    if (row < grid.length && col < grid[0].length) {
      grid[row][col] = true;
    }
  });
};

const renderGrid = (grid: Grid): void => {
  const gridHtml = grid
    .map((row, i) => 
      `<tr>${row
        .map((cell, j) => 
          `<td class="${cell ? 'alive' : 'dead'}" 
               data-row="${i}" 
               data-col="${j}">
           </td>`
        ).join('')
      }</tr>`
    ).join('');

  const container = document.querySelector<HTMLDivElement>('#grid-container')!;
  container.innerHTML = `<table class="game-grid">${gridHtml}</table>`;

  // Event-Listener für Zellen
  container.querySelectorAll<HTMLTableCellElement>('td').forEach(cell => {
    cell.addEventListener('click', () => {
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);
      grid[row][col] = !grid[row][col];
      renderGrid(grid);
    });
  });
};

const countAliveNeighbors = (grid: Grid, row: number, col: number): number => {
  const neighbors = [-1, 0, 1];
  return neighbors.reduce((count, i) => 
    neighbors.reduce((innerCount, j) => {
      if (i === 0 && j === 0) return innerCount;
      const [newRow, newCol] = [row + i, col + j];
      return innerCount + Number(
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        grid[newRow][newCol]
      );
    }, count), 0);
};

const getNextGeneration = (grid: Grid): Grid =>
  grid.map((row, i) =>
    row.map((cell, j) => {
      const aliveNeighbors = countAliveNeighbors(grid, i, j);
      return cell
        ? aliveNeighbors === 2 || aliveNeighbors === 3
        : aliveNeighbors === 3;
    })
  );

const updateGridSize = (): void => {
  const dimensions: GridDimensions = {
    rows: Math.floor(window.innerHeight / CELL_SIZE),
    cols: Math.floor(window.innerWidth / CELL_SIZE)
  };
  grid = createGrid(dimensions);
  renderGrid(grid);
};

// UI-Setup
const createButton = (config: typeof BUTTON_CONFIGS[number]): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = config.text;
  return button;
};

const setupControls = (buttonConfigs: typeof BUTTON_CONFIGS): void => {
    const controls = document.querySelector<HTMLDivElement>('#controls')!;

    // setup all buttons
    buttonConfigs.forEach((config) => {
        const button = createButton(config);
        if (config === buttonConfigs[0]) {
            // Play-Button-Setup
            button.addEventListener('click', () => {
                if (intervalId === null) {
                    intervalId = setInterval(() => {
                        grid = getNextGeneration(grid);
                        renderGrid(grid);
                    }, ANIMATION_INTERVAL);
                    button.textContent = config.pauseText ?? 'PAUSE';
                } else {
                    clearInterval(intervalId);
                    intervalId = null;
                    button.textContent = config.text;
                }
            });
        } else if ('pattern' in config && config.pattern) {
            // Pattern buttons setup
            button.addEventListener('click', () => {
                if (config.pattern === undefined) throw new Error(
                    'Pattern is not defined'
                )
                const pattern :Pattern = config.pattern;
                const offsetRow = Math.floor((grid.length - pattern.length) / 2);
                const offsetCol = Math.floor((grid[0].length - pattern.length) / 2);
                grid = createGrid({rows: grid.length, cols: grid[0].length});
                applyPattern(grid, pattern, offsetRow, offsetCol);
                renderGrid(grid);
            });
        }
        controls.appendChild(button);
    });
};

// Initialisierung
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Game of Life</h1>
  <div id="grid-container"></div>
  <div id="controls"></div>
`;

window.addEventListener('resize', updateGridSize);
updateGridSize();
setupControls(BUTTON_CONFIGS);