// host: http://localhost:5173/
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
function createGrid(rows: number, cols: number,): boolean[][] {
  //Erstellt Array mit Länge rows 
  const newGrid = Array(rows).fill(undefined).map(() => {
    //jede Zeile Array mit länge Colss
    return Array(cols).fill(false);
  });
  return newGrid;
}
//--------------------------------------------------------------------
// 2. Gitter anzeigen (HTML)
function renderGrid(grid: boolean[][]) {
  const container = document.querySelector<HTMLDivElement>('#grid-container');
  if (!container) return;

  container.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'game-grid';
  //Zeile durchlaufen 
  grid.forEach((rowData, rowIndex) => {
    const row = document.createElement('tr'); // tr = table row +
    //Zellen durchlaufen 
    rowData.forEach((isAlive, colIndex) => {
      const cell = document.createElement('td');

      cell.className = isAlive ? 'alive' : 'dead';
      //Pos
      cell.dataset.row = rowIndex.toString();
      cell.dataset.col = colIndex.toString();
      //click -> zustands änderung 
      cell.addEventListener('click', () => {
        grid[rowIndex][colIndex] = !grid[rowIndex][colIndex];
        renderGrid(grid);
      });
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  container.appendChild(table);
}
/*----------------------------Game-Logic---------------------------------------------*/
// 3. Logic: Nachbarn zählen 
//-------- flatMap = inneren Arrays werden aufgelöst, alles in ein Array ------------
function countAliveNeighbors(grid: boolean[][], row: number, col: number): number {
  return [-1, 0, 1].flatMap(i =>      //[-1, 0, 1] Bewegungsmuster -1 = links/unten; 0 = 0; 1 = rechts/oben 
    [-1, 0, 1].map(j => [i, j])
  )
    .filter(([i, j]) => !(i === 0 && j === 0))
    .filter(([i, j]) => {
      const newRow = row + i;
      const newCol = col + j;
      return newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        grid[newRow][newCol];
    }).length
}
//---------------------------------------------
// 4. next Generation berechnen 
function getNextGeneration(grid: boolean[][]): boolean[][] {
  return grid.map((row, i) =>
    row.map((cell, j) => {
      const aliveNeighbors = countAliveNeighbors(grid, i, j);
      return cell ? aliveNeighbors === 2 || aliveNeighbors === 3
        : aliveNeighbors === 3;
    })
  );
}
//----------------------------------------------------------------------------------------
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

//document.body.appendChild(playButton);
//----------------------------------------
//Übergeordnete Funktion um Pattern-Button zu erstellen 
function createPatternButton(label: string, pattern: [number, number][], offsetFactor: number = 2): HTMLButtonElement {   //offsetFactor: Wert, der die Position des Musters beeinflusst 
  // Button erstellen 
  const button = document.createElement('button');
  button.textContent = label;
  //Klick-Funktion 
  button.addEventListener('click', () => {
    updateGridSize(); //Gitter leeren

    const offsetRow = Math.floor((grid.length - pattern.length) / offsetFactor); //Pos.
    const offsetCol = Math.floor((grid[0].length - pattern[0].length) / offsetFactor);

    applyPattern(grid, pattern, offsetRow, offsetCol); // Muster in Gitter setzen 
    renderGrid(grid); //zeichnet gitter 
  });
  return button;
}
// ---------------------------------Patterns ausgelagert in "patterns.ts"-------------------------
//Funktion für magic-Button 
function createMagicButton(offsetFactor: number = 2): HTMLButtonElement {

  const magicButton = document.createElement('button');
  magicButton.textContent = '🪄Magic🔮';

  magicButton.addEventListener('click', () => {
    updateGridSize(); // gitter leeren

    const magicPattern = extractPattern(grid); //Holt musster aus akt. Grid 

    const offsetRow = Math.floor((grid.length - magicPattern.length) / offsetFactor); //Pos.
    const offsetCol = Math.floor((grid[0].length - magicPattern[0].length) / offsetFactor);
    patternInjection(grid, magicPattern, offsetRow, offsetCol);
    renderGrid(grid);
  });
  return magicButton;
}

import { patternInjection, extractPattern } from './patterns';

//----------------------------------------------------------------------------------------------------
import { applyPattern, heartPattern, smileyPattern, dinoPattern, daniPattern } from './patterns';

//Pattern-List
const patternButtons = [
  { label: '❤️ Herz', pattern: heartPattern },
  { label: '😊 Smiley', pattern: smileyPattern },
  { label: '🦖 Dino', pattern: dinoPattern },
  { label: 'DANI', pattern: daniPattern },
];

// Buttons automatisch erstellen
const buttonContainer = document.createElement('div');
const magicButton = createMagicButton();    //MagicButton 

patternButtons.forEach(p => {
  buttonContainer.appendChild(createPatternButton(p.label, p.pattern));
 
});

buttonContainer.appendChild(magicButton);

// Buttons ins UI
const controls = document.querySelector<HTMLDivElement>('#controls')!;
controls.appendChild(playButton);
controls.appendChild(buttonContainer);


// Button in HTML einfügen 
//document.querySelector<HTMLDivElement>('#controls')!.appendChild(playButton);
//---------------------------------------------------------------------------------------------------
// 8. Initial starten
updateGridSize(); //Grid wird erstellt und gerendert; 