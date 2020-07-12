// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter')

// Functions
const displayTodosFromLocalStorage = () => {
   let storedTodos;
   if (localStorage.getItem('storedTodos') === null) {
      storedTodos = [];
   } else {
      storedTodos = JSON.parse(localStorage.getItem('storedTodos'));
   }
   storedTodos.forEach(StoredTodo => {
      // Create todo
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      todoDiv.innerHTML = `
      <li class="todo-item">${StoredTodo}</li>
      <button class="complete-btn"><i class="fas fa-check"></i></button>
      <button class="trash-btn"><i class="fas fa-trash"></i></button>
      `
      // Append to todoList
      todoList.appendChild(todoDiv);
   });
};

const addTodoToLocalStorage = todo => {
   let storedTodos;
   if (localStorage.getItem('storedTodos') === null) {
      storedTodos = [];
   } else {
      storedTodos = JSON.parse(localStorage.getItem('storedTodos'));
   }
   storedTodos.push(todo);
   localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
};

const addTodo = e => {
   e.preventDefault();
   if (todoInput.value === '') {
      alert('Please add a task.');
   } else {
      // Create todo
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      todoDiv.innerHTML = `
      <li class="todo-item">${todoInput.value}</li>
      <button class="complete-btn"><i class="fas fa-check"></i></button>
      <button class="trash-btn"><i class="fas fa-trash"></i></button>
      `
      // Append to todoList
      todoList.appendChild(todoDiv);
      // Add todo to local storage
      addTodoToLocalStorage(todoInput.value);
      // Clear todoInput.value
      todoInput.value = '';
   }
}

const deleteTodoFromLocalStorage = todo => {
   let storedTodos;
   if (localStorage.getItem('storedTodos') === null) {
      storedTodos = [];
   } else {
      storedTodos = JSON.parse(localStorage.getItem('storedTodos'));
   }
   storedTodos.splice(storedTodos.indexOf(todo), 1);
   localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
};

const deleteAndCheck = e => {
   // delete todo
   if (e.target.className === 'trash-btn') {
      const todo = e.target.parentElement;
      // delete todo from local storage
      deleteTodoFromLocalStorage(todo.firstElementChild.textContent);
      todo.classList.add('fall');
      todo.addEventListener('transitionend', () => {
         todo.remove();
      });  
   }
   // check todo
   if (e.target.className === 'complete-btn') {
      e.target.style.background = '#3FD53F';
      e.target.previousElementSibling.classList.toggle('completed');
   }
}

const filterTodo = e => {
   const todos = todoList.childNodes;
   todos.forEach(todo => {
      // console.log(todo.firstElementChild);
      switch(e.target.value) {
         case 'all' : 
            todo.style.display = 'flex';
            break;
         case 'completed':
            if (todo.firstElementChild.classList.contains('completed')) {
               todo.style.display = 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
         case 'uncompleted':
            if (!todo.firstElementChild.classList.contains('completed')) {
               todo.style.display = 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
      }
   });
};



// Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
todoFilter.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', displayTodosFromLocalStorage);
