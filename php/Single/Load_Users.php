<?php

// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add JsonResponse
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// MySQLi statement
$QueryGetClasses = 'SELECT users.id, users.user_type, users.firstname, users.middlename, users.lastname, users.img_name
FROM users
WHERE active = "true"';

if (!($stmt = $conn->prepare($QueryGetClasses))) {
  JsonResponse("Error", "", "Prepareing statement");
  exit();
}

if (!$stmt->execute()) {
  JsonResponse("Error", "", "Executing statement");
  exit();
}

// Store results
$stmt->store_result();

// Bind results to variables
$stmt->bind_result($id, $user_type, $firstname, $middlename, $lastname, $img_name);


// Define array to store results
$ResultUsers = array();

// Check if result is empty
if ($stmt->num_rows == 0) {

  JsonResponse("Failed", "No users", "No users found");
  exit();

}

// Loop through results
while ($row = $stmt->fetch()) {

  // Push every row into array with key
  array_push($ResultUsers, array(
    'Id' => $id,
    'User_Type' => $user_type,
    'Firstname' => $firstname,
    'Middlename' => $middlename,
    'Lastname' => $lastname,
    'Img_Name' => $img_name
  ));

}

// Declare response array
$ResponseArray = array(
  'Status' => 'Done',
  'Title' => 'Load users',
  'Message' => 'Successfully loaded users list',
  'data' => $ResultUsers
);

// Close prepared statement
$stmt->close();

// Send results
echo json_encode($ResponseArray);

// Close connection
$conn->close();
