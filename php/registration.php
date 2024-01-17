<!--https://www.phptutorial.net/php-tutorial/php-registration-form/-->
<!--Used the above link to help me with the registration page-->

<?php
// Include the database connection file
include 'db_connection.php';

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

    // Prepare and bind the statement with placeholders
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Registration successful!<br>";
        echo "First Name: $first_name<br>";
        echo "Last Name: $last_name<br>";
        echo "Email: $email<br>";
        // ... you can add more details
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
    
    // Redirect to login page or dashboard after successful registration
    header("Location: login.html");
    exit;
}
?>
