<?php
session_start();

// Including db connection
include 'DB.php';

// Set default timezone
date_default_timezone_set('Norway/Oslo');

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

$Session_User_Id = $_SESSION['DB_User_Id'];
$Session_User_Type = $_SESSION['DB_User_Type'];
$Session_Username = $_SESSION['DB_Username'];
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
unset($_SESSION['DB_User_Id']);
unset($_SESSION['DB_User_Type']);
unset($_SESSION['DB_Username']);
unset($_SESSION['DB_Password']);
unset($_SESSION['DB_Firstname']);
unset($_SESSION['DB_Middlename']);
unset($_SESSION['DB_Lastname']);
unset($_SESSION['DB_Email']);
unset($_SESSION['DB_Phone']);
unset($_SESSION['DB_Birth_Date']);
unset($_SESSION['DB_Vgs']);
unset($_SESSION['DB_Img_Src']);
unset($_SESSION['Login_Date']);

// ---------- Echo reason for clearing out data ---------- //
echo "Logged out";

 ?>
