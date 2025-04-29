document.addEventListener("DOMContentLoaded", async function () {
    getData();
});

async function getData() {
    try {
        const result = await fetch('http://192.168.0.67:3000/api/todo'); // Überprüfe die URL
        if (result.ok) {
            const data = await result.json();
            console.log(data);
            createDOM(data);
        } else {
            console.error("Server Error:", result.status, result.statusText);
            alert("Error: " + result.status + " " + result.statusText);
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Network Error: " + error.message);
    }
}

function createDOM(data) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    for (const item of data) {
        const divElement = document.createElement('div');
        divElement.classList.add('item');
        container.appendChild(divElement);
        divElement.addEventListener('click', async () => {
            const result = await fetch(`http://192.168.0.67:3000/api/todo/${item.id}`);
            if (result.ok) {
                const itemDetails = await result.json();
                console.log(itemDetails);
                createDOMDetails(itemDetails);
            } else {
                alert("Error: " + result.status + " " + result.statusText);
            }
        });
        const name = document.createElement('h2');
        name.textContent = item.title;
        divElement.appendChild(name);
    }
}

function createDOMDetails(item) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    container.appendChild(detailsDiv);

    const name = document.createElement('h2');
    name.textContent = item.title;
    detailsDiv.appendChild(name);

    const description = document.createElement('p');
    description.textContent = item.description;
    description.classList.add('description');
    detailsDiv.appendChild(description);

    const complete = document.createElement('p');
    if (item.complete === true) {
        complete.textContent = `Abgeschlossen: Ja`;
    }
    else {
        complete.textContent = `Abgeschlossen: Nein`;
    }
    detailsDiv.appendChild(complete);

    const toBeDone = document.createElement('p');
    toBeDone.textContent = "Fällig am: ";
    const dueDate = document.createElement('span');
    dueDate.textContent = item.dueDate;
    toBeDone.appendChild(dueDate);
    detailsDiv.appendChild(toBeDone);

    const howResposible = document.createElement('p');
    howResposible.textContent = "Verantwortlich: ";

    const responsible = document.createElement('span');
    responsible.textContent = item.responsible;
    howResposible.appendChild(responsible);
    detailsDiv.appendChild(howResposible);

    const creator = document.createElement('p');
    creator.textContent = "Ersteller: ";
    const creatorName = document.createElement('span');
    creatorName.textContent = item.createdBy;
    creator.appendChild(creatorName);
    detailsDiv.appendChild(creator);

    const createdAt = document.createElement('p');
    createdAt.textContent = "Erstellt am: ";
    const createdAtDate = document.createElement('span');
    createdAtDate.textContent = item.createdAt;
    createdAt.appendChild(createdAtDate);
    detailsDiv.appendChild(createdAt);

    const updatedAt = document.createElement('p');
    updatedAt.textContent = "Zuletzt aktualisiert am: ";
    const updatedAtDate = document.createElement('span');
    updatedAtDate.textContent = item.updatedAt;
    updatedAt.appendChild(updatedAtDate);
    detailsDiv.appendChild(updatedAt);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('backButton');
    backButton.addEventListener('click', () => {
        getData(); // Daten neu laden
    });
    detailsDiv.appendChild(backButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', async () => {
        deleteObject(item.id);
    });
    detailsDiv.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton');
    editButton.addEventListener('click', () => {
        loadForm('edit', item.id);
    });
    detailsDiv.appendChild(editButton);
}

function createObject() {
    const form = document.querySelector('.form');
    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector('textarea[name="description"]').value;
    const complete = form.querySelector('input[name="complete"]').checked;
    const dueDate = form.querySelector('input[name="dueDate"]').value;
    const responsible = form.querySelector('input[name="responsible"]').value;
    const newObject = {
        title: title,
        description: description,
        dueDate: dueDate,
        complete: complete,
        responsible: responsible,
        createdBy: "Leonie"
    };
    console.log(newObject);

    postData(newObject);

}
async function postData(data) {
    console.log(data);
    const result = await fetch('http://192.168.0.67:3000/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        const response = await result.json();
        console.log(response);
        getData();
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}

function loadForm(direction, id) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    const formDiv = document.createElement('div');
    formDiv.classList.add('form');
    container.appendChild(formDiv);

    const form = document.createElement('form');
    formDiv.appendChild(form);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    form.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    form.appendChild(descriptionInput);

    const completeLabel = document.createElement('label');
    completeLabel.textContent = 'Complete:';
    form.appendChild(completeLabel);

    const completeInput = document.createElement('input');
    completeInput.type = 'checkbox';
    completeInput.name = 'complete';
    form.appendChild(completeInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date:';
    form.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'text';
    dueDateInput.name = 'dueDate';
    form.appendChild(dueDateInput);

    const responsibleLabel = document.createElement('label');
    responsibleLabel.textContent = 'Responsible:';
    form.appendChild(responsibleLabel);

    const responsibleInput = document.createElement('input');
    responsibleInput.type = 'text';
    responsibleInput.name = 'responsible';
    form.appendChild(responsibleInput);

    // const submitButton = document.createElement('button');
    // submitButton.textContent = 'Submit';
    // submitButton.type = 'submit';
    // form.appendChild(submitButton);

    if (direction === 'edit') {
        createEditButton(form, id);
    }
    else {
        createCreateButton(form);
    }

    const backButtonForm = document.createElement('button');
    backButtonForm.textContent = 'Back';
    backButtonForm.classList.add('backButton');
    backButtonForm.addEventListener('click', () => {
        getData(); // Daten neu laden
    });
    form.appendChild(backButtonForm);

}

function createEditButton(form, id) {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Edit';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        editObject(id);
    });
}

function createCreateButton(form) {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createObject();
    });
}


async function deleteObject(id) {
    console.log("Deleting object with ID:", id);
    const result = await fetch(`http://192.168.0.67:3000/api/todo/${id}`, {
        method: 'DELETE'
    });
    if (result.ok) {
        const response = await result.json();
        console.log(response);
        getData();
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}


async function editObject(id) {
    const form = document.querySelector('.form');
    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector('textarea[name="description"]').value;
    const complete = form.querySelector('input[name="complete"]').checked;
    const dueDate = form.querySelector('input[name="dueDate"]').value;
    const responsible = form.querySelector('input[name="responsible"]').value;
    const updatedObject = {
        title: title,
        description: description,
        dueDate: dueDate,
        complete: complete,
        responsible: responsible,
        createdBy: "Leonie"
    };
    console.log(updatedObject);

    putData(id, updatedObject);
}
async function putData(id, data) {
    console.log(data);
    const result = await fetch(`http://192.168.0.67:3000/api/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        const response = await result.json();
        console.log(response);
        getData();
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}