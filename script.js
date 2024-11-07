const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const editContainer = document.getElementById("editContainer");
const editInput = document.getElementById("editInput");
let tasks = [];
let editIndex = -1;

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#777";
    }

    // Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.className = "complete";
    completeButton.onclick = () => toggleComplete(index);

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    editButton.className = "edit";
    editButton.onclick = () => openEditMode(index);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✘";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteTask(index);

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  displayTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Function to open edit mode
function openEditMode(index) {
  editIndex = index;
  editInput.value = tasks[index].text;
  editContainer.style.display = "block";
}

// Function to submit edited task
function submitEdit() {
  if (editIndex > -1) {
    tasks[editIndex].text = editInput.value.trim();
    editIndex = -1;
    editContainer.style.display = "none";
    displayTasks();
  }
}

// Function to cancel edit mode
function cancelEdit() {
  editIndex = -1;
  editContainer.style.display = "none";
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
