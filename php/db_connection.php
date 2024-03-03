<?php
$servername = "127.0.0.1";
$username = "project_user";
$password = "Local5500Host";
$dbname = "workplace_planner_db";

// Creates connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Checks connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
