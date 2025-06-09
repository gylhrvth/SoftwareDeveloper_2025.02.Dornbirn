// Show the Add Task popup form when the add button is clicked
function initAddTaskPopup() {
  const addBtn = document.getElementById('addTodoButton');
  const popupForm = document.getElementById('popupForm');
  if (addBtn && popupForm) {
    addBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const lang = document.getElementById('langSelect')?.value || 'en';
      const res = await fetch(`/add-form?lang=${lang}`);
      const html = await res.text();
      popupForm.innerHTML = html;
      popupForm.classList.add('visible');
      const closeBtn = popupForm.querySelector('#closeFormButton');
      if (closeBtn) closeBtn.onclick = () => popupForm.classList.remove('visible');
    });
  }
}

// Show the Edit Task popup form when an edit button is clicked
function initEditTaskPopup() {
  document.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      const form = btn.closest('form');
      if (!form) return;
      const action = form.getAttribute('action');
      const id = action.split('/').pop();
      const lang = document.getElementById('langSelect')?.value || 'en';
      const res = await fetch(`/tasks/edit-form/${id}?lang=${lang}`);
      const html = await res.text();
      const editPopup = document.getElementById('editPopupForm');
      editPopup.innerHTML = html;
      editPopup.classList.add('visible');
      const closeBtn = editPopup.querySelector('#closeEditFormButton');
      if (closeBtn) closeBtn.onclick = () => editPopup.classList.remove('visible');
    });
  });
}

// Toggle the details section when the task name is clicked
function initDetailsToggle() {
  document.querySelectorAll('.todo_main').forEach(taskDiv => {
    const todoTask = taskDiv.querySelector('.todo_task');
    const details = taskDiv.querySelector('.todo_details');
    if (todoTask && details) {
      todoTask.addEventListener('click', () => {
        details.classList.toggle('visible');
      });
    }
  });
}

// Update the task's visual style (completed/line-through) based on status
function updateTaskStyles(todoMain, status) {
  if (todoMain) {
    if (status === 'Completed') {
      todoMain.classList.add('completed');
    } else {
      todoMain.classList.remove('completed');
    }
    const todoTask = todoMain.querySelector('.todo_task');
    if (todoTask) {
      if (status === 'Completed') {
        todoTask.classList.add('line-through');
      } else {
        todoTask.classList.remove('line-through');
      }
    }
  }
}

// Update the status text and style in the details section
function updateTaskDetails(todoMain, statusText) {
  const details = todoMain.querySelector('.todo_details');
  if (details) {
    const statusSpan = details.querySelector('span');
    if (statusSpan) {
      statusSpan.textContent = statusText;
      if (statusText === 'Completed' || statusText === 'Completada' || statusText === 'Elvégezve') {
        statusSpan.classList.add('status-complete');
      } else {
        statusSpan.classList.remove('status-complete');
      }
    }
  }
}

// Handle checkbox changes: update status in DB and update UI immediately
function initCheckboxHandlers() {
  document.querySelectorAll('.todo_checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', async function () {
      const id = this.dataset.taskId;
      const status = this.checked ? 'Completed' : 'Pending';
      const lang = document.getElementById('langSelect')?.value || 'en';
      const res = await fetch(`/tasks/toggle-status/${id}?lang=${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        const todoMain = this.closest('.todo_main');
        updateTaskStyles(todoMain, status);
        // Use the translated status from the backend
        updateTaskDetails(todoMain, data.translatedStatus);
      }
    });
  });
}

function initFilterModal() {
  const openBtn = document.getElementById('openFilterModal');
  const closeBtn = document.getElementById('closeFilterModal');
  const modal = document.getElementById('filterModal');
  if (openBtn && closeBtn && modal) {
    openBtn.onclick = function() {
      modal.classList.remove('hidden');
    };
    closeBtn.onclick = function() {
      modal.classList.add('hidden');
    };
    // Optional: close modal when clicking outside content
    modal.onclick = function(e) {
      if (e.target === modal) modal.classList.add('hidden');
    };
  }
}

document.getElementById('toggleDarkModeButton')?.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});


// Initialize all UI handlers after DOM is loaded
function init() {
  initAddTaskPopup();
  initEditTaskPopup();
  initDetailsToggle();
  initCheckboxHandlers();
  initFilterModal();
}

document.addEventListener('DOMContentLoaded', init);

