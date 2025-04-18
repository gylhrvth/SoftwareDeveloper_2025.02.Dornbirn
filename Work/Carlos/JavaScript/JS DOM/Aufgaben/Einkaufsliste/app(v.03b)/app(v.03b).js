



//------------------------------
// Main Function Start -----------------------------------
//------------------------------

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

//------------------------------
// Main Function End -----------------------------------
//------------------------------

//Main Function subFunctions ----------------------------------

function initializeFeedbackText() {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Gib ein Produkt ein";
    feedbackText.classList.remove("error", "success");
}


function focusInputArticleField() {
    document.getElementById("inputArtikel").focus();
}

//Event Listener addItem() ---------------------------------

function addItem() {


    // Step 1: Get the input values
    const userInputValues = getInputValues();

    // Step 2: Validate the input values
    if (!validateInputValues(userInputValues)) {
        return; // Stop execution if validation fails
    }
    // Step 3: Show success message if validation passes
    showSuccessMessage();

    // Create a new row
    const newRow = createNewRow(userInputValues);
    appendRowToList(newRow);


    //Clear the input fields
    clearInputFields();

}

// addItem() subFunctions ----------------------------------------------

// Get the input values from the user

function getInputValues() {

    const articleType = document.getElementById("inputArtikel").value.trim(); // Remove leading and trailing whitespace
    // Allow decimals and remove leading zeros
    const rawArticleNumber = document.getElementById("inputAnzahl").value.trim();
    let articleNumber = parseFloat(rawArticleNumber); // Convert to float
    // Check if the number is an integer
    if (Number.isInteger(articleNumber)) {
        articleNumber = articleNumber.toString(); // Convert to string without decimals
    } else {
        articleNumber = articleNumber.toFixed(2); // Limit to 2 decimals
    }
    
    const articleUnit = document.getElementById("inputEinheit").value.trim();

    return { articleType, articleNumber, articleUnit };

};      

// Validate the input values from the user

function validateInputValues(inputValues) {
    const { articleType, articleNumber, articleUnit } = inputValues;
    if (!articleType || !articleUnit) {
        // Handle validation failure
        let feedbackText = document.getElementById("feedbackText");
        feedbackText.textContent = "Bitte alle Felder ausfüllen!";
        feedbackText.classList.add("error");
        setTimeout(() => {
            feedbackText.textContent = "Gib ein Produkt ein";
            feedbackText.classList.remove("error");
        }, 2000);
        return false;
    }

    if (isNaN(articleNumber) || articleNumber <= 0 || articleNumber > 99) {
        // Handle validation failure
        let feedbackText = document.getElementById("feedbackText");
        feedbackText.textContent = "Bitte eine gültige Anzahl eingeben! (1-99)";
        feedbackText.classList.add("error");
        setTimeout(() => {
            feedbackText.textContent = "Gib ein Produkt ein";
            feedbackText.classList.remove("error");
        }, 2000);
        return false;
    }

    return true; // Validation passed
}

// Clear the input fields after adding an item
function clearInputFields() {
    document.getElementById("inputArtikel").value = ""; // Reset the value of the article input field
    document.getElementById("inputAnzahl").value = "";  // Reset the value of the number input field
    document.getElementById("inputEinheit").value = ""; // Reset the value of the unit input field
    // Set focus back to the article input field
    document.getElementById("inputArtikel").focus();
}


// Show success message
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

// ----------------------------------------------------

function createNewRow(inputValues) {
    const { articleType, articleNumber, articleUnit } = inputValues;

    // Create the row container
    const newRow = document.createElement("div");
    newRow.className = "newRow";

    // Alternate background color
    const childElements = document.getElementById("rowsBox").children;
    if (childElements.length % 2 !== 0) {
        newRow.classList.add("odd");
    }

    // Create row elements
    
    const articleDiv = createDiv("rowArticle", articleType.length > 20 ? articleType.substring(0, 20) + "..." : articleType);
    const numberDiv = createDiv("rowNumber", articleNumber);
    const unitDiv = createDiv("rowUnit", articleUnit);
    const dateDiv = createDateDiv();
    const deleteButton = createDeleteButton(newRow);

     // Pass articleDiv and other elements to createCheckbox
    const checkBox = createCheckbox(newRow, articleDiv, numberDiv, unitDiv);

    // Append elements to the row
    newRow.appendChild(checkBox);
    newRow.appendChild(numberDiv);
    newRow.appendChild(unitDiv);
    newRow.appendChild(articleDiv);
    newRow.appendChild(dateDiv);
    newRow.appendChild(deleteButton);

    return newRow;
}

