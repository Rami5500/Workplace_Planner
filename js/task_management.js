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

        // Updates the task's list_name and save to the database
        var taskId = draggedElement.id.replace("task", "");
        var listName = dropTarget.id.replace("-body", "");

        updateTaskList(taskId, listName);
    }
}

function createTaskCard(task) {
    var taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.id = "task" + task.task_id;
    taskCard.draggable = true;
    taskCard.addEventListener("dragstart", drag);

    // Task name
    var taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = task.task_name;
    taskCard.appendChild(taskName);

    // Date and time
    var taskDateTime = document.createElement("span");
    taskDateTime.className = "task-datetime";
    taskDateTime.textContent = formatDateTime(task.created_at);

    // Adds a line break
    taskCard.appendChild(document.createElement("br"));

    // Appends the date and time
    taskCard.appendChild(taskDateTime);

    // Delete button is added using "X"
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        deleteTask(task.task_id);
    });

    // Apply styling to the task card and delete button
    taskCard.style.position = "relative";
    taskCard.style.paddingRight = "30px";

    deleteButton.style.position = "absolute";
    deleteButton.style.top = "0";
    deleteButton.style.right = "0";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.fontWeight = "bold";
    deleteButton.style.color = "red";
    deleteButton.style.background = "none";
    deleteButton.style.border = "none";
    deleteButton.style.outline = "none";

    // Hover effect
    deleteButton.addEventListener("mouseover", function () {
        deleteButton.style.color = "darkred";
    });

    deleteButton.addEventListener("mouseout", function () {
        deleteButton.style.color = "red";
    });

    taskCard.appendChild(deleteButton);

    return taskCard;
}



function formatDateTime(timestamp) {
    var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };


    return new Date(timestamp).toLocaleDateString("en-UK", options);
}


function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var taskCard = createTaskCard({
        task_id: Date.now(), // Generates a temporary ID for the client side
        task_name: taskInput,
        list_name: "todo" 
    });

    document.getElementById("todo-body").appendChild(taskCard);
    document.getElementById("taskInput").value = ""; // Clears the input field

    // Saves the task to the database
    saveTaskToDatabase(taskCard.id, taskInput);
}

// https://stackoverflow.com/questions/15958738/how-do-i-do-an-ajax-call-to-a-database-using-javascript-a-url-and-a-key

function saveTaskToDatabase(taskId, taskName) {
    // Uses AJAX to save the task to the database
    $.ajax({
        type: "POST",
        url: "php/save_task.php",
        data: { taskId: taskId, taskName: taskName },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error saving task:", error);
        }
    });
}

// https://stackoverflow.com/questions/20404407/ajax-update-mysql-database-using-function-called-from-html-generated-from-php
function updateTaskList(taskId, listName) {
    // Uses AJAX to update the task's list_name in the database
    $.ajax({
        type: "POST",
        url: "php/update_task_list.php",
        data: { taskId: taskId, listName: listName },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error updating task list:", error);
        }
    });
}

//https://stackoverflow.com/questions/19446029/how-to-delete-record-using-ajax
function deleteTask(taskId) {
    // Uses AJAX to delete the task from the database
    $.ajax({
        type: "POST",
        url: "php/delete_task.php",
        data: { taskId: taskId },
        success: function (response) {
            console.log(response);
            // Removes the task from the UI
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

// https://stackoverflow.com/questions/24253454/request-data-from-server-using-ajax-and-jquery
// https://stackoverflow.com/questions/39393885/jquery-ajax-get-post-to-a-javascript-file
function fetchAndDisplayTasks() {
    // Uses AJAX to fetch tasks from the server
    $.ajax({
        type: "GET",
        url: "php/fetch_tasks.php",
        success: function (tasks) {
            // Processes the fetched tasks and display them on the kanban board
            displayTasksOnKanbanBoard(tasks);
        },
        error: function (error) {
            console.error("Error fetching tasks:", error);
        }
    });
}

function displayTasksOnKanbanBoard(tasks) {
    tasks.forEach(function (task) {
        // Creates a task card element
        var taskCard = createTaskCard(task);

        // Appends the task card to the appropriate Kanban column based on the list_name
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
                // Handles unknown list names or provide a default column
                break;
        }

        if (kanbanBody) {
            kanbanBody.appendChild(taskCard);
        }
    });
}

fetchAndDisplayTasks();
