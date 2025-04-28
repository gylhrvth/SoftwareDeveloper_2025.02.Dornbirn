addEventListener('DOMContentLoaded', () => {
    getData()
})


async function getData() {
    const result = await fetch('http://85.215.164.164:3000/items/')
    const data = await result.json()
    if (result.ok) {
        createDOM(data)
    } else {
        alert("Error: " + result.status + " " + result.statusText);
        return null
    }
}

function createDOM(data) {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');

        const aLink = document.createElement('a');
        aLink.href = `./details.html?id=${item.id}`;
        aLink.textContent = item.name;

        // Event Listener für den Link
        aLink.addEventListener('click', (event) => {
            event.preventDefault(); // Verhindert das Standardverhalten des Links
            showDetails(item.id); // Hier kannst du die Funktion aufrufen, um die Details anzuzeigen

            // Hier kannst du weitere Aktionen ausführen
        });
        container.appendChild(div);
        div.appendChild(aLink);

    });
}

function addNewItem() {
    // Container leeren um neue Sachen zuladen
    const container = document.querySelector('.container');
    container.innerHTML = '';
    // Container für die neuen Daten erstellen
    const newItemContainer = document.createElement('div');
    newItemContainer.classList.add('formContainer');
    container.appendChild(newItemContainer);
    // Formular erstellen
    const form = document.createElement('form');
    form.classList.add('form');
    newItemContainer.appendChild(form);
    // Formularfelder erstellen
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.id = 'name';
    nameField.placeholder = 'Name';
    nameField.required = true;
    form.appendChild(nameField);

    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.id = 'description';
    descriptionField.placeholder = 'Description';
    descriptionField.required = true;
    form.appendChild(descriptionField);

    const priceField = document.createElement('input');
    priceField.type = 'text';
    priceField.id = 'price';
    priceField.placeholder = 'Price';
    priceField.required = true;
    form.appendChild(priceField);

    const amountField = document.createElement('input');
    amountField.type = 'number';
    amountField.id = 'amount';
    amountField.placeholder = 'Amount';
    amountField.required = true;
    form.appendChild(amountField);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'addButton';
    submitButton.textContent = 'Add Item';
    // Event Listener für den Submit Button
    submitButton.addEventListener('submit', async (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        await submitForm();
    });

    form.appendChild(submitButton);
}
async function submitForm() {
    // Hier die Daten aus dem Formular holen
    // und an die API senden

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const amount = document.getElementById('amount').value;
    const data = {
        name: name,
        description: description,
        price: price,
        amount: amount
    };
    const result = await fetch('http://85.215.164.164:3000/items/', { // Korrigierte IP-Adresse
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        getData(); // Daten neu laden
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}

async function showDetails(id) {
    const result = await fetch(`http://85.215.164.164:3000/items/${id}`);
    const data = await result.json();
    if (result.ok) {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        container.appendChild(detailsDiv);

        const name = document.createElement('h2');
        name.textContent = data.name;
        detailsDiv.appendChild(name);

        const description = document.createElement('p');
        description.textContent = data.description;
        detailsDiv.appendChild(description);

        const price = document.createElement('p');
        price.textContent = `Price: ${data.price}`;
        detailsDiv.appendChild(price);

        const amount = document.createElement('p');
        amount.textContent = `Amount: ${data.amount}`;
        detailsDiv.appendChild(amount);

        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            getData(); // Daten neu laden
        });
        detailsDiv.appendChild(backButton);

        const addButton = document.createElement('button');
        addButton.textContent = 'Bearbeiten';
        addButton.addEventListener('click', () => {
            changeItem(id); // Neue Item hinzufügen
        });
        detailsDiv.appendChild(addButton);
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }

}

async function changeItem(id) {
    // Container leeren um neue Sachen zuladen
    const container = document.querySelector('.container');
    container.innerHTML = '';
    // Container für die neuen Daten erstellen
    const newItemContainer = document.createElement('div');
    newItemContainer.classList.add('formContainer');
    container.appendChild(newItemContainer);
    // Formular erstellen
    const form = document.createElement('form');
    form.classList.add('form');
    newItemContainer.appendChild(form);
    // Formularfelder erstellen
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.id = 'name';
    nameField.placeholder = 'Name';
    nameField.required = true;
    form.appendChild(nameField);

    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.id = 'description';
    descriptionField.placeholder = 'Description';
    descriptionField.required = true;
    form.appendChild(descriptionField);

    const priceField = document.createElement('input');
    priceField.type = 'text';
    priceField.id = 'price';
    priceField.placeholder = 'Price';
    priceField.required = true;
    form.appendChild(priceField);

    const amountField = document.createElement('input');
    amountField.type = 'number';
    amountField.id = 'amount';
    amountField.placeholder = 'Amount';
    amountField.required = true;
    form.appendChild(amountField);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'addButton';
    submitButton.textContent = 'Change Item';
    // Event Listener für den Submit Button
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        await changeForm(id); // Hier die ID des Items übergeben
    });
    form.appendChild(submitButton);
}

async function changeForm(id) {
    // Hier die Daten aus dem Formular holen
    // und an die API senden
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const amount = document.getElementById('amount').value;
    const data = {
        name: name,
        description: description,
        price: price,
        amount: amount
    };
    const result = await fetch(`http://85.215.164.164:3000/items/${id}`, { // Korrigierte IP-Adresse
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        showDetails(id); // Details des geänderten Items anzeigen
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}


document.getElementById('addButton').addEventListener('click', addNewItem);