

// Function to initialize the app
function main() {
    // Initialize feedback text
    initializeFeedbackText();

    // Set focus to the article input field
    focusInputArticleField();

    // Add event listeners
    document.getElementById("addItem").addEventListener("click", addItem);
    document.getElementById("resetList").addEventListener("click", resetList);
    document.getElementById("clearChecked").addEventListener("click", deleteCheckedItems);
}

// Initialize feedback text
function initializeFeedbackText() {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Gib ein Produkt ein";
    feedbackText.classList.remove("error", "success");
}

// Set focus to the article input field
function focusInputArticleField() {
    document.getElementById("inputArtikel").focus();
}

// Function to add a new item
function addItem() {
    // Step 1: Get the input values
    const userInputValues = getInputValues();

    // Step 2: Validate the input values
    if (!validateInputValues(userInputValues)) {
        return; // Stop execution if validation fails
    }

    // Step 3: Show success message
    showSuccessMessage();

    // Step 4: Create and append a new row
    const newRow = createNewRow(userInputValues);
    appendRowToList(newRow);

    // Step 5: Save to local storage
    saveRowsToLocalStorage();

    // Step 6: Clear the input fields
    clearInputFields();
}

// Function to get input values
function getInputValues() {
    const articleType = document.getElementById("inputArtikel").value.trim();
    const rawArticleNumber = document.getElementById("inputAnzahl").value.trim();
    let articleNumber = parseFloat(rawArticleNumber);

    if (Number.isInteger(articleNumber)) {
        articleNumber = articleNumber.toString();
    } else {
        articleNumber = articleNumber.toFixed(2);
    }

    const articleUnit = document.getElementById("inputEinheit").value.trim();

    return { articleType, articleNumber, articleUnit };
}

// Function to validate input values
function validateInputValues(inputValues) {
    const { articleType, articleNumber, articleUnit } = inputValues;

    if (!articleType || !articleUnit) {
        showErrorMessage("Bitte alle Felder ausfüllen!");
        return false;
    }

    if (isNaN(articleNumber) || articleNumber <= 0 || articleNumber > 99) {
        showErrorMessage("Bitte eine gültige Anzahl eingeben! (1-99)");
        return false;
    }

    return true;
}

// Function to show success message
function showSuccessMessage() {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Artikel erfolgreich hinzugefügt!";
    feedbackText.classList.remove("error");
    feedbackText.classList.add("success");
    setTimeout(() => {
        feedbackText.textContent = "Gib ein Produkt ein";
        feedbackText.classList.remove("success");
    }, 2000);
}

// Function to show error message
function showErrorMessage(message) {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = message;
    feedbackText.classList.add("error");
    setTimeout(() => {
        feedbackText.textContent = "Gib ein Produkt ein";
        feedbackText.classList.remove("error");
    }, 2000);
}

// Function to create a new row
function createNewRow(inputValues) {
    const { articleType, articleNumber, articleUnit, checkBox = false, date = new Date().toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }) } = inputValues;

    const newRow = document.createElement("div");
    newRow.className = "newRow";

    const childElements = document.getElementById("rowsBox").children;
    if (childElements.length % 2 !== 0) {
        newRow.classList.add("odd");
    }

    const checkBoxElement = createCheckbox(newRow, checkBox);
    const articleDiv = createDiv("rowArticle", articleType.length > 20 ? articleType.substring(0, 20) + "..." : articleType);
    const numberDiv = createDiv("rowNumber", articleNumber);
    const unitDiv = createDiv("rowUnit", articleUnit);
    const dateDiv = createDiv("rowDate", date);
    const deleteButton = createDeleteButton(newRow);

    newRow.appendChild(checkBoxElement);
    newRow.appendChild(numberDiv);
    newRow.appendChild(unitDiv);
    newRow.appendChild(articleDiv);
    newRow.appendChild(dateDiv);
    newRow.appendChild(deleteButton);

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

    // Apply the rowChecked class if the checkbox is initially checked
    if (isChecked) {
        newRow.classList.add("rowChecked");
    }

    // Add event listener to handle changes to the checkbox state

    checkBox.addEventListener("change", function () {
        if (checkBox.checked) {
            newRow.classList.add("rowChecked");
        } else {
            newRow.classList.remove("rowChecked");
        }
        saveRowsToLocalStorage(); // Save the updated state to local storage
    });

    return checkBox;
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

    deleteButton.addEventListener("click", function () {
        newRow.remove();
        saveRowsToLocalStorage();
        updateRowColors();
    });

    return deleteButton;
}

// Function to update row colors
function updateRowColors() {
    const rows = document.getElementById("rowsBox").children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("odd");
        if (i % 2 !== 0) {
            rows[i].classList.add("odd");
        }
    }
}

// Function to delete checked items
function deleteCheckedItems() {
    document.querySelectorAll("#rowsBox .rowCheckBox:checked").forEach(checkBox => {
        checkBox.parentElement.remove();
    });
    updateRowColors();
    saveRowsToLocalStorage();
}

// Function to reset the list
function resetList() {
    document.getElementById("rowsBox").innerHTML = "";
    updateRowColors();
    saveRowsToLocalStorage();
}

// Function to save rows to local storage
function saveRowsToLocalStorage() {
    const rows = [];
    document.querySelectorAll("#rowsBox .newRow").forEach(currentRow => {
        const checkBox = currentRow.querySelector(".rowCheckBox").checked;
        const article = currentRow.querySelector(".rowArticle").textContent;
        const number = currentRow.querySelector(".rowNumber").textContent;
        const unit = currentRow.querySelector(".rowUnit").textContent;
        const date = currentRow.querySelector(".rowDate").textContent;
        rows.push({ checkBox, article, number, unit, date });
    });
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
            date: rowData.date
        };
        const newRow = createNewRow(mappedRowData);
        appendRowToList(newRow);
    });
}

// Load rows from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadRowsFromLocalStorage);

// Initialize the app
main();