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

    const todoHeaderDiv = createTodoHeaderDiv(todo, todoMainDiv);
    const todoDetailsDiv = createTodoDetailsDiv(todo);

    todoMainDiv.appendChild(todoHeaderDiv);
    todoMainDiv.appendChild(todoDetailsDiv);

    return todoMainDiv;
}

// Create the header container for a todo
function createTodoHeaderDiv(todo, todoMainDiv) {
    const todoHeaderDiv = document.createElement('div');
    todoHeaderDiv.classList.add('todo_header');

    const leftContentHeaderDiv = createLeftContentHeaderDiv(todo, todoMainDiv);
    const actionsDiv = createActionsDiv(todo);

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

    leftContentHeaderDiv.appendChild(checkbox);
    leftContentHeaderDiv.appendChild(todoTaskDiv);

    return leftContentHeaderDiv;
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
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', () => {
        editTodo(todo.todo_ID, todo.todo_Task, todo.todo_Description, todo.todo_Status);
    });

    return editButton;
}

// Create the delete button
function createDeleteButton(todo) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';

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

    todoDetailsDiv.innerHTML = `
        <p><strong>Description:</strong> ${todo.todo_Description || 'No description provided'}</p>
        <p><strong>Status:</strong> ${todo.todo_Status}</p>
        <p><strong>Created At:</strong> ${new Date(todo.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> ${new Date(todo.updated_at).toLocaleString()}</p>
    `;

    return todoDetailsDiv;
}

// Update the status of a todo
async function updateTodoStatus(todo, newStatus, todoMainDiv) {
    try {
        const response = await fetch(`${apiUrl}/${todo.todo_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todo_Task: todo.todo_Task, todo_Description: todo.todo_Description, todo_Status: newStatus })
        });
        if (!response.ok) throw new Error('Failed to update todo status');

        todo.todo_Status = newStatus;
        const statusElement = todoMainDiv.querySelector('.todo_details p:nth-child(2)');
        statusElement.innerHTML = `<strong>Status:</strong> ${newStatus}`;
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

// Edit a todo
async function editTodo(id, todo_Task, todo_Description, todo_Status) {
    const editPopupForm = document.getElementById('editPopupForm');
    const editTodoTask = document.getElementById('editTodoTask');
    const editTodoDescription = document.getElementById('editTodoDescription');
    const editTodoStatus = document.getElementById('editTodoStatus');

    // Populate the form with the current todo values
    editTodoTask.value = todo_Task;
    editTodoDescription.value = todo_Description;
    editTodoStatus.value = todo_Status;

    // Show the popup form
    editPopupForm.classList.remove('hidden');
    editPopupForm.classList.add('visible');
    document.body.classList.add('popup-active'); // Prevent scrolling

    // Handle form submission
    const editTodoForm = document.getElementById('editTodoForm');
    editTodoForm.onsubmit = async (e) => {
        e.preventDefault();

        const updatedTask = editTodoTask.value.trim();
        const updatedDescription = editTodoDescription.value.trim();
        const updatedStatus = editTodoStatus.value;

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    todo_Task: updatedTask,
                    todo_Description: updatedDescription,
                    todo_Status: updatedStatus
                })
            });

            if (!response.ok) throw new Error('Failed to update todo');

            // Hide the popup form after submission
            editPopupForm.classList.remove('visible');
            document.body.classList.remove('popup-active');

            // Reload the todo list
            loadTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Handle cancel button
    const closeEditFormButton = document.getElementById('closeEditFormButton');
    closeEditFormButton.addEventListener('click', () => {
        editPopupForm.classList.remove('visible');
        document.body.classList.remove('popup-active');
    });
}

// Load todos and render them
async function loadTodos() {
    const todos = await fetchTodos();
    updateTodosState(todos);
    renderTodoList(todosState);
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

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todo_Task, todo_Description, todo_Status })
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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    setupPopupForm();
    loadTodos();
});