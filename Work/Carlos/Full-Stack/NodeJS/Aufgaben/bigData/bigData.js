// This script finds the biggest file in a given directory and its subdirectories.

const fs = require('fs');
const path = require('path');

const userDir = '/Users/carlosartiagamorales';

function findBiggestFile(dir) {
    let biggest = { file: null, size: 0 };

    function search(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            try {
                if (entry.isDirectory()) {
                    search(fullPath);
                } else if (entry.isFile()) {
                    const { size } = fs.statSync(fullPath);
                    if (size > biggest.size) {
                        biggest = { file: fullPath, size };
                    }
                }
            } catch (err) {
                // Ignore permission errors or broken symlinks
            }
        }
    }

    search(dir);
    return biggest;
}

const result = findBiggestFile(userDir);
if (result.file) {
    console.log(`Biggest file: ${result.file}`);
    console.log(`Size: ${result.size} bytes`);
} else {
    console.log('No files found.');
}

// Im Terminal: node bigData.js

// Node JS can use fs (File System) and path modules to read and write files.
// The fs module allows you to interact with the file system, while the path module helps you work with file and directory paths.