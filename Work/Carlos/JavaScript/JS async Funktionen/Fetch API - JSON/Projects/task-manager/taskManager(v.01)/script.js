const API_URL = 'http://192.168.8.145:3000/tasks'; // Replace with your API URL
//raspberry: 'http://192.168.8.190:3000/tasks'
//linux Mint: 'http://192.168.8.137:3000/tasks'
//macbook pro: 'http://192.168.8.145:3000/tasks'
//DB location on Macbook: (MacintoshHD -> Users -> carlosartiagamorales -> Programming -> crudServer -> db.json)
// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        console.log(tasks);
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Display tasks in the DOM
function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.title;

        // Add a checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTaskCompletion(task.id, checkbox.checked);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        taskItem.prepend(checkbox); // Add checkbox before the task title
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Add a new task
async function addTask(taskTitle) {
    try {
        // Fetch the current tasks to determine the next ID
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error('Error fetching tasks:', response.statusText);
            return;
        }
        const tasks = await response.json();

        // Find the highest ID and increment it
        const nextId = tasks.length > 0 ? Math.max(...tasks.map(task => parseInt(task.id))) + 1 : 1;

        // Create the new task with the next ID
        const newTask = {
            id: nextId.toString(), // Ensure the ID is a string
            title: taskTitle,
            completed: false,
        };

        // Send the new task to the server
        const addResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (addResponse.ok) {
            fetchTasks(); // Refresh the task list
        } else {
            console.error('Error adding task:', addResponse.statusText);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchTasks(); // Refresh the task list
        } else {
            console.error('Error deleting task:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}


// Toggle task completion
async function toggleTaskCompletion(taskId, completed) {
    try {
        // Fetch the task to get its title
        const response = await fetch(`${API_URL}/${taskId}`);
        if (!response.ok) {
            console.error('Error fetching task:', response.statusText);
            return;
        }
        const task = await response.json();

        // Ensure the order of properties is id, title, completed
        const updatedTask = {
            id: task.id,
            title: task.title,
            completed: completed,
        };

        // Send the updated task in the PUT request
        const updateResponse = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (!updateResponse.ok) {
            console.error('Error updating task:', updateResponse.statusText);
        } else {
            fetchTasks(); // Refresh the task list
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

// Event listener for adding a task
document.getElementById('add-task-form').addEventListener('submit', event => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskTitle = taskInput.value.trim();

    if (taskTitle) {
        addTask(taskTitle);
        taskInput.value = ''; // Clear the input field
    }
});

// Initial fetch of tasks
fetchTasks();