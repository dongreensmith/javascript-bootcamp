import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes';

/**
 * Generate a DOM structure for a single note with title
 * 
 * @param {object} note object
 * @returns Node object (contain a note with title)
 */
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a');
  const titleEl = document.createElement('p');
  const statusEl = document.createElement('p');


  // Set up note title text
  if(note.title.trim().length > 0) {
    titleEl.textContent = note.title;
  } else {
    titleEl.textContent = 'Unnamed note';
  }
  titleEl.classList.add('list-item__title');

  // Set up the link
  noteEl.setAttribute('href', `/edit.html#${note.id}`);
  noteEl.classList.add('list-item');

  // Set up status message
  statusEl.textContent = generateLastUpdated(note.updatedAt);
  statusEl.classList.add('list-item__subtitle');

  noteEl.appendChild(titleEl);
  noteEl.appendChild(statusEl);
  return noteEl;
}

/**
 * Render notes list based on filters
 * 
 * @param null
 * @returns undefined
 */
const renderNotes = () => {

  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  // Filter notes based on search text

  const notesEl = document.querySelector('#notes-list');
  notesEl.innerHTML = '';

  if(filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    })
  } else {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'There is no note to show.';
    emptyMsg.classList.add('empty-message');
    notesEl.appendChild(emptyMsg);
  }
  
}

/**
 * Generate the last updated info
 * 
 * @param Number timestamp 
 * @returns String Last updated info
 */
const generateLastUpdated = (timestamp) => {
  return `Last updated ${moment(timestamp).fromNow()}`;
}

const initEditPage = (noteId) => {
  const inputTitleEl = document.querySelector('#input-title');
  const inputContentEl = document.querySelector('#input-content');
  const lastUpdatedEl = document.querySelector('#last-updated');

  const notes = getNotes();
  const note = notes.find(note => note.id === noteId);

  if(!note) {
    location.assign('/index.html');
  }
  
  inputTitleEl.value = note.title;
  inputContentEl.value = note.content;
  lastUpdatedEl.textContent = generateLastUpdated(note.updatedAt);
}

export { generateNoteDOM, renderNotes, generateLastUpdated, initEditPage };