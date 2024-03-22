<?php
session_start();
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entryID = $_POST['entryID'];
    $status = $_POST['status'];

    // https://www.w3schools.com/php/php_mysql_update.asp
    // Updates status in timesheets table
    $updateQuery = "UPDATE timesheets SET status = '$status' WHERE entry_id = $entryID";

    if ($conn->query($updateQuery) === TRUE) {
        echo 'Status updated successfully';
    } else {
        echo 'Error updating status: ' . $conn->error;
    }
} else {
    echo 'Invalid request method';
}

$conn->close();
?>
