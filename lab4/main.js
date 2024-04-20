document.getElementById('noteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const color = document.getElementById('noteColor').value;
    const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const pinned = document.getElementById('pinNote').checked;
    const creationDate = new Date().toISOString();
    const id = Date.now(); 

    const note = {
        id,
        title,
        content,
        color,
        tags,
        pinned,
        creationDate
    };

    if (document.getElementById('noteForm').dataset.isEdit) {
        note.id = parseInt(document.getElementById('noteForm').dataset.noteId, 10);
        updateNote(note);
    } else {
        saveNote(note);
    }

    resetForm();
    displayNotes();
});

function saveNote(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNote(newNote) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map(note => {
        if (note.id === newNote.id) {
            return newNote;
        }
        return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const filteredNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    displayNotes();
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
        document.getElementById('noteTitle').value = noteToEdit.title;
        document.getElementById('noteContent').value = noteToEdit.content;
        document.getElementById('noteColor').value = noteToEdit.color;
        document.getElementById('noteTags').value = noteToEdit.tags.join(', ');
        document.getElementById('pinNote').checked = noteToEdit.pinned;
        document.getElementById('noteForm').dataset.isEdit = true;
        document.getElementById('noteForm').dataset.noteId = noteToEdit.id;
    }
}

function resetForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteColor').value = '#ffffff';
    document.getElementById('noteTags').value = '';
    document.getElementById('pinNote').checked = false;
    delete document.getElementById('noteForm').dataset.isEdit;
    delete document.getElementById('noteForm').dataset.noteId;
}

function searchNotes() {
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchText) ||
               note.content.toLowerCase().includes(searchText) ||
               note.tags.some(tag => tag.toLowerCase().includes(searchText));
    });
    displayNotes(filteredNotes);
}

function displayNotes(notesToDisplay = null) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    const notes = notesToDisplay || JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <p>Tagi: ${note.tags.join(', ')}</p>
            <small>${new Date(note.creationDate).toLocaleString()}</small>
            <button onclick="editNote(${note.id})">Edytuj</button>
            <button onclick="deleteNote(${note.id})">Usuń</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

window.onload = function() {
    displayNotes();
};





