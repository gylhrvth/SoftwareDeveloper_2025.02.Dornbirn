
import './style.css' 

///////////// Type definitions


///////////// Consts            ///////////////
  // Get references to the UI containers
  const headingDiv = document.getElementById("heading")!;
  const app = document.querySelector<HTMLDivElement>('#app')!;

  // Game configuration constants
  const GRID_SIZE = 30; // Grid is 30x30
  const CELL_COUNT = GRID_SIZE * GRID_SIZE; // Total number of cells
  const SEED_MIN = 1;  // Minimum number of initial alive cells
  const SEED_MAX = 300; // Maximum number of initial alive cells
  const ANIMATION_INTERVAL = 100; // Milliseconds between updates

//////////// Global variables          /////////

  // Animation loop state
  let running = true;
  let lastTimestamp = 0;

  // Game state variables
  let grid = Array(CELL_COUNT).fill(false); // Current state of each cell (alive = true, dead = false)
  const cells: HTMLDivElement[] = []; // References to DOM cells for fast updating


/////////// Functions               /////

  // Helper to create buttons consistently
  const createButton = (text: string): HTMLButtonElement => {
    const btn = document.createElement('button');
    btn.textContent = text;
    return btn;
  };


  // Update one cell's visual state (adds/removes .alive class)
  const updateCell = (i: number) => {
    cells[i].classList.toggle('alive', grid[i]);
  };

  // Redraw all cells based on their state
  const updateAllCells = () => {
    grid.forEach((_, i) => updateCell(i));
  };

  // Count alive neighbors for a specific cell
  const countAliveNeighbors = (index: number): number => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    let count = 0;

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue; // Skip the center cell
        const nr = row + r;
        const nc = col + c;

        // Check bounds before counting neighbor
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          if (grid[nr * GRID_SIZE + nc]) count++;
        }
      }
    }

    return count;
  };

  // Compute the next generation of cells using Conway's rules
  const nextGeneration = (currentGrid: boolean[]): boolean[] => {
    return currentGrid.map((isAlive, i) => {
      const aliveNeighbors = countAliveNeighbors(i);
      // Rule 1 & 3: Alive cell survives with 2 or 3 neighbors, else dies
      // Rule 4: Dead cell becomes alive if it has exactly 3 neighbors
      return isAlive ? (aliveNeighbors === 2 || aliveNeighbors === 3) : (aliveNeighbors === 3);
    });
  };



  // Game loop that updates the grid at a set interval
  const animate = (timestamp = 0) => {
    if (!running) return;

    if (timestamp - lastTimestamp >= ANIMATION_INTERVAL) {
      grid = nextGeneration(grid); // Advance to next generation
      updateAllCells();            // Redraw the grid
      lastTimestamp = timestamp;
    }

    requestAnimationFrame(animate); // Loop again
  };
  
  const restartEventListener = () => {
    grid.fill(false); // Clear grid

    let seeds = parseInt(seedInput.value);
    if (isNaN(seeds) || seeds < SEED_MIN) seeds = SEED_MIN;
    if (seeds > SEED_MAX) seeds = SEED_MAX;

    // Randomly seed horizontal lines (3-cell wide)
    for (let i = 0; i < seeds; i++) {
      const row = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const col = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
      const centerIndex = row * GRID_SIZE + col;

      [centerIndex - 1, centerIndex, centerIndex + 1].forEach(idx => {
        if (idx >= 0 && idx < CELL_COUNT) grid[idx] = true;
      });
    }

    updateAllCells();

    // Restart animation if paused
    if (!running) { 
      running = true;
      startStopBtn.textContent = "Stop";
      lastTimestamp = performance.now();
      requestAnimationFrame(animate);
    }
  }

   // Toggle running state (pause/resume)
  const startStopEventListener = () => {
    running = !running;
    startStopBtn.textContent = running ? "Stop" : "Start";

    if (running) {
      lastTimestamp = performance.now(); // Reset timing
      requestAnimationFrame(animate);
    }
  };


//////////// Initialization                 ////////////

  // here we define the grid size in CSS as rot element
  document.documentElement.style.setProperty('--grid-size', GRID_SIZE.toString());

  // Add a heading
  headingDiv.innerHTML = `<h1>Game of Life</h1>`;

  // Build control panel
  const controlsDiv = document.createElement('div');
  controlsDiv.id = "controls";
  headingDiv.appendChild(controlsDiv);

  // Control elements
  const restartBtn = createButton("Restart");
    // Restart the game with a fresh seeded pattern
  restartBtn.addEventListener('click', restartEventListener);

  const startStopBtn = createButton("Stop");
  
  startStopBtn.addEventListener('click', startStopEventListener);
 
  const darkModeBtn = createButton("Dark Mode");
  // Toggle dark mode styling
  darkModeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    html.classList.toggle('dark-mode');
    darkModeBtn.textContent = html.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });

  // Seed input label and input box
  const seedLabel = document.createElement('label');
  seedLabel.htmlFor = 'seedInput';
  seedLabel.textContent = 'Seeds: ';

  const seedInput = document.createElement('input');
  seedInput.type = 'number';
  seedInput.id = 'seedInput';
  seedInput.min = SEED_MIN.toString();
  seedInput.max = SEED_MAX.toString();
  seedInput.value = '20';

  // Append all controls to the control container
  controlsDiv.append(restartBtn, startStopBtn, darkModeBtn, seedLabel, seedInput);

  // Build the visual grid and connect each cell to the logic
  Array.from({ length: CELL_COUNT }).forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Toggle cell state on click (manual edit)
    cell.addEventListener('click', () => {
      grid[i] = !grid[i]; // Flip alive/dead state
      updateCell(i);      // Update UI
    });

    app.appendChild(cell);
    cells.push(cell); // Store reference for efficient updating
  });


  // Start the initial animation loop
  requestAnimationFrame(animate);















