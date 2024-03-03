<?php
session_start();
include 'db_connection.php';

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Fetches timesheets for the current user
    $fetchQuery = "SELECT * FROM timesheets WHERE user_id = $user_id";
    $result = $conn->query($fetchQuery);

    if ($result->num_rows > 0) {
        // Displays timesheets in a table
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['time_from']}</td>
                    <td>{$row['task_name']}</td>
                    <td>{$row['time_from']}</td>
                    <td>{$row['time_to']}</td>
                    <td>{$row['status']}</td>
                    <td>{$row['hours']}</td>
                    <td><button class='delete-btn' data-entry-id='{$row['entry_id']}' style='background-color: red;'>Delete</button></td>
                  </tr>";
        }
    } else {
        echo "<tr><td colspan='7'>No timesheets available</td></tr>";
    }
} else {
    echo "User not logged in";
}

$conn->close();
?>
