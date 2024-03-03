<!--https://www.phptutorial.net/php-tutorial/php-registration-form/-->
<!--Used the above link to help me with the registration page-->

<?php
include 'db_connection.php';

session_start();

// Checks if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collects form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repeat_password = $_POST['repeat_password'];
    $role = $_POST['role'];
    $manager_id = $_POST['manager_id'];

    // Some validation
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($repeat_password) || empty($role) || empty($manager_id)) {
        echo "All fields are required.";
        exit;
    }

    if ($password !== $repeat_password) {
        echo "Passwords do not match.";
        exit;
    }

    // The password is hashed securely
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepares and bind the statement with placeholders
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $first_name, $last_name, $email, $hashed_password, $role, $manager_id);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Registration successful!<br>";
        echo "First Name: $first_name<br>";
        echo "Last Name: $last_name<br>";
        echo "Email: $email<br>";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Closes the statement
    $stmt->close();

    // The user is redirected to the login page after successful registration
    header("Location: /Workplace_Planner/user_login.php");
    exit;

}
?>
