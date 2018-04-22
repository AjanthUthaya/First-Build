<?php
// Start session
session_start();

// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// ---------- ---------- //
// START: Check if any of the POST values are empty
// ---------- ---------- //

// Required field names
$required = array(
  'Start_Date',
  'End_Date'
);

// Loop over field names, make sure each one exists and is not empty
$EmptyValues = false;
foreach ($required as $field) {
    if (empty($_POST[$field]) or $_POST[$field] == ' ') {
        $EmptyValues = true;
    }
}

if ($EmptyValues == true) {
  JsonResponse('Failed', 'Failed to add year', 'Empty values, please fill out all fields');
  exit();
}

// ---------- ---------- //
// END: Check if any of the POST values are empty
// ---------- ---------- //



// ---------- ---------- //
// START: If title is empty replace with default value
// ---------- ---------- //

if ($_POST['Title'] == '') {
  $Start_Date_Array = explode("-", $_POST['Start_Date']);
  $End_Date_Array = explode("-", $_POST['End_Date']);
  $_POST['Title'] = $Start_Date_Array[0] . '/' . $End_Date_Array[0];
}

// ---------- ---------- //
// END: If title is empty replace with default value
// ---------- ---------- //



// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');



// ---------- ---------- //
// START: Check if year title is already exists
// ---------- ---------- //

// MySQLi statement
$QueryCheckYear = "SELECT title, Start_Date, End_Date
FROM years
WHERE title = ?";

if (!($stmt = $conn->prepare($QueryCheckYear))) {
    JsonResponse("Error", "", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("s", $_POST['Title'])) {
    JsonResponse("Error", "", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "", "Executing statement");
    exit();
}

$result = $stmt->store_result();
if ($stmt->num_rows !== 0) {
    JsonResponse("Failed", "Year title is taken", "Year already exists");
    exit();
}

// Close prepared statement
$stmt->close();

// ---------- ---------- //
// END: Check if year title is already exists
// ---------- ---------- //



// Switch date values from YYYY-MM-DD to DD-MM-YYYY
$_POST['Start_Date'] = date("d-m-Y", strtotime($_POST['Start_Date']));
$_POST['End_Date'] = date("d-m-Y", strtotime($_POST['End_Date']));



// ---------- ---------- //
// START: Insert year into DB
// ---------- ---------- //

// Insert new year into DB (Prepared Statement)
if (!($stmt = $conn->prepare("INSERT INTO years (`title`, `start_date`, `end_date`) VALUES (?, ?, ?)"))) {
    JsonResponse("Error", "Query failed", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("sss", $_POST['Title'], $_POST['Start_Date'], $_POST['End_Date'])) {
    JsonResponse("Error", "Query failed", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "Query failed", "Executeing statement");
    exit();
}

// Close prepared statement
$stmt->close();

// ---------- ---------- //
// END: Insert year into DB
// ---------- ---------- //



// Send responce back to user
$Response['Status'] = 'Done';
$Response['Title'] = 'Year added';
$Response['Message'] = $_POST['Title'] . ' successfully added to years list';
$Response['Id'] = $conn->insert_id;
$Response['Title'] = $_POST['Title'];
$Response['Start_Date'] = $_POST['Start_Date'];
$Response['End_Date'] = $_POST['End_Date'];


// Encode array into JSON
$ResponseJSON = json_encode($Response);

// Send JSON array
echo $ResponseJSON;

// Close DB connection
$conn->close();
