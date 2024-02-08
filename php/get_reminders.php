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
$events = array();
while ($row = mysqli_fetch_assoc($result)) {
    $events[] = array(
        'id' => $row['event_id'],
        'date' => $row['event_date'],
        'title' => $row['event_title'],
        'description' => $row['event_description']
    );
}

// Output events as JSON
header('Content-Type: application/json');
echo json_encode($events);
?>
