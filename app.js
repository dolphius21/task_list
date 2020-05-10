// Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
  // Alert
  if (taskInput.value === '') {
    alert('Add a task.');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create a text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to the ul
  taskList.appendChild(li);
  // Clear Input
  taskInput.value = '';
  // Prevent default behavior
  e.preventDefault();
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear tasks
function clearTasks() {
  // (alternative solution) taskList.innerHTML = ''; 
  // Faster performance
  while (taskList.children) {
    taskList.removeChild();
  }
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}