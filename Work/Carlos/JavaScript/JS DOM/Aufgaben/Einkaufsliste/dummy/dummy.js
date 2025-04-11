

//----------- main Function -----------------------

let addItemButton = document.getElementById("addItem").addEventListener("click", function() {
    let articleType = document.getElementById("inputArtikel").value.trim();
    let articleNumber = document.getElementById("inputAnzahl").value.trim();
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
    if (isNaN(articleNumber) || articleNumber <= 0 ) { // || articleNumber % 1 !== 0// articleNumber % 1: Divides the number by 1 and checks the remainder. If the remainder is 0, the number is an integer. 
        // Error message
        let feeedbackText = document.getElementById("feedbackText");
        feeedbackText.textContent = "Bitte eine gültige Anzahl eingeben!";
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
    newArticle.textContent = articleType;
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
    newRow.appendChild(newDeleteButton);
    
    

    // Append newRow to the rowsBox
    document.getElementById("rowsBox").appendChild(newRow);
    updateRowColors(); // Reapply alternating row colors after adding a new row

    // Clear input fields
    articleType = document.getElementById("inputArtikel").value = "";
    articleNumber = document.getElementById("inputAnzahl").value = "";
    articleUnit = document.getElementById("inputEinheit").value = "";
    
    // Set focus back to the article input field
    document.getElementById("inputArtikel").focus();

    // Add event listener to checkbox

    newCheckBox.addEventListener("change", function(){

        if (newCheckBox.checked){
            newArticle.classList.add("articleChecked");
            newNumber.classList.add("numberChecked");
            newUnit.classList.add("unitChecked");
        } else if( newCheckBox.checked == false){
            newArticle.classList.remove("articleChecked");
            newNumber.classList.remove("numberChecked");
            newUnit.classList.remove("unitChecked");
        }

    })


});

//--------------------------------------------------------------------


// Function to reapply alternating row colors
function updateRowColors() {
    const appendedRows = document.getElementById("rowsBox").children;
    for (let i = 0; i < rows.length; i++) {
        appendedRows[i].classList.remove("odd"); // Remove the odd class
        if (i % 2 !== 0) {
            appendedRows[i].classList.add("odd"); // Add the odd class to every second row
        }
    }
}





