<?php

// &&&&& # DB CONFIG # &&&&& //
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// &&&&& # JSON RESPONCE # &&&&& //
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// =============== START =============== //
// # CHECK IF ANY OF THE REQUIRED POST VALUES ARE EMPTY #
// =============== START =============== //

// # DECLARE ARRAY OF REQUIRED VALUES # //
$RequiredNewMajor = array(
  'Title',
  'Code',
  'Year',
  'Color'
);

// # SET DEFAULT VALUE # //
$RequiredEmpty = false;

// # LOOP THORUGH REQUIRED VALUES, AND CHECK IF EMPTY # //
foreach ($RequiredNewMajor as $Value) {
  if (empty($_POST[$Value])) {
    $RequiredEmpty = true;
  }
}

// ***** IF EMPTY VALUE IS FOUND ***** //
if ($RequiredEmpty == true) {
  JsonResponse('Failed', '', 'Empty value/s, please fill out all fields');
  exit();
}

// =============== END =============== //
// # CHECK IF ANY OF THE REQUIRED POST VALUES ARE EMPTY #
// =============== END =============== //





// =============== START =============== //
// # CHECK IF YEAR ID EXISTS #
// =============== START =============== //

// _____ # QUERY FOR YEAR ID # _____ //
$QueryYearId = 'SELECT *
FROM years
WHERE id = ?';


// ***** # PREPARE STATEMENT # ***** //
if (!($stmt = $conn->prepare($QueryYearId))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// ***** # BIND PARAMETERS # ***** //
if (!$stmt->bind_param('i', $_POST['Year'])) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// ***** # EXECUTE STATEMENT # ***** //
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}


// # STORE RESULT # //
$stmt->store_result();

// ***** # IF RESULT EMPTY # ***** //
if ($stmt->num_rows == 0) {
  JsonResponse('Error', '', 'DB: Year id, not found');
  exit();
}


// # CLOSE PREPARED STATEMENT # //
$stmt->close();

// =============== END =============== //
// # CHECK IF YEAR ID EXISTS #
// =============== END =============== //





// =============== START =============== //
// # CHECK IF MAJOR CODE IS TAKEN #
// =============== START =============== //

// _____ # QUERY FOR MAJOR CODE # _____ //
$QueryMajorCode = 'SELECT *
FROM majors
WHERE code = ?
AND year_id = ?';


// ***** # PREPARE STATEMENT # ***** //
if (!($stmt = $conn->prepare($QueryMajorCode))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// ***** # BIND PARAMETERS # ***** //
if (!$stmt->bind_param('si', $_POST['Code'], $_POST['Year'])) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// ***** # EXECUTE STATEMENT # ***** //
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}


// # STORE RESULT # //
$stmt->store_result();

// ***** # IF RESULT EMPTY # ***** //
if ($stmt->num_rows !== 0) {
  JsonResponse('Failed', '', 'Major code is taken');
  exit();
}


// # CLOSE PREPARED STATEMENT # //
$stmt->close();

// =============== END =============== //
// # CHECK IF MAJOR CODE IS TAKEN #
// =============== END =============== //





// =============== START =============== //
// # INSERT NEW MAJOR INTO DB #
// =============== START =============== //

// _____ # Query after user data # _____ //
$InsertNewMajor = 'INSERT INTO majors
(`title`, `code`, `year_id`, `color`, `hours_one`, `hours_two`)
VALUES
(?, ?, ?, ?, ?, ?)';

// ***** # PREPARE STATEMENT # ***** //
if (!($stmt = $conn->prepare($InsertNewMajor))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// ***** # BIND PARAMETERS # ***** //
if (!$stmt->bind_param('ssisii', $_POST['Title'], $_POST['Code'], $_POST['Year'], $_POST['Color'], $_POST['Hours_One'], $_POST['Hours_Two'])) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// ***** # EXECUTE STATEMENT # ***** //
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}

// # CLOSE PREPARED STATEMENT # //
$stmt->close();

// =============== END =============== //
// # INSERT NEW MAJOR INTO DB #
// =============== END =============== //



JsonResponse('Done', '', 'Passed by all parameters');
exit();
