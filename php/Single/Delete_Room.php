<?php
// DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');

// Declare post variable
$Room_Id = $_POST['Room_Id'];

// MySQLi statement to delete room
$DelRoomQuery = "DELETE FROM rooms WHERE id = '$Room_Id'";
// Connect and run query
if ($conn->query($DelRoomQuery)) {
  ReportStatus("Done", "Room deleted");
} else {
  ReportStatus("Failed", "Query failed to delete room");
  exit();
}

// Close connection
$conn->close();
 ?>
