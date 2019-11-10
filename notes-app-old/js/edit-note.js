const noteId = location.hash.substring(1);  // get note id from the url
let notes = getNotes();
let note = notes.find(note => note.id === noteId);
if(!note) {
  location.assign('/index.html');
}

const inputTitleEl = document.querySelector('#input-title');
const inputContentEl = document.querySelector('#input-content');
const btnDeleteEl = document.querySelector('#btn-delete');
const lastUpdatedEl = document.querySelector('#last-updated');

inputTitleEl.value = note.title;
inputContentEl.value = note.content;
lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);

inputTitleEl.addEventListener('input', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
  saveNotes(notes);
});

inputContentEl.addEventListener('input', (e) => {
  note.content = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
  saveNotes(notes);
});

btnDeleteEl.addEventListener('click', (e) => {
  if(confirm('Are you sure to delete the note?')) {
    deleteNote(note.id);
    saveNotes(notes);
    location.assign('/index.html');
  }  
});

window.addEventListener('storage', (e) => {  
  // the event 'storage' fires whenever the content in localStorage changes in a different page
  // Use this feature to synchronise different pages.
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue);  // Get the newest value
    note = notes.find(note => note.id === noteId);
    if(!note) {
      location.assign('/index.html');
    }
    inputTitleEl.value = note.title;
    inputContentEl.value = note.content;
    lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
  }
});