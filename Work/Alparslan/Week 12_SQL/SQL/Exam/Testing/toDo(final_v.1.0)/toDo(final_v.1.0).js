// ===========================
// Configuration and Setup
// ===========================

// Achtung, APP funktioniert nur über Safari Browser!!!

/* Possible API URLs: 
http://192.168.0.67:3000/api/todo
http://192.168.0.67:3000/api/todo/${task.id}
http://192.168.0.53:3000/api/todo
http://192.168.0.53:3000/api/todo/${task.id} */

/* Start URL from localhost:
Start server on terminal inside API folder and write: node server.js
Stop server: Ctrl + C
Local URL: 
http://localhost:3000/api/todo
http://localhost:3000/api/todo/${task.id}*/


// ===========================
// Global Variables
// ===========================

const url = 'http://localhost:3000/api/todo'; // Replace with your actual API URL

// ===========================
// GET: Fetch and Display Tasks
// ===========================

function initializeApp() {
    document.addEventListener('DOMContentLoaded', () => {
        displayTasks(); // Initial load of tasks

        document.getElementById('refreshContent').addEventListener('click', () => {
            displayTasks(); // Refresh tasks
        });
    });
}

// Fetch tasks from the API
async function getTasks() {
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

// Display tasks in the UI
async function displayTasks() {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = '';

    const tasks = await getTasks(); // Fetch tasks dynamically

    tasks.forEach(task => {
        const itemContainer = createItemContainer(task);
        responseContainer.appendChild(itemContainer);
    });
}

// ===========================
// Task Creation
// ===========================

// Creates a new task container
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

// Create the title container for a task
function createTitleContainer(task) {
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('titleContainer');

    const checkbox = createCheckbox(task.complete, task); // Pass the task object

    // Create the task-date span
    const dateSpan = document.createElement('span');
    dateSpan.id = 'task-date';
    dateSpan.classList.add('task-date'); // Optional: Add a class for styling
    dateSpan.textContent = `${new Date().toLocaleDateString('en-GB')}: `; // Use the current date

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

    // Append elements to the titleContainer
    titleContainer.appendChild(checkbox);
    titleContainer.appendChild(dateSpan); // Add the task-date span
    titleContainer.appendChild(titleSpan);
    titleContainer.appendChild(buttonContainer);

    // Add event listener to toggle details when clicking on the titleContainer
    titleContainer.addEventListener('click', () => toggleDetailsContainer(titleContainer, task));

    return titleContainer;
}

// Create the checkbox for a task
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

// Create the title span for a task
function createTitleSpan(title) {
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('task-title');
    titleSpan.textContent = title;
    return titleSpan;
}

// Create the button container for a task
function createButtonContainer(task) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const deleteButton = createButton('Delete', 'delete-button');
    deleteButton.addEventListener('click', () => deleteTask(task, deleteButton)); // Use the deleteTask function

    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
}

// Create a button element inside the button container of a task
function createButton(text, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = text;
    return button;
}


// ===========================
// Task Details and Editing
// ===========================

// Toggle the details container for a task
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

//Helping function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Helping function to split camelCase strings into words
function splitCamelCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add a space before each uppercase letter
}


// ===========================
// POST: Create a new task
// ===========================

// Send a new task to the server when the form is submitted
async function postTask(newTask) {
    try {
        console.log('Sending task to server:', newTask); // Log the task object
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

// Show the popup form for creating a new task
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

            // Create a new task object
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

// ===========================
// DELETE: Element deletion
// ===========================

// Delete a specific task
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

// ===========================
// PATCH Functions
// ===========================

// Function to update an edited task (PATCH)
async function updateTaskDetail(task, key, newValue, valueElement) {
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

// Edit a specific task detail
async function editDetail(task, key, valueElement) {
    if (key === 'description') {
        // Use the existing popup with a textarea for description
        const newValue = await showPopupWithTextArea(`Edit ${splitCamelCase(capitalizeFirstLetter(key))}:`, valueElement.textContent);

        if (newValue !== null && newValue.trim() !== '') {
            await updateTaskDetail(task, key, newValue, valueElement);
        }
    } else {
        // Use a popup with a line input for other keys
        const newValue = await showPopupWithLineInput(`Edit ${splitCamelCase(capitalizeFirstLetter(key))}:`, valueElement.textContent);

        if (newValue !== null && newValue.trim() !== '') {
            await updateTaskDetail(task, key, newValue, valueElement);
        }
    }
}

// Helper function to show a popup with a line input
function showPopupWithLineInput(label, currentValue) {
    return new Promise((resolve) => {
        // Create the modal overlay
        const modal = document.createElement('div');
        modal.classList.add('popup-overlay'); // Add CSS class for styling

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('popup-content'); // Add CSS class for styling

        // Add the label
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.classList.add('popup-label'); // Add CSS class for styling

        // Add the line input
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('popup-input'); // Add CSS class for styling
        input.value = currentValue;

        // Add the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('popup-button-container'); // Add CSS class for styling

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('popup-button', 'popup-cancel-button'); // Add CSS classes for styling
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(null); // Resolve with null if canceled
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('popup-button', 'popup-save-button'); // Add CSS classes for styling
        saveButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(input.value); // Resolve with the input value
        });

        // Append elements
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(saveButton);
        modalContent.appendChild(labelElement);
        modalContent.appendChild(input);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    });
}


// Helper function to show a popup with a text area
function showPopupWithTextArea(label, currentValue) {
    return new Promise((resolve) => {
        // Create the modal overlay
        const modal = document.createElement('div');
        modal.classList.add('popup-overlay'); // Add CSS class for styling

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('popup-content'); // Add CSS class for styling

        // Add the label
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.classList.add('popup-label'); // Add CSS class for styling

        // Add the textarea
        const textarea = document.createElement('textarea');
        textarea.classList.add('popup-textarea'); // Add CSS class for styling
        textarea.value = currentValue;

        // Add the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('popup-button-container'); // Add CSS class for styling

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('popup-button', 'popup-cancel-button'); // Add CSS classes for styling
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(null); // Resolve with null if canceled
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('popup-button', 'popup-save-button'); // Add CSS classes for styling
        saveButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(textarea.value); // Resolve with the textarea value
        });

        // Append elements
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(saveButton);
        modalContent.appendChild(labelElement);
        modalContent.appendChild(textarea);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    });
}



// ===========================
// Dark Mode Functionality
// ===========================


function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Toggle the dark mode class
    body.classList.toggle('dark-mode');

    // Update the button text based on the current mode
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Toggle Light Mode';
        localStorage.setItem('darkMode', 'enabled'); // Save preference
    } else {
        darkModeToggle.textContent = 'Toggle Dark Mode';
        localStorage.setItem('darkMode', 'disabled'); // Save preference
    }
}

// Initialize dark mode and button text based on saved preference
function initializeDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Toggle Light Mode';
    } else {
        darkModeToggle.textContent = 'Toggle Dark Mode';
    }
}

// Add event listener to the dark mode toggle button
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
});

// Call the function to initialize the app
initializeApp();