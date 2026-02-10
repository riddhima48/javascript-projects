const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');
        
        // Task array to store tasks
        let tasks = [];
        
        // Load tasks from localStorage on page load
        document.addEventListener('DOMContentLoaded', () => {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                tasks = JSON.parse(savedTasks);
                renderTasks();
                updateStats();
            }
        });
        
        // Add task when button is clicked
        addBtn.addEventListener('click', addTask);
        
        // Add task when Enter key is pressed
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });
        
        // Function to add a new task
        function addTask() {
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
            
            // Create new task object
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            // Add to tasks array
            tasks.push(newTask);
            
            // Clear input
            taskInput.value = '';
            
            // Update UI
            renderTasks();
            updateStats();
            saveTasks();
            
            // Focus back on input
            taskInput.focus();
        }
        
        // Function to render tasks
        function renderTasks() {
            // Clear task list
            taskList.innerHTML = '';
            
            // Show empty state if no tasks
            if (tasks.length === 0) {
                taskList.appendChild(emptyState);
                emptyState.style.display = 'block';
                return;
            }
            
            // Hide empty state
            emptyState.style.display = 'none';
            
            // Add each task to the list
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.setAttribute('data-id', task.id);
                
                taskItem.innerHTML = `
                    <span class="task-check">
                        <i class="fas fa-${task.completed ? 'check-circle' : 'circle'}"></i>
                    </span>
                    <span class="task-text">${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn" title="${task.completed ? 'Mark as pending' : 'Mark as complete'}">
                            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="delete-btn" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
                
                // Add event listeners for task actions
                const completeBtn = taskItem.querySelector('.complete-btn');
                const deleteBtn = taskItem.querySelector('.delete-btn');
                
                completeBtn.addEventListener('click', () => toggleComplete(task.id));
                deleteBtn.addEventListener('click', () => deleteTask(task.id));
            });
        }
        
        // Function to toggle task completion status
        function toggleComplete(taskId) {
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                renderTasks();
                updateStats();
                saveTasks();
            }
        }
        
        // Function to delete a task
        function deleteTask(taskId) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter(task => task.id !== taskId);
                renderTasks();
                updateStats();
                saveTasks();
            }
        }
        
        // Function to update stats
        function updateStats() {
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;
            const pendingTasks = totalTasks - completedTasks;
            
            totalTasksEl.textContent = totalTasks;
            completedTasksEl.textContent = completedTasks;
            pendingTasksEl.textContent = pendingTasks;
        }
        
        // Function to save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        // Add some example tasks on first load if no tasks exist
        if (!localStorage.getItem('tasks')) {
            tasks = [
                { id: 1, text: 'Learn HTML basics', completed: true, createdAt: new Date().toISOString() },
                { id: 2, text: 'Practice CSS styling', completed: false, createdAt: new Date().toISOString() },
                { id: 3, text: 'Build a JavaScript project', completed: false, createdAt: new Date().toISOString() }
            ];
            renderTasks();
            updateStats();
            saveTasks();
        }