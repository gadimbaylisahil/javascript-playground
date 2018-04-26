// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM loaded event
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e){
    // check if value is there
    if(taskInput.value === ''){
        alert('Please add a Task');
    }
    // create element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // append the li with value
    li.appendChild(document.createTextNode(taskInput.value));

    // add remove link to ul item
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    li.appendChild(link);
    // append ul item
    taskList.appendChild(li);

    // store in local storage
    storeTasksInLocalStorage(taskInput.value);

    // clear text field
    taskInput.value = '';

    e.preventDefault();
}

function storeTasksInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // append the li with value
        li.appendChild(document.createTextNode(task));

        // add remove link to ul item
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        li.appendChild(link);
        // append ul item
        taskList.appendChild(li);
    });
}
// remove single task
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
          e.target.parentElement.parentElement.remove();
          removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
       if (taskItem.textContent === task){
           tasks.splice(index, 1)
       }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// remove all taks
function clearTasks(e){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        clearTasksFromLocalStorage();
    }
    e.preventDefault();
}

function clearTasksFromLocalStorage(){
    localStorage.clear('tasks');
}
// filter tasks by name
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    e.preventDefault();
}
