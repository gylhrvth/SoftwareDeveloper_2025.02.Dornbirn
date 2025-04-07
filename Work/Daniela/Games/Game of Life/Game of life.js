const rows = 100;
const cols = 100;
const cellSize = canvas.width / rows;

const img = new Image();
img.src = "img/Skuls.png"
img.onload = drawGrid; // Warten, bis das Bild geladen ist

/*---------------------------------------------------------------------*/


//2D Array

let grid = [];                          //leeres Hauptarray
for (let i = 0; i < rows; i++) {        // i geht von 0 bis 99 (100 Zeilen)
    grid[i] = [];                       //Erstelle für jede Zeile ein leeres Array
    for (let j = 0; j < cols; j++) {    //j geht von 0 bis 99 (100 Spalten)
        grid[i][j] = false;             //Jede Zelle wird auf false gesetzt (tot)
    }
}

//Start Funktion lebende Zellen random einfügen 
function initializeGrid() {
    for (let row = 0; row < rows; row++) {          //Durchlaufe alle Zeilen
        for (let col = 0; col < cols; col++) {      //Durchlaufe alle Spalten
            grid[row][col] = Math.random() < 0.3; // 30% Chance für true --> lebende Zelle
        }
    }
}

// Zeichne das Gitter
function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);       //Zeichne Zelle 

            // Entscheide, welches Bild verwendet wird
            if (grid[row][col]) {
                ctx.fillStyle = "#fff"; //wenn Zelle lebt weiss!
                ctx.fill();
            } else {

                ctx.drawImage(img, col * cellSize, row * cellSize, cellSize, cellSize);
                ctx.fill();
            }

            ctx.stroke();
        }
    }
}


// Zähle die lebendigen Nachbarn einer Zelle
function countAliveNeighbors(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;
    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (grid[newRow][newCol]) count++;
        }
    });
    return count;
}
