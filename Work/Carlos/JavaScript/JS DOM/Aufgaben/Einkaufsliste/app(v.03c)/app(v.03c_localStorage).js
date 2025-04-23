// ==============================
// Initialization
// ==============================

// Function to initialize the app
function main() {
    initializeFeedbackText(); // Initialize feedback text
    focusInputArticleField(); // Set focus to the article input field
    addEventListeners(); // Add event listeners
    loadRowsFromLocalStorage(); // Load rows from local storage
}

// Add event listeners for buttons
function addEventListeners() {
    document.getElementById("addItem").addEventListener("click", addItem);
    document.getElementById("resetList").addEventListener("click", resetList);
    document.getElementById("clearChecked").addEventListener("click", deleteCheckedItems);
}

// Initialize feedback text
function initializeFeedbackText() {
    const feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Gib ein Produkt ein";
    feedbackText.classList.remove("error", "success");
}

// Set focus to the article input field
function focusInputArticleField() {
    document.getElementById("inputArtikel").focus();
}

// ==============================
// Core Functionality
// ==============================

// Function to add a new item
function addItem() {
    const userInputValues = getInputValues(); // Step 1: Get input values

    if (!validateInputValues(userInputValues)) return; // Step 2: Validate input values

    showSuccessMessage("Artikel erfolgreich hinzugefügt!"); // Step 3: Show success message

    const newRow = createNewRow(userInputValues); // Step 4: Create a new row
    appendRowToList(newRow); // Step 5: Append the row to the list

    saveRowsToLocalStorage(); // Step 6: Save to local storage
    clearInputFields(); // Step 7: Clear input fields
}

// Function to delete checked items
function deleteCheckedItems() {
    const checkedItems = document.querySelectorAll("#rowsBox .rowCheckBox:checked");
    if (checkedItems.length === 0) {
        showErrorMessage("Keine Artikel ausgewählt!");
        return;
    }

    checkedItems.forEach(checkBox => {
        checkBox.parentElement.remove();
    });

    updateRowColors();
    saveRowsToLocalStorage();
    showSuccessMessage("Ausgewählte Artikel gelöscht!");
}

// Function to reset the list
function resetList() {
    const rowsBox = document.getElementById("rowsBox");
    if (rowsBox.children.length === 0) {
        showErrorMessage("Die Liste ist bereits leer!");
        return;
    }

    rowsBox.innerHTML = "";
    updateRowColors();
    saveRowsToLocalStorage();
    showSuccessMessage("Liste erfolgreich zurückgesetzt!");
}

// ==============================
// Feedback Messages
// ==============================

// Function to show success message
function showSuccessMessage(message) {
    const feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = message;
    feedbackText.classList.remove("error");
    feedbackText.classList.add("success");
    setTimeout(() => resetFeedbackText(), 2000);
}

// Function to show error message
function showErrorMessage(message) {
    const feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = message;
    feedbackText.classList.remove("success");
    feedbackText.classList.add("error");
    setTimeout(() => resetFeedbackText(), 2000);
}

// Function to reset feedback text
function resetFeedbackText() {
    const feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Gib ein Produkt ein";
    feedbackText.classList.remove("error", "success");
}

// ==============================
// Row Creation and Manipulation
// ==============================

// Function to create a new row
function createNewRow(inputValues) {
    const { articleType, articleNumber, articleUnit, checkBox = false, date = getCurrentDate() } = inputValues;

    const newRow = document.createElement("div");
    newRow.className = "newRow";

    if (isOddRow()) newRow.classList.add("odd");

    const checkBoxElement = createCheckbox(newRow, checkBox);
    const articleDiv = createDiv("rowArticle", truncateText(articleType, 20));
    const numberDiv = createDiv("rowNumber", articleNumber);
    const unitDiv = createDiv("rowUnit", articleUnit);
    const dateDiv = createDiv("rowDate", date);
    const deleteButton = createDeleteButton(newRow);

    newRow.append(checkBoxElement, numberDiv, unitDiv, articleDiv, dateDiv, deleteButton);

    return newRow;
}

// Function to append a row to the list
function appendRowToList(newRow) {
    document.getElementById("rowsBox").appendChild(newRow);
    updateRowColors();
}

