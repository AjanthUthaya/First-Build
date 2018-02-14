<?php
session_start();

// Set default timezone
date_default_timezone_set('Europe/Oslo');

// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');

// ---------- START: Declare session data ---------- //

$UserDataArray->User_Id = $_SESSION['DB_User_Id'];
$UserDataArray->User_Type = $_SESSION['DB_User_Type'];
$UserDataArray->Username = $_SESSION['DB_Username'];
$UserDataArray->Firstname = $_SESSION['DB_Firstname'];
$UserDataArray->Middlename = $_SESSION['DB_Middlename'];
$UserDataArray->Lastname = $_SESSION['DB_Lastname'];
$UserDataArray->Email = $_SESSION['DB_Email'];
$UserDataArray->Phone = $_SESSION['DB_Phone'];
$UserDataArray->Birth_Date = $_SESSION['DB_Birth_Date'];
$UserDataArray->Vgs = $_SESSION['DB_Vgs'];
$UserDataArray->Img_Src = $_SESSION['DB_Img_Src'];

// ---------- END: Declare session data ---------- //

$Session_Array_Empty = false;

foreach ($UserDataArray as $key => $value){
  if(empty($value)){
    $Session_Array_Empty = true;
  }
}

if ($Session_Array_Empty == true) {
  echo "Empty session value";
} else {
  $UserDataJSON = json_encode($UserDataArray);
  echo $UserDataJSON;
}



 ?>
