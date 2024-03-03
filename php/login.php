<?php
include 'db_connection.php';

// Starts a session
session_start();

// Checks if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Some validation
    if (empty($email) || empty($password)) {
        echo "Email and password are required.";
        exit;
    }

    // Checks if the user exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // Verifys the password
        if (password_verify($password, $user['password'])) {
            // Store user information in the session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            $_SESSION['role'] = $user['role'];

            echo "Login successful! Welcome, " . $user['first_name'] . " " . $user['last_name'];

            // Redirected based on user is an employee or manager
            if ($user['role'] == 'employee') {
                header("Location: /Workplace_Planner/dashboard.php");
            } elseif ($user['role'] == 'manager') {
                header("Location: /Workplace_Planner/manager_dashboard.php");
            }

            exit;
        } else {
            echo "Incorrect password.<br>";
        }

    } else {
        echo "User not found.<br>";
    }

    $stmt->close();
}
?>
