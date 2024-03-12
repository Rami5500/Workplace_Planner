<?php
session_start();

// Checks if the user is logged in
if (!isset($_SESSION["user_id"])) {
    header("Location: user_login.php");
    exit();
}

require_once("db_connection.php");

$userId = $_SESSION["user_id"];
$taskId = $_POST["taskId"];
$taskName = $_POST["taskName"];

// Saves the task to the database with creation date and time
$sql = "INSERT INTO tasks (user_id, task_name, list_name, created_at) VALUES (?, ?, 'todo', NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $userId, $taskName);
$stmt->execute();

// Closes the database connection
$stmt->close();

echo "Task saved successfully!";
?>
