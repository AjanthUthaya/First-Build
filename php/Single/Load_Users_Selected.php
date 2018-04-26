<?php

// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Add JsonResponse
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// Check if post value['Class_Id'] is int
if (is_numeric($_POST['Class_Id'])) {
  $Class_Id = (int)$_POST['Class_Id'];
} else {
  JsonResponse("Error", "", "Class id is not an integer");
  exit();
}

// ----------   ---------- //
// START: Get class details
// ----------   ---------- //

// MySQLi statement
$QueryClass = 'SELECT classes.id, programs.program, programs.`code`, years.title, classes.vgs, classes.separator
FROM classes
INNER JOIN programs ON programs.id = classes.program_id
INNER JOIN years ON years.id = classes.year_id
WHERE classes.id = ?';


if (!($stmt = $conn->prepare($QueryClass))) {
  JsonResponse("Error", "", "Prepareing statement");
  exit();
}

if (!$stmt->bind_param("i", $Class_Id)) {
  ReportStatus("Error", "Binding parameters");
  exit();
}

if (!$stmt->execute()) {
  JsonResponse("Error", "", "Executing statement");
  exit();
}

// Store results
$stmt->store_result();

// Bind results to variables
$stmt->bind_result($Result_Id, $Result_Program, $Result_Code, $Result_Title, $Result_Vgs, $Result_Separator);


// Define array to store results
$ResultClassUsers = array();

// Check if result is empty
if ($stmt->num_rows == 0) {
  JsonResponse("Failed", "", "Class not found");
  exit();
}

// Loop through results
while ($row = $stmt->fetch()) {

  array_push($ResultClassUsers, array(
    'Id' => $Result_Id,
    'Program' => $Result_Program,
    'Code' =>  $Result_Vgs . $Result_Code . $Result_Separator,
    'Year' => $Result_Title
  ));

}

// Close prepared statement
$stmt->close();

// ----------   ---------- //
// END: Get class details
// ----------   ---------- //



// ----------   ---------- //
// START: Load all selected users with class id x
// ----------   ---------- //



// MySQLi statement
$QueryUsersSelected = 'SELECT user_id
FROM class_order
WHERE class_id = ?';


if (!($stmt = $conn->prepare($QueryUsersSelected))) {
  JsonResponse("Error", "", "Prepareing statement");
  exit();
}

if (!$stmt->bind_param("i", $Class_Id)) {
  ReportStatus("Error", "Binding parameters");
  exit();
}

if (!$stmt->execute()) {
  JsonResponse("Error", "", "Executing statement");
  exit();
}


// Store results
$stmt->store_result();

// Bind results to variables
$stmt->bind_result($Result_UsersSelected);


// Define array to store results
$UsersSelected = array();


// Check if result is empty
if ($stmt->num_rows !== 0) {

  // Loop through results
  while ($row = $stmt->fetch()) {
    array_push($UsersSelected, array(
      'Id' => $Result_UsersSelected
    ));
  }

}

// Close prepared statement
$stmt->close();



// ----------   ---------- //
// START: Load all selected users with class id x
// ----------   ---------- //



// Declare response array
$ResponseArray = array(
  'Status' => 'Done',
  'Title' => 'Selected user list',
  'Message' => 'Successfully loaded selected user list',
  'Id' => $ResultClassUsers[0]['Id'],
  'Program' => $ResultClassUsers[0]['Program'],
  'Code' => $ResultClassUsers[0]['Code'],
  'Year' => $ResultClassUsers[0]['Year'],
  'data' => $UsersSelected
);




// Send results
echo json_encode($ResponseArray);

// Close connection
$conn->close();
