<?php

function CheckUserVal($conn, $Session, $Type) {

// Function to empty session
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

// Function to log user activity
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');



// ----------   ---------- //
// START: Check if all session variables are set
// ----------   ---------- //

if (is_array($Session) || is_object($Session)) {

  $Session_Not_Set = false;

  foreach ($Session as $key => $value) {
    if (!isset($_SESSION[$key])) {
      $Session_Not_Set = true;
    }
  }

  if ($Session_Not_Set == true) {
    // Clear session of all values
    ClearSession('Session_Not_Set');

    // Declare array to return
    $Response['Status'] = 'Failed';
    $Response['Message'] = 'Session_Not_Set';
    // Return array
    return $Response;
  }

} else {

  // Clear session of all values
  ClearSession('Session_No_Array');

  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'Session_No_Array';
  // Return array
  return $Response;

}

// ----------   ---------- //
// START: Check if all session variables are set
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
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Failed - Session Empty');
  ClearSession('Session_Empty');


  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'Session_Empty';
  // Return array
  return $Response;
}

// ----------   ---------- //
// END: Check if any of the session variables are empty
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
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Failed - Login Date Expired');
  ClearSession('Login_Date_Expired');
  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'Login_Date_Expired';
  // Return array
  return $Response;
}

// ----------   ---------- //
// END: Set and compare time in unix timestamp (seconds since 1970)
// ----------   ---------- //



// ----------   ---------- //
// START: Check if $Session['Username'] matches any usernames in DB,
//        and store data
// ----------   ---------- //

// Sql query
$Query = 'SELECT * FROM users WHERE username = ? AND active = "true"';

// Prepareing statement
if (!($stmt = $conn->prepare($Query))) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Error - Prepareing Statement');
  ClearSession('Prepareing_Statement');
  // Declare array to return
  $Response['Status'] = 'Error';
  $Response['Message'] = 'Prepareing_Statement';
  // Return array
  return $Response;
}

// Binding parameters
if (!$stmt->bind_param('s', $Session['Username'])) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Error - Binding Parameters');
  ClearSession('Binding_Parameters');
  // Declare array to return
  $Response['Status'] = 'Error';
  $Response['Message'] = 'Binding_Parameters';
  // Return array
  return $Response;
}

// Executeing statement
if (!$stmt->execute()) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Error - Executeing Statement');
  ClearSession('Executeing_Statement');
  // Declare array to return
  $Response['Status'] = 'Error';
  $Response['Message'] = 'Executeing_Statement';
  // Return array
  return $Response;
}

// Store results from query
$result = $stmt->get_result();

// Check if result is empty
if ($result->num_rows == 0) {
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Failed - Username Not Found');
  ClearSession('Username_Not_Found');
  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'Username_Not_Found';
  // Return array
  return $Response;
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
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Failed - DB Empty');
  ClearSession('DB_Empty');
  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'DB_Empty';
  // Return array
  return $Response;
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
  UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Failed - Session DB NotEqual');
  ClearSession('Session_DB_Not_Equal');
  // Declare array to return
  $Response['Status'] = 'Failed';
  $Response['Message'] = 'Session_DB_Not_Equal';
  // Return array
  return $Response;
}

// ----------   ---------- //
// END: Check if $Session_Compare and $DB_Compare are the same
// ----------   ---------- //



// ----------   ---------- //
// START: DONE
// ----------   ---------- //

UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], $Type . ' - Successful');
// Declare array to return
$Response['Status'] = 'Done';
$Response['Message'] = 'Session_DB_Equal';
// Return array
return $Response;

// ----------   ---------- //
// END: DONE
// ----------   ---------- //



}
