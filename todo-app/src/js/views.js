import { getFilters } from "./filters";
import { getTodos, loadOneTodo, loadTodos, toggleTodoComplete, deleteTodo } from './todos';
import '../style/main.css';

/**
 * Generate a DOM structure for a single todo
 * 
 * @param {object} todo object
 * @returns Node object (contain a todo task)
 */
const generateTodoDOM = (todo) => {
  const todoLabelEl = document.createElement('label');  // Create a container
  todoLabelEl.id = todo.id; // Set id attribute to every todo DOM

  const containerEl = document.createElement('div');

  const checkBox = document.createElement('input');  // Create a checkbox
  checkBox.setAttribute('type', 'checkBox');
  if(todo.completed) {
    checkBox.setAttribute('checked', 'checked');
  }
  checkBox.addEventListener('change', () => { // Set a todo to be complete or incomplete
    toggleTodoComplete(todo.id).then(() => {      
      
      rerenderSummary();
      rerenderOneTodo(todo);
    });
  });

  const todoEl = document.createElement('span');  // Create todo text
  todoEl.textContent = todo.task;

  const delButton = document.createElement('button'); // Create a delete button
  delButton.textContent = 'Delete';
  delButton.classList.add('button', 'button--text');
  delButton.addEventListener('click', () => { // Delete a todo
    deleteTodo(todo.id).then(() => {      
      renderTodos();
    });
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
 * Rerender a DOM structure for a single todo when the todo complete status changes
 * 
 * @param {object} todo object
 * @returns null
 */
const rerenderOneTodo = (todo) => {
  loadOneTodo(todo.id).then((todo) => {
    
    if(document.querySelector('#ckbox-hide-complete').checked === true && todo.completed === true ) {
      // If 'Hide Completed Tasks' ticked and one task is checked with complete, just remove this task from the list
      document.querySelector(`#${todo.id}`).remove();
      return;
    } 

    document.querySelector(`#${todo.id} div`).remove();
    document.querySelector(`#${todo.id} button`).remove();
    
    const todoLabelEl = document.querySelector(`#${todo.id}`);
    const containerEl = document.createElement('div');

    const checkBox = document.createElement('input');  // Create a checkbox
    checkBox.setAttribute('type', 'checkBox');
    if(todo.completed) {
      checkBox.setAttribute('checked', 'checked');
    }
    checkBox.addEventListener('change', () => { // Set a todo to be complete or incomplete
      toggleTodoComplete(todo.id).then(() => {
        rerenderSummary();
        rerenderOneTodo(todo);
      });
    });

    const todoEl = document.createElement('span');  // Create todo text
    todoEl.textContent = todo.task;

    const delButton = document.createElement('button'); // Create a delete button
    delButton.textContent = 'Delete';
    delButton.classList.add('button', 'button--text');
    delButton.addEventListener('click', () => { // Delete a todo
      deleteTodo(todo.id).then(() => {      
        renderTodos();
      });
    });

    todoLabelEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    
    containerEl.appendChild(checkBox);
    containerEl.appendChild(todoEl);
    todoLabelEl.appendChild(containerEl);
    todoLabelEl.appendChild(delButton);
  });
};

/**
 * Generate a DOM structure for the summary
 * 
 * @name generateSummaryDOM
 * @param number the number of incomplete tasks
 * @returns Node object with summary
 */
const generateSummaryDOM = ( numOfAll, numOfIncomplete, numOfComplete) => {
  const summaryEl = document.createElement('h2');
  const summaryText = `You have ${numOfAll} task(s) - ${numOfIncomplete} Incomplete and ${numOfComplete} Complete`;
  summaryEl.textContent = summaryText;
  summaryEl.classList.add('list-title');
  return summaryEl;
};

/**
 * Rerender the content in summary when the complete status of a single todo is changed
 * 
 * @param null
 * @returns null
 */
const rerenderSummary = () => {
  const filters = getFilters();
  const todos = getTodos();
  const filteredTodos = todos.filter((todo) => {
    const searchTodoMatch = todo.task.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompleteMatch = !filters.hideComplete || !todo.completed;
    return searchTodoMatch && hideCompleteMatch;
  });
  
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    
  document.querySelector('#tasks-list > h2').textContent =
    `You have ${filteredTodos.length} task(s) - ${incompleteTodos.length} Incomplete and ${filteredTodos.length - incompleteTodos.length} Complete`;
}

/**
 * Render todos list based on filters
 * 
 * @param null
 * @returns undefined
 */
const renderTodos = () => {  
  document.querySelector('#tasks-list').innerHTML = '<p class="list-title">Loading data...</p>';
  
  const filters = getFilters();

  loadTodos().then((todos) => {
    if(todos === false) {
      document.querySelector('#tasks-list').innerHTML = '<p class="list-title">Cannot access data</p>';
      return;
    }
    const filteredTodos = todos.filter((todo) => {
      const searchTodoMatch = todo.task.toLowerCase().includes(filters.searchText.toLowerCase());
      const hideCompleteMatch = !filters.hideComplete || !todo.completed;
      return searchTodoMatch && hideCompleteMatch;
    });
    
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
      
    document.querySelector('#tasks-list').innerHTML = '';
  
    document.querySelector('#tasks-list').appendChild(generateSummaryDOM(filteredTodos.length, incompleteTodos.length, filteredTodos.length - incompleteTodos.length ));
  
    filteredTodos.forEach((todo) => {
      document.querySelector('#tasks-list').appendChild(generateTodoDOM(todo));
    });
  });
  
};

export { generateTodoDOM, renderTodos };