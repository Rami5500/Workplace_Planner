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


//Timesheet page functionality
$(document).ready(function () {
    // Timer functionality
    let timer;
    let startTime;
    let isTimerRunning = false;

    function startTimer() {
        isTimerRunning = true;
        startTime = new Date();
        timer = setInterval(updateTimerDisplay, 1000);
    }

    function updateTimerDisplay() {
        const currentTime = new Date();
        const elapsedMilliseconds = currentTime - startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        $('#timerDisplay').text(formattedTime);
    }

    function padZero(number) {
        return (number < 10) ? `0${number}` : number;
    }

    // Task recording functionality
    $('#recordTask').click(function () {
        const taskDescription = $('#taskDescription').val();
        const currentTime = getCurrentTime();

        // Check if the timer is running before recording
        if (isTimerRunning) {
            stopTimer();
        }

        // Append a new row to the timesheet table
        $('#timesheetBody').append(`
            <tr>
                <td>${getCurrentDate()}</td>
                <td>${taskDescription}</td>
                <td>${startTime.toLocaleTimeString()}</td>
                <td>${currentTime}</td> <!-- Show stop time as well -->
                <td>Started</td>
                <td></td>
                <td>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        `);

        // Clear the task description input
        $('#taskDescription').val('');
    });

    function stopTimer() {
        isTimerRunning = false;
        clearInterval(timer);
        $('#timerDisplay').text('00:00:00'); // Reset the timer display
    }

    // Start the timer when the "Start Timer" button is clicked
    $('#startTimer').click(function () {
        startTimer();
    });

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = padZero(now.getMonth() + 1); // Months are 0-indexed
        const day = padZero(now.getDate());

        return `${year}-${month}-${day}`;
    }
});
