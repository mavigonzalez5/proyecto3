let idCounter = 0;
const input = document.querySelector('input[type="text"]');
const list = document.querySelector('#list'); 
const stats = document.querySelector('#stats');
const sectionSinTareas = document.querySelector('.section1');
let tasks = []


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
    let dueDate = document.querySelector('#taskDueDate').value; // Obtiene la fecha límite del campo de entrada

    let newTask = {
        id: idCounter,
        text: newValue,
        completed: false,
        dueDate: dueDate, // Almacena la fecha límite en la tarea
    };


    // Agregar la nueva tarea a la lista
    tasks.push(newTask);

    // Guardar la lista actualizada de tareas en el Local Storage
    saveTasksToLocalStorage(tasks);

    // Actualizar la lista de tareas en la página
    updateTaskList();
}
function updateTaskList() {
    list.innerHTML = '';

    for (const task of tasks) {
        // Determina si la tarea está completada
        const isCompleted = task.completed ? 'task-completed' : '';

        list.innerHTML += `<div class="task-container ${isCompleted}" id="${task.id}">
        <label for=""> 
            <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}>
            ${task.text} <br>
            Fecha tope: ${task.dueDate}
        </label>
        <div class="button-container">
        <button class="checkBtn"><img src="./images/cheque.png" alt="checkBtn" class="check" ></button>        
        <button class="closeBtn"><img src="./images/eliminar.png" alt="closeBtn" class="close" ></button> 
        </div>
        </div>`;
    }
    input.value = '';
    document.querySelector('#taskDueDate').value = ''; // Limpia el campo de entrada de la fecha límite
    sectionSinTareas.style.display = 'none';
    updateStats();
}

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const taskId = event.target.closest('.task-container').id;
        if (event.target.classList.contains('check')) {
            // Mark task as completed
            tasks = tasks.map(task => task.id === parseInt(taskId) ? {...task, completed: true} : task);
            saveTasksToLocalStorage(tasks);
            updateTaskList();
            updateStats();
        } else if (event.target.classList.contains('close')) {
            // Delete task
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            saveTasksToLocalStorage(tasks);
            updateTaskList();
            updateStats();
        }
    }
});

let updateStats = () => {
    // Calcula el número de tareas completadas y totales
    let completedTasks = tasks.filter(task => task.completed).length;
    let totalTasks = tasks.length;

    // Actualiza el contenido de 'stats' con el número de tareas completadas y totales
    stats.innerHTML = `<p> Tareas pendientes: ${totalTasks - completedTasks} Completadas: ${completedTasks} </p>`;
};