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
    require '../Functions/ReportStatus.php';
    ReportStatus("Error", "DB: Connection failed");
    die();
    // For testing: $conn->connect_error
} else {
    $Status = 'DB: Connection successful';
}

// Show connection status to the db
// '<div id="Connection-Status" style="color: green;">DB: Connection successful</div>'
// echo $Status;
