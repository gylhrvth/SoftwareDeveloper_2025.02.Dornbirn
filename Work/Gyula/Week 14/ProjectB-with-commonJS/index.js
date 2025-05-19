const { v4: uuidv4 } = require('uuid');
const { countTo10 } = require('./tools.js');

countTo10();
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
    console.log(`${i + 1}. UUID: ${uuidv4()}`);
    }
}, 5000)
