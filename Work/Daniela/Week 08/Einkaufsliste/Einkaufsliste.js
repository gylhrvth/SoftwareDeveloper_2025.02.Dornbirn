//Zugriff auf Formular + Event-Listener einfügen

const form = document.getElementById("shoppingForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();                             //verhindert, dass der Browser die Seite neu lädt (Standardverhalten bei Formularen).

    //Auslesen Inputfelder
    const productInput = document.getElementById("addProduct");
    const amountInput = document.getElementById("addAmount");
    const unitInput = document.getElementById("addUnit");

    const product = productInput.value;             //mit .value wird aktueller Input ausgelesen
    const amount = amountInput.value === "custom"
        ? document.getElementById("customNumber").value
        : amountInput.value;
    const unit = unitInput.value;

    //neues Listenelement erstellen und hinzufügen
    const list = document.getElementById("shoppingList");
    //Neues Element in DIV einfügen 
    const listItem = document.createElement("li");
    listItem.listArrangement.add("listArrangement");



    //Wrapper für den Inhalt 
    const contentDiv = document.createElement("div");
    contentDiv.listArrangement.add("listArrangement");

    const checkboxDiv = document.createElement("div");
    contentDiv.listArrangement.add("checkbox");
    

    const amountDiv = document.createElement("div");
    amountDiv.textContent = amount;

    const unitDiv = document.createElement("div");
    unitDiv.textContent = unit;

    const productDiv = document.createElement("div");
    productDiv.textContent = product;

    const deletDiv = document.createElement("div");
    deleteDiv = deletIcon;


    /*contentDiv.prepent(checkbox);
    contentDiv.appendChild(amountDiv);
    contentDiv.appendChild(unitDiv);
    contentDiv.appendChild(productDiv);
    listItem.appendChild(contentDiv); */

    //---------------------------------------------------------------------
    //div für die row
    //in dem div meherer elemente
    //div0 checkbox        
    //div1 amount
    //div2 unit
    //div3 product
    //div4 delet button

    //listItem.textContent = `${amount} ${unit} - ${product}`;
    //list.appendChild(listItem);         //Fügt neuen eintrag in Liste ein 

    //Eingabefeld zurücksetzen
    productInput.value = "";
    amountInput.value = "";
    unitInput.value = "";

    //----------------------------------------------------------

    //Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function () {
        listItem.style.textDecoration = checkbox.checked ? "line-through" : "none"; //if else kurzschreibweise

    });
    listItem.prepend(checkbox);         //Checkbox einfügen - VOR Text setzen 


    //----------------------------------------------------------------------
    //Trashbin 
    const deletIcon = document.createElement("span");
    deletIcon.textContent = "🗑️";
    deletIcon.style.cursor = "pointer";
    deletIcon.style.marginLeft = "auto";
    listItem.style.display = "flex";
    listItem.style.justifyItems = "space-around";

    deletIcon.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.appendChild(deletIcon);

});
//-----------------------------------------------------------------------------
//ClearList function

function clearList() {
    const list = document.getElementById("shoppingList");
    list.innerHTML = "";
}

//-------------------------------------------
//Drop-Down Zahlen-Funktion
function handleSelectChange() {
    const select = document.getElementById("addAmount");
    const customContainer = document.getElementById("customInputContainer");

    if (select.value === "custom") {
        customContainer.style.display = "block";
    }
    else {
        customContainer.style.display = "none;"
    }
};
//---------------------------------------------------------

