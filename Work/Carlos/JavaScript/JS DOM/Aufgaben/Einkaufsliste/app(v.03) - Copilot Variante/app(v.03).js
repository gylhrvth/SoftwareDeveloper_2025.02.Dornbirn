

// Main function
function main() {
    initializeEventListeners();
    loadRowsFromLocalStorage(); // Load rows when the page loads
}

// Initialize event listeners
function initializeEventListeners() {
    document.getElementById("addItem").addEventListener("click", handleAddItem);
    document.getElementById("resetList").addEventListener("click", resetListe);
    document.getElementById("clearChecked").addEventListener("click", deleteCheckedItems);
}

// Get user input
function getInputValue() {
    let articleType = document.getElementById("inputArtikel").value.trim();
    let rawArticleNumber = parseFloat(document.getElementById("inputAnzahl").value.trim());
    let articleNumber = parseFloat(rawArticleNumber.toFixed(2));
    let articleUnit = document.getElementById("inputEinheit").value.trim();
    return { articleType, articleNumber, articleUnit };
}

// Handle adding a new item
function handleAddItem() {
    const { articleType, articleNumber, articleUnit } = getInputValue();

    // Validate input
    if (!validateInput(articleType, articleNumber, articleUnit)) return;

    // Add a new row
    addNewRow(articleType, articleNumber, articleUnit);

    // Save to localStorage
    saveRowsToLocalStorage();
}

// Validate user input
function validateInput(articleType, articleNumber, articleUnit) {
    let feedbackText = document.getElementById("feedbackText");

    if (articleType === "" || articleNumber === "" || articleUnit === "") {
        feedbackText.textContent = "Bitte alle Felder ausfüllen!";
        feedbackText.classList.add("error");
        setTimeout(() => {
            feedbackText.textContent = "Gib ein Produkt ein";
            feedbackText.classList.remove("error");
        }, 2000);
        return false;
    }

    if (isNaN(articleNumber) || articleNumber <= 0 || articleNumber > 99) {
        feedbackText.textContent = "Bitte eine gültige Anzahl eingeben! (1-99)";
        feedbackText.classList.add("error");
        setTimeout(() => {
            feedbackText.textContent = "Gib ein Produkt ein";
            feedbackText.classList.remove("error");
        }, 2000);
        return false;
    }

    return true;
}

// Add a new row
function addNewRow(articleType, articleNumber, articleUnit) {
    let newRow = document.createElement("div");
    newRow.className = "newRow";

    // Alternate background color
    let childElements = document.getElementById("rowsBox").children;
    if (childElements.length % 2 !== 0) {
        newRow.classList.add("odd");
    }

    // Create elements for the row
    let newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.className = "rowCheckBox";
    newCheckBox.style.cursor = "pointer";

    let newArticle = document.createElement("div");
    newArticle.className = "rowArticle";
    newArticle.textContent = articleType.length > 20 ? articleType.substring(0, 20) + "..." : articleType;

    let newNumber = document.createElement("div");
    newNumber.className = "rowNumber";
    newNumber.textContent = articleNumber;

    let newUnit = document.createElement("div");
    newUnit.className = "rowUnit";
    newUnit.textContent = articleUnit;

    let newDate = document.createElement("div");
    newDate.className = "rowDate";
    let currentDate = new Date();
    newDate.textContent = currentDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    let newDeleteButton = document.createElement("img");
    newDeleteButton.className = "rowDelete";
    newDeleteButton.src = "../assets/icons/remove02.svg";
    newDeleteButton.alt = "delete";
    newDeleteButton.style.cursor = "pointer";

    // Add event listener to delete button
    newDeleteButton.addEventListener("click", function () {
        newRow.remove();
        saveRowsToLocalStorage(); // Update localStorage after deletion
        updateRowColors();
    });

    // Add event listener to checkbox
    newCheckBox.addEventListener("change", function () {
        if (newCheckBox.checked) {
            newRow.classList.add("rowChecked"); // Add the rowChecked class
            newArticle.classList.add("articleChecked");
            newNumber.classList.add("numberChecked");
            newUnit.classList.add("unitChecked");
        } else {
            newRow.classList.remove("rowChecked"); // Remove the rowChecked class
            newArticle.classList.remove("articleChecked");
            newNumber.classList.remove("numberChecked");
            newUnit.classList.remove("unitChecked");
        }
        saveRowsToLocalStorage(); // Save the updated state to localStorage
    });

    // Append elements to the row
    newRow.appendChild(newCheckBox);
    newRow.appendChild(newNumber);
    newRow.appendChild(newUnit);
    newRow.appendChild(newArticle);
    newRow.appendChild(newDate);
    newRow.appendChild(newDeleteButton);

    // Append the row to the rowsBox
    document.getElementById("rowsBox").appendChild(newRow);

    // Update row colors
    updateRowColors();
}

