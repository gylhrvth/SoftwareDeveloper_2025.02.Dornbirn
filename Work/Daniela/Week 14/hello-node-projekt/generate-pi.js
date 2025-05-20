const piModule = require('generate-pi');

const digits = 20000;
const piValue = piModule.default.get(digits);

console.log(`Pi mit ${digits} Stellen:`);
console.log(piValue);

/* -----------------------------Export------------------------

[Module: null prototype] {
  __esModule: true,
  default: { get: [Function: get] }
}

__esModule: true bedeutet, dass das Package ES Module kompatibel ist.

Das default-Objekt ist der eigentliche Export, und darin gibt es eine Funktion get.

Also heißt das:

Du kannst nicht direkt pi() aufrufen (weil pi hier ein Objekt ist).

Sondern musst zuerst auf default zugreifen, und dann auf get.

-----------------------------------------------------------------
So testest du Exporte bei Packages selbst:
Immer wenn du dir nicht sicher bist, was ein Package exportiert, kannst du:
---
const pkg = require('package-name');
console.log(pkg);
Dann schaust du in der Konsole, was da ausgegeben wird.
Ist es eine Funktion?
Ein Objekt?
Oder ein Objekt mit default? 
--------------------------------------------------------------------*/