<?php
// Start the session
session_start();

// NOTE: Error reporting for testing
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Including db connection
require 'Partials/DB.php';

// ---------- START: Check user validation ---------- //

// Load function
require 'Functions/CheckUserVal.php';


// Set default timezone
date_default_timezone_set('Europe/Oslo');
// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');


// Get user ip
include 'Functions/GetUserIp.php';
$User_Ip = getUserIP();

// Get current page
$LoadPage = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

// Links to all main files
require 'Pages/Links.php';

// Check user validation OnLoad
$UserValidation = CheckUserVal($conn);

if ($UserValidation !== 'Session_DB_Equal') {
    // Session && DB data is the same //
    // CheckUserVal() function returns 'Redirect-$Reason' or 'Session_DB_Equal'

    // ---------- START: List of all error responses ---------- //
    /*

    - Session_Data_NotSet
    - Session_Data_Empty
    - DB_Username_NoMatch
    - DB_Data_Empty
    - Session_DB_NotEqual

    */
    // ---------- END: List of all error responses ---------- //

    // ---------- START: Send data to DB ---------- //
    $sql = "INSERT INTO user_online (user_id, user_type, username, ip_address, type, page, last_update_date, last_update_time)
    VALUES ('$Session_User_Id', '$Session_User_Type', '$Session_Username', '$User_Ip', 'OnLoad-Validation-Failed', '$LoadPage', '$DateNow', '$TimeNow')";

    if ($conn->query($sql) === true) {}
    // ---------- END: Send data to DB ---------- //

    // ---------- START: Redirect to login ---------- //

    $URL = 'login.html';


    echo '<script> location.href="' . $URL . '"; </script>';

    // ---------- END: Redirect to login ---------- //

    exit();

} elseif (strtolower ($Filename) == 'rooms' or strtolower ($Filename) == 'majors' or strtolower ($Filename) == 'editmajor') {
  if ($_SESSION['DB_User_Type'] !== 'Admin') {

    echo '<script> location.href="' . $URI_Home . '"; </script>';

    exit();

  }
} else {
    // ----- Session && DB data is the same ----- //

    // Declare session $_POST values into variables
    require 'php/Functions/DeclareSessionVariables.php';

    // ---------- START: Send data to DB ---------- //
    $sql = "INSERT INTO user_online (user_id, user_type, username, ip_address, type, page, last_update_date, last_update_time)
    VALUES ('$Session_User_Id', '$Session_User_Type', '$Session_Username', '$User_Ip', 'OnLoad-Validation-Success', '$LoadPage', '$DateNow', '$TimeNow')";

    if ($conn->query($sql) === true) {}
    // ---------- END: Send data to DB ---------- //
}

// ---------- END: Check user validation ---------- //
 ?>
<!doctype html>
<html class="no-js" lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
  <!-- Tab title -->
  <title><?php echo $FilenameFull ?> - First Build</title>
  <!-- Tab icon -->
  <link rel="icon" href="http://via.placeholder.com/50x50">

  <?php include 'Styles.php'; ?>

</head>

<body onload="init();">

  <!-- START: Mobile view -->
  <div id="Mobile-View">
    <img src="http://via.placeholder.com/300x300">
    <h3>This website is not available for mobile devices</h3>
  </div>
  <!-- END: Mobile view -->

  <!-- START: Desktop view -->
  <div id="Desktop-View">


    <?php include 'OffCanvas.php'; ?>

    <?php include 'OffCanvasSub.php'; ?>

    <?php include 'Nav.php'; ?>

    <!-- START: Viewport -->
    <div class="off-canvas-content OffCanvas-Main" data-off-canvas-content>
