// Achtung, funktioniert nur über Safari Browser!!!

document.addEventListener('DOMContentLoaded', () => {
    displayTasks(); // Initial load of tasks

    // Refresh tasks every 1 minute seconds
    setInterval(() => {
        displayTasks();
    }, 60000);

    // Add event listener to the "Refresh Content" button
    document.getElementById('refreshContent').addEventListener('click', () => {
        displayTasks();
    });
});

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

async function toggleDetailsContainer(button, task) {
    const itemContainer = button.closest('.itemContainer');
    let detailsContainer = itemContainer.querySelector('.detailsContainer');

    if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('detailsContainer');

        try {
            // Fetch task details dynamically using the task ID
            const response = await fetch(`http://192.168.0.53:3000/api/todo/${task.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const taskDetails = await response.json(); // Parse the JSON response

            // Dynamically iterate through the task details and create elements for each property
            for (const [key, value] of Object.entries(taskDetails)) {
                const detailRow = document.createElement('div');
                detailRow.classList.add('detailRow');
            
                const keyElement = document.createElement('strong');
                keyElement.classList.add('keyClass'); // Add keyClass
                keyElement.textContent = `${splitCamelCase(capitalizeFirstLetter(key))}: `;
            
                const valueElement = document.createElement('span');
                valueElement.classList.add('valueClass'); // Add valueClass
                valueElement.textContent = value;
            
                detailRow.appendChild(keyElement);
                detailRow.appendChild(valueElement);
                detailsContainer.appendChild(detailRow);
            }

            itemContainer.appendChild(detailsContainer);
        } catch (error) {
            console.error('Error fetching task details:', error);
            alert('Failed to fetch task details. Please try again.');
        }
    }

    detailsContainer?.classList.toggle('detailsOn');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add a space before each uppercase letter
}


// POST

async function postTask(newTask) {
    try {
        const response = await fetch('http://192.168.0.53:3000/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedTask = await response.json(); // Parse the response
        return savedTask; // Return the saved task
    } catch (error) {
        console.error('Error saving task:', error);
        alert('Failed to save the task. Please try again.');
        return null; // Return null if the request fails
    }
}

function showFormular() {
    // Show the popup form
    const popupForm = document.getElementById('popupForm');
    popupForm.classList.remove('hidden');

    // Ensure event listeners are added only once
    const cancelButton = document.getElementById('cancelButton');
    const taskForm = document.getElementById('taskForm');

    if (!cancelButton.hasAttribute('data-listener')) {
        cancelButton.addEventListener('click', () => {
            popupForm.classList.add('hidden');
        });
        cancelButton.setAttribute('data-listener', 'true'); // Mark listener as added
    }

    if (!taskForm.hasAttribute('data-listener')) {
        taskForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Get form values
            const title = document.getElementById('title').value;
            const details = document.getElementById('details').value;
            const dueDate = document.getElementById('dueDate').value;
            const responsible = document.getElementById('responsible').value;
            const createdBy = document.getElementById('createdBy').value;

            // Create a new task object with only filled fields
            const newTask = {
                id: Date.now(), // Generate a unique ID
                title,
                details: details || 'N/A', // Default to 'N/A' if empty
                complete: false,
                dueDate: dueDate || 'N/A', // Default to 'N/A' if empty
                responsible: responsible || 'N/A', // Default to 'N/A' if empty
                createdBy: createdBy || 'N/A', // Default to 'N/A' if empty
                createdAt: new Date().toLocaleDateString()
            };

            // Send the task to the server
            const savedTask = await postTask(newTask);

            if (savedTask) {
                // Add the saved task to the task list
                const responseContainer = document.getElementById('responseContainer');
                const itemContainer = createItemContainer(savedTask);
                responseContainer.appendChild(itemContainer);

                // Hide the popup form
                popupForm.classList.add('hidden');

                // Clear the form
                taskForm.reset();
            }
        });
        taskForm.setAttribute('data-listener', 'true'); // Mark listener as added
    }
}