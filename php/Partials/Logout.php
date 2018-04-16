<?php
session_start();

// Including db connection
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Set default timezone
date_default_timezone_set('Europe/Oslo');

// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');

// ---------- Session && DB data is the same ---------- //
// NOTE: Send validation data to db, user_online

function getUserIP(){
  $client  = @$_SERVER['HTTP_CLIENT_IP'];
  $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remote  = $_SERVER['REMOTE_ADDR'];

  if(filter_var($client, FILTER_VALIDATE_IP)){
    $ip = $client;
  }
  elseif(filter_var($forward, FILTER_VALIDATE_IP)){
    $ip = $forward;
  }
  else{
    $ip = $remote;
  }

  return $ip;
}

// ---------- START: Declaring variables ---------- //

$Session_User_Id = $_SESSION['User_Id'];
$Session_User_Type = $_SESSION['User_Type'];
$Session_Username = $_SESSION['Username'];
$User_Ip = getUserIP();
$Type = 'Logout';
$Page = $_SERVER['HTTP_REFERER'];
// $DateNow
// $TimeNow

// ---------- END: Declaring variables ---------- //

// ---------- START: Send data to DB ---------- //

$sql = "INSERT INTO user_online (user_id, user_type, username, ip_address, type, page, last_update_date, last_update_time)
VALUES ('$Session_User_Id', '$Session_User_Type', '$Session_Username', '$User_Ip', '$Type', '$Page', '$DateNow', '$TimeNow')";

if ($conn->query($sql) === TRUE) {}

$conn->close();

// ---------- END: Send data to DB ---------- //

// Unset all data

// ---------- Clears session data ---------- //
unset($_SESSION['User_Id']);
unset($_SESSION['User_Type']);
unset($_SESSION['Username']);
unset($_SESSION['Password']);
unset($_SESSION['Firstname']);
unset($_SESSION['Middlename']);
unset($_SESSION['Lastname']);
unset($_SESSION['Email']);
unset($_SESSION['Phone']);
unset($_SESSION['Birth_Date']);
unset($_SESSION['Vgs']);
unset($_SESSION['Img_Src']);
unset($_SESSION['Login_Date']);

// ---------- Echo reason for clearing out data ---------- //
echo "Logged out";

 ?>
