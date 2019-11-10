import { renderTodos } from './views';
import { getFilters, setFilters } from './filters';
import { createTodo } from './todos';

renderTodos();

// Search todos and return the result
document.querySelector('#button-search').addEventListener('click', () => {
  const searchText = document.querySelector('#text-search').value;
  const hideComplete = document.querySelector('#ckbox-hide-complete').checked;
  console.log(hideComplete);
  setFilters({
    searchText,
    hideComplete
  });
  renderTodos();
});

// Hide or show the completed tasks
document.querySelector('#ckbox-hide-complete').addEventListener('change', (e) => {
  setFilters({
    hideComplete: e.target.checked
  });
  renderTodos();
});

// Create a new todo and re-render the todo list
document.querySelector('#form-new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const task = e.target.elements.todoText.value.trim();
  if(task === '') {
    return;
  }
  createTodo(task).then(() => {
    document.querySelector('#text-search').value = '';
    setFilters({
      searchText: ''
    });
    
    renderTodos();
    e.target.elements.todoText.value = '';
  });
});