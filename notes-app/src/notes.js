import uuidv4 from'uuid/v4';
import moment from 'moment';

let notes = [];

/**
 * Retrieve notes from local storage
 * 
 * @param null
 * @returns {Object} notes object if it is already saved in local storage, empty array otherwise
 */
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Get notes and export it from module
 * 
 * @param null
 * @returns {Object} notes object
 */
const getNotes = () => notes;

/**
 * Create a new note and save new notes array to local storage by calling saveNotes()
 * 
 * @param null
 * @returns String the id of the note created
 */
const createNote = () => {
  const id = uuidv4();  // Create a unique id for each note using uuid(a third-party library)
  const timestamp = moment().valueOf();
  notes.push({
    id, 
    title: '',
    content: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes();
  return id;
};

/**
 * Delete a note from notes array by id and save new notes array to local storage
 * by calling saveNotes()
 * 
 * @param String the id of the note to be deleted 
 * @returns undefined
 */
const deleteNote = (id) => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if(noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
}

/**
 * Update a note based on the given id and save to local storage
 * 
 * @param {String} id the id of note to be updated 
 * @param {Object} updates an object contains the update info
 * @returns {Object} new note object after being updated 
 */
const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id);
  if(!note) {
    return;
  }
  if(typeof updates.title === 'string') {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }
  if(typeof updates.content === 'string') {
    note.content = updates.content;
    note.updatedAt = moment().valueOf();
  }
  saveNotes();
  return note;
}

/**
 * Save notes to local storage
 * 
 * @param null
 * @returns undefined 
 */
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

/**
 * Sort notes based on certain rules
 * 
 * @param String the sort rules: 'byTitle' - Sort by title alphabetically
 *                               'byCreatedAt' - Sort by create time
 *                               'byUpdatedAt' - Sort by update time(default)
 * @returns Array the sorted notes array 
 */
const sortNotes = (sortBy) => {
  switch (sortBy) { // Sorting notes
    case 'byTitle': 
      return notes.sort((a, b) => {
        if(a.title.toLowerCase() <= b.title.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
      break;
    case 'byCreatedAt':
      return notes.sort((a, b) => {
        if(a.createdAt <= b.createdAt) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case 'byUpdatedAt':
    default:
      return notes.sort((a, b) => {
        if(a.updatedAt <= b.updatedAt) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
  }
}

notes = loadNotes();

export { getNotes, createNote, deleteNote, updateNote, sortNotes };