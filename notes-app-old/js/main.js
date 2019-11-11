let notes = getNotes();

const filters = {
  searchText: '',
  sortBy: 'byUpdatedAt'
}

renderNotes(notes, filters);

// Create a new note
document.querySelector('#btn-create-note').addEventListener('click', (e) => {
  const id = uuidv4();  // Create a unique id for each note using uuid(a third-party library)
  const timestamp = moment().valueOf();
  notes.push({
    id, 
    title: '',
    content: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  // renderNotes(notes, filters);
  location.assign(`./edit-note.html#${id}`);
});

// Search notes by title
document.querySelector('#text-search').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

// Sort notes by date or title
document.querySelector('#select-sort-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener('storage', (e) => {  
  // the event 'storage' fires whenever the content in localStorage changes
  // Use this feature to synchronise different pages.
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue);  // Get the newest value
    renderNotes(notes, filters);
  }
});

const now = moment();
now.minute(1);
console.log(now.toString());