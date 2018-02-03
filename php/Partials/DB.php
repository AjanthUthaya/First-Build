<?php
// Declaring variables
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "first-build";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die($Status = '<div id="Connection-Status" style="color: red;">Connection failed: ' . $conn->connect_error . '</div>');
} else {
    $Status = '<div id="Connection-Status" style="color: green;">Connection successful<br /></div>';
}

// Show connection status to the db
// echo $Status;
?>
