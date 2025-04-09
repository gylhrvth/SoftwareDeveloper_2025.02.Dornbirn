const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("itemList");

    // Load items from savedItems
    savedItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemList.appendChild(itemDiv);

        const itemCheckbox = document.createElement("input");
        itemCheckbox.type = "checkbox";
        itemCheckbox.classList.add("item-checkbox");
        itemCheckbox.checked = item.checked; // Checkbox-Zustand wiederherstellen
        itemDiv.appendChild(itemCheckbox);
        itemCheckbox.addEventListener("change", function () {
            if (itemCheckbox.checked) {
                itemName.classList.add("checked");
                itemQuantity.classList.add("checked");
            } else {
                itemName.classList.remove("checked");
                itemQuantity.classList.remove("checked");
            }
            saveItems();
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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            itemList.removeChild(itemDiv);
            saveItems();
        });
        itemDiv.appendChild(deleteButton);
    });

    // Save items to localStorage
    function saveItems() {
        const items = [];
        document.querySelectorAll(".item").forEach(itemDiv => {
            const name = itemDiv.querySelector(".item-name").textContent;
            const quantity = itemDiv.querySelector(".item-quantity").textContent;
            const checked = itemDiv.querySelector(".item-checkbox").checked; // Checkbox-Zustand speichern
            items.push({ name, quantity, checked });
        });
        localStorage.setItem("shoppingList", JSON.stringify(items));
    }

    // Override createDiv to include saving
    const originalCreateDiv = createDiv;
    window.createDiv = function () {
        originalCreateDiv();
        saveItems();
    };
});


function createDiv() {
    const itemList = document.getElementById("itemList");
    const itemInput = document.getElementById("itemInput").value.trim();
    const quantityInput = document.getElementById("quantityInput").value.trim();

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemList.appendChild(itemDiv);

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

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
        itemList.removeChild(itemDiv);
    });
    itemDiv.appendChild(deleteButton);


    // Felder zurücksetzen
    document.getElementById("itemInput").value = "";
    document.getElementById("quantityInput").value = "";
}