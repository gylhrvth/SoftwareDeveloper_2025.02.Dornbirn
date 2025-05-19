import { v4 as uuidv4 } from 'uuid';
//const { v4: uuidv4 } = require('uuid');
import { countTo10 } from './tools.mjs';
//const { countTo10 } = require('./tools.mjs');

countTo10();
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
    console.log(`${i + 1}. UUID: ${uuidv4()}`);
    }
}, 5000)
