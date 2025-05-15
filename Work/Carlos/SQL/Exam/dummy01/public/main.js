const apiUrl = '/api/todo';

let todosState = []; // Array to track the visibility state of todos

// Fetch all todos from the API
async function fetchTodos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch todos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
}

// Update the visibility state of todos
function updateTodosState(todos) {
    todos.forEach(todo => {
        const existingTodo = todosState.find(t => t.todo_ID === todo.todo_ID);
        todo.detailsVisible = existingTodo ? existingTodo.detailsVisible : false;
    });
    todosState = todos;
}

// Render the list of todos
function renderTodoList(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the list before rendering

    todos.forEach(todo => {
        const todoMainDiv = createTodoMainDiv(todo);
        todoList.appendChild(todoMainDiv);
    });
}

// Create the main container for a todo
function createTodoMainDiv(todo) {
    const todoMainDiv = document.createElement('div');
    todoMainDiv.classList.add('todo_main');

    // Apply styles based on the status
    if (todo.todo_Status === 'Completed') {
        todoMainDiv.classList.add('completed');
    }

    // Create the header and details divs
    const todoHeaderDiv = createTodoHeaderDiv(todo, todoMainDiv);
    const todoDetailsDiv = createTodoDetailsDiv(todo);

    // Apply line-through to the task if status is "Completed"
    const todoTaskDiv = todoHeaderDiv.querySelector('.todo_task');
    if (todo.todo_Status === 'Completed') {
        todoTaskDiv.classList.add('line-through');
    }

    // Append the header and details divs to the main div
    todoMainDiv.appendChild(todoHeaderDiv);
    todoMainDiv.appendChild(todoDetailsDiv);

    return todoMainDiv;
}

// Create the header container for a todo
function createTodoHeaderDiv(todo, todoMainDiv) {
    const todoHeaderDiv = document.createElement('div');
    const leftContentHeaderDiv = createLeftContentHeaderDiv(todo, todoMainDiv);
    const actionsDiv = createActionsDiv(todo);
    todoHeaderDiv.classList.add('todo_header');

    todoHeaderDiv.appendChild(leftContentHeaderDiv);
    todoHeaderDiv.appendChild(actionsDiv);

    return todoHeaderDiv;
}

// Create the left content header container
function createLeftContentHeaderDiv(todo, todoMainDiv) {
    const leftContentHeaderDiv = document.createElement('div');
    leftContentHeaderDiv.classList.add('left_content_header');

    const checkbox = createCheckbox(todo, todoMainDiv);
    const todoTaskDiv = createTodoTaskDiv(todo, todoMainDiv);

    addPriorityEmoji(todoTaskDiv, todo); // Call the function to add the emoji

    leftContentHeaderDiv.appendChild(checkbox);
    leftContentHeaderDiv.appendChild(todoTaskDiv);

    return leftContentHeaderDiv;
}

function addPriorityEmoji(todoTaskDiv, todo) {
    if (todo.todo_Priority === 'High') {
        const priorityEmoji = document.createElement('span');
        priorityEmoji.textContent = ' ‼️';
        todoTaskDiv.appendChild(priorityEmoji);
    }
}

// Create the checkbox for a todo
function createCheckbox(todo, todoMainDiv) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo_checkbox');
    checkbox.checked = todo.todo_Status === 'Completed';

    checkbox.addEventListener('click', async (e) => {
        e.stopPropagation();
        const newStatus = checkbox.checked ? 'Completed' : 'Pending';
        await updateTodoStatus(todo, newStatus, todoMainDiv);
    });

    return checkbox;
}

// Create the task div for a todo
function createTodoTaskDiv(todo, todoMainDiv) {
    const todoTaskDiv = document.createElement('div');
    todoTaskDiv.classList.add('todo_task');
    todoTaskDiv.textContent = todo.todo_Task;

    todoTaskDiv.addEventListener('click', () => {
        todo.detailsVisible = !todo.detailsVisible;
        const todoDetailsDiv = todoMainDiv.querySelector('.todo_details');
        todoDetailsDiv.classList.toggle('visible');
    });

    return todoTaskDiv;
}

// Create the actions container for a todo
function createActionsDiv(todo) {
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('todo_actions');

    const editButton = createEditButton(todo);
    const deleteButton = createDeleteButton(todo);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    return actionsDiv;
}

