<?php
// Declaring variables
$servername = "localhost";
$username = "root";
$password = "root";
$database = "first-build";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    $Status = '<div id="Connection-Status" style="color: red;">Connection failed: ' . $conn->connect_error . '</div>';
}else {
    $Status = '<div id="Connection-Status" style="color: green;">Connection successful<br /></div>';
}

// Push html status
echo $Status;
?>
