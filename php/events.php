<?php
// Include database connection
include("db_connection.php");

session_start();

// Checks if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: user_login.php");
    exit();
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['addEvent'])) {
    // Sanitize input data

    $eventTitle = $_POST['eventTitle'];
    $eventDate = $_POST['eventDate'];
    $eventDescription = $_POST['eventDescription'];

    // Get user ID from the session
    $userId = $_SESSION['user_id'];

    // Insert event into the database
    $sql = "INSERT INTO events (user_id, event_title, event_date, event_description) 
            VALUES ('$userId', '$eventTitle', '$eventDate', '$eventDescription')";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        echo "Event added successfully.";
    } else {
        echo "Error adding event: " . mysqli_error($conn);
    }

    // Redirect to calendar page
    header("Location: /Workplace_Planner/calendar.php");
}
?>
