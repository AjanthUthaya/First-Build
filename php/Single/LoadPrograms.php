<?php
// DB config file
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');


$sql = "SELECT * FROM programs ORDER BY program";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "";
    exit();
}

// Define array
$Array = array();

while ($row = $result->fetch_assoc()) {
    // Push every row into array with key
    array_push($Array, array(
      'value' => $row['id'],
      'text' => $row['program'] . ' ('.$row['code'].')'
    ));
}

echo json_encode($Array);


$conn->close();
