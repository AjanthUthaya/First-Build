<?php

function UserOnline($User_Id, $User_Type, $Username, $Type){

  // Check if user_id is not defined
  if ($User_Id == '') {
    $User_Id = '0';
  }

  // Check if user_id is not defined
  if ($User_Type == '') {
    $User_Type = 'Unknown';
  }


  // Get user ip address
  require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/GetUserIp.php');
  $User_Ip = GetUserIP();

  // Get current page url
  $Page = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";



  // ----------  ---------- //
  // START: Get date and time
  // ----------  ---------- //

  // Set default timezone
  date_default_timezone_set('Europe/Oslo');

  // Date now (DD-MM-YYYY)
  $DateNow = date('d-m-Y');

  // Time now (HH:MM:SS)
  $TimeNow = date('H:i:s');

  // ----------  ---------- //
  // END: Get date and time
  // ----------  ---------- //



  // DB config file
  require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');



  // ----------  ---------- //
  // START: Send data to DB
  // ----------  ---------- //

  // Insert new room into DB (Prepared Statement)
  if (!($stmt = $conn->prepare("INSERT INTO user_online (`user_id`, `user_type`, `username`, `user_ip`, `type`, `page`, `date`, `time`)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)"))) {
    return false;
    exit();
  }

  if (!$stmt->bind_param("isssssss", $User_Id, $User_Type, $Username, $User_Ip, $Type, $Page, $DateNow, $TimeNow)) {
    return false;
    exit();
  }

  if (!$stmt->execute()) {
    return false;
    exit();
  }

  // Close prepared statement
  $stmt->close();

  // ----------  ---------- //
  // END: Send data to DB
  // ----------  ---------- //



  // Close DB connection
  $conn->close();

  return true;

}

 ?>