// Function to create a checkbox
function createCheckbox(newRow, isChecked = false) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "rowCheckBox";
    checkBox.style.cursor = "pointer";
    checkBox.checked = isChecked;

    // Add event listener to handle changes to the checkbox state
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            newRow.classList.add("rowChecked");
            toggleCheckedClasses(newRow, true); // Apply checked classes
        } else {
            newRow.classList.remove("rowChecked");
            toggleCheckedClasses(newRow, false); // Remove checked classes
        }
        saveRowsToLocalStorage(); // Save the updated state to local storage
    });

    // Apply the rowChecked class and other checked classes if the checkbox is initially checked
    if (isChecked) {
        setTimeout(() => {
            newRow.classList.add("rowChecked");
            toggleCheckedClasses(newRow, true); // Ensure this is called after the row is appended
        }, 0);
    }

    return checkBox;
}

// Function to toggle checked classes
function toggleCheckedClasses(row, isChecked) {
    const article = row.querySelector(".rowArticle");
    const number = row.querySelector(".rowNumber");
    const unit = row.querySelector(".rowUnit");


    if (isChecked) {
        article.classList.add("articleChecked");
        number.classList.add("numberChecked");
        unit.classList.add("unitChecked");
    } else {
        article.classList.remove("articleChecked");
        number.classList.remove("numberChecked");
        unit.classList.remove("unitChecked");
    }
}

// Function to create a div
function createDiv(className, textContent) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = textContent;
    return div;
}

// Function to create a delete button
function createDeleteButton(newRow) {
    const deleteButton = document.createElement("img");
    deleteButton.className = "rowDelete";
    deleteButton.src = "../assets/icons/remove02.svg";
    deleteButton.alt = "delete";
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", () => {
        newRow.remove();
        saveRowsToLocalStorage();
        updateRowColors();
        showSuccessMessage("Artikel erfolgreich entfernt!"); // Show success message
    });

    return deleteButton;
}

// ==============================
// Utility Functions
// ==============================

// Function to get input values
function getInputValues() {
    const articleType = document.getElementById("inputArtikel").value.trim();
    const rawArticleNumber = document.getElementById("inputAnzahl").value.trim();
    const articleNumber = formatNumber(rawArticleNumber);
    const articleUnit = document.getElementById("inputEinheit").value.trim();

    return { articleType, articleNumber, articleUnit };
}

// Function to validate input values
function validateInputValues({ articleType, articleNumber, articleUnit }) {
    if (!articleType || !articleUnit) {
        showErrorMessage("Bitte alle Felder ausfüllen!");
        return false;
    }

    if (isNaN(articleNumber) || articleNumber <= 0 || articleNumber > 999) {
        showErrorMessage("Bitte eine gültige Anzahl eingeben! (1-999)");
        return false;
    }

    return true;
}

// Function to update row colors
function updateRowColors() {
    const rows = document.getElementById("rowsBox").children;
    Array.from(rows).forEach((row, index) => {
        row.classList.toggle("odd", index % 2 !== 0);
    });
}

// Function to save rows to local storage
function saveRowsToLocalStorage() {
    const rows = Array.from(document.querySelectorAll("#rowsBox .newRow")).map(row => ({
        checkBox: row.querySelector(".rowCheckBox").checked,
        article: row.querySelector(".rowArticle").textContent,
        number: row.querySelector(".rowNumber").textContent,
        unit: row.querySelector(".rowUnit").textContent,
        date: row.querySelector(".rowDate").textContent,
    }));
    localStorage.setItem("rows", JSON.stringify(rows));
}

// Function to load rows from local storage
function loadRowsFromLocalStorage() {
    const rows = JSON.parse(localStorage.getItem("rows")) || [];
    rows.forEach(rowData => {
        const mappedRowData = {
            articleType: rowData.article,
            articleNumber: rowData.number,
            articleUnit: rowData.unit,
            checkBox: rowData.checkBox,
            date: rowData.date,
        };
        const newRow = createNewRow(mappedRowData);
        appendRowToList(newRow);
    });
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById("inputArtikel").value = "";
    document.getElementById("inputAnzahl").value = "";
    document.getElementById("inputEinheit").value = "kg";
    focusInputArticleField();
}

// Helper function to get the current date
function getCurrentDate() {
    return new Date().toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

// Helper function to format numbers
function formatNumber(number) {
    const parsedNumber = parseFloat(number);
    return Number.isInteger(parsedNumber) ? parsedNumber.toString() : parsedNumber.toFixed(2);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Helper function to check if the row is odd
function isOddRow() {
    const childElements = document.getElementById("rowsBox").children;
    return childElements.length % 2 !== 0;
}

// ==============================
// App Initialization
// ==============================

// Initialize the app when the page loads
document.addEventListener("DOMContentLoaded", main);