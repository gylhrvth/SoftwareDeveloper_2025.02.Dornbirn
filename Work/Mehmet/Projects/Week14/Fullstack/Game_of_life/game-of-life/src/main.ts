import './style.css';

///////////// Constants ///////////////
const headingDiv = document.getElementById("heading")!;
const app = document.querySelector<HTMLDivElement>('#app')!;

const GRID_SIZE = 30;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;
const SEED_MIN = 1;
const SEED_MAX = 300;

type Grid = boolean[];

///////////// Globals ///////////////
let running = true;
let lastTimestamp = 0;
let grid: Grid = Array(CELL_COUNT).fill(false);
const cells: HTMLDivElement[] = [];
let animationInterval = 600;

///////////// UI Elements ///////////////
const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  return btn;
};

const createLabel = (text: string, htmlFor: string): HTMLLabelElement => {
  const label = document.createElement('label');
  label.textContent = text;
  label.htmlFor = htmlFor;
  return label;
};

const seedInput = Object.assign(document.createElement('input'), {
  type: 'number',
  id: 'seedInput',
  min: SEED_MIN.toString(),
  max: SEED_MAX.toString(),
  value: '20',
}) as HTMLInputElement;

const speedSlider = Object.assign(document.createElement('input'), {
  type: 'range',
  id: 'speedSlider',
  min: '10',
  max: '3000',
  step: '10',
  value: animationInterval.toString(),
}) as HTMLInputElement;

const speedValueDisplay = document.createElement('span');
speedValueDisplay.textContent = `${animationInterval} ms`;

speedSlider.addEventListener('input', () => {
  animationInterval = parseInt(speedSlider.value);
  speedValueDisplay.textContent = `${animationInterval} ms`;
});

///////////// Game Logic ///////////////
const updateCell = (i: number) => cells[i].classList.toggle('alive', grid[i]);
const updateAllCells = () => grid.forEach((_, i) => updateCell(i));

const countAliveNeighbors = (index: number): number => {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  let count = 0;

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue;
      const nr = row + r, nc = col + c;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
        if (grid[nr * GRID_SIZE + nc]) count++;
      }
    }
  }
  return count;
};

const nextGeneration = (g: Grid): Grid =>
  g.map((alive, i) => {
    const n = countAliveNeighbors(i);
    return alive ? n === 2 || n === 3 : n === 3;
  });

///////////// Events ///////////////
const restartGame = () => {
  grid.fill(false);

  let seeds = parseInt(seedInput.value);
  seeds = Math.max(SEED_MIN, Math.min(SEED_MAX, isNaN(seeds) ? SEED_MIN : seeds));

  for (let i = 0; i < seeds; i++) {
    const row = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    const col = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
    const center = row * GRID_SIZE + col;
    [center - 1, center, center + 1].forEach(i => {
      if (i >= 0 && i < CELL_COUNT) grid[i] = true;
    });
  }

  updateAllCells();
  if (!running) {
    running = true;
    startStopBtn.textContent = "Stop";
    lastTimestamp = performance.now();
    requestAnimationFrame(animate);
  }
};

const toggleRunning = () => {
  running = !running;
  startStopBtn.textContent = running ? "Stop" : "Start";
  if (running) {
    lastTimestamp = performance.now();
    requestAnimationFrame(animate);
  }
};

const toggleDarkMode = () => {
  const html = document.documentElement;
  html.classList.toggle('dark-mode');
  darkModeBtn.textContent = html.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
};

const animate = (timestamp = 0) => {
  if (!running) return;
  if (timestamp - lastTimestamp >= animationInterval) {
    grid = nextGeneration(grid);
    updateAllCells();
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(animate);
};

///////////// Init UI ///////////////
document.documentElement.style.setProperty('--grid-size', GRID_SIZE.toString());
headingDiv.innerHTML = `<h1>Game of Life</h1>`;

const controlsDiv = document.createElement('div');
controlsDiv.id = "controls";
headingDiv.appendChild(controlsDiv);

// Buttons
const restartBtn = createButton("Restart", restartGame);
const startStopBtn = createButton("Stop", toggleRunning);
const darkModeBtn = createButton("Dark Mode", toggleDarkMode);

// Append UI
controlsDiv.append(
  createLabel('Speed: ', 'speedSlider'), speedSlider, speedValueDisplay,
  restartBtn, startStopBtn, darkModeBtn,
  createLabel('Seeds: ', 'seedInput'), seedInput
);

// Build Grid
for (let i = 0; i < CELL_COUNT; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => {
    grid[i] = !grid[i];
    updateCell(i);
  });
  app.appendChild(cell);
  cells.push(cell);
}

requestAnimationFrame(animate);