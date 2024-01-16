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

//Calendar Functionality
//https://www.geeksforgeeks.org/how-to-create-a-dynamic-calendar-in-html-css-javascript/
// Define an array to store events
let events = [];
 
// letiables to store event input fields and reminder list
let eventDateInput =
    document.getElementById("eventDate");
let eventTitleInput =
    document.getElementById("eventTitle");
let eventDescriptionInput =
    document.getElementById("eventDescription");
let reminderList =
    document.getElementById("reminderList");
 
// Counter to generate unique event IDs
let eventIdCounter = 1;
 
// Function to add events
function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;
 
    if (date && title) {
        // Create a unique event ID
        let eventId = eventIdCounter++;
 
        events.push(
            {
                id: eventId, date: date,
                title: title,
                description: description
            }
        );
        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();
    }
}
 
// Function to delete an event by ID
function deleteEvent(eventId) {
    // Find the index of the event with the given ID
    let eventIndex =
        events.findIndex((event) =>
            event.id === eventId);
 
    if (eventIndex !== -1) {
        // Remove the event from the events array
        events.splice(eventIndex, 1);
        showCalendar(currentMonth, currentYear);
        displayReminders();
    }
}
 
// Function to display reminders
function displayReminders() {
    reminderList.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() ===
            currentMonth &&
            eventDate.getFullYear() ===
            currentYear) {
            let listItem = document.createElement("li");
            listItem.innerHTML =
                `<strong>${event.title}</strong> - 
            ${event.description} on 
            ${eventDate.toLocaleDateString()}`;
 
            // Add a delete button for each reminder item
            let deleteButton =
                document.createElement("button");
            deleteButton.className = "delete-event";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteEvent(event.id);
            };
 
            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        }
    }
}
 
// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" +
            year + "'>" + year + "</option>";
    }
    return years;
}
 
// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
 
createYear = generate_year_range(1970, 2050);
 
document.getElementById("year").innerHTML = createYear;
 
let calendar = document.getElementById("calendar");
 
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let days = [
    "Sun", "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat"];
 
$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" +
        days[dhead] + "'>" +
        days[dhead] + "</th>";
}
$dataHead += "</tr>";
 
document.getElementById("thead-month").innerHTML = $dataHead;
 
monthAndYear =
    document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
 
// Function to navigate to the next month
function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
 
// Function to navigate to the previous month
function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
 
// Function to jump to a specific month and year
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}
 
// Function to display the calendar
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
 
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span";
 
                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.className = "date-picker selected";
                }
 
                // Check if there are events on this date
                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                    cell.appendChild(
                        createEventTooltip(date, month, year)
                 );
                }
 
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
 
    displayReminders();
}
 
// Function to create an event tooltip
function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    let eventsOnDate = getEventsOnDate(date, month, year);
    for (let i = 0; i < eventsOnDate.length; i++) {
        let event = eventsOnDate[i];
        let eventDate = new Date(event.date);
        let eventText = `<strong>${event.title}</strong> - 
            ${event.description} on 
            ${eventDate.toLocaleDateString()}`;
        let eventElement = document.createElement("p");
        eventElement.innerHTML = eventText;
        tooltip.appendChild(eventElement);
    }
    return tooltip;
}
 
// Function to get events on a specific date
function getEventsOnDate(date, month, year) {
    return events.filter(function (event) {
        let eventDate = new Date(event.date);
        return (
            eventDate.getDate() === date &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
        );
    });
}
 
// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}
 
// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
 
// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);

// Function to open the Add Event popup
function openAddEventPopup() {
    var modal = document.getElementById("addEventModal");
    modal.style.display = "block";
}

// Function to close the Add Event popup
function closeAddEventPopup() {
    var modal = document.getElementById("addEventModal");
    modal.style.display = "none";
}
