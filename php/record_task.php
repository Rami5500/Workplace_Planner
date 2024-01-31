<?php
session_start();
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $task_description = $_POST['taskDescription'];
    $duration = $_POST['duration'];
    $time_from = $_POST['timeFrom'];  // Get start time from client
    $time_to = $_POST['timeTo'];  // Get end time from client

    // Insert new record with provided start and end times
    $insertQuery = "INSERT INTO timesheets (user_id, task_name, time_from, time_to, status, hours) VALUES ($user_id, '$task_description', '$time_from', '$time_to', 'recorded', '$duration')";

    if ($conn->query($insertQuery) === TRUE) {
        echo 'Task recorded successfully';
    } else {
        echo 'Error recording task: ' . $conn->error;
    }
} else {
    echo 'Invalid request method';
}

$conn->close();
?>
