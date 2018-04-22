<?php
// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');




/* ---------- ---------- */
// START: Check if any of the POST values are empty
/* ---------- ---------- */

// List all fields required
$required = array(
  'Major',
  'Code',
  'Vgs',
  'Color',
  'Hours'
);

// Loop over POST fields, make sure each one exists and is not empty
$Empty_Field = false;

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        $Empty_Field = true;
    }

    if ($field == 'Vgs') {
        if ($_POST[$field] == 'null') {
            $Empty_Field = true;
        }
    }
}

if ($Empty_Field == true) {
    ReportStatus("Failed", 'Empty value/s, please fill out all fields');
    exit();
}

/* ---------- ---------- */
// END: Check if any of the POST values are empty
/* ---------- ---------- */




// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');




/* ---------- ---------- */
// START: Check if Major Code is taken in the DB
/* ---------- ---------- */

$QueryMajorCode = "SELECT * FROM majors WHERE code = ?";

if (!($stmt = $conn->prepare($QueryMajorCode))) {
    ReportStatus("Error", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("s", $_POST['Code'])) {
    ReportStatus("Error", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    ReportStatus("Error", "Executing statement");
    exit();
}

$result = $stmt->store_result();
if ($stmt->num_rows !== 0) {
    ReportStatus("Failed", 'Code already exists');
    exit();
}

// Close prepared statement
$stmt->close();

/* ---------- ---------- */
// END: Check if Major Code is taken in the DB
/* ---------- ---------- */







// Insert new room into DB (Prepared Statement)
if (!($stmt = $conn->prepare("INSERT INTO majors (`major`, `code`, `vgs`, `color`, `hours`) VALUES (?, ?, ?, ?, ?)"))) {
ReportStatus("Error", "Prepareing statement");
exit();
}

if (!$stmt->bind_param("ssssi", $_POST['Major'], strtoupper($_POST['Code']), $_POST['Vgs'], $_POST['Color'], $_POST['Hours'])) {
ReportStatus("Error", "Binding parameters");
exit();
}

if (!$stmt->execute()) {
ReportStatus("Error", "Executeing statement");
exit();
}

// Close prepared statement
$stmt->close();


$Response['Major_Id'] = $conn->insert_id;

// Close DB connection
$conn->close();


// Send responce back to user
$Response['Status'] = 'Done';
$Response['Message'] = $_POST['Major'] . ' added to DB';
$Response['Major'] = $_POST['Major'];
$Response['Code'] = strtoupper($_POST['Code']);
$Response['Color'] = $_POST['Color'];


// Encode array into JSON
$ResponseJSON = json_encode($Response);

// Send JSON array
echo $ResponseJSON;