// createNewRow subFunctions ----------------------------------

function appendRowToList(newRow) {
    document.getElementById("rowsBox").appendChild(newRow);
    updateRowColors(); // Reapply alternating row colors
}

function createCheckbox(newRow, articleDiv, numberDiv, unitDiv) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "rowCheckBox";
    checkBox.style.cursor = "pointer";

    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            newRow.classList.add("rowChecked");
            articleDiv.classList.add("articleChecked");
            numberDiv.classList.add("numberChecked");
            unitDiv.classList.add("unitChecked");
        } else {
            newRow.classList.remove("rowChecked");
            articleDiv.classList.remove("articleChecked");
            numberDiv.classList.remove("numberChecked");
            unitDiv.classList.remove("unitChecked");
        }
    });

    return checkBox;
}

function createDiv(className, textContent) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = textContent;
    return div;
}

function createDateDiv() {
    const dateDiv = document.createElement("div");
    dateDiv.className = "rowDate";
    const currentDate = new Date();
    dateDiv.textContent = currentDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    return dateDiv;
}

function createDeleteButton(newRow) {
    const deleteButton = document.createElement("img");
    deleteButton.className = "rowDelete";
    deleteButton.src = "../assets/icons/remove02.svg";
    deleteButton.alt = "delete";
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", function () {
        newRow.remove();
        let feedbackText = document.getElementById("feedbackText");
        feedbackText.textContent = "Artikel wurde gelöscht!";
        feedbackText.classList.add("error");
        updateRowColors(); // Reapply alternating row colors
        setTimeout(() => {
            feedbackText.textContent = "Gib ein Produkt ein";
            feedbackText.classList.remove("error");
        }, 2000);
    });

    return deleteButton;
}

function updateRowColors() {
    const rows = document.getElementById("rowsBox").children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("odd");
        if (i % 2 !== 0) {
            rows[i].classList.add("odd");
        }
    }
}

// Reset Functions ---------------------------------

// Function to reset the list
function resetList() {
    let feeedbackText = document.getElementById("feedbackText");
    feeedbackText.textContent = "Einkaufsliste zurückgesetzt!";
    feeedbackText.classList.remove("error");
    feeedbackText.classList.add("success");
    setTimeout(() => {
        feeedbackText.textContent = "Gib ein Produkt ein";
        feeedbackText.classList.remove("success");
    }, 2000);

    // Clear all rows
    document.getElementById("rowsBox").innerHTML = "";
}

// Function to delete checked items
function deleteCheckedItems() {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Ausgewählte Artikel gelöscht!";
    feedbackText.classList.remove("error");
    feedbackText.classList.add("success");
    setTimeout(() => {
        feedbackText.textContent = "Gib ein Produkt ein";
        feedbackText.classList.remove("success");
    }, 2000);

    // Select all checked checkboxes within rowsBox
    let checkBoxes = document.querySelectorAll("#rowsBox .rowCheckBox:checked"); // returns a NodeList of all checked checkboxes
    checkBoxes.forEach(function(checkBox) { // checkbox represents the current element being processed in the NodeList
        checkBox.parentElement.remove(); // Remove the parent row of the checked checkbox
    });

    updateRowColors(); // Reapply alternating row colors after deletion
}




// Call the main function to initialize the app
main();


// ----------------------------------------------------------------------------------------

// Data Storage Functions -------------------------------

// Function to save rows to local storage
function saveRowsToLocalStorage() {
    const rows = [];
    document.querySelectorAll("#rowsBox .newRow").forEach(currentRow => {
        const checkBox = currentRow.querySelector(".rowCheckBox").checked;
        const article = currentRow.querySelector(".rowArticle").textContent;
        const number = currentRow.querySelector(".rowNumber").textContent;
        const unit = currentRow.querySelector(".rowUnit").textContent;
        const date = currentRow.querySelector(".rowDate").textContent;
        rows.push({ checkBox, article, number, unit, date});
    });
    localStorage.setItem("rows", JSON.stringify(rows));
}

// Function to load rows from local storage
function loadRowsFromLocalStorage() {
    const rows = JSON.parse(localStorage.getItem("rows")) || []; // Retrieve and parse rows, or use an empty array if none exist
    rows.forEach(rowData => {
        const newRow = createNewRow(rowData); // Use the existing createNewRow function
        appendRowToList(newRow); // Append the row to the list
    });
}
























/*
//----------- main Function -----------------------

let addItemButton = document.getElementById("addItem").addEventListener("click", function() {
    let articleType = document.getElementById("inputArtikel").value.trim();
    let rawArticleNumber = parseFloat(document.getElementById("inputAnzahl").value.trim()); // Allow decimals and remove leading zeros
    let articleNumber = parseFloat(rawArticleNumber.toFixed(2)); // Limit to 2 decimals
    let articleUnit = document.getElementById("inputEinheit").value.trim();

    // Validate input fields
    if (articleType === "" || articleNumber === "" || articleUnit === "") {
        // Error message
        let feeedbackText = document.getElementById("feedbackText");
        feeedbackText.textContent = "Bitte alle Felder ausfüllen!";
        feeedbackText.classList.add("error");
        setTimeout(function() {
            feeedbackText.textContent = "Gib ein Produkt ein";
            feeedbackText.classList.remove("error");
        }, 2000);
        return;
    }

    // Validate number input
    if (isNaN(articleNumber) || articleNumber <= 0 || articleNumber > 99) { // || articleNumber % 1 !== 0// articleNumber % 1: Divides the number by 1 and checks the remainder. If the remainder is 0, the number is an integer. 
        // Error message
        let feeedbackText = document.getElementById("feedbackText");
        feeedbackText.textContent = "Bitte eine gültige Anzahl eingeben! (1-99)";
        feeedbackText.classList.add("error");
        setTimeout(function() {
            feeedbackText.textContent = "Gib ein Produkt ein";
            feeedbackText.classList.remove("error");
        }, 2000);
        return;
    }

    // Succesful Item added
    let feeedbackText = document.getElementById("feedbackText");
    feeedbackText.textContent = "Artikel erfolgreich hinzugefügt!";
    feeedbackText.classList.remove("error");
    feeedbackText.classList.add("success");
    setTimeout(function() {
        feeedbackText.textContent = "Gib ein Produkt ein";
        feeedbackText.classList.remove("success");
    }, 2000);

    // Create new row
    let newRow = document.createElement("div");
    newRow.className = "newRow";

    //Alternate background color for the newRow
    let childElements = document.getElementById("rowsBox").children;
    if(childElements.length % 2 !== 0){
        newRow.classList.add("odd");
    }
    
    // Create new divs inside newRow
    let newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.className = "rowCheckBox";
    newCheckBox.style.cursor = "pointer";
    let newArticle = document.createElement("div");
    newArticle.className = "rowArticle";
    // Limit the text content to 20 characters
    newArticle.textContent = articleType.length > 20 ? articleType.substring(0, 20) + "..." : articleType;
    let newNumber = document.createElement("div");
    newNumber.className = "rowNumber";
    newNumber.textContent = articleNumber;
    let newUnit = document.createElement("div");
    newUnit.className = "rowUnit";
    newUnit.textContent = articleUnit;
    let newDeleteButton = document.createElement("img");
    newDeleteButton.className = "rowDelete";
    newDeleteButton.src = "../assets/icons/remove02.svg";
    newDeleteButton.alt = "delete";
    newDeleteButton.style.cursor = "pointer";

    // Create a new div for the date
    let newDate = document.createElement("div");
    newDate.className = "rowDate";
    let currentDate = new Date();
    newDate.textContent = currentDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    


    // Add event listener to delete button
    newDeleteButton.addEventListener("click", function() {
        newRow.remove();
        let feeedbackText = document.getElementById("feedbackText");
        feeedbackText.classList.add("error");
        feeedbackText.textContent = "Artikel würde gelöscht!";
        updateRowColors(); // Reapply alternating row colors
        setTimeout(function() {
            feeedbackText.textContent = "Gib ein Produkt ein";
            feeedbackText.classList.remove("error");
        }, 2000);
    })

    // Append new divs to newRow
    newRow.appendChild(newCheckBox);
    newRow.appendChild(newNumber);
    newRow.appendChild(newUnit);
    newRow.appendChild(newArticle);
    newRow.appendChild(newDate);
    newRow.appendChild(newDeleteButton);
    
    

    // Append newRow to the rowsBox
    document.getElementById("rowsBox").appendChild(newRow);
    updateRowColors(); // Reapply alternating row colors after adding a new row

    // Clear input fields
    document.getElementById("inputArtikel").value = ""; // Reset the value of the article input field
    document.getElementById("inputAnzahl").value = "";  // Reset the value of the number input field
    document.getElementById("inputEinheit").value = ""; // Reset the value of the unit input field

    // Set focus back to the article input field
    document.getElementById("inputArtikel").focus();

    // Add event listener to checkbox
    newCheckBox.addEventListener("change", function(){

        if (newCheckBox.checked){
            newArticle.classList.add("articleChecked");
            newNumber.classList.add("numberChecked");
            newUnit.classList.add("unitChecked");
            newRow.classList.add("rowChecked");
        } else if( newCheckBox.checked == false){
            newArticle.classList.remove("articleChecked");
            newNumber.classList.remove("numberChecked");
            newUnit.classList.remove("unitChecked");
            newRow.classList.remove("rowChecked");
        }
    })
});

//--------------------------------------------------------------------

// Function to reapply alternating row colors
function updateRowColors() {
    const appendedRows = document.getElementById("rowsBox").children;
    for (let i = 0; i < appendedRows.length; i++) { // Use appendedRows instead of rows
        appendedRows[i].classList.remove("odd"); // Remove the odd class
        if (i % 2 !== 0) {
            appendedRows[i].classList.add("odd"); // Add the odd class to every second row
        }
    }
}


// Function to reset the list
function resetListe() {
    let feeedbackText = document.getElementById("feedbackText");
    feeedbackText.textContent = "Einkaufsliste zurückgesetzt!";
    feeedbackText.classList.remove("error");
    feeedbackText.classList.add("success");
    setTimeout(function() {
        feeedbackText.textContent = "Gib ein Produkt ein";
        feeedbackText.classList.remove("success");
    }, 2000);

    // Clear all rows
    document.getElementById("rowsBox").innerHTML = "";
}
let resetList = document.getElementById("resetList").addEventListener("click", resetListe);


// Function to delete checked items
function deleteCheckedItems() {
    let feedbackText = document.getElementById("feedbackText");
    feedbackText.textContent = "Ausgewählte Artikel gelöscht!";
    feedbackText.classList.remove("error");
    feedbackText.classList.add("success");
    setTimeout(function() {
        feedbackText.textContent = "Gib ein Produkt ein";
        feedbackText.classList.remove("success");
    }, 2000);

    // Select all checked checkboxes within rowsBox
    let checkBoxes = document.querySelectorAll("#rowsBox .rowCheckBox:checked"); // returns a NodeList of all checked checkboxes
    checkBoxes.forEach(function(checkBox) { // checkbox represents the current element being processed in the NodeList
        checkBox.parentElement.remove(); // Remove the parent row of the checked checkbox
    });

    updateRowColors(); // Reapply alternating row colors after deletion
}

let deleteChecked = document.getElementById("clearChecked").addEventListener("click", deleteCheckedItems);

// ----------------------------------------------------------------------------------------

// Data Storage Functions -------------------------------

// Function to save rows to local storage
function saveRowsToLocalStorage() {
    const rows = [];
    document.querySelectorAll("#rowsBox .newRow").forEach(currentRow => {
        const checkBox = currentRow.querySelector(".rowCheckbox").checked;
        const article = currentRow.querySelector(".rowArticle").textContent;
        const number = currentRow.querySelector(".rowNumber").textContent;
        const unit = currentRow.querySelector(".rowUnit").textContent;
        const date = currentRow.querySelector(".rowDate").textContent;
        rows.push({ checkBox, article, number, unit, date});
    });
    localStorage.setItem("rows", JSON.stringify(rows));
}

// Function to load rows from local storage
function loadRowsFromLocalStorage() {
    const rows = JSON.parse(localStorage.getItem("rows")) || []; // Retrieve and parse rows, or use an empty array if none exist
    rows.forEach(rowData => {
        // Create a new row
        let newRow = document.createElement("div");
    })

    // TBC....................................


}

*/







