<?php
// Include database connection
include("db_connection.php");

session_start();

// Checks if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: user_login.php");
    exit();
}

// Retrieve events for the logged-in user
$userId = $_SESSION['user_id'];
$sql = "SELECT event_id, user_id, event_title, event_date, event_description FROM events WHERE user_id = '$userId'";
$result = mysqli_query($conn, $sql);

// Fetch events and display them
while ($row = mysqli_fetch_assoc($result)) {
    echo "<li data-event-id='{$row['event_id']}'>";
    echo "<strong>{$row['event_title']}</strong> - {$row['event_description']} on {$row['event_date']}";
    echo "<button class='delete-event' onclick='deleteEvent({$row['event_id']})'>Delete</button>";
    echo "</li>";
}
?>
