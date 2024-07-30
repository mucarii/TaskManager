document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('edit-task-input');
    const saveButton = document.getElementById('save-task-button');

    // Carrega a tarefa a ser editada
    const taskToEdit = localStorage.getItem('taskToEdit');
    if (taskToEdit) {
        taskInput.value = taskToEdit;
    }

    // Salva as alterações
    saveButton.addEventListener('click', function() {
        const updatedTaskText = taskInput.value.trim();
        if (updatedTaskText) {
            // Atualiza a tarefa no localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task => task.text === taskToEdit ? { text: updatedTaskText, completed: task.completed } : task);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            localStorage.removeItem('taskToEdit');
            alert('Tarefa atualizada!');
            window.location.href = 'index.html';
        }
    });
});
