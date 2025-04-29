// Achtung, funktioniert nur über Safari Browser!!!

async function getTasks() {
    const url = 'http://192.168.0.53:3000/api/todo'; // Replace with your actual API URL

    try {
        const response = await fetch(url); // Fetch data from the API
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json(); // Parse the JSON response
        return tasks; // Return the fetched tasks
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return []; // Return an empty array if there's an error
    }
}

async function displayTasks() {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = '';

    const tasks = await getTasks(); // Fetch tasks dynamically

    tasks.forEach(task => {
        const itemContainer = createItemContainer(task);
        responseContainer.appendChild(itemContainer);
    });
}

function createItemContainer(task) {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('itemContainer');

    const titleContainer = createTitleContainer(task);
    itemContainer.appendChild(titleContainer);

    return itemContainer;
}

function createTitleContainer(task) {
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('titleContainer');

    const checkbox = createCheckbox(task.complete);
    const titleSpan = createTitleSpan(task.title);
    const buttonContainer = createButtonContainer(task);

    titleContainer.appendChild(checkbox);
    titleContainer.appendChild(titleSpan);
    titleContainer.appendChild(buttonContainer);

    return titleContainer;
}

function createCheckbox(isComplete) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = isComplete;
    return checkbox;
}

function createTitleSpan(title) {
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('task-title');
    titleSpan.textContent = title;
    return titleSpan;
}

function createButtonContainer(task) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const detailsButton = createButton('Details', 'details-button');
    detailsButton.addEventListener('click', () => toggleDetailsContainer(detailsButton, task));

    const deleteButton = createButton('Delete', 'delete-button');

    buttonContainer.appendChild(detailsButton);
    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
}

function createButton(text, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = text;
    return button;
}

function toggleDetailsContainer(button, task) {
    const itemContainer = button.closest('.itemContainer');
    let detailsContainer = itemContainer.querySelector('.detailsContainer');

    if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('detailsContainer');

        // Dynamically iterate through the task object and create elements for each property
        for (const [key, value] of Object.entries(task)) {
            const detailRow = document.createElement('div');
            detailRow.classList.add('detailRow');

            const keyElement = document.createElement('strong');
            keyElement.classList.add('keyClass'); // Add keyClass
            keyElement.textContent = `${capitalizeFirstLetter(key)}: `;

            const valueElement = document.createElement('span');
            valueElement.classList.add('valueClass'); // Add valueClass
            valueElement.textContent = value;

            detailRow.appendChild(keyElement);
            detailRow.appendChild(valueElement);
            detailsContainer.appendChild(detailRow);
        }

        itemContainer.appendChild(detailsContainer);
    }

    detailsContainer.classList.toggle('detailsOn');
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});