// Update alternating row colors
function updateRowColors() {
    const appendedRows = document.getElementById("rowsBox").children;
    for (let i = 0; i < appendedRows.length; i++) {
        appendedRows[i].classList.remove("odd");
        if (i % 2 !== 0) {
            appendedRows[i].classList.add("odd");
        }
    }
}

// Reset the list
function resetListe() {
    document.getElementById("rowsBox").innerHTML = "";
    saveRowsToLocalStorage(); // Clear localStorage
}

// Delete checked items
function deleteCheckedItems() {
    document.querySelectorAll("#rowsBox .rowCheckBox:checked").forEach(checkBox => {
        checkBox.parentElement.remove();
    });
    saveRowsToLocalStorage(); // Update localStorage
    updateRowColors();
}

// Save rows to localStorage
function saveRowsToLocalStorage() {
    const rows = [];
    document.querySelectorAll("#rowsBox .newRow").forEach(currentRow => {
        const checkBox = currentRow.querySelector(".rowCheckBox").checked; // Save checkbox state
        const article = currentRow.querySelector(".rowArticle").textContent;
        const number = currentRow.querySelector(".rowNumber").textContent;
        const unit = currentRow.querySelector(".rowUnit").textContent;
        const date = currentRow.querySelector(".rowDate").textContent;
        rows.push({ checkBox, article, number, unit, date });
    });
    localStorage.setItem("rows", JSON.stringify(rows));
}

// Load rows from localStorage
function loadRowsFromLocalStorage() {
    const rows = JSON.parse(localStorage.getItem("rows")) || []; // Retrieve and parse rows, or use an empty array if none exist
    rows.forEach(rowData => {
        // Create a new row
        const newRow = document.createElement("div");
        newRow.className = "newRow";

        const newCheckBox = document.createElement("input");
        newCheckBox.type = "checkbox";
        newCheckBox.className = "rowCheckBox";
        newCheckBox.style.cursor = "pointer";
        newCheckBox.checked = rowData.checkBox; // Restore checkbox state

        const newArticle = document.createElement("div");
        newArticle.className = "rowArticle";
        newArticle.textContent = rowData.article;

        const newNumber = document.createElement("div");
        newNumber.className = "rowNumber";
        newNumber.textContent = rowData.number;

        const newUnit = document.createElement("div");
        newUnit.className = "rowUnit";
        newUnit.textContent = rowData.unit;

        const newDate = document.createElement("div");
        newDate.className = "rowDate";
        newDate.textContent = rowData.date;

        const newDeleteButton = document.createElement("img");
        newDeleteButton.className = "rowDelete";
        newDeleteButton.src = "../assets/icons/remove02.svg";
        newDeleteButton.alt = "delete";
        newDeleteButton.style.cursor = "pointer";

        // Add event listener to delete button
        newDeleteButton.addEventListener("click", function () {
            newRow.remove();
            saveRowsToLocalStorage(); // Update localStorage after deletion
            updateRowColors();
        });

        // Add event listener to checkbox
        newCheckBox.addEventListener("change", function () {
            if (newCheckBox.checked) {
                newRow.classList.add("rowChecked"); // Add the rowChecked class
                newArticle.classList.add("articleChecked");
                newNumber.classList.add("numberChecked");
                newUnit.classList.add("unitChecked");
            } else {
                newRow.classList.remove("rowChecked"); // Remove the rowChecked class
                newArticle.classList.remove("articleChecked");
                newNumber.classList.remove("numberChecked");
                newUnit.classList.remove("unitChecked");
            }
            saveRowsToLocalStorage(); // Save the updated state to localStorage
        });

        // Apply styles if the checkbox is checked
        if (rowData.checkBox) {
            newArticle.classList.add("articleChecked");
            newNumber.classList.add("numberChecked");
            newUnit.classList.add("unitChecked");
            newRow.classList.add("rowChecked");
        }

        // Append elements to the row
        newRow.appendChild(newCheckBox);
        newRow.appendChild(newNumber);
        newRow.appendChild(newUnit);
        newRow.appendChild(newArticle);
        newRow.appendChild(newDate);
        newRow.appendChild(newDeleteButton);

        // Append the row to the rowsBox
        document.getElementById("rowsBox").appendChild(newRow);
    });

    updateRowColors(); // Reapply alternating row colors
}

// Call the main function
main();
