const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
const counter = JSON.parse(localStorage.getItem("counter")) || 0;

// Set the initial counter value
const counterElement = document.getElementById("counter");
if (counter === 0) {
    counterElement.textContent = "Ware im Einkaufswagen: 0";
}

function countCheckedItems() {
    const checkedItems = document.querySelectorAll(".item-checkbox:checked");
    const checkedCount = checkedItems.length;
    const counterElement = document.getElementById("counter");
    counterElement.textContent = `Ware im Einkaufswagen: ${checkedCount}`;
    localStorage.setItem("counter", JSON.stringify(checkedCount));
}

document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("itemList");

    let draggedItem = null;

    // Füge Drag-and-Drop-Events zu jedem Item hinzu
    function enableDragAndDrop(itemDiv) {
        itemDiv.setAttribute("draggable", "true");

        // Event: Start des Draggens
        itemDiv.addEventListener("dragstart", function (e) {
            draggedItem = itemDiv;
            setTimeout(() => {
                itemDiv.style.opacity = "0.5"; // Reduziert die Sichtbarkeit während des Draggens
            }, 0);
        });

        // Event: Ende des Draggens
        itemDiv.addEventListener("dragend", function (e) {
            setTimeout(() => {
                itemDiv.style.opacity = "1"; // Stellt die Sichtbarkeit wieder her
                draggedItem = null;
            }, 0);
        });

        // Event: Draggen über ein anderes Element
        itemDiv.addEventListener("dragover", function (e) {
            e.preventDefault(); // Erlaubt das Ablegen
        });

        // Event: Ablegen auf ein anderes Element
        itemDiv.addEventListener("drop", function (e) {
            e.preventDefault();
            if (draggedItem !== this) {
                const allItems = Array.from(itemList.querySelectorAll(".item"));
                const draggedIndex = allItems.indexOf(draggedItem);
                const targetIndex = allItems.indexOf(this);

                if (draggedIndex < targetIndex) {
                    itemList.insertBefore(draggedItem, this.nextSibling); // Nach dem Ziel einfügen
                } else {
                    itemList.insertBefore(draggedItem, this); // Vor dem Ziel einfügen
                }

                saveItems(); // Speichert die neue Reihenfolge in localStorage
            }
        });
    }

    // Load items from savedItems
    savedItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemList.appendChild(itemDiv);

        enableDragAndDrop(itemDiv); // Aktiviert Drag-and-Drop für das neue Item

        const itemCheckbox = document.createElement("input");
        itemCheckbox.type = "checkbox";
        itemCheckbox.classList.add("item-checkbox");
        itemCheckbox.checked = item.checked; // Checkbox-Zustand wiederherstellen
        itemDiv.appendChild(itemCheckbox);
        itemCheckbox.addEventListener("change", function () {
            const checked = itemDiv.querySelector(".item-checkbox").checked; // Checkbox-Zustand speichern
            item.checked = checked; // Update the item's checked state
            if (item.checked === true) {
                itemName.classList.add("checked");
                itemQuantity.classList.add("checked");
            } else {
                itemName.classList.remove("checked");
                itemQuantity.classList.remove("checked");
            }
            saveItems();
            countCheckedItems();
        }
        );

        const itemName = document.createElement("span");
        itemName.textContent = item.name;
        itemName.classList.add("item-name");
        itemDiv.appendChild(itemName);

        const itemQuantity = document.createElement("span");
        itemQuantity.textContent = item.quantity;
        itemQuantity.classList.add("item-quantity");
        itemDiv.appendChild(itemQuantity);

        const itemSelection = document.createElement("span");
        itemSelection.textContent = item.selection;
        itemSelection.classList.add("item-selection");
        itemDiv.appendChild(itemSelection);
    

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            itemList.removeChild(itemDiv);
            saveItems();
            countCheckedItems();
        });
        itemDiv.appendChild(deleteButton);

        const checkedItems = document.querySelectorAll(".item-checkbox:checked");
        const checkedCount = checkedItems.length;
        const counterElement = document.getElementById("counter");
        counterElement.textContent = `Ware im Einkaufswagen: ${checkedCount}`;
        countCheckedItems();

    

        // Set checkbox state based on saved data
        itemCheckbox.checked = item.checked;
        if (item.checked) {
            itemName.classList.add("checked");
            itemQuantity.classList.add("checked");
        }
    });

    // Aktiviert Drag-and-Drop für neue Items
    window.createDiv = function () {
        const itemList = document.getElementById("itemList");
        const itemInput = document.getElementById("itemInput").value.trim();
        const quantityInput = document.getElementById("quantityInput").value.trim();
        const selectionInput = document.getElementById("selectionInput").value;

        if (itemInput === "" || quantityInput === "") {
            alert("Bitte Artikel und Menge eingeben.");
            return;
        }
        parseInt(quantityInput, 10);
        if (isNaN(quantityInput)) {
            alert("Bitte geben Sie eine gültige Menge ein.");
            return;
        }
        if (quantityInput < 1) {
            alert("Bitte geben Sie eine Menge größer als 0 ein.");
            return;
        }
        

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemList.appendChild(itemDiv);

        enableDragAndDrop(itemDiv); // Aktiviert Drag-and-Drop für das neue Item

        const itemCheckbox = document.createElement("input");
        itemCheckbox.type = "checkbox";
        itemCheckbox.classList.add("item-checkbox");
        itemDiv.appendChild(itemCheckbox);
        itemCheckbox.addEventListener("change", function () {
            if (itemCheckbox.checked) {
                itemName.classList.add("checked");
                itemQuantity.classList.add("checked");
            } else {
                itemName.classList.remove("checked");
                itemQuantity.classList.remove("checked");
            }
            countCheckedItems();
        }
        );


        const itemName = document.createElement("span");
        itemName.textContent = itemInput;
        itemName.classList.add("item-name");
        itemDiv.appendChild(itemName);

        const itemQuantity = document.createElement("span");
        itemQuantity.textContent = quantityInput;
        itemQuantity.classList.add("item-quantity");
        itemDiv.appendChild(itemQuantity);

        const itemSelection = document.createElement("span");
        itemSelection.textContent = selectionInput;
        itemSelection.classList.add("item-selection");
        itemDiv.appendChild(itemSelection);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            itemList.removeChild(itemDiv);
            countCheckedItems();
            saveItems();
        });
        itemDiv.appendChild(deleteButton);
        saveItems(); // Speichern der Artikel in localStorage

        // Felder zurücksetzen
        document.getElementById("itemInput").value = "";
        document.getElementById("quantityInput").value = "";
    };
});

// Save items to localStorage
function saveItems() {
    const items = [];
    document.querySelectorAll(".item").forEach(itemDiv => {
        const name = itemDiv.querySelector(".item-name").textContent;
        const quantity = itemDiv.querySelector(".item-quantity").textContent;
        const selection = itemDiv.querySelector(".item-selection").textContent;
        const checked = itemDiv.querySelector(".item-checkbox").checked; // Checkbox-Zustand speichern
        items.push({ name, quantity, selection, checked });
    });
    localStorage.setItem("shoppingList", JSON.stringify(items));
}