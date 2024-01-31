<?php
session_start();
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entryID = $_POST['entryID'];

    // Delete entry from timesheets table
    $deleteQuery = "DELETE FROM timesheets WHERE entry_id = $entryID";

    if ($conn->query($deleteQuery) === TRUE) {
        echo 'Entry deleted successfully';
    } else {
        echo 'Error deleting entry: ' . $conn->error;
    }
} else {
    echo 'Invalid request method';
}

$conn->close();
?>
