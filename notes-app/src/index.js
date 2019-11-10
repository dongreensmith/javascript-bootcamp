import { createNote } from './notes';
import { setFilters } from './filters';
import { renderNotes } from './views';

// let notes = getNotes();

// const filters = {
//   searchText: '',
//   sortBy: 'byUpdatedAt'
// }

renderNotes();

// Create a new note
document.querySelector('#btn-create-note').addEventListener('click', (e) => {
  const id = createNote();
  location.assign(`/edit.html#${id}`);
});

// Search notes by title
document.querySelector('#text-search').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderNotes();
});

// Sort notes by date or title
document.querySelector('#select-sort-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value
  })
  renderNotes();
});

window.addEventListener('storage', (e) => {  
  // the event 'storage' fires whenever the content in localStorage changes
  // Use this feature to synchronise different pages.
  if(e.key === 'notes') {
    renderNotes();
  }
});
