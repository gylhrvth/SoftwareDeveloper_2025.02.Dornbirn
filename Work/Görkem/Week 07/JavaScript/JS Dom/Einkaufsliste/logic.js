
const shoppingList = document.querySelector(".shopping-list");

document.addEventListener('DOMContentLoaded', loadItems);

function loadItems() {
    const shoppingItems = [
        { id: 1, name: "eggs", completed: false },
        { id: 2, name: "fish", completed: true },
        { id: 3, name: "milk", completed: false },
    ];
    //console.log("Shopping", shoppingItems);

    shoppingList.innerHTML = "";

    shoppingItems.forEach(function (shoppingItem){
        const{id, name, completed} = shoppingItem;
        console.log("Verarbeitete Item:", shoppingItem);

        // checkbox
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = completed;

       
       // item name
        const div = document.createElement("div");
       div.textContent = name;
       div.classList.add("item-name");

       // delete button
       const button = document.createElement("button");
       button.innerHTML = "&times";
       button.classList.add("delete-button");

       // drag icon
       const span = document.createElement("span");
       span.innerHTML = "&equiv;";
       span.classList.add("drag-icon");
       
        const li = document.createElement("li");
        li.draggable = true;
        li.setAttribute("data-id", id);
        li.toggleAttribute("data-completed", completed);


        li.appendChild(input);
        li.appendChild(div);
        li.appendChild(button);
        li.appendChild(span);

        shoppingList.appendChild(li);
    })
    console.log("Liste erfolgreich geladen");
}