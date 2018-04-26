<?php

// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add JsonResponse
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// Decode JSON array
$UsersSelected = json_decode($_POST['UsersSelected'], true);



// ----------   ---------- //
// START: Get UsersSelectedDB from db using Class_Id
// ----------   ---------- //

// MySQLi statement
$QueryUsersSelected = 'SELECT user_id
FROM class_order
WHERE class_id = ?';

// Prepareing statement
if (!($stmt = $conn->prepare($QueryUsersSelected))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// Binding parameters
if (!$stmt->bind_param('i', $_Post['Class_Id'])) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}

// Store results from query
$Result_UsersSelected = $stmt->get_result();

// Define array to store values
$UsersSelectedDB = array();


// Check if result is empty
if ($Result_UsersSelected->num_rows !== 0) {

  // Loop through rows and store it in an array
  while ($row = $Result_UsersSelected->fetch_assoc()) {
    $UsersSelectedDB[] = $row;
  }
}

// Close prepared statement
$stmt->close();

// ----------   ---------- //
// END: Get UsersSelectedDB from db using Class_Id
// ----------   ---------- //



// ----------   ---------- //
// START: Compare, create UsersDelete and UsersInsert
// ----------   ---------- //


foreach ($UsersSelected as $key => $value) {

  // Define user id
  $User_Id = $value;


  foreach ($UsersSelectedDB as $key => $value) {
    if ($User_Id == $value) {

      

    }
  }
}

// ----------   ---------- //
// END: Compare, create UsersDelete and UsersInsert
// ----------   ---------- //



JsonResponse("Failed", "", $UsersSelected);
exit();
