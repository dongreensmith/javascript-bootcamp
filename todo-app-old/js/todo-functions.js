/**
 * Retrieve todos from local storage as JSON string and convert it to object
 * 
 * @name getTodos
 * @param null
 * @returns {Object} todos array of object if it is already set, empty array otherwise
 */
const getTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch(e) {
    return [];
  }
}

/**
 * Save todos to local storage as JSON string
 * @name saveTodos
 * @param {object} todos array of object
 * @returns null
 */
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/** 
 * Delete a todo by its id 
 * @name deleteTodo
 * @param String the id of the todo to be deleted
 * @returns null
*/
const deleteTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if(todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }
};

/**
 * Update a todo by its id. If it is completed, set it to be incomplete.
 * If it is incomplete, set complete.
 * @name toggleTodoComplete
 * @param String the id of the todo to be updated
 * @returns null 
 */
const toggleTodoComplete = (id) => {
  const todo = todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
};

/**
 * Generate a DOM structure for a single todo
 * 
 * @name generateTodoDOM
 * @param {object} todo object
 * @returns Node object (contain a todo task)
 */
const generateTodoDOM = (todo) => {
  const todoLabelEl = document.createElement('label');  // Create a container
  const containerEl = document.createElement('div');

  const checkBox = document.createElement('input');  // Create a checkbox
  checkBox.setAttribute('type', 'checkBox');
  if(todo.completed) {
    checkBox.setAttribute('checked', 'checked');
  }
  checkBox.addEventListener('change', () => { // Set a todo to be complete or incomplete
    toggleTodoComplete(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  const todoEl = document.createElement('span');  // Create todo text
  todoEl.textContent = todo.task;

  const delButton = document.createElement('button'); // Create a delete button
  delButton.textContent = 'Delete';
  delButton.classList.add('button', 'button--text');
  delButton.addEventListener('click', () => { // Delete a todo
    deleteTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoLabelEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');

  containerEl.appendChild(checkBox);
  containerEl.appendChild(todoEl);
  todoLabelEl.appendChild(containerEl);
  todoLabelEl.appendChild(delButton);
  return todoLabelEl;
};

/**
 * Generate a DOM structure for the summary
 * 
 * @name generateSummaryDOM
 * @param number the number of incomplete tasks
 * @returns Node object with summary
 */
const generateSummaryDOM = (numOfIncompleteTasks) => {
  const summaryEl = document.createElement('h2');
  if(numOfIncompleteTasks===1) {
    summaryText = 'You have 1 task to do.';
  } else if(numOfIncompleteTasks===0) {
    summaryText = 'Take a rest. You do not have task to do.'
  } else {
    summaryText = `You have ${numOfIncompleteTasks} tasks to do.`;
  }
  summaryEl.textContent = summaryText;
  summaryEl.classList.add('list-title');
  return summaryEl;
};

/**
 * Render todos list based on filters
 * 
 * @name renderTodos
 * @param {object} todos 
 * @param {object} filters 
 * @returns undefined
 */
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTodoMatch = todo.task.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompleteMatch = !filters.hideComplete || !todo.completed;
    // debugger;   // Know how to use debugger
    return searchTodoMatch && hideCompleteMatch;
  });
  
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector('#tasks-list').innerHTML = '';

  document.querySelector('#tasks-list').appendChild(generateSummaryDOM(incompleteTodos.length));

  filteredTodos.forEach((todo) => {
    document.querySelector('#tasks-list').appendChild(generateTodoDOM(todo));
  });
};