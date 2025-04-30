

// Achtung, funktioniert nur über Safari Browser!!!
//Start server: node server.js
//Stop server: Ctrl + C
//Access server: 
// local: http://localhost:3000/api/todo
// local: http://localhost:3000/api/todo/${task.id}
// remote: http://192.168.0.53:3000/api/todo
// remote: http://192.168.0.53:3000/api/todo/${task.id}

const url = 'http://localhost:3000/api/todo'; // Replace with your actual API URL

document.addEventListener('DOMContentLoaded', () => {
    displayTasks(); // Initial load of tasks

    // Refresh tasks every 1 minute seconds
    /*setInterval(() => {
        displayTasks();
    }, 60000);*/

    // Add event listener to the "Refresh Content" button
    document.getElementById('refreshContent').addEventListener('click', () => {
        displayTasks();
    });
});

async function getTasks() {
    //const url = 'http://localhost:3000/api/todo'; // Replace with your actual API URL
    //remote -> http://192.168.0.53:3000/api/todo
    //local -> http://localhost:3000/api/todo
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

    // Add the completed class if the task is marked as complete
    if (task.complete) {
        itemContainer.classList.add('completed');
    }

    const titleContainer = createTitleContainer(task);
    itemContainer.appendChild(titleContainer);

    return itemContainer;
}

function createTitleContainer(task) {
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('titleContainer');

    const checkbox = createCheckbox(task.complete, task); // Pass the task object
    const titleSpan = createTitleSpan(task.title);
    const buttonContainer = createButtonContainer(task);

    // Stop propagation for the checkbox
    checkbox.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering the titleContainer click event
    });

    // Stop propagation for the delete button
    const deleteButton = buttonContainer.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the titleContainer click event
        });
    }

    titleContainer.appendChild(checkbox);
    titleContainer.appendChild(titleSpan);
    titleContainer.appendChild(buttonContainer);

    // Add event listener to toggle details when clicking on the titleContainer
    titleContainer.addEventListener('click', () => toggleDetailsContainer(titleContainer, task));

    return titleContainer;
}

function createCheckbox(isComplete, task) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = isComplete;

    // Add event listener to update the complete status
    checkbox.addEventListener('change', async () => {
        try {
            const updatedTask = { complete: checkbox.checked }; // Update the complete status
            const response = await fetch(`${url}/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Task ${task.id} updated successfully.`);

            // Update the UI based on the checkbox state
            const itemContainer = checkbox.closest('.itemContainer');
            if (checkbox.checked) {
                itemContainer.classList.add('completed'); // Add the completed class
            } else {
                itemContainer.classList.remove('completed'); // Remove the completed class
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update the task. Please try again.');
        }
    });

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

    const deleteButton = createButton('Delete', 'delete-button');
    deleteButton.addEventListener('click', () => deleteTask(task, deleteButton)); // Use the deleteTask function

    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
}

function createButton(text, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = text;
    return button;
}

async function toggleDetailsContainer(titleContainer, task) {
    const itemContainer = titleContainer.closest('.itemContainer');
    let detailsContainer = itemContainer.querySelector('.detailsContainer');

    if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('detailsContainer');

        try {
            // Fetch task details dynamically using the task ID
            const response = await fetch(`${url}/${task.id}`);
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

                // Format createdAt and updatedAt values
                if (key === 'createdAt' || key === 'updatedAt') {
                    valueElement.textContent = new Date(value).toLocaleString('en-GB'); // Format as Day/Month/Year Hours:Minutes:Seconds
                } else {
                    valueElement.textContent = value;
                }

                detailRow.appendChild(keyElement);
                detailRow.appendChild(valueElement);

                // Add the "Edit" button only for specific keys
                if (!['id', 'complete', 'createdAt', 'updatedAt'].includes(key)) {
                    const editButton = document.createElement('button');
                    editButton.classList.add('edit-button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => editDetail(task, key, valueElement));
                    detailRow.appendChild(editButton); // Append the Edit button to the row
                }

                detailsContainer.appendChild(detailRow);
            }

            itemContainer.appendChild(detailsContainer);
        } catch (error) {
            console.error('Error fetching task details:', error);
            alert('Failed to fetch task details. Please try again.');
        }
    }

    // Toggle the visibility of the detailsContainer
    const isVisible = detailsContainer.classList.toggle('detailsOn');
    if (isVisible) {
        itemContainer.classList.add('details-visible'); // Add class to change background color
    } else {
        itemContainer.classList.remove('details-visible'); // Remove class when hidden
    }
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
        const response = await fetch(url, {
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
            const description = document.getElementById('description').value;
            const dueDate = document.getElementById('dueDate').value;
            const responsible = document.getElementById('responsible').value;
            const createdBy = document.getElementById('createdBy').value;

            // Create a new task object with only filled fields
            const newTask = {
                id: Date.now(), // Generate a unique ID
                title,
                description: description || 'N/A', // Default to 'N/A' if empty
                complete: false,
                dueDate: dueDate || 'N/A', // Default to 'N/A' if empty
                responsible: responsible || 'N/A', // Default to 'N/A' if empty
                createdBy: createdBy || 'N/A', // Default to 'N/A' if empty
                createdAt: new Date().toLocaleString('en-GB'), // Format as Day/Month/Year Hours:Minutes:Seconds
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

// DELETE

async function deleteTask(task, deleteButton) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        try {
            const response = await fetch(`${url}/${task.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Task ${task.id} deleted successfully.`);

            // Remove the itemContainer from the DOM
            const itemContainer = deleteButton.closest('.itemContainer');
            itemContainer.remove();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete the task. Please try again.');
        }
    }
}

//PATCH

async function editDetail(task, key, valueElement) {
    const newValue = prompt(`Edit ${splitCamelCase(capitalizeFirstLetter(key))}:`, valueElement.textContent);
   
    if (newValue !== null && newValue.trim() !== '') {
        try {
            const updatedTask = { [key]: newValue }; // Dynamically update the specific key
            const response = await fetch(`${url}/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Task ${task.id} updated successfully.`);
            valueElement.textContent = newValue; // Update the value in the UI
        } catch (error) {
            console.error('Error updating task detail:', error);
            alert('Failed to update the task detail. Please try again.');
        }
    }
}

