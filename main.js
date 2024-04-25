let idCounter = 0;
const input = document.querySelector('input[type="text"]');
const list = document.querySelector('#list'); 
const stats = document.querySelector('#stats');
const sectionSinTareas = document.querySelector('.section1');
const toggleFilterBtn = document.querySelector('#toggleFilterBtn');
const filterContainer = document.querySelector('#filterContainer');
let tasks = [];

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

async function getTasksFromLocalStorage() {
    const tasks = await JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

userInput.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();
});

const addTask = async () => {
    idCounter++;

    let newValue = input.value;
    let dueDate = document.querySelector('#taskDueDate').value; 

    let newTask = {
        id: idCounter,
        text: newValue,
        completed: false,
        dueDate: dueDate, 
    };

    tasks.push(newTask);

    saveTasksToLocalStorage(tasks);

    updateTaskList();
}

function updateTaskList(filterDate) {
    list.innerHTML = '';

    const filteredTasks = filterDate ? tasks.filter(task => task.dueDate === filterDate) : tasks;

    for (const task of filteredTasks) {
        const isCompleted = task.completed ? 'task-completed' : '';

        list.innerHTML += `<div class="task-container ${isCompleted}" id="${task.id}">
        <label for=""> 
            <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}>
            ${task.text} <br>
            Fecha límite: ${task.dueDate}
        </label>
        <div class="button-container">
        <button class="checkBtn"><img src="./images/cheque.png" alt="checkBtn" class="check" ></button>        
        <button class="closeBtn"><img src="./images/eliminar.png" alt="closeBtn" class="close" ></button> 
        </div>
        </div>`;
    }
    input.value = '';
    document.querySelector('#taskDueDate').value = ''; 
    sectionSinTareas.style.display = 'none';
    updateStats();
}

document.querySelector('#filterBtn').addEventListener('click', () => {
    const filterDate = document.querySelector('#filterDate').value;
    updateTaskList(filterDate);
});

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const taskId = event.target.closest('.task-container').id;
        if (event.target.classList.contains('check')) {
            tasks = tasks.map(task => task.id === parseInt(taskId) ? {...task, completed: true} : task);
            saveTasksToLocalStorage(tasks);
            updateTaskList();
            updateStats();
        } else if (event.target.classList.contains('close')) {
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            saveTasksToLocalStorage(tasks);
            updateTaskList();
            updateStats();
        }
    }
});

toggleFilterBtn.addEventListener('click', () => { 
    if (filterContainer.style.display === 'none') {
        filterContainer.style.display = 'block';
        toggleFilterBtn.innerHTML = `<img src="./images/controles-deslizantes (1).png" alt="OpenFilter" class="OpenFilter">`;
    } else {
        filterContainer.style.display = 'none';
        toggleFilterBtn.innerHTML = `<img src="./images/controles-deslizantes (1).png" alt="OpenFilter" class="OpenFilter">`;
    }
});


let updateStats = () => {
    let completedTasks = tasks.filter(task => task.completed).length;
    let totalTasks = tasks.length;

    stats.innerHTML = `<p> Tareas pendientes: ${totalTasks - completedTasks} Completadas: ${completedTasks} </p>`;
};

