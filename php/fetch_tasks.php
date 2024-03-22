<?php
session_start();

// Checks if the user is logged in
if (!isset($_SESSION["user_id"])) {
    header("Location: user_login.php");
    exit();
}

require_once("db_connection.php");

$userId = $_SESSION["user_id"];

// https://www.w3schools.com/php/php_mysql_select_where.asp
// Fetches tasks for the user from the database
$sql = "SELECT task_id, task_name, list_name, created_at FROM tasks WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

// Fetches tasks as an associative array
$tasks = array();
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

// Closes the database connection
$stmt->close();
$conn->close();

// Returns tasks as JSON
header('Content-Type: application/json');
echo json_encode($tasks);
