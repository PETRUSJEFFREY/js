document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button class="delete" onclick="deleteTask(this)">X</button>
  `;

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.innerText.replace("X", ""),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list");
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task.text}</span>
      <button class="delete" onclick="deleteTask(this)">X</button>
    `;
    taskList.appendChild(li);
  });
}
