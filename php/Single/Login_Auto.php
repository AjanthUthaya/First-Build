<?php
session_start();

// DB config file
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to empty session
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

// Function to give AJAX request a JSON response
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// Get session variables
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');

// Function to log user activity
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');


// ----------   ---------- //
// START: Check if all session variables are set
// ----------   ---------- //

$Session_NotSet = false;

foreach ($Session as $key => $value) {
  if (!isset($_SESSION[$key])) {
    $Session_NotSet = true;
  }
}


if ($Session_NotSet == true) {
  ClearSession('Session_NotSet');
  JsonResponse('Failed', '', 'Session_NotSet');
  exit();
}

// ----------   ---------- //
// START: Check if all session variables are set
// ----------   ---------- //



// ----------   ---------- //
// START: Set and compare time in unix timestamp (seconds since 1970)
// ----------   ---------- //

// Set default timezone
date_default_timezone_set('Europe/Oslo');

// Date now (dd-mm-yyyy HH:MM:SS)
$DateNow = date('d-m-Y H:i:s');

// Gives value in Unix Timestamp (seconds since 1970), to compare dates
$LoginDate = strtotime($_SESSION['Login_Date'] . " +7 days"); // Login date plus 7 days
$NowDate = strtotime($DateNow);


// Check if login date is valid (Within x days)
if ($LoginDate < $NowDate) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin failed - Login Date Expired');
  ClearSession('Login_Date_Expired');
  JsonResponse('Failed', '', 'Login_Date_Expired');
  exit();
}

// ----------   ---------- //
// END: Set and compare time in unix timestamp (seconds since 1970)
// ----------   ---------- //



// ----------   ---------- //
// START: Check if any of the session variables are empty
// ----------   ---------- //

$Session_Empty = false;

foreach ($Session as $key => $value) {
  if (empty($value)) {
    $Session_Empty = true;
  }
}


if ($Session_Empty == true) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin failed - Session Empty');
  ClearSession('Session_Empty');
  JsonResponse('Failed', '', 'Session_Empty');
  exit();
}

// ----------   ---------- //
// END: Check if any of the session variables are empty
// ----------   ---------- //



// ----------   ---------- //
// START: Check if $Session['Username'] matches any usernames in DB,
//        and store data
// ----------   ---------- //

// Sql query
$Query = 'SELECT * FROM users WHERE username = ? AND active = "true"';

// Prepareing statement
if (!($stmt = $conn->prepare($Query))) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin error - Prepareing Statement');
  ClearSession('Prepareing_Statement');
  JsonResponse('Error', '', 'Prepareing_Statement');
  exit();
}

// Binding parameters
if (!$stmt->bind_param('s', $Session['Username'])) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin error - Binding Parameters');
  ClearSession('Binding_Parameters');
  JsonResponse('Error', '', 'Binding_Parameters');
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin error - Executeing Statement');
  ClearSession('Executeing_Statement');
  JsonResponse('Error', '', 'Executeing_Statement');
  exit();
}

// Store results from query
$result = $stmt->get_result();

// Check if result is empty
if ($result->num_rows == 0) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin failed - Username Not Found');
  ClearSession('Username_Not_Found');
  JsonResponse('Failed', '', 'Username_Not_Found');
  exit();
}

// Define array to store values
$DB_Result = array();

// Loop through rows and store it in an array
while ($row = $result->fetch_assoc()) {
  $DB_Result[] = $row;
}

// Store DB result, should only be one array
$DB = $DB_Result[0];

// Close prepared statement
$stmt->close();

// ----------   ---------- //
// END: Check if $Session['Username'] matches any usernames in DB,
//        and store data
// ----------   ---------- //



// ----------   ---------- //
// START: Check if any of the DB variables are empty
// ----------   ---------- //

$DB_Empty = false;

foreach ($DB as $key => $value) {
  if (empty($value)) {
    $DB_Empty = true;
  }
}

if ($DB_Empty == true) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin failed - DB Empty');
  ClearSession('DB_Empty');
  JsonResponse('Failed', '', 'DB_Empty');
  exit();
}

// ----------   ---------- //
// END: Check if any of the DB variables are empty
// ----------   ---------- //



// ----------   ---------- //
// START: Check if $Session_Compare and $DB_Compare are the same
// ----------   ---------- //

// Define SESSION values here:
$Session_Compare = array(
  'User_Id' => $Session['User_Id'],
  'User_Type' => $Session['User_Type'],
  'Username' => $Session['Username'],
  'Firstname' => $Session['Firstname'],
  'Middlename' => $Session['Middlename'],
  'Lastname' => $Session['Lastname'],
  'Email' => $Session['Email'],
  'Phone' => $Session['Phone'],
  'Birth_Date' => $Session['Birth_Date'],
  'Img_Src' => $Session['Img_Src']
);

// Define DB values here:
$DB_Compare = array(
  'User_Id' => $DB['id'],
  'User_Type' => $DB['user_type'],
  'Username' => $DB['username'],
  'Firstname' => $DB['firstname'],
  'Middlename' => $DB['middlename'],
  'Lastname' => $DB['lastname'],
  'Email' => $DB['email'],
  'Phone' => $DB['phone'],
  'Birth_Date' => $DB['birth_date'],
  'Img_Src' => $DB['img_src']
);


// Define default value
$Session_DB_Equal = true;

// Loop through both arrays and check if any values are diffrent
foreach ($Session_Compare as $Session_Key => $Session_Value) {
  if ($DB_Compare[$Session_Key] !== $Session_Value) {
    $Session_DB_Equal = false;
  }
}


if ($Session_DB_Equal == false) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin failed - Session DB NotEqual');
  ClearSession('Session_DB_NotEqual');
  JsonResponse('Failed', '', 'Session_DB_NotEqual');
  exit();
}

// ----------   ---------- //
// END: Check if $Session_Compare and $DB_Compare are the same
// ----------   ---------- //



// ----------   ---------- //
// START: DONE
// ----------   ---------- //

UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'AutoLogin successful');
JsonResponse('Done', '', 'Session_DB_Equal');
exit();

// ----------   ---------- //
// END: DONE
// ----------   ---------- //



 ?>
