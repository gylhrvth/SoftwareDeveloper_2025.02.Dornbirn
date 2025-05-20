// use generate-pi modul

import generatePi from 'generate-pi';

// Find PI(π) to the 'n' decimal places
// where n is any number between 0 and 200


// Find PI(π) to the 10 decimal places
const pi10 = generatePi.get(10);
// "3.1415926535"

console.log(pi10);

/* Default to 200 decimal places
const pi200 = generatePi.get();*/

// Terminal: npm run dev