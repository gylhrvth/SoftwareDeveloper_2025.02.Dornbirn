



document.getElementById("addButton").addEventListener("click", function () {
    // Get input values
    const artikel = document.getElementById("inputArtikel").value.trim();
    const anzahl = document.getElementById("inputAnzahl").value.trim();
    const menge = document.getElementById("inputMenge").value.trim();

    // Validate inputs
    if (!artikel || !anzahl || !menge) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    // Create a flex row
    const row = document.createElement("div");
    row.className = "flex-row";
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.marginBottom = "10px";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px";

    // Create Artikel input
    const artikelInput = document.createElement("input");
    artikelInput.type = "text";
    artikelInput.value = artikel;
    artikelInput.readOnly = true;
    artikelInput.style.marginRight = "10px";

    // Create Anzahl input
    const anzahlInput = document.createElement("input");
    anzahlInput.type = "number";
    anzahlInput.value = anzahl;
    anzahlInput.readOnly = true;
    anzahlInput.style.marginRight = "10px";

    // Create Menge input
    const mengeInput = document.createElement("input");
    mengeInput.type = "text";
    mengeInput.value = menge;
    mengeInput.readOnly = true;
    mengeInput.style.marginRight = "10px";

    // Create Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Entfernen";
    removeButton.style.marginLeft = "auto";
    removeButton.addEventListener("click", function () {
        row.remove();
    });

    // Append elements to the row
    row.appendChild(checkbox);
    row.appendChild(artikelInput);
    row.appendChild(anzahlInput);
    row.appendChild(mengeInput);
    row.appendChild(removeButton);

    // Append the row to the container
    document.getElementById("rowsBox").appendChild(row);

    // Clear input fields
    document.getElementById("inputArtikel").value = "";
    document.getElementById("inputAnzahl").value = "";
    document.getElementById("inputMenge").value = "";
});