// Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorElement = document.getElementById('error');

// Load saved tasks from local storage
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToList(task);
    });
};

// Add task to the list and display
function addTaskToList(task) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
                <span class="task-text">${task}</span>
                <button class="delete-btn">X</button>
            `;
    taskList.appendChild(li);

    // Delete task functionality
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        removeTask(task);
        li.remove();
    });
}

// Add task to local storage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for add task button
addTaskBtn.addEventListener('click', function () {
    const task = taskInput.value.trim();

    if (task === "") {
        errorElement.classList.remove('hidden');
        return;
    } else {
        errorElement.classList.add('hidden');
    }

    addTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = ""; // Clear the input
});

// Optional: Allow task removal by pressing Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});
