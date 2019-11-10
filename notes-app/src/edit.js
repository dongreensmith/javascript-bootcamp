import { initEditPage, generateLastUpdated } from './views';
import { updateNote, deleteNote } from './notes';

const noteId = location.hash.substring(1);  // get note id from the url

const inputTitleEl = document.querySelector('#input-title');
const inputContentEl = document.querySelector('#input-content');
const btnDeleteEl = document.querySelector('#btn-delete');
const lastUpdatedEl = document.querySelector('#last-updated');

initEditPage(noteId);

inputTitleEl.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value
  });
  lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
});

inputContentEl.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    content: e.target.value
  });
  lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
});

btnDeleteEl.addEventListener('click', (e) => {
  if(confirm('Are you sure to delete the note?')) {
    deleteNote(noteId);
    location.assign('/index.html');
  }  
});

window.addEventListener('storage', (e) => {  
  // the event 'storage' fires whenever the content in localStorage changes in a different page
  // Use this feature to synchronise different pages.
  if(e.key === 'notes') {
    initEditPage(noteId);
  }
});