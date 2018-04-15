<?php
// Start session, and get access to session storage
session_start();

// Function to give AJAX response
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// Function to log user activity
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');


// ----------  ---------- //
// START: Check for empty $_POST variables
// ----------  ---------- //

// Required fields for login
$required = array(
  'Username',
  'Password'
);

// Set default value, before loop
$Empty_Field = false;

// Loops through the values to see if any are empty
foreach($required as $field) {
  if (empty($_POST[$field])) {
    $Empty_Field = true;
  }
}

// If empty value is found, run this code
if ($Empty_Field == true) {
  JsonResponse('Failed', '', 'Please fill out all fields');
  exit();
}

// ----------  ---------- //
// END: Check for empty $_POST variables
// ----------  ---------- //



// ---------- START: Declaring POST values ---------- //

$Username = $_POST['Username'];
$Password = $_POST['Password'];

// ---------- END: Declaring POST values ---------- //



// Including db connection
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');



// ----------  ---------- //
// START: Check if username exists
// ----------  ---------- //

// Check if username exists
$Query = 'SELECT * FROM users WHERE username = ? AND active = "true"';

// Prepareing statement
if (!($stmt = $conn->prepare($Query))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// Binding parameters
if (!$stmt->bind_param('s', $Username)) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  JsonResponse('Error', '', 'Executeing statement');
  exit();
}

// Store results from query
$result = $stmt->get_result();

// Check if num_rows is 0 (Username does not exist)
if ($result->num_rows == 0) {
  JsonResponse('Failed', '', 'Wrong username or password, try again');
  // Report user activity
  UserOnline('', '', $_POST['Username'], 'Login failed - Username not found');
  exit();
}

// Define array to store values
$data = array();

// Loop through rows and store it in an array
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

// Close prepared statement
$stmt->close();

// ----------  ---------- //
// END: Check if username exists
// ----------  ---------- //



// ----------  ---------- //
// START: Check if inputed password matches DB password
// ----------  ---------- //

if (!password_verify($Password, $data[0]['password'])) {
  JsonResponse('Failed', '', 'Wrong username or password, try again');
  // Report user activity
  UserOnline('', '', $_POST['Username'], 'Login failed - Wrong password');
  exit();
}

// ----------  ---------- //
// END: Check if inputed password matches DB password
// ----------  ---------- //



// ----------  ---------- //
// END: Check if any of the values are empty
// ----------  ---------- //

$DB_Array_Empty = false;

foreach((array)$data[0] as $item) {
  if (empty($item)) {
   $DB_Array_Empty = true;
  }
}

if ($DB_Array_Empty == true) {
  JsonResponse('Error', '', 'Empty DB values');
  // Report user activity
  UserOnline('', '', $_POST['Username'], 'Login failed - Empty DB values');
  exit();
}

// ----------  ---------- //
// END: Check if any of the values are empty
// ----------  ---------- //



// ---------- START: Storeing user data in session + login date ---------- //

$_SESSION['User_Id'] = $data[0]['id'];
$_SESSION['User_Type'] = $data[0]['user_type'];
$_SESSION['Username'] = $data[0]['username'];
$_SESSION['Firstname'] = $data[0]['firstname'];
$_SESSION['Middlename'] = $data[0]['middlename'];
$_SESSION['Lastname'] = $data[0]['lastname'];
$_SESSION['Email'] = $data[0]['email'];
$_SESSION['Phone'] = $data[0]['phone'];
$_SESSION['Birth_Date'] = $data[0]['birth_date'];
$_SESSION['Img_Src'] = $data[0]['img_src'];

// Set login date (DD-MM-YYYY HH:MM:SS)
date_default_timezone_set('Europe/Oslo');
$_SESSION['Login_Date'] = date('d-m-Y H:i:s');

// ---------- END: Storeing user data in session + login date ---------- //



// Report user activity
UserOnline($_SESSION['User_Id'], $_SESSION['User_Type'], $_POST['Username'], 'Login successful');
JsonResponse('Done', '', 'Login successful');
exit();

?>
