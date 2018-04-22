<?php
session_start();

// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// ---------- ---------- //
// START: Check if any of the POST values are empty
// ---------- ---------- //

// Required field names
$required = array(
  'Program',
  'Code'
);

// Loop over field names, make sure each one exists and is not empty
$EmptyValues = false;
foreach ($required as $field) {
    if (empty($_POST[$field]) or $_POST[$field] == ' ') {
        $EmptyValues = true;
    }
}

if ($EmptyValues == true) {
  JsonResponse('Failed', 'Failed to add program', 'Empty values, please fill out all fields');
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
$QueryCheckProgram = "SELECT code, program
FROM programs
WHERE code = ? OR program = ?";

if (!($stmt = $conn->prepare($QueryCheckProgram))) {
    JsonResponse("Error", "", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("ss", ucwords($_POST['Code']), $_POST['Program'])) {
    JsonResponse("Error", "", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    JsonResponse("Error", "", "Executing statement");
    exit();
}

$result = $stmt->store_result();
if ($stmt->num_rows !== 0) {
    JsonResponse("Failed", "Program name is taken", "Program already exists");
    exit();
}

// Close prepared statement
$stmt->close();

// ---------- ---------- //
// END: Check if class already exists
// ---------- ---------- //



// ---------- ---------- //
// START: Insert class into DB
// ---------- ---------- //

// Insert new room into DB (Prepared Statement)
if (!($stmt = $conn->prepare("INSERT INTO programs (`code`, `program`) VALUES (?, ?)"))) {
    JsonResponse("Error", "Query failed", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("ss", strtoupper($_POST['Code']), $_POST['Program'])) {
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



// Send responce back to user
$Response['Status'] = 'Done';
$Response['Title'] = 'New program added';
$Response['Message'] = $_POST['Program'] . ' successfully added to programs';
$Response['Id'] = $conn->insert_id;
$Response['Code'] = strtoupper($_POST['Code']);
$Response['Program'] = $_POST['Program'];


// Encode array into JSON
$ResponseJSON = json_encode($Response);

// Send JSON array
echo $ResponseJSON;

// Close DB connection
$conn->close();
