let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <div class="note-text">${note.text}</div>
      <div class="note-date">${note.date}</div>

      <div class="actions">
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value;

  if (text === "") return;

  const newNote = {
    text: text,
    date: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();
  renderNotes();

  input.value = "";
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index) {
  const newText = prompt("Edit your note:", notes[index].text);

  if (newText !== null) {
    notes[index].text = newText;
    saveNotes();
    renderNotes();
  }
}

renderNotes();