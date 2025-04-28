addEventListener("DOMContentLoaded", async function () {
    getData();
});

async function getData() {
    const result = await fetch('http://85.215.164.164:3000/items/');
    const data = await result.json();
    if (result.ok){
        console.log(data);
        createDOM(data);
    } else {
        alert("Error: " + result.status + " " + result.statusText);
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
            createDOMDetails(item);
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
    toBeDone.textContent = `Fertigstellung: ${item.dueDate}`;
    detailsDiv.appendChild(toBeDone);

    const howResposible = document.createElement('p');
    howResposible.textContent = `Verantwortlich: ${item.responsible}`;
    detailsDiv.appendChild(howResposible);

    const creator = document.createElement('p');
    creator.textContent = `Erstellt von: ${item.createdBy}`;
    detailsDiv.appendChild(creator);

    const createdAt = document.createElement('p');
    createdAt.textContent = `Erstellt am: ${item.createdAt}`;
    detailsDiv.appendChild(createdAt);

    const updatedAt = document.createElement('p');
    updatedAt.textContent = `Aktualisiert am: ${item.updatedAt}`;
    detailsDiv.appendChild(updatedAt);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('backButton');
    backButton.addEventListener('click', () => {
        getData(); // Daten neu laden
    });
    detailsDiv.appendChild(backButton);
}

function createObject() {
     loadForm()
    const newObject = {
        title: data[0],
        description: data[1],
        dueDate: data[3],
        complete: data[2],
        responsible: data[4],
        createdBy: 'Leonie'
    };
    postData(newObject);
    
}
async function postData(data) {
    const result = await fetch('http://85.215.164.164:3000/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const response = await result.json();
    if (result.ok) {
        console.log(response);
        getData();
    } else {
        alert("Error: " + result.status + " " + result.statusText);
    }
}

function loadForm() {
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

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    result = [titleInput.value, descriptionInput.value, completeInput.checked, dueDateInput.value, responsibleInput.value];
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        createObject(result);
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('backButton');
    backButton.addEventListener('click', () => {
        getData(); // Daten neu laden
    });
    form.appendChild(backButton);
    
}
