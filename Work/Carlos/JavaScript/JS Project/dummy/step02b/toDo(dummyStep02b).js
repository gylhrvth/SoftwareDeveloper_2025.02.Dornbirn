



//DB Structure:

// Function to manage tasks
function getTasks() {
    return [
        {
            id: 1,
            title: "Buy Chocolate",
            details: "Milka or Lindt",
            complete: false,
            dueDate: "03/05/2025",
            responsible: "Carlos",
            createdBy: "Carlos",
            createdAt: "28/04/2025",
            updatedAt: "28/04/2025"
        },
        {
            id: 2,
            title: "Walk the Dog",
            details: "Take Max to the park",
            complete: true,
            dueDate: "28/04/2025",
            responsible: "Carlos",
            createdBy: "Carlos",
            createdAt: "27/04/2025",
            updatedAt: "28/04/2025"
        },
        {
            id: 3,
            title: "Water the Plants",
            details: "Focus on the indoor plants",
            complete: false,
            dueDate: "29/04/2025",
            responsible: "Maria",
            createdBy: "Carlos",
            createdAt: "28/04/2025",
            updatedAt: "28/04/2025"
        },
        {
            id: 4,
            title: "Prepare Presentation",
            details: "Topic: JavaScript Best Practices",
            complete: false,
            dueDate: "05/05/2025",
            responsible: "Carlos",
            createdBy: "Carlos",
            createdAt: "28/04/2025",
            updatedAt: "28/04/2025"
        }
    ];
}

// Function to display tasks in the task list

function displayTasks() {
    const taskList = document.getElementById('task-list'); // Target the <ul> element with id="task-list"
    if (!taskList) {
        console.error('Task list element not found in the DOM.');
        return;
    }
    taskList.innerHTML = ''; // Clear any existing tasks in the list

    const tasks = getTasks(); // Retrieve the tasks array

    tasks.forEach(task => {
        const taskItem = createTaskItem(task); // Create the <li> element for the task
        taskList.appendChild(taskItem); // Append the <li> to the task list
    });
}

// Function to create a task item (<li>)
function createTaskItem(task) {
    const taskItem = document.createElement('li');

    const listedMain = createListedMain(task); // Create the listedMain div
    const buttonContainer = createButtonContainer(); // Create the buttonContainer div

    taskItem.appendChild(listedMain); // Append listedMain to the <li>
    taskItem.appendChild(buttonContainer); // Append buttonContainer to the <li>

    return taskItem;
}

// Function to create the listedMain div
function createListedMain(task) {
    const listedMain = document.createElement('div');
    listedMain.classList.add('listedMain');

    const checkbox = createCheckbox(task.complete); // Create the checkbox
    const titleSpan = createTitleSpan(task.title); // Create the title <span>

    listedMain.appendChild(checkbox); // Append the checkbox to listedMain
    listedMain.appendChild(titleSpan); // Append the title to listedMain

    return listedMain;
}

// Function to create a checkbox
function createCheckbox(isComplete) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = isComplete; // Mark as checked if the task is complete
    return checkbox;
}

// Function to create the title <span>
function createTitleSpan(title) {
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('task-title');
    titleSpan.textContent = title;
    return titleSpan;
}

// Function to create the buttonContainer div
function createButtonContainer() {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const detailsButton = createButton('Details', 'details-button'); // Create the Details button
    const deleteButton = createButton('Delete', 'delete-button'); // Create the Delete button

    buttonContainer.appendChild(detailsButton); // Append Details button to buttonContainer
    buttonContainer.appendChild(deleteButton); // Append Delete button to buttonContainer

    return buttonContainer;
}

// Function to create a button
function createButton(text, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = text;
    return button;
}

// Call the function to display tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});