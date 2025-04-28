

//DB Structure:

let tasks = [
    {
        id: 1,
        title: "Buy Chocolate", // Read-Only
        details: "Milka or Lindt", // optional
        complete: false,
        dueDate: "03/05/2025", // optional
        responsible: "Carlos", // optional
        createdBy: "Carlos", 
        createdAt: "28/04/2025", // read-only, optional
        updatedAt: "28/04/2025" // read-only, optional
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
    },
    {
        id: 5,
        title: "Call the Electrician",
        details: "Fix the kitchen light",
        complete: false,
        dueDate: "30/04/2025",
        responsible: "Carlos",
        createdBy: "Carlos",
        createdAt: "28/04/2025",
        updatedAt: "28/04/2025"
    },
    {
        id: 6,
        title: "Plan Weekend Trip",
        details: "Destination: Lake Constance",
        complete: false,
        dueDate: "02/05/2025",
        responsible: "Julia",
        createdBy: "Carlos",
        createdAt: "28/04/2025",
        updatedAt: "28/04/2025"
    },
    {
        id: 7,
        title: "Submit Expense Report",
        details: "Include receipts for April",
        complete: false,
        dueDate: "01/05/2025",
        responsible: "Julia",
        createdBy: "Carlos",
        createdAt: "28/04/2025",
        updatedAt: "28/04/2025"
    },
    {
        id: 8,
        title: "Clean the Garage",
        details: "Organize tools and boxes",
        complete: false,
        dueDate: "04/05/2025",
        responsible: "Carlos",
        createdBy: "Carlos",
        createdAt: "28/04/2025",
        updatedAt: "28/04/2025"
    }
];


function displayTasks() {
    const taskList = document.getElementById('task-list'); // Target the <ul> element with id="task-list"
    taskList.innerHTML = ''; // Clear any existing tasks in the list

    tasks.forEach(task => {
        
        // Create the listedMain div
        const listedMain = document.createElement('div');
        listedMain.classList.add('listedMain');

        // Create the <li> element
        const taskItem = document.createElement('li');

        // Add the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.complete; // Mark as checked if the task is complete

        // Add the title as a <span>
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('task-title');
        titleSpan.textContent = task.title;

        // Append the checkbox and title to the listedMain div
        listedMain.appendChild(checkbox);
        listedMain.appendChild(titleSpan);

        // Create the buttonContainer div
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');

        // Add the Details button
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('details-button');
        detailsButton.textContent = 'Details';

        // Add the Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';

        // Append buttons to the buttonContainer
        buttonContainer.appendChild(detailsButton);
        buttonContainer.appendChild(deleteButton);

        // Append listedMain and buttonContainer to the <li>
        taskItem.appendChild(listedMain);
        taskItem.appendChild(buttonContainer);

        // Append the <li> to the task list
        taskList.appendChild(taskItem);
    });
}

// Call the function to display tasks when the page loads
displayTasks();