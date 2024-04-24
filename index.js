let idCounter = 0;
const input = document.querySelector('input[type="text"]');
const list = document.querySelector('#list'); 
const stats = document.querySelector('#stats');
const sectionSinTareas = document.querySelector('.section1');

// Función para guardar tareas en el Local Storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para recuperar tareas del Local Storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para agregar una tarea
let addTask = () => {
    idCounter++;

    let newValue = input.value;

    // Crear un objeto para la nueva tarea
    let newTask = {
        id: idCounter,
        text: newValue,
        completed: false
    };

    // Obtener todas las tareas existentes del Local Storage
    let tasks = getTasksFromLocalStorage();

    // Agregar la nueva tarea a la lista
    tasks.push(newTask);

    // Guardar la lista actualizada de tareas en el Local Storage
    saveTasksToLocalStorage(tasks);

    // Actualizar la lista de tareas en la página
    updateTaskList();
};

// Función para actualizar la lista de tareas en la página
function updateTaskList() {
    // Obtener todas las tareas del Local Storage
    let tasks = getTasksFromLocalStorage();

    // Limpiar la lista de tareas en la página
    list.innerHTML ='';

    // Agregar cada tarea a la lista en la página
    tasks.forEach(task => {
        list.innerHTML += `<div class="task-container" id="${task.id}">
        <label for=""> 
            <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}>
                ${task.text}
        </label>
        <div>
            <img src="./images/cheque.png" alt="checkBtn" class="check">
            <img src="./images/eliminar.png" alt="closeBtn" class="closeBtn">
        </div>
        </div>`;
    });

    // Actualizar las estadísticas
    updateStats();
}

let updateStats = () => {
    // Obtiene todos los contenedores de tareas
    let tasks = list.querySelectorAll('.task-container');
    // Obtiene solo los checkboxes marcados como completados
    let completedTasks = list.querySelectorAll('.check:checked');
    // Actualiza el contenido de 'stats' con el número de tareas completadas y totales
    stats.innerHTML = `<p> Tareas pendientes: ${tasks.length - completedTasks.length} Completadas: ${completedTasks.length} </p>`;
};

// Llamar a updateTaskList cuando la página se carga para mostrar las tareas guardadas
document.addEventListener('DOMContentLoaded', updateTaskList);