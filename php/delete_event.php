<?php
include("db_connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $eventId = $_POST['eventId'];

    // Prevent SQL injection
    $eventId = mysqli_real_escape_string($conn, $eventId);

    // Delete the event from the database
    $sql = "DELETE FROM events WHERE event_id = '$eventId'";
    if (mysqli_query($conn, $sql)) {
        echo "Event deleted successfully";
    } else {
        echo "Error deleting event: " . mysqli_error($conn);
    }
}
?>
