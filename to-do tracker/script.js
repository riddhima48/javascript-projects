// Array to store all tasks
let tasks = [];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    displayTasks();
});

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Add task to array
    tasks.push(taskText);
    
    // Clear input
    taskInput.value = '';
    
    // Save to localStorage
    saveTasks();
    
    // Update display
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Remove task from array
    tasks.splice(index, 1);
    
    // Save to localStorage
    saveTasks();
    
    // Update display
    displayTasks();
}

// Function to display all tasks
function displayTasks() {
    // Clear the list
    taskList.innerHTML = '';
    
    // Update task count
    taskCount.textContent = `(${tasks.length})`;
    
    // If no tasks, show empty message
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks yet. Add your first task above!</li>';
        return;
    }
    
    // Loop through tasks and create list items
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';
        
        // Add click event to delete button
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        // Add elements to list item
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        
        // Add list item to the list
        taskList.appendChild(li);
    });
}

// Event Listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Add some keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl+Enter to add task
    if (event.ctrlKey && event.key === 'Enter') {
        addTask();
    }
    
    // Escape to clear input
    if (event.key === 'Escape') {
        taskInput.value = '';
        taskInput.focus();
    }
});

// Add some console messages for debugging
console.log('To-Do List App Loaded!');
console.log('Keyboard Shortcuts:');
console.log('- Enter: Add task');
console.log('- Ctrl+Enter: Add task');
console.log('- Escape: Clear input field');