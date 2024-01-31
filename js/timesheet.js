$(document).ready(function () {
    let timer;
    let startTime;
    let endTime;
    let entryIDFromServer;

    function startTimer() {
        startTime = new Date();
        timer = setInterval(updateTimerDisplay, 1000);

        // Display the initial record information
        displayRecordInfo('Recording...', startTime.toISOString(), 'N/A', 'N/A');
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

    // Event handler for the "Start Timer" button
    $('#startTimer').on('click', function () {
        startTimer();
    });

    // Event handler for the "Record Task" button
    $('#recordTask').on('click', function () {
        clearInterval(timer);
        endTime = new Date();

        // Display the complete record information
        displayRecordInfo(
            $('#taskDescription').val(),
            startTime.toISOString(),
            endTime.toISOString(),
            $('#timerDisplay').text()
        );

        // Send data to server (you may want to include the entryID if editing an existing task)
        $.ajax({
            url: 'php/record_task.php',
            type: 'POST',
            data: {
                taskDescription: $('#taskDescription').val(),
                duration: $('#timerDisplay').text(),
                timeFrom: startTime.toISOString(),
                timeTo: endTime.toISOString()
            },
            success: function (response) {
                console.log(response);
                // Fetch and display timesheets after recording task
                fetchTimesheets();
            },
            error: function (error) {
                console.error('Error recording task:', error);
            }
        });
    });

    // Function to display record information dynamically
    function displayRecordInfo(taskName, timeFrom) {
        // Format the date and time
        const formattedTimeFrom = new Date(timeFrom).toLocaleString();
        
        // Update the UI with the provided information
        $('#recordInfo').html(`
            <strong>Task:</strong> ${taskName} <br>
            <strong>Time From:</strong> ${formattedTimeFrom} <br>
        `);
    }
    

    $(document).on('click', '.delete-btn', function () {
        const entryID = $(this).data('entry-id');
    
        // Make an AJAX call to delete the entry
        $.ajax({
            url: 'php/delete_entry.php',
            type: 'POST',
            data: {
                entryID: entryID
            },
            success: function (response) {
                // Handle the response from the server
                console.log(response);
    
                // Fetch and display timesheets after deleting entry
                fetchTimesheets();
            },
            error: function (error) {
                console.error('Error deleting entry:', error);
            }
        });
    });
    

    // Fetch and display timesheets on page load
    fetchTimesheets();

    // Function to fetch and display timesheets
    function fetchTimesheets() {
        $.ajax({
            url: 'php/fetch_timesheets.php',
            type: 'GET',
            success: function (response) {
                // Handle the response from the server
                $('#timesheetBody').html(response);
            },
            error: function (error) {
                console.error('Error fetching timesheets:', error);
            }
        });
    }
});
