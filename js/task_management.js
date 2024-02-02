// task_management.js

// Task Management functionality
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

        // Update the task's list_name and save to the database
        var taskId = draggedElement.id.replace("task", "");
        var listName = dropTarget.id.replace("-body", "");

        updateTaskList(taskId, listName);
    }
}

function createTaskCard(task) {
    var taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.id = "task" + task.task_id; // Use the task_id as the unique ID
    taskCard.draggable = true;
    taskCard.addEventListener("dragstart", drag);

    // Task name
    var taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = task.task_name;
    taskCard.appendChild(taskName);

    // Delete button (X)
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        deleteTask(task.task_id);
    });

    // Apply styling to the task card and delete button
    taskCard.style.position = "relative";
    taskCard.style.paddingRight = "30px"; // Adjust the value as needed

    deleteButton.style.position = "absolute";
    deleteButton.style.top = "0";
    deleteButton.style.right = "0";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.fontWeight = "bold";
    deleteButton.style.color = "red"; // Change the color as desired
    deleteButton.style.background = "none";
    deleteButton.style.border = "none";
    deleteButton.style.outline = "none"; // Remove the outline

    // Optional: Add a hover effect
    deleteButton.addEventListener("mouseover", function () {
        deleteButton.style.color = "darkred"; // Change the color on hover
    });

    deleteButton.addEventListener("mouseout", function () {
        deleteButton.style.color = "red"; // Change back to the original color
    });

    taskCard.appendChild(deleteButton);

    return taskCard;
}


function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var taskCard = createTaskCard({
        task_id: Date.now(), // Generate a temporary ID for the client side
        task_name: taskInput,
        list_name: "todo" // Assuming new tasks are always added to the "todo" list
    });

    document.getElementById("todo-body").appendChild(taskCard);
    document.getElementById("taskInput").value = ""; // Clear the input field

    // Save the task to the database
    saveTaskToDatabase(taskCard.id, taskInput);
}

function saveTaskToDatabase(taskId, taskName) {
    // Use AJAX to save the task to the database
    $.ajax({
        type: "POST",
        url: "php/save_task.php", // Replace with the actual server-side script
        data: { taskId: taskId, taskName: taskName },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error saving task:", error);
        }
    });
}

function updateTaskList(taskId, listName) {
    // Use AJAX to update the task's list_name in the database
    $.ajax({
        type: "POST",
        url: "php/update_task_list.php", // Replace with the actual server-side script
        data: { taskId: taskId, listName: listName },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error updating task list:", error);
        }
    });
}

function deleteTask(taskId) {
    // Use AJAX to delete the task from the database
    $.ajax({
        type: "POST",
        url: "php/delete_task.php",
        data: { taskId: taskId },
        success: function (response) {
            console.log(response);
            // Remove the task from the UI
            var taskElement = document.getElementById("task" + taskId);
            if (taskElement) {
                taskElement.remove();
            }
        },
        error: function (error) {
            console.error("Error deleting task:", error);
        }
    });
}

function fetchAndDisplayTasks() {
    // Use AJAX to fetch tasks from the server
    $.ajax({
        type: "GET",
        url: "php/fetch_tasks.php", // Replace with the actual server-side script
        success: function (tasks) {
            // Process the fetched tasks and display them on the kanban board
            displayTasksOnKanbanBoard(tasks);
        },
        error: function (error) {
            console.error("Error fetching tasks:", error);
        }
    });
}

function displayTasksOnKanbanBoard(tasks) {
    tasks.forEach(function (task) {
        // Create a task card element
        var taskCard = createTaskCard(task);

        // Append the task card to the appropriate Kanban column based on the list_name
        var kanbanBody;
        switch (task.list_name) {
            case "todo":
                kanbanBody = document.getElementById("todo-body");
                break;
            case "doing":
                kanbanBody = document.getElementById("doing-body");
                break;
            case "done":
                kanbanBody = document.getElementById("done-body");
                break;
            default:
                // Handle unknown list names or provide a default column
                break;
        }

        if (kanbanBody) {
            kanbanBody.appendChild(taskCard);
        }
    });
}

fetchAndDisplayTasks();
