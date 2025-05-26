// Typendefinitionen
export type Cell = number;
export type Grid = Cell[][];
export type Pattern = [Cell, Cell][];

// Benutzerdefinierte Event-Typen
export interface GameStartEvent extends CustomEvent {
  detail: {
    rows: number;
    cols: number;
    speed: number;
  };
}

export interface GridUpdateEvent extends CustomEvent {
  detail: {
    rows: number;
    cols: number;
  };
}

// export interface CellToggleEvent extends CustomEvent {
//   detail: {
//     row: number;
//     col: number;
//     grid: Grid;
//   };
// }

export interface RandomizeEvent extends CustomEvent {
  detail: {
    rows: number;
    cols: number;
  };
}

// Event-Namen als Konstanten definieren
export const EVENTS = {
  GAME_START: 'game:start',
  GRID_UPDATE: 'grid:update',
  CELL_TOGGLE: 'cell:toggle',
  RANDOMIZE: 'grid:randomize',
};

// Event-Funktionen
export function setupEventListeners() {
  addEventListener("DOMContentLoaded", () => {
    const rowsInput = document.getElementById("rows") as HTMLInputElement;
    const collsInput = document.getElementById("columns") as HTMLInputElement;
    const speedInput = document.getElementById("speed") as HTMLInputElement;
    const startButton = document.getElementById("startButton") as HTMLButtonElement;
    const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
    let rows: number = parseInt(rowsInput.value);
    let colls: number = parseInt(collsInput.value);

    // Initiales Grid-Update Event auslösen
    dispatchGridUpdateEvent(rows, colls);

    // Global zugängliches Grid
    let grid: Grid = Array.from({ length: rows }, () => Array(colls).fill(0));

    // Beim ersten Laden Randomize-Event auslösen
    window.dispatchEvent(new CustomEvent(EVENTS.RANDOMIZE, {
      detail: { rows, cols: colls }
    }));

    // Eventlistener für Änderungen an den Eingabefeldern
    rowsInput.addEventListener("change", () => {
      rows = parseInt(rowsInput.value);
      grid = Array.from({ length: rows }, () => Array(colls).fill(0)); // Neues leeres Grid
      dispatchGridUpdateEvent(rows, colls);
    });

    collsInput.addEventListener("change", () => {
      colls = parseInt(collsInput.value);
      grid = Array.from({ length: rows }, () => Array(colls).fill(0)); // Neues leeres Grid
      dispatchGridUpdateEvent(rows, colls);
    });

    // Eventlistener für Klicks auf Zellen
    const gameField = document.getElementById("gameField") as HTMLDivElement;
    gameField.addEventListener("click", (event) => {
      const target = event.target as HTMLDivElement;
      if (target.classList.contains("cell")) {
        target.classList.toggle("alive");
        const index = Array.from(gameField.children).indexOf(target);
        const row = Math.floor(index / parseInt(collsInput.value));
        const col = index % parseInt(collsInput.value);
        grid[row][col] = grid[row][col] === 1 ? 0 : 1; // Toggle cell state

        // Cell-Toggle-Event auslösen
        window.dispatchEvent(new CustomEvent(EVENTS.CELL_TOGGLE, {
          detail: { row, col, grid }
        }));
      }
    });

    // Start-Button Event Listener
    startButton.addEventListener("click", () => {
      const speed = parseInt(speedInput.value);
      // Game-Start-Event auslösen
      window.dispatchEvent(new CustomEvent(EVENTS.GAME_START, {
        detail: { rows, cols: colls, speed }
      }));
    });

    // Restart-Button Event Listener
    restartButton.addEventListener("click", () => {
      // Randomize-Event auslösen
      window.dispatchEvent(new CustomEvent(EVENTS.RANDOMIZE, {
        detail: { rows: parseInt(rowsInput.value), cols: parseInt(collsInput.value) }
      }));
    });

    // Listener für Randomize-Event, um das Grid im DOM zu aktualisieren
    window.addEventListener(EVENTS.RANDOMIZE, ((_event: RandomizeEvent) => {
      updateCellsInDOM(grid);
    }) as EventListener);
  });
}

// Hilfsfunktion zum Auslösen des Grid-Update-Events
function dispatchGridUpdateEvent(rows: number, cols: number): void {
  window.dispatchEvent(new CustomEvent(EVENTS.GRID_UPDATE, {
    detail: { rows, cols }
  }));
}

// Hilfsfunktion zum Aktualisieren der Zellen im DOM
function updateCellsInDOM(grid: Grid): void {
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cells = document.querySelectorAll(".cell");
      if (cells[i * row.length + j]) {
        const domCell = cells[i * row.length + j] as HTMLDivElement;
        domCell.classList.toggle("alive", cell === 1);
      }
    });
  });
}
