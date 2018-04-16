<?php
session_start();

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to check user validation
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/CheckUserVal.php');

// Function to log user activity
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');

// Get session variables
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');

// Links to all main files, and access to $Filename variable
require($_SERVER['DOCUMENT_ROOT'] . '/php/Pages/Links.php');


// Set default timezone
date_default_timezone_set('Europe/Oslo');
// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');


// Check user validation OnLoad, also checks access and displays any kind of errors
CheckUserVal($conn);

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

    <?php include 'Nav.php'; ?>

    <!-- START: Viewport -->
    <div class="off-canvas-content OffCanvas-Main" data-off-canvas-content>
