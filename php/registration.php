<?php
// Include the database connection file
include 'db_connection.php';

session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repeat_password = $_POST['repeat_password'];

    // Basic validation
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($repeat_password)) {
        echo "All fields are required.";
        exit;
    }

    if ($password !== $repeat_password) {
        echo "Passwords do not match.";
        exit;
    }

    // Hash the password securely
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Determine the role
    $role = $_POST['role'];

    // Initialize manager_id to null
    $manager_id = null;

    // Check if the user is a manager and a manager's name is provided
    if ($role == 'manager' && !empty($_POST['manager_name'])) {
        // Get manager's name from the form
        $manager_name = $_POST['manager_name'];

        // Fetch the manager's user_id
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE CONCAT(first_name, ' ', last_name) = ?");
        $stmt->bind_param("s", $manager_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            // Manager exists, get the manager's user_id
            $manager = $result->fetch_assoc();
            $manager_id = $manager['user_id'];
            echo "Manager ID: $manager_id<br>";
        } else {
            // Manager doesn't exist, handle accordingly (you can add error messages or create the manager)
            echo "Manager does not exist. Please register the manager first.";
            $stmt->close();
            exit;
        }

        $stmt->close();
    } else {
        // Set manager_id to null for non-managers
        $manager_id = null;
    }

    // Check if the user is a manager and manager_id is still null
    if ($role == 'employee' && empty($_POST['manager_id'])) {
        echo "Error: Please select a manager.";
        exit;
    }

    // Set manager_id based on the selected manager or null for managers
    $manager_id = ($role == 'employee') ? $_POST['manager_id'] : null;

    // Prepare and bind the statement with placeholders
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $first_name, $last_name, $email, $hashed_password, $role, $manager_id);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Registration successful!<br>";
        echo "First Name: $first_name<br>";
        echo "Last Name: $last_name<br>";
        echo "Email: $email<br>";
        echo "Role: $role<br>";
        echo "Manager ID: $manager_id<br>"; 
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();

    // Redirect to login page or dashboard after successful registration
    header("Location: /Workplace_Planner/user_login.php");
    exit;
}
?>
