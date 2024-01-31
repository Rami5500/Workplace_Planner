//Task Management functionality
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropTarget = event.target;

    // Ensures the drop is on a valid target
    if (dropTarget.classList.contains("kanban-body")) {
        dropTarget.appendChild(draggedElement);
    }
}

function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.id = "task" + Date.now(); // Unique ID for each task
    taskCard.draggable = true;
    taskCard.addEventListener("dragstart", drag);

    taskCard.innerHTML = taskInput;

    document.getElementById("todo-body").appendChild(taskCard);
    document.getElementById("taskInput").value = ""; // Clear the input field
}
