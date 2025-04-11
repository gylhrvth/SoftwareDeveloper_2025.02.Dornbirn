

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







