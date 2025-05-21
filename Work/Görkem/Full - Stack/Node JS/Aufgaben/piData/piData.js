 // generate-pi modul verwenden 

import pi from 'generate-pi';

// PI(π) mit 'n' Nachkommastellen ermitteln

// PI(π) mit 10 Nachkommastellen bestimmen
const piString = pi.get(10);
// 3.1415926535

console.log("pi mit 10 Nachkomastellen");
console.log(piString);

// Terminal: npm run dev
