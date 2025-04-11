//start von projekt, code triggert sofort hidden.class
//classList.add(hidden)
document.getElementById("list-section").classList.add("hidden");            // document = greift auf die ID="list-section" zu und fügt die Klasse hidden hinzu, macht also das Eingabefeld unsichtbar.



//Wenn User Einkaufsliste erstellen klickt soll das Eingabefeld auftauchen
document.getElementById("create-list-btn").addEventListener("click", () => {                  // document = ganzes HTML-Dokument; getElementById = sucht nach HTML-Element mit der ID "create-list-btn", .addEventListener = hört auf ein Ereignis; "click" = beim Klicken; () => {} = führt diese Funktion aus
    document.getElementById("list-section").classList.remove("hidden");                // erneut: wir greifen auf das Element mit der ID "list-section" zu, .classList = Zugriff auf die CSS-Klassen des Elements; remove("hidden") = entfernt die Klasse "hidden", macht also das Element sichtbar 
        console.log("Button klickt")
});




document.getElementById("add-item-btn").addEventListener("click", () =>{        //document:Greift auf HTML-Dokument zu, getElementById("add-item-btn") Sucht nach dem HTML-Element mit der ID add-item-btn, addEventListener("click", () => { ... }): Fügt einen Event Listener hinzu, der auf das click-Ereignis hört. Wenn der Button geklickt wird, wird die Funktion innerhalb der geschweiften Klammern { ... } ausgeführt 
    const itemInput = document.getElementById("item-input");                    // Variable itemInput, document.getElementById("item-input"): Sucht nach dem HTML-Element mit der ID item-input und weist es der Konstante itemInput zu.  
    const itemText = itemInput.value.trim();                                    // Variable itemText, itemInput.value: Liest den aktuellen Inhalt des Inputfelds, trim(): Entfernt Leerzeichen vor und nach dem Inhalt
        if(itemText !== ""){                                                    // if (itemText !== ""): Prüft, ob itemText nicht leer ist. Wenn itemText nicht leer ist, wird der Code innerhalb der geschweiften Klammern { ... } ausgeführt.
            const listItem = document.createElement("li");                      // Variable listItem, document.createElement("li"): Erstellt ein neues HTML-Element vom Typ li (Listenelement) und weist es der Konstante listItem zu.
            const checkbox = document.createElement("input");                   // Variable checkbox, document.createElement("input"): Erstellt ein neues HTML-Element vom Typ input und weist es der Konstante checkbox zu.
            checkbox.type = "checkbox";                                         // Variable checkbox wird zu einer echten Chekcbox gemacht mit dem befehl .typ
            
            //Eventlistener für die Chekcbox einfügen, damit das Item in der Liste durchgestrichen wird, wenn der haken bei der chekbox gesetzt wird.
            checkbox.addEventListener("change", () => {                         // checkbox.addEventListener("change", () => { ... }): Fügt einen Event Listener hinzu, der auf das change-Ereignis der Checkbox hört. Das change-Ereignis wird ausgelöst, wenn der Zustand der Checkbox geändert wird (angeklickt oder abgehakt).
                if(checkbox.checked){                                           // if (checkbox.checked): Überprüft, ob die Checkbox angeklickt (abgehakt) ist. checkbox.checked ist ein Boolean-Wert, der true ist, wenn die Checkbox angeklickt ist, und false, wenn sie nicht angeklickt ist.
                    listItem.style.textDecoration = "line-through";             // listItem.style.textDecoration = "line-through": Setzt die CSS-Eigenschaft textDecoration des Listenelements auf line-through, wodurch der Text durchgestrichen wird.
                }else{                                                          
                    listItem.style.textDecoration = "none";                     // listItem.style.textDecoration = "none": Setzt die CSS-Eigenschaft textDecoration des Listenelements auf none, wodurch der Durchstrich entfernt wird und der Text normal angezeigt wird.
                }
            });

            
            const deleteIcon = document.createElement("span");                  // Variable deleteIcon, document.createElement("span"): Erstellt ein neues span-Element und weist es der Konstante deleteIcon zu.
            deleteIcon.textContent = "X";                                       // deleteIcon.textContent = "X": Setzt den Textinhalt des span-Elements auf "X".
            deleteIcon.classList.add("delete-icon");                            // deleteIcon.classList.add("delete-icon"): Fügt die CSS-Klasse delete-icon zum span-Element hinzu, um es zu stylen.

            //Eventlistener für das X-icon hinzufügen, damit Items in der Liste entfernt werden, wenn das X-icon geklickt wird
            deleteIcon.addEventListener("click", () => {                        //deleteIcon.addEventListener("click", () => { ... }): Fügt einen Event Listener hinzu, der auf das click-Ereignis des "X"-Icons hört. Wenn das "X"-Icon angeklickt wird, wird die Funktion innerhalb der geschweiften Klammern { ... } ausgeführt.
                listItem.remove();                                              //listItem.remove(): Entfernt das Lisenelement (listItem) 
            });

            const spacer = document.createElement("div");                       //const spacer = document.createElement("div");: Erstellt ein neues div-Element und weist es der Konstante spacer zu.
            spacer.classList.add("spacer");                                     //spacer.classList.add("spacer");: Fügt die CSS-Klasse spacer zum div-Element hinzu

            
            listItem.appendChild(checkbox);                                     // listItem.appendChild(checkbox): Fügt die Checkbox als Kind-Element zum listItem hinzu.
            listItem.appendChild(document.createTextNode(itemText));            // listItem.appendChild(document.createTextNode(itemText)): Fügt den Textknoten als Kind-Element zum listItem hinzu, document.createTextNode(itemText): Erstellt ein neues Textknoten-Element mit dem Inhalt von itemText, 
            listItem.appendChild(spacer);                                       // listItem.appendChild(spacer);: Fügt das div-Element mit der Klasse spacer als Kind-Element zum Listenelement hinzu.
            listItem.appendChild(deleteIcon);                                   // listItem.appendChild(deleteIcon): Fügt das deleteIcon als Kind-Element zum listItem hinzu, sodass es im Listenelement angezeigt wird.
            document.getElementById("shopping-list").appendChild(listItem);     // document.getElementById("shopping-list"): Sucht nach dem HTML-Element mit der ID shopping-list, appendChild(listItem): Fügt das listItem als Kind-Element zur Einkaufsliste hinzu.
            itemInput.value = "";                                               // itemInput.value = "": Setzt den Wert des Inputfelds auf einen leeren String, wodurch das Inputfeld geleert wird.
        }

});