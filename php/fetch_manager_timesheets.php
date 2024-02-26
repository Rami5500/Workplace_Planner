<?php
session_start();
include("db_connection.php"); 

$manager_id = $_SESSION['user_id'];
$timesheets = [];

try {
    $result = $conn->query("SELECT * FROM timesheets WHERE manager_id = $manager_id");
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $timesheets[] = $row;
        }
        echo json_encode($timesheets);
    } else {
        echo json_encode(['error' => 'Failed to fetch timesheets.']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
