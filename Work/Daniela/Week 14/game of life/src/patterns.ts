export function applyPattern(grid: boolean[][], pattern: [number, number][], offsetRow = 0, offsetCol = 0): void {
    pattern.forEach(([r, c]) => {
        const row = r + offsetRow;
        const col = c + offsetCol;
        if (row < grid.length && col < grid[0].length) {
            grid[row][col] = true;
        }
    });

};
// Herz-Muster
export const heartPattern: [number, number][] = [
    [0, 1], [0, 3],
    [1, 0], [1, 2], [1, 4],
    [2, 0], [2, 4],
    [3, 1], [3, 3],
    [4, 2],
];
// Smiley-Muster
export const smileyPattern: [number, number][] = [
    [0, 1], [0, 3],
    [1, 1], [1, 3],
    [3, 0], [3, 1], [3, 3], [3, 4],
    [4, 1], [4, 3],
];
// Dino-Muster 
export const dinoPattern: [number, number][] = [
    [21, 17], [20, 18], [19, 19],
    [19, 20], [19, 21], [20, 22],
    [21, 22], [22, 17], [22, 18],
    [22, 19], [23, 20], [22, 23],
    [22, 24], [23, 25], [24, 25],
    [25, 26], [25, 27], [25, 28],
    [24, 29], [23, 30], [26, 25],
    [27, 25], [27, 24], [25, 22],
    [26, 22], [25, 22], [27, 22],
    [27, 21], [24, 20], [25, 21],
    [25, 19], [25, 18], 
];
export const daniPattern: [number, number][] = [
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


let magicPattern: [number, number][]=[];

//Funktion muster Auslesen 
export function extractPattern(grid: boolean[][]): [number, number][]{
    const pattern: [number, number][]= [];

    grid.forEach((rowArray, rowIndex) => {
        rowArray.forEach((cell, colIndex) => {
            if (cell) {
                pattern.push([rowIndex, colIndex]);
            }
        });
    });
    return pattern;
}

//Funktion muster in grid einfügen 
export function patternInjection(grid: boolean[][], pattern: [number, number][], offsetRow = 0, offsetCol = 0): void{
pattern.forEach(([row, col]) => {
   const newRow = row + offsetRow;      //pos. verschiebung des musters
   const newCol = col + offsetCol;

   //Nur Zellen setzen die im grid gültig sind 
   if (grid[newRow] && grid[newRow][newCol] !== undefined){
    grid[newRow][newCol] = true;
   }
});
}