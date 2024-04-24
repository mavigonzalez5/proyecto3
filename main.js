let idCounter = 0;
const input = document.querySelector('input[type="text"]');
const list = document.querySelector('#list'); 
const stats = document.querySelector('#stats');
const sectionSinTareas = document.querySelector('.section1');

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

userInput.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();
});

let addTask = () => {
    idCounter++;

    let newValue = input.value;

    let newTask = {
        id: idCounter,
        text: newValue,
        completed: false,
    };

    let tasks = getTasksFromLocalStorage();

    // Agregar la nueva tarea a la lista
    tasks.push(newTask);

    // Guardar la lista actualizada de tareas en el Local Storage
    saveTasksToLocalStorage(tasks);

    // Actualizar la lista de tareas en la página
    updateTaskList();
}
    function updateTaskList() {
        // Obtener todas las tareas del Local Storage
        let tasks = getTasksFromLocalStorage();
    
        // Limpiar la lista de tareas en la página
        list.innerHTML ='';

    // if(list.length < 1){
    //     const mensaje = document.createElement("h3");
    //     mensaje.textContent = "No hay tareas pendientes";
    //     return
    // }

    list.innerHTML += `<div class="task-container" id="${tasks.id}">
    <label for=""> 
        <input type="checkbox" class="taskCheckbox">
            ${tasks.text}
    </label>
    <div>
        <img src="./images/cheque.png" alt="checkBtn" class="check">
        <img src="./images/eliminar.png" alt="closeBtn" class="closeBtn">
    </div>
    </div>`;

    input.value = '';
    sectionSinTareas.style.display = 'none';
    updateStats();
};

list.addEventListener('click', (event)=>{
    if(event.target.tagName === 'IMG' && event.target.classList.contains('check')) {
        updateStats();
    }
});

// let updateStats = () => {
//     let tasks = list.querySelectorAll('.task-container');
//     let completedTasks = list.querySelectorAll('.taskCheckbox:checked');
//     stats.innerHTML = `<p> Tareas pendientes: ${tasks.length - completedTasks.length} Completadas: ${completedTasks.length} </p>`;
// };

let updateStats = () => {
    // Obtiene todos los contenedores de tareas
    let tasks = list.querySelectorAll('.task-container');
    // Obtiene solo los checkboxes marcados como completados
    let completedTasks = list.querySelectorAll('.check:checked');
    // Actualiza el contenido de 'stats' con el número de tareas completadas y totales
    stats.innerHTML = `<p> Tareas pendientes: ${tasks.length - completedTasks.length} Completadas: ${completedTasks.length} </p>`;
};