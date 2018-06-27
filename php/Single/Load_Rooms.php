<?php

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to return json response
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');

// MySQLi statement
$QueryLoadRooms = "SELECT * FROM rooms";

// Connect and run query
$ResultLoadRooms = $conn->query($QueryLoadRooms);

if ($ResultLoadRooms->num_rows > 0) {
      // While query is running get results
      while ($Result_Item = $ResultLoadRooms->fetch_array()) {
          $Result_Array[] = $Result_Item;
      }
} else {
  // No results found, display error
  ReportStatus("Failed", "Failed to load room list, try and refresh");
}

// Display JSON object
echo json_encode($Result_Array);


// Close connection
$conn->close();
 ?>
