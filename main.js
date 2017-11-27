function init() {
    addEventListeners()
    fecthIssues();
}

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

function fecthIssues() {
    const issues = JSON.parse(localStorage.getItem('issues'));
    issues.forEach(element => {
        renderIssue(element);
    });
}

function renderIssue(issue) {
    let parent = document.getElementById('notes');
    var div = document.createElement('div');

    div.innerHTML =  
    `<div class="row bg-primary rounded text-white mt-2">
        <div class="col">
            <div style="font-size:30px"> ${issue.description} </div>
        </div>
        <div class="col-xs-auto">
            <button type="button" class="btn btn-secondary" onclick="editTask(${issue.id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteTask(${issue.id})">Delete</button>
      </div>
    </div>`
    parent.appendChild(div);
}

function editTask(taskId) {

}

function deleteTask(taskId) {

}

function addNote(note) {
    const issue = {
        id: chance.guid(),
        description: note,
    }
    saveToLocalStorage(issue);
    renderIssue(issue);
}

function saveToLocalStorage (issue) {

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
}