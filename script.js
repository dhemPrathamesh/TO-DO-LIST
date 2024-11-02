// script.js
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const prioritySelect = document.getElementById('priority-select');
const priorityBtn = document.getElementById('priority-btn');
const timerBtn = document.getElementById('timer-btn');
const startTimerBtn = document.getElementById('start-timer-btn');
const stopTimerBtn = document.getElementById('stop-timer-btn');
const timerDisplay = document.getElementById('timer-display');

let tasks = [];
let timerInterval;

menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    const searchResultsHtml = tasks.filter((task) => task.text.includes(searchQuery)).map((task) => `<li>${task.text}</li>`).join('');
    searchResults.innerHTML = searchResultsHtml;
});

priorityBtn.addEventListener('click', () => {
    const priority = prioritySelect.value;
    tasks.forEach((task) => {
        task.priority = priority;
    });
    renderTasks();
});

startTimerBtn.addEventListener('click', () => {
    timerInterval = setInterval(() => {
        const timerTime = new Date().getTime();
        const hours = Math.floor(timerTime / 3600000);
        const minutes = Math.floor((timerTime % 3600000) / 60000);
        const seconds = Math.floor((timerTime % 60000) / 1000);
        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
});

stopTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
});

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false, priority: 'low' });
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.text;
        taskElement.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });
        if (task.completed) {
            taskElement.style.textDecoration = 'line-through';
        }
        taskList.appendChild(taskElement);
    });
}

renderTasks();