<?php
session_start();

// ---------- START: Declare session data ---------- //

$UserDataArray->User_Id = $_SESSION['User_Id'];
$UserDataArray->User_Type = $_SESSION['User_Type'];
$UserDataArray->Username = $_SESSION['Username'];
$UserDataArray->Firstname = $_SESSION['Firstname'];
$UserDataArray->Middlename = $_SESSION['Middlename'];
$UserDataArray->Lastname = $_SESSION['Lastname'];
$UserDataArray->Email = $_SESSION['Email'];
$UserDataArray->Phone = $_SESSION['Phone'];
$UserDataArray->Birth_Date = $_SESSION['Birth_Date'];
$UserDataArray->Img_Src = $_SESSION['Img_Src'];

// ---------- END: Declare session data ---------- //

$Session_Array_Empty = false;

foreach ($UserDataArray as $key => $value){
  if(empty($value)){
    $Session_Array_Empty = true;
  }
}

require ($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

if ($Session_Array_Empty == true) {
  ClearSession('Session_Data_Empty');
  exit();
} else {
  $UserDataJSON = json_encode($UserDataArray);
  echo $UserDataJSON;
}



 ?>
