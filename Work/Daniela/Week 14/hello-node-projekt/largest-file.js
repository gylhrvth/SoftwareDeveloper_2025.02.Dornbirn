const fs = require("fs");
const path = require("path");
const os = require("os");

const homeDir = os.homedir();

let largestFile = { size: 0, path: "" };

function findLargestFile(dir) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    // Ordner nicht zugänglich, überspringen
    return;
  }

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    let stats;
    try {
      stats = fs.statSync(fullPath);
    } catch (err) {
      // Datei nicht zugänglich, überspringen
      return;
    }

    if (stats.isDirectory()) {
      findLargestFile(fullPath);
    } else {
      if (stats.size > largestFile.size) {
        largestFile = { size: stats.size, path: fullPath };
      }
    }
  });
}


try {
  findLargestFile(homeDir);
  console.log("Größte Datei im Home-Verzeichnis:");
  console.log(largestFile);
} catch (err) {
  console.error("Fehler beim Durchsuchen:", err.message);
}
