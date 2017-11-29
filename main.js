let issues = [];

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
          addTask(value);
      }
      if (event.key === "Escape") {
          console.log("Escape key pressed");
      }
      if (event.type === 'onclick') {
          event.target.value = '';
      }
  });
}

function fecthIssues() {
    const storedIssues = JSON.parse(localStorage.getItem('issues'));
    if (storedIssues === null) {
        return;
    }
    let parent = document.getElementById('notes');
    this.issues = [...storedIssues];
    this.issues.forEach(task => {
        const taskId = task.id;
        var taskElement = document.createElement('div');
        renderTask(task,taskElement)
        parent.appendChild(taskElement);
    });
}

/**
 * 
 * @param {*} taskDescription an String representing what needs to be done 
 */
function addTask(taskDescription) {
    const task = {
        id: chance.guid(),
        description: taskDescription,
        completed: false
    }
    saveToLocalStorage(task);
    this.issues.push(task);
    let parent = document.getElementById('notes');
    var taskElement = document.createElement('div');
    parent.appendChild(taskElement);
    renderTask(task,taskElement);
}

/**
 * 
 * @param {*} task 
 * @param {*} element 
 */
function renderTask(task,element) {
    
    const taskId = task.id;
    element.id = task.id;
    element.innerHTML =  
    `<div class="row bg-primary rounded text-white mt-2">
        <div class="col ${task.completed === true ? 'completed': ''}">
            <div style="font-size:30px">
            <span class="material-icons md-inactive" 
                onclick="completeTask('${taskId}')">
                done
            </span>
             ${task.description} </div>
        </div>
        <div class="col-xs-auto">
            <button 
                type="button" 
                class="btn btn-secondary" 
                onclick="editTask('${taskId}','${task.description}')">
                Edit
            </button>
            <button 
                type="button" 
                class="btn btn-danger" 
                onclick="deleteTask('${taskId}')">
                Delete
            </button>
      </div>
    </div>`
 
}

/**
 * 
 * @param {*} taskId 
 */
function completeTask(taskId) {
    console.log(`Task ${taskId} has been completed`);
    const updatedIssues = this.issues.map( (task) => {
        if (task.id === taskId) {
            let copy = Object.assign({},task);
            copy.completed = true;
            return copy;
        }
        return task;
    });

    this.issues = [...updatedIssues];
    const updatedTasks = updatedIssues.filter( (task) => {
        return task.id === taskId;
    });
    if (updatedTasks.length) {
        const taskElement = document.getElementById(taskId);
        renderTask(updatedTasks[0],taskElement);
    }
    console.log(updatedIssues);
}

/**
 * 
 * @param {*} taskId 
 * @param {*} description 
 */
function editTask(taskId,description) {
    const task = document.getElementById(taskId);
    let parent = document.getElementById('notes');

    //Edit mode
    let editrow = document.createElement('div');
    editrow.innerHTML =  
    `<div class="row bg-primary rounded text-white mt-2">
        <div class="col-12">
            <input 
            style="font-size:30px" 
            class="form-control task-edition" 
            type="text" 
            autofocus 
            defaultValue="${description}">
        </div>
    </div>`
    parent.replaceChild(editrow,task);
    // const length = inputField.value.length;
    // inputField.selectionStart = elemLen;
    // inputField.selectionEnd = elemLen;
}

function deleteTask(taskId) {
    const task = document.getElementById(taskId);
    let parent = document.getElementById('notes');
    parent.removeChild(task);
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