// Create the edit button
function createEditButton(todo) {
    const editButton = document.createElement('button');
    editButton.classList.add('edit');

    // Add the edit icon
    const editIcon = document.createElement('img');
    editIcon.src = 'assets/icons/edit.svg';
    editIcon.alt = 'Edit';
    editIcon.classList.add('icon'); // Optional: Add a class for styling

    editButton.appendChild(editIcon);

    // Attach the event listener to call editTodo
    editButton.addEventListener('click', () => {
        editTodo(todo.todo_ID, todo.todo_Task, todo.todo_Description, todo.todo_Status, todo.todo_Priority);
    });

    return editButton;
}

function createDeleteButton(todo) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');

    // Add the delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'assets/icons/delete.svg';
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('icon'); // Optional: Add a class for styling

    deleteButton.appendChild(deleteIcon);

    // Attach the event listener to call deleteTodo
    deleteButton.addEventListener('click', async () => {
        await deleteTodo(todo.todo_ID);
    });

    return deleteButton;
}

// Create the details container for a todo
function createTodoDetailsDiv(todo) {
    const todoDetailsDiv = document.createElement('div');
    todoDetailsDiv.classList.add('todo_details');
    if (todo.detailsVisible) {
        todoDetailsDiv.classList.add('visible');
    }

        // Format the dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    
    // Determine the priority class based on the value
    const priorityClass = todo.todo_Priority === 'High' ? 'priority-high' : '';
     // Determine the status class based on the value
    const statusClass = todo.todo_Status === 'Completed' ? 'status-complete' : '';

    todoDetailsDiv.innerHTML = `
        <p><strong>Description:</strong> ${todo.todo_Description || 'No description provided'}</p>
        <p><strong>Status:</strong> <span class="${statusClass}">${todo.todo_Status}</span></p>
        <p><strong>Priority:</strong> <span class="${priorityClass}">${todo.todo_Priority || 'Normal'}</span></p>
        <p><strong>Created At:</strong> ${formatDate(todo.created_at)}</p>
        <p><strong>Updated At:</strong> ${formatDate(todo.updated_at)}</p>
    `;

    return todoDetailsDiv;
}

