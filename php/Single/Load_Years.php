<?php
// DB config file
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');


// SQL Query
$sql = "SELECT id, title
FROM years
WHERE UNIX_TIMESTAMP(STR_TO_DATE(Concat(SUBSTRING_INDEX(end_date, '-', -1), '-01-01'), '%Y-%m-%d'))
>=
UNIX_TIMESTAMP(STR_TO_DATE(Concat(YEAR(CURDATE()), '-01-01'), '%Y-%m-%d'))
ORDER BY title";

// Run query
$result = $conn->query($sql);

// Check if result is empty
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
