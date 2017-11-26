function addEventListeners() {
    const input = document.getElementById("addNote");
    input.addEventListener('keydown', function(event) {
      if (event.key === "Enter") {
          // Do work
          const value = event.target.value;
          event.target.value = '';
          addNote(value);
      }
      if (event.type === 'onclick') {
          event.target.value = '';
      }
  });
}

function addNote(note) {
    let notes = document.getElementById('notes');
    var textNode = document.createTextNode(note);
    var div = document.createElement('div');
    div.className = "row bg-primary rounded";
    div.appendChild(columnWithChild(headerTitle(note)));
    let buttons = columnWithChild()
    div.appendChild(editNoteButton());
    div.appendChild(deleteNoteButton());
    notes.appendChild(div);
}

function columnWithChild(child) {
    let column = document.createElement('div');
    column.className = "col col-lg-2";
    column.appendChild(child);
    return column;
}

function headerTitle(title) {
    let header = document.createElement('h2');
    header.textContent = title;
    return header;
}

function deleteNoteButton() {
    let button = document.createElement('button');
    button.type = 'button'
    button.className = 'btn btn-primary btn-sm';
    button.textContent = 'Edit';
    return button;
}

function editNoteButton() {
    let button = document.createElement('button');
    button.type = 'button'
    button.className = 'btn btn-danger btn-sm';
    button.textContent = 'Remove';
    return button;
}