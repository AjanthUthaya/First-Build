<?php
// Add report status function
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');

$Key = $_POST['Key'];
$Label = $_POST['Label'];
$Parent_Room = $_POST['Parent_Room'];

// Check if any of the values are empty
if ($Key == '' || $Parent_Room == 'null') {
    // Value not selected (Parent Room)
    ReportStatus("Failed", "Missing input value");
    exit();
}

if ($Label == '') {
    $Label = $Key;
}


// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');




/* ---------- ---------- */
// START: Check if key is taken in the DB
/* ---------- ---------- */

// MySQLi statement
$QueryCheckRooms = "SELECT * FROM rooms WHERE `key` = ?";

if (!($stmt = $conn->prepare($QueryCheckRooms))) {
    ReportStatus("Error", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("s", $Key)) {
    ReportStatus("Error", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    ReportStatus("Error", "Executing statement");
    exit();
}

$result = $stmt->store_result();
if ($stmt->num_rows !== 0) {
    ReportStatus("Failed", "Key is taken");
    exit();
}

// Close prepared statement
$stmt->close();

/* ---------- ---------- */
// END: Check if key is taken in the DB
/* ---------- ---------- */




// Insert new room into DB (Prepared Statement)
if (!($stmt = $conn->prepare("INSERT INTO rooms (`key`, `label`, `parent_key`) VALUES (?, ?, ?)"))) {
    ReportStatus("Error", "Prepareing statement");
    exit();
}

if (!$stmt->bind_param("sss", $Key, $Label, $Parent_Room)) {
    ReportStatus("Error", "Binding parameters");
    exit();
}

if (!$stmt->execute()) {
    ReportStatus("Error", "Executeing statement");
    exit();
}

// Close prepared statement
$stmt->close();

$Response['Room_Id'] = $conn->insert_id;

// Close DB connection
$conn->close();


// Send responce back to user
$Response['Status'] = 'Done';
$Response['Message'] = $_POST['Key'] . ' added to db successfully';
$Response['Key'] = $_POST['Key'];
$Response['ParrentKey'] = $_POST['Parent_Room'];


// Encode array into JSON
$ResponseJSON = json_encode($Response);

// Send JSON array
echo $ResponseJSON;
