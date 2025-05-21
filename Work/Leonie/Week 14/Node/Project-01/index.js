import generatePi from 'generate-pi';

const pi = generatePi.get(1000);
console.log(pi);

const pi10 = generatePi.get(10);
console.log('PI auf 10 dezimal stellen: ' + pi10);
