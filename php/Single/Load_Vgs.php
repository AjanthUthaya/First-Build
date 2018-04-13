<?php
// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add JsonResponse
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// MySQLi statement
$QueryGetClasses = 'SELECT classes.id, classes.vgs, programs.code, classes.separator, years.title
FROM classes
INNER JOIN programs ON classes.program_id = programs.id
INNER JOIN years ON classes.year_id = years.id
ORDER BY years.title, classes.vgs, programs.code, classes.separator';

if (!($stmt = $conn->prepare($QueryGetClasses))) {
    JsonResponse("Error", "", "Prepareing statement");
    exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "", "Executing statement");
    exit();
}

$stmt->store_result();

$stmt->bind_result($Id, $Vgs, $Code, $Separator, $Title);

$ResultClasses = array();

if ($stmt->num_rows !== 0) {
  while ($row = $stmt->fetch()) {

    // Push every row into array with key
    array_push($ResultClasses, array(
      'Id' => $Id,
      'Title' => $Vgs . $Code . $Separator . ' (' . $Title . ')'
    ));

  }
} else {
  array_push($ResultClasses, array(
    'Id' => '0',
    'Title' => 'No classes in DB'
  ));
}

// Close prepared statement
$stmt->close();

echo json_encode($ResultClasses);

// Close connection
$conn->close();
