function toggleTable(tableId) {
    // Hole die Tabelle anhand der übergebenen ID
    var table = document.getElementById(tableId);
    
    // Wenn die Tabelle nicht sichtbar ist, mache sie sichtbar
    if (table.style.display === "none") {
        table.style.display = "block";
    } else {
        // Wenn sie sichtbar ist, verstecke sie
        table.style.display = "none";
    }
}

    document.addEventListener("DOMContentLoaded", function () {
        const tables = document.querySelectorAll("table");
        tables.forEach(table => {
            table.style.display = "none";
    });
});