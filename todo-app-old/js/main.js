const todos = getTodos();

const filters = {
  searchText: '',
  hideComplete: false
}

renderTodos(todos, filters);

document.querySelector('#text-search').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#form-new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const task = e.target.elements.todoText.value.trim();
  if(task === '') {
    return;
  }
  todos.push({
    id: uuidv4(),
    task,
    completed: false,
    toCompleteAt: 0
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.todoText.value = '';
});

document.querySelector('#ckbox-hide-complete').addEventListener('change', (e) => {
  filters.hideComplete = e.target.checked;
  renderTodos(todos, filters);
});