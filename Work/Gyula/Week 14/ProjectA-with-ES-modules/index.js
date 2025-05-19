import { v4 as uuidv4 } from 'uuid';
import { countTo10 } from './tools.js';

countTo10();
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
    console.log(`${i + 1}. UUID: ${uuidv4()}`);
    }
}, 5000)
