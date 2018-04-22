<?php
session_start();

// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// ---------- ---------- //
// START: Check if any of the POST values are empty
// ---------- ---------- //

// Required field names
$required = array(
  'Vgs',
  'Separator',
  'Program',
  'Year'
);

// Loop over field names, make sure each one exists and is not empty
$EmptyValues = false;
foreach ($required as $field) {
    if (empty($_POST[$field]) or $_POST[$field] == ' ') {
        $EmptyValues = true;
    }
}

if ($EmptyValues == true) {
  JsonResponse('Failed', 'Failed to add class', 'Empty values, please fill out all fields');
  exit();
}

// ---------- ---------- //
// END: Check if any of the POST values are empty
// ---------- ---------- //



// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');



// ---------- ---------- //
// START: Check if class already exists
// ---------- ---------- //

// MySQLi statement
$QueryCheckClasses = "SELECT *
FROM classes
WHERE `vgs` = ?
AND `program_id` = ?
AND `year_id` = ?
AND `separator` = ?";

if (!($stmt = $conn->prepare($QueryCheckClasses))) {
    JsonResponse("Error", "", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("iiis", $_POST['Vgs'], $_POST['Program'], $_POST['Year'], $_POST['Separator'])) {
    JsonResponse("Error", "", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "", "Executing statement");
    exit();
}

$result = $stmt->store_result();
if ($stmt->num_rows !== 0) {
    JsonResponse("Failed", "Class is taken", "Class already exists");
    exit();
}

// Close prepared statement
$stmt->close();

// ---------- ---------- //
// END: Check if class already exists
// ---------- ---------- //



// ----- Define exstra variables ----- //
// Creation_Id:
$Creation_Id = $_SESSION["User_Id"];

// Creation_Ip:
// Get user ip function
include($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/GetUserIp.php');
$Creation_Ip = getUserIP();

// Creation_Date:
// Set default timezone
date_default_timezone_set('Europe/Oslo');
// Date now (dd-mm-yyyy hh:mm)
$Creation_Date = date('d-m-Y H:i');



// ---------- ---------- //
// START: Insert class into DB
// ---------- ---------- //

// Insert new room into DB (Prepared Statement)
if (!($stmt = $conn->prepare("INSERT INTO classes (`vgs`, `program_id`, `separator`, `year_id`, `creation_id`, `creation_ip`, `creation_date`) VALUES (?, ?, ?, ?, ?, ?, ?)"))) {
    JsonResponse("Error", "Query failed", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("iisiiss", $_POST['Vgs'], $_POST['Program'], $_POST['Separator'], $_POST['Year'], $Creation_Id, $Creation_Ip, $Creation_Date)) {
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
// END: Insert class into DB
// ---------- ---------- //



// ---------- ---------- //
// START: Get data from inserted item
// NOTE: Droped this, currently just using JS to refresh
// ---------- ---------- //
/*
$Query = "SELECT  FROM table WHERE row = ?";

if (!($stmt = $conn->prepare($Query))) {
  JsonResponse("Error", "", "Prepareing statement");
  exit();
}

if (!$stmt->bind_param("s", $_POST['Value'])) {
  JsonResponse("Error", "", "Binding parameters");
  exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "", "Executeing statement");
    exit();
}

$result = $stmt->get_result();
if ($stmt->num_rows !== 0) {
  while ($row = $result->fetch_array()) {
    $Rows[] = $row;
  }
}

// Close prepared statement
$stmt->close();
*/
// ---------- ---------- //
// END: Get data from inserted item
// ---------- ---------- //



// Send responce back to user
$Response['Status'] = 'Done';
$Response['Title'] = 'New class added';
$Response['Message'] = 'Class added to db successfully';
$Response['Id'] = $conn->insert_id;
$Response['Vgs'] = $_POST['Vgs'];
$Response['Program'] =  '';
$Response['Separator'] = $_POST['Separator'];
$Response['Year'] = '';


// Encode array into JSON
$ResponseJSON = json_encode($Response);

// Send JSON array
echo $ResponseJSON;

// Close DB connection
$conn->close();
