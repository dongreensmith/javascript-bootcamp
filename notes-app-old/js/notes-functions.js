/**
 * Retrieve notes from local storage
 *
 * @name getNotes
 * @param null
 * @returns {Object} notes object if it is already saved in local storage, empty array otherwise
 */
const getNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Save notes to local storage
 * @name saveNotes
 * @param {Object} notes the array of object
 * @returns undefined
 */
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

/**
 * Delete a note from notes array by id
 * @name deleteNote
 * @param String the id of the note to be deleted
 * @returns undefined
 */
const deleteNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
  }
};

/**
 * Generate a DOM structure for a single note with title
 *
 * @name generateNoteDOM
 * @param {object} note object
 * @returns Node object (contain a note with title)
 */
const generateNoteDOM = note => {
  const noteEl = document.createElement("a");
  const titleEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Set up note title text
  if (note.title.trim().length > 0) {
    titleEl.textContent = note.title;
  } else {
    titleEl.textContent = "Unnamed note";
  }
  titleEl.classList.add("list-item__title");

  // Set up the link
  noteEl.setAttribute("href", `./edit-note.html#${note.id}`);
  noteEl.classList.add("list-item");

  // Set up status message
  statusEl.textContent = generateLastUpdated(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");

  noteEl.appendChild(titleEl);
  noteEl.appendChild(statusEl);
  return noteEl;
};

/**
 * Render notes list based on filters
 *
 * @name renderNotes
 * @param {object} notes
 * @param {object} filters
 * @returns undefined
 */
const renderNotes = (notes, filters) => {
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  // Filter notes based on search text

  switch (
    filters.sortBy // Sorting notes
  ) {
    case "byTitle":
      filteredNotes.sort((a, b) => {
        if (a.title.toLowerCase() <= b.title.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
      break;
    case "byCreatedAt":
      filteredNotes.sort((a, b) => {
        if (a.createdAt <= b.createdAt) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case "byUpdatedAt":
    default:
      filteredNotes.sort((a, b) => {
        if (a.updatedAt <= b.updatedAt) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
  }

  const notesEl = document.querySelector("#notes-list");
  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "There is no note to show.";
    emptyMsg.classList.add("empty-message");
    notesEl.appendChild(emptyMsg);
  }
};

/**
 * Generate the last updated info
 * @name generateLastUpdated
 * @param Number timestamp
 * @returns String Last updated info
 */
const generateLastUpdated = timestamp => {
  return `Last updated ${moment(timestamp).fromNow()}`;
};
