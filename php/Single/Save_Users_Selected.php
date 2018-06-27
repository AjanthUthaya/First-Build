<?php

// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add JsonResponse
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// ----------   ---------- //
// START: Declaring POST values
// ----------   ---------- //

// Decode JSON array
$UsersSelectedPost = json_decode($_POST['UsersSelected']);

// Declareing Class_Id
$Class_Id = $_POST['Class_Id'];


// Declare new UsersSelected array
$UsersSelected = array();

// Loop through old json array and push only values
foreach ($UsersSelectedPost as $key => $value) {
  foreach ($value as $key => $value) {
    $UsersSelected[] = $value;
  }
}

// ----------   ---------- //
// END: Declaring POST values
// ----------   ---------- //



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
if (!$stmt->bind_param('i', $Class_Id)) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}


// Store results
$stmt->store_result();

// Bind results to variables
$stmt->bind_result($Result_Id);


// Define array to store values
$UsersSelectedDB = array();


// Check if result is empty
if ($stmt->num_rows !== 0) {

  // Loop through rows and store it in an array
  while ($row = $stmt->fetch()) {
    $UsersSelectedDB[] = $Result_Id;
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

// Define array of user_id to be deleted
$UsersDelete = [];

// Define array of user_id to be inserted
$UsersInsert = [];


// Loop thourgh and check if user_id does not exists in UsersSelected
foreach ($UsersSelectedDB as $key) {
  if (!in_array($key, $UsersSelected)) {
    $UsersDelete[] = $key;
  }
}


// Loop thourgh and check if user_id exists in UsersSelectedDB
foreach ($UsersSelected as $key) {
  if (!in_array($key, $UsersSelectedDB)) {
    $UsersInsert[] = $key;
  }
}

// ----------   ---------- //
// END: Compare, create UsersDelete and UsersInsert
// ----------   ---------- //



// ----------   ---------- //
// START: Delete all users in $UsersDelete
// ----------   ---------- //

if (count($UsersDelete) !== 0) {

  // MySQLi statement
  $QueryDelete = 'DELETE FROM class_order WHERE user_id = ? AND class_id = ?';

  // Delete user into DB
  if (!($stmt = $conn->prepare($QueryDelete))) {
    ReportStatus("Error", "Prepareing statement");
    exit();
  }

  // __________ Loop through $UsersInsert and insert all values __________ //

  foreach ($UsersDelete as $User_Id) {

    // Bind parameters
    if (!$stmt->bind_param("ii", $User_Id, $Class_Id)) {
      ReportStatus("Error", "Binding parameters");
      exit();
    }

    // Execute statement
    if (!$stmt->execute()) {
      ReportStatus("Error", "Executeing statement");
      exit();
    }

  }

  // __________ Loop through $UsersInsert and insert all values __________ //

  // Close prepared statement
  $stmt->close();

}

// ----------   ---------- //
// END: Delete all users in $UsersDelete
// ----------   ---------- //



// ----------   ---------- //
// START: Insert all users in $UsersDelete
// ----------   ---------- //

if (count($UsersInsert) !== 0) {

  // MySQLi statement
  $QueryInsert = 'INSERT INTO class_order (user_id, class_id)
  VALUES (?, ?)';

  // Insert user into DB
  if (!($stmt = $conn->prepare($QueryInsert))) {
    ReportStatus("Error", "Prepareing statement");
    exit();
  }


  // __________ Loop through $UsersInsert and insert all values __________ //

  foreach ($UsersInsert as $User_Id) {

    // Bind parameters
    if (!$stmt->bind_param("ii", $User_Id, $Class_Id)) {
      ReportStatus("Error", "Binding parameters");
      exit();
    }

    // Execute statement
    if (!$stmt->execute()) {
      ReportStatus("Error", "Executeing statement");
      exit();
    }

  }

  // __________ Loop through $UsersInsert and insert all values __________ //


  // Close prepared statement
  $stmt->close();

}

// ----------   ---------- //
// END: Insert all users in $UsersDelete
// ----------   ---------- //



JsonResponse("Done", "Successfully updated", "Successfully updated class participants");
exit();
