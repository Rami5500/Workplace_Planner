<!--https://codeshack.io/secure-login-system-php-mysql/
https://www.geeksforgeeks.org/how-to-display-logged-in-user-information-in-php/
Used the above links to help me with the login.php-->

<?php
// Include the database connection file
include 'db_connection.php';

// Start a session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Basic validation
    if (empty($email) || empty($password)) {
        echo "Email and password are required.";
        exit;
    }

    // Check if the user exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Store user information in the session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];

            echo "Login successful! Welcome, " . $user['first_name'] . " " . $user['last_name'];

            // Redirect to the dashboard or any other page
            header("Location: /Workplace_Planner/dashboard.php");
            exit;
        } else {
            echo "Incorrect password.<br>";
        }
    } else {
        echo "Incorrect password.<br>";
    }

    $stmt->close();
}
?>
