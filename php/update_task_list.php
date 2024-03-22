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
$listName = $_POST["listName"];

// https://www.w3schools.com/php/php_mysql_update.asp
// Updates the task's list_name in the database
$sql = "UPDATE tasks SET list_name = ? WHERE task_id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $listName, $taskId, $userId);
$stmt->execute();

// Closes the database connection
$stmt->close();
$conn->close();

echo "Task list updated successfully!";
?>
