$(document).ready(function () {
    let timer;
    let startTime;
    let endTime;
    let entryIDFromServer;

    function startTimer() {
        startTime = new Date();
        timer = setInterval(updateTimerDisplay, 1000);

        // Displays the initial record information
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

        displayRecordInfo(
            $('#taskDescription').val(),
            startTime.toISOString(),
            endTime.toISOString(),
            $('#timerDisplay').text()
        );

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
                // Fetches and displays timesheets after recording task
                fetchTimesheets();
            },
            error: function (error) {
                console.error('Error recording task:', error);
            }
        });
    });

    // Function to display record information dynamically
    function displayRecordInfo(taskName, timeFrom) {
        const formattedTimeFrom = new Date(timeFrom).toLocaleString();
        
        $('#recordInfo').html(`
            <strong>Task:</strong> ${taskName} <br>
            <strong>Time From:</strong> ${formattedTimeFrom} <br>
        `);
    }
    
    $(document).on('click', '.approve-btn', function () {
        const entryID = $(this).data('entry-id');
    
        updateStatus(entryID, 'Approved');
    });
    
    $(document).on('click', '.reject-btn', function () {
        const entryID = $(this).data('entry-id');
    
        updateStatus(entryID, 'Rejected');
    });
    
    // Function to update status
    function updateStatus(entryID, status) {
        $.ajax({
            url: 'php/update_status.php',
            type: 'POST',
            data: {
                entryID: entryID,
                status: status
            },
            success: function (response) {
                console.log(response);
    
                // Fetches and displays timesheets after updating status
                fetchTimesheets();
            },
            error: function (error) {
                console.error('Error updating status:', error);
            }
        });
    }
    
    // Fetches and displays timesheets on page load
    fetchTimesheets();

    // Function to fetch and display timesheets
    function fetchTimesheets() {
        $.ajax({
            url: 'php/fetch_timesheets.php',
            type: 'GET',
            success: function (response) {
                // Handles the response from the server
                $('#timesheetBody').html(response);
            },
            error: function (error) {
                console.error('Error fetching timesheets:', error);
            }
        });
    }
});

$(document).on('click', '.delete-btn', function () {
    const entryID = $(this).data('entry-id');

    // Makes an AJAX call to delete the entry
    $.ajax({
        url: 'php/delete_entry.php',
        type: 'POST',
        data: {
            entryID: entryID
        },
        success: function (response) {
            // Handles the response from the server
            console.log(response);

            // Fetches and displays timesheets after deleting entry
            fetchTimesheets();
        },
        error: function (error) {
            console.error('Error deleting entry:', error);
        }
    });
});
