<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the user ID from the session
    $userId = $_SESSION["user_id"];

    // Get the task order from the client
    $taskOrder = json_decode($_POST["taskOrder"]);

    // Update the database with the new task order
    require_once("db_connection.php"); 

    foreach ($taskOrder as $index => $taskId) {
        $listName = getListName($index);
        updateTaskOrder($userId, $taskId, $listName, $index);
    }

    // Close the database connection
    $conn->close();

    echo "Task order updated successfully!";
}

function getListName($index) {
    // Determine the list name based on the index
    switch ($index) {
        case 0:
            return "To-do";
        case 1:
            return "Doing";
        case 2:
            return "Done";
        default:
            return "unknown";
    }
}

function updateTaskOrder($userId, $taskId, $listName, $order) {
    // Update the database with the new task order
    global $conn;
    $stmt = $conn->prepare("UPDATE tasks SET list_name=?, list_order=? WHERE user_id=? AND task_id=?");
    $stmt->bind_param("ssii", $listName, $order, $userId, $taskId);
    $stmt->execute();
    $stmt->close();
}
?>
