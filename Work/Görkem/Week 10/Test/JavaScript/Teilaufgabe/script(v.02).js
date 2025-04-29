
const addBtn = document.getElementById('addBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const pagination = document.getElementById('pagination');

if (!todoList || !pagination) {
    console.error("HTML-Elemente 'todoList' oder 'pagination' fehlen.");
}

// array to store tasks
const todos = ["Test 1", "Test 2"];
const itemsPerPage = 3;
let currentPage = 1;

// add tasks
addBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (task === ""){
        showErrorMessage("Please enter a task");
        return;
    }

    todos.unshift(task) // add the task to te begining of the array
    todoInput.value = "";
    currentPage = 1; // reset the first page to show the new task
    renderTodos()
    renderPagination();
});

function renderTodos(){
    todoList.innerHTML = "";

    // get the tasks for the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentTodos = todos.slice(start, end);

    // Render tasks
    currentTodos.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const taskText = document.createElement("span");
        taskText.className = "todo-text";
        taskText.textContent = task;

        const editBtn = document.createElement("button")
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            editTask(start + index, li, taskText);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => {
            deleteTask(start + index);
        });

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function renderPagination(){
    pagination.innerHTML = "";

    const totalPages = Math.ceil(todos.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++){
        const btn = document.createElement('button');
        btn.className = "pagination-btn";
        btn.textContent = i;
        btn.disabled = i === currentPage;
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTodos();
            renderPagination();
        });

        pagination.appendChild(btn);
    }
}

function editTask(index, li, taskText){
    // create an input field for editing

    const input = document.createElement("input");
    input.type = "text";
    input.value = todos[index];
    input.className = "todo-text";

    // create a save button
    const saveBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "delete";

    // replace the task text and edit button with the input and save button

    li.innerHTML = "";
    li.appendChild(input)
    li.appendChild(saveBtn)
    li.appendChild(deleteBtn)

    saveBtn.addEventListener("click", () => {
        const updatedTask = input.value.trim()
        if (updatedTask !== ""){
            todos[index] = updatedTask;
            renderTodos();
        } else {
            showErrorMessage("Task can not be empty");
        }
    });
}

function deleteTask(index){
    todos.splice(index, 1);
    if((currentPage - 1) * itemsPerPage >= todos.length){
        currentPage = Math.max(currentPage - 1, 1);
    }
    renderTodos();
    renderPagination();
}

function showErrorMessage(message){
    const errorMessage = document.querySelector(".error-message");
    errorMessage.textContent = message
    errorMessage.style.display = "block";
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
}