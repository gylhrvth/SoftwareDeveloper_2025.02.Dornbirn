
const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearButtons = document.querySelectorAll("[data-clear]");



document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    handleDragDrop();

    shoppingForm.addEventListener("submit", handleFormSubmit);

    filterButtons.forEach(function (button){
        button.addEventListener("click", handleFilterSelection);
    });
    
    clearButtons.forEach(function (button){
        button.addEventListener("click", handleClearItem);
    });
});

// Funktion, um die Artikel zu laden
function loadItems() {
    const shoppingItems = [
        { id: 1, name: "eggs", completed: false },
        { id: 2, name: "fish", completed: true },
        { id: 3, name: "milk", completed: false },
    ];

    // Liste leeren
    shoppingList.innerHTML = "";

    // Für jeden Artikel ein Listenelement erstellen und hinzufügen
    shoppingItems.forEach(function (shoppingItem) {
        const li = createListItem(shoppingItem); // Nutze die Funktion createListItem
        shoppingList.appendChild(li); // Füge das Listenelement zur Liste hinzu
    });

    console.log("Liste erfolgreich geladen");
}

// Funktion, um ein einzelnes Listenelement zu erstellen
function createListItem(shoppingItem) {
    const { id, name, completed } = shoppingItem;

    // Checkbox erstellen
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = completed;
    input.addEventListener("change", toggleCompleted);

    // Item-Name erstellen
    const div = document.createElement("div");
    div.textContent = name;
    div.classList.add("item-name");
    div.addEventListener('click', openEditMode)
    div.addEventListener("blur", closeEditMode);
    div.addEventListener("keydown", handleEnterKey);

    // Delete-Button erstellen
    const button = document.createElement("button");
    button.innerHTML = "&times";
    button.classList.add("delete-button");
    button.addEventListener('click', removeItem);

    // Drag-Icon erstellen
    const span = document.createElement("span");
    span.innerHTML = "&equiv;";
    span.classList.add("drag-icon");

    // Listenelement erstellen
    const li = document.createElement("li");
    li.draggable = true;
    li.toggleAttribute("data-id", id);
    li.toggleAttribute("data-completed", completed);

    // Füge alle Elemente zum Listenelement hinzu
    li.appendChild(input);
    li.appendChild(div);
    li.appendChild(button);
    li.appendChild(span);

    return li;
}

function removeItem(e){
    const listItem = e.target.parentNode;

    shoppingList.removeChild(listItem);
}

function addItem(itemName){
    const newListItem = createListItem({
        id: generateUniqueId(),
        name: itemName,
        completed: false,
    });

    shoppingList.prepend(newListItem);

    updateFilteredItems();
}

function filterItems(filter){
    const listItems = shoppingList.querySelectorAll("li");

    listItems.forEach(function(listItem){
        const completed = listItem.hasAttribute("data-completed");

        if(filter === "completed"){
            listItem.style.display = completed ? "flex" : "none";
        } else if (filter === "incomplete"){
            listItem.style.display = completed ? "none" : "flex";
        } else {
            listItem.style.display = "flex";
        }
    });
}

function toggleCompleted(e){
    const listItem = e.target.parentNode;
    console.log(listItem);

    const isChecked = e.target.checked;
    listItem.toggleAttribute('data-completed', this.checked);

    const activeFilter = document.querySelector("[data-filter].active").getAttribute("data-filter");
    filterItems(activeFilter);
}

function openEditMode(e){
    const itemName = e.target;
    const listItem = itemName.parentNode;
    console.log(itemName);
    
    // disable editing for completet items
    if(
        listItem.hasAttribute("data-completed") === false && itemName.
        isContentEditable === false
    ){
        itemName.contentEditable = true;
        listItem.draggable = false;
    // auto focus and move the cursor at the end of line
        let selection = window.getSelection();
        selection.selectAllChildren(itemName);
        selection.collapseToEnd();
    }
}

function closeEditMode(e){
    const itemName = e.target;
    const listItem = itemName.parentNode;

    itemName.contentEditable = false;
        listItem.draggable = true;
}

function handleEnterKey(e){
    if(e.key === "Enter"){
        e.preventDefault();
        closeEditMode(e);
    }
}

function handleFormSubmit(e){
    e.preventDefault();

    const itemName = document.getElementById("item").value;
    if (itemName.trim().length === 0){
        //console.log("Please enter a valid item name!");
        return;
    }
    //console.log(itemName);

    addItem(itemName);
    this.reset();
}

function handleDragDrop() {
    let dragItem = null;

    // Event: Drag starten
    shoppingList.addEventListener("dragstart", function (e) {
        dragItem = e.target.closest("li");
    });

    // Event: Drag über ein anderes Element
    shoppingList.addEventListener("dragover", function (e) {
        const targetItem = e.target.closest("li");

        if(targetItem && targetItem !== dragItem){
            const targetIndex = [...shoppingList.children].indexOf(targetItem);
            const dragIndex = [...shoppingList.children].indexOf(dragItem);

            const item =
                targetIndex > dragIndex ? targetItem.nextSibling : targetItem;
                
            if (item){
                shoppingList.insertBefore(dragItem, item);
            } else {
                shoppingList.appendChild(dragItem); 
            }
                
        }
    });
}

function handleFilterSelection(e){
    const filter = e.target;
    console.log(filter);

    filterButtons.forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");

    filterItems(filter.getAttribute("data-filter"));

    

    /*
    const filter = e.target.getAttribute("data-filter");
    console.log(`Filter ausgewählt: ${filter}`); 

    filterButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");

    filterItems(filter);
    */
}

function handleClearItem(e){
    const clearButton = e.target;

    if("all" === clearButton.getAttribute("data-clear")){
        shoppingList.innerHTML = "";
    } else {
        shoppingList
        .querySelectorAll("li[data-completed]")
        .forEach((listItem) => listItem.remove());
    }
}

function updateFilteredItems(){
    const activeFilter = document.querySelector(".active[data-filter]");

    filterItems(activeFilter.getAttribute("data-filter"));
}

function generateUniqueId(){
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}


