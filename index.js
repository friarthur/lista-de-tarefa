
let selectedItem = "";
let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

function selectItem(item) {
  selectedItem = item;
  updateSelectedTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    if (!tasks[selectedItem]) {
      tasks[selectedItem] = [];
    }

    tasks[selectedItem].push({ text: taskText, done: false });
    updateSelectedTasks();

    // Limpar o campo de entrada após adicionar a tarefa
    taskInput.value = "";

    // Salvar as tarefas no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function removeTask(item, index) {
  tasks[item].splice(index, 1);
  updateSelectedTasks();
  // Salvar as tarefas no localStorage após remover uma tarefa
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleDone(item, index) {
  tasks[item][index].done = !tasks[item][index].done;
  updateSelectedTasks();
  // Salvar as tarefas no localStorage após marcar/desmarcar como concluída
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateSelectedTasks() {
  const selectedTasks = document.getElementById("selectedTasks");
  selectedTasks.innerHTML = "";

  if (tasks[selectedItem]) {
    tasks[selectedItem].forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <div class="task-text">${task.text}</div>
        <input class="checkbox" type="checkbox" ${task.done ? "checked" : ""} onclick="toggleDone('${selectedItem}', ${index})">
        <button class="remove-button" onclick="removeTask('${selectedItem}', ${index})">Remover</button>
      `;
      selectedTasks.appendChild(taskItem);
    });
  }

  const message = selectedItem !== "" ? `Tarefas para ${selectedItem}` : "Selecione um item para ver as tarefas.";
  const placeholderItem = document.createElement("li");
  placeholderItem.textContent = message;
  selectedTasks.appendChild(placeholderItem);
}