async function updateTodoStatus(todo, newStatus, todoMainDiv) {
    try {
        const response = await fetch(`${apiUrl}/${todo.todo_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                todo_Task: todo.todo_Task, 
                todo_Description: todo.todo_Description, 
                todo_Status: newStatus, 
                todo_Priority: todo.todo_Priority
            })
        });

        if (!response.ok) throw new Error('Failed to update todo status');

        // Update the status in the DOM
        todo.todo_Status = newStatus;
        const statusElement = todoMainDiv.querySelector('.todo_details p:nth-child(2) span');

        // Update the status text and class
        statusElement.textContent = newStatus;
        if (newStatus === 'Completed') {
            statusElement.classList.add('status-complete');
            todoMainDiv.classList.add('completed');
            const todoTaskDiv = todoMainDiv.querySelector('.todo_task');
            todoTaskDiv.classList.add('line-through');
        } else {
            statusElement.classList.remove('status-complete');
            todoMainDiv.classList.remove('completed');
            const todoTaskDiv = todoMainDiv.querySelector('.todo_task');
            todoTaskDiv.classList.remove('line-through');
        }
    } catch (error) {
        console.error('Error updating todo status:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete todo');
        loadTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Add event listener to delete all completed todos
function setupDeleteCompletedTodosButton() {
    const deleteCompletedTodosButton = document.getElementById('deleteCompletedTodosButton');

    deleteCompletedTodosButton.addEventListener('click', async () => {
        try {
            // Filter todos with status 'Completed'
            const completedTodos = todosState.filter(todo => todo.todo_Status === 'Completed');

            // Delete each completed todo
            for (const todo of completedTodos) {
                const response = await fetch(`${apiUrl}/${todo.todo_ID}`, { method: 'DELETE' });
                if (!response.ok) throw new Error(`Failed to delete todo with ID ${todo.todo_ID}`);
            }

            // Reload the todo list after deletion
            loadTodos();
        } catch (error) {
            console.error('Error deleting completed todos:', error);
        }
    });
}

// Edit a todo functions

// Show the edit popup form
function showEditPopupForm() {
    const editPopupForm = document.getElementById('editPopupForm');
    editPopupForm.classList.remove('hidden');
    editPopupForm.classList.add('visible');
    document.body.classList.add('popup-active'); // Prevent scrolling
}

// Hide the edit popup form
function hideEditPopupForm() {
    const editPopupForm = document.getElementById('editPopupForm');
    editPopupForm.classList.remove('visible');
    document.body.classList.remove('popup-active'); // Restore scrolling
}

// Populate the edit popup form with the current todo values
function populateEditPopupForm(todo_Task, todo_Description, todo_Status, todo_Priority) {
    const editTodoTask = document.getElementById('editTodoTask');
    const editTodoDescription = document.getElementById('editTodoDescription');
    const editTodoStatus = document.getElementById('editTodoStatus');
    const editTodoPriority = document.getElementById('editTodoPriority');

    editTodoTask.value = todo_Task;
    editTodoDescription.value = todo_Description || ''; // Default to empty if no description
    editTodoStatus.value = todo_Status || 'Pending'; // Default to 'Pending' if no status is set
    editTodoPriority.value = todo_Priority || 'Normal'; // Default to 'Normal' if no priority is set
}

// Handle the form submission for editing a todo
function handleEditFormSubmission(id) {
    const editTodoForm = document.getElementById('editTodoForm');
    const editTodoTask = document.getElementById('editTodoTask');
    const editTodoDescription = document.getElementById('editTodoDescription');
    const editTodoStatus = document.getElementById('editTodoStatus');
    const editTodoPriority = document.getElementById('editTodoPriority');

    editTodoForm.onsubmit = async (e) => {
        e.preventDefault();

        const updatedTask = editTodoTask.value.trim();
        const updatedDescription = editTodoDescription.value.trim();
        const updatedStatus = editTodoStatus.value;
        const updatedPriority = editTodoPriority.value;

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    todo_Task: updatedTask,
                    todo_Description: updatedDescription,
                    todo_Status: updatedStatus,
                    todo_Priority: updatedPriority
                })
            });

            if (!response.ok) throw new Error('Failed to update todo');

            // Hide the popup form after submission
            hideEditPopupForm();

            // Reload the todo list
            loadTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
}

// Attach the cancel button functionality
function setupCancelEditButton() {
    const closeEditFormButton = document.getElementById('closeEditFormButton');
    closeEditFormButton.addEventListener('click', () => {
        hideEditPopupForm();
    });
}

// Main function to edit a todo
function editTodo(id, todo_Task, todo_Description, todo_Status, todo_Priority) {
    populateEditPopupForm(todo_Task, todo_Description, todo_Status, todo_Priority); // Populate the form
    showEditPopupForm(); // Show the popup
    handleEditFormSubmission(id); // Handle form submission
    setupCancelEditButton(); // Set up the cancel button
}

// Set up the popup form behavior
function setupPopupForm() {
    const addTodoButton = document.getElementById('addTodoButton');
    const popupForm = document.getElementById('popupForm');
    const closeFormButton = document.getElementById('closeFormButton');
    const todoForm = document.getElementById('todoForm');

    addTodoButton.addEventListener('click', () => {
        popupForm.classList.add('visible');
        document.body.classList.add('popup-active');
    });

    closeFormButton.addEventListener('click', () => {
        popupForm.classList.remove('visible');
        document.body.classList.remove('popup-active');
    });

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const todo_Task = document.getElementById('todoTask').value;
        const todo_Description = document.getElementById('todoDescription').value;
        const todo_Status = document.getElementById('todoStatus').value;
        const todo_Priority = document.getElementById('todoPriority').value;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todo_Task, todo_Description, todo_Status, todo_Priority })
            });
            if (!response.ok) throw new Error('Failed to add todo');
            popupForm.classList.remove('visible');
            document.body.classList.remove('popup-active');
            loadTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });
}

// Load todos and render them
async function loadTodos() {
    const todos = await fetchTodos();
    updateTodosState(todos);
    renderTodoList(todosState);
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    saveDarkModePreference();
}

// Function to save the user's dark mode preference in localStorage
function saveDarkModePreference() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Function to apply the saved dark mode preference on page load
function applySavedDarkModePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode toggle button
function setupDarkModeToggle() {
    const toggleDarkModeButton = document.getElementById('toggleDarkModeButton');
    toggleDarkModeButton.addEventListener('click', toggleDarkMode);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    applySavedDarkModePreference();
    setupDarkModeToggle();
    setupPopupForm();
    setupDeleteCompletedTodosButton(); // Set up the delete completed todos button
    loadTodos();
});