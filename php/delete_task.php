<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    header("Location: user_login.php");
    exit();
}

require_once("db_connection.php"); // Include your database connection file

$userId = $_SESSION["user_id"];
$taskId = $_POST["taskId"];

// Delete the task from the database
$sql = "DELETE FROM tasks WHERE task_id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $taskId, $userId);
$stmt->execute();

// Close the database connection
$stmt->close();
$conn->close();

echo "Task deleted successfully!";
?>
