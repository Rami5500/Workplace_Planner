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
$taskName = $_POST["taskName"];

// Save the task to the database
$sql = "INSERT INTO tasks (user_id, task_name, list_name) VALUES (?, ?, 'todo')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $userId, $taskName);
$stmt->execute();

// Close the database connection
$stmt->close();
$conn->close();

echo "Task saved successfully!";
?>
