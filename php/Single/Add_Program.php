<?php
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
    if (empty($_POST[$field])) {
        $EmptyValues = true;
    }
}

if ($EmptyValues == true) {

  exit();
}

// ---------- ---------- //
// END: Check if any of the POST values are empty
// ---------- ---------- //


// Add DB config
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');
