// Função para adicionar tarefa à lista
function addTaskToList(taskText, completed = false) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    
    // Adiciona checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.onchange = function() {
        saveTasks();
    };

    // Adiciona botão de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function() {
        editTask(taskText);
    };

    // Adiciona botão de remover
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
        listItem.remove();
        saveTasks();
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(' ' + taskText));
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task.text, task.completed));
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children).map(li => {
        return {
            text: li.childNodes[1].textContent.trim(),
            completed: li.childNodes[0].checked
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona tarefa ao clicar no botão
document.getElementById('add-task-button').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToList(taskText);
        saveTasks();
        taskInput.value = '';
    }
});

// Função para redirecionar para a página de edição
function editTask(taskText) {
    localStorage.setItem('taskToEdit', taskText);
    window.location.href = 'edit-task.html';
}

// Carrega tarefas quando a página inicial é carregada
document.addEventListener('DOMContentLoaded', loadTasks);
