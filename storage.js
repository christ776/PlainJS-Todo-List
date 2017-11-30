let tasks = [];

function updateStoredTasks() {
    localStorage.setItem('issues', JSON.stringify(tasks));
}

function fetchStoredTasks() {
    return JSON.parse(localStorage.getItem('issues'));
}