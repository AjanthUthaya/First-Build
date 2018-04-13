<?php
// DB config file
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');


$sql = "SELECT id, title FROM years WHERE UNIX_TIMESTAMP(STR_TO_DATE(end_date, '%d-%m-%Y %H:%i')) >= UNIX_TIMESTAMP() ORDER BY title";
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
      'text' => $row['title']
    ));
}

// NOTE: No åøæ allowed in json it causes a parse error

echo json_encode($Array);


$conn->close();
