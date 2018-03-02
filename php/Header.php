<?php
// Start the session
session_start();

// Links to all main files
include 'php/Pages/Links.php';
 ?>
<!doctype html>
<html class="no-js" lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Tab title -->
  <?php include 'Title.php'; ?>
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
