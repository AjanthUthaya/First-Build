<?php

function CheckUserVal($conn) {
 require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

 // ----------  ---------- //
 // START: Check if any values inside session is empty
 // ----------  ---------- //

 require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');

 $Session_Empty = false;
 foreach($SessionRequired as $Value) {
  if (empty($_SESSION[$Value]) && isset($_SESSION[$Value])) {
   $Session_Empty = true;
  }
 }

 if ($Session_Empty == true) {
  ClearSession('Session_Data_Empty');
  exit();
 }

 return 'Session_DB_Equal';
 exit();

 // ----------  ---------- //
 // END: Check if any values inside session is empty
 // ----------  ---------- //

 if (isset($_SESSION['DB_User_Id'], $_SESSION['DB_User_Type'], $_SESSION['DB_Username'], $_SESSION['DB_Firstname'], $_SESSION['DB_Middlename'], $_SESSION['DB_Lastname'], $_SESSION['DB_Email'], $_SESSION['DB_Phone'], $_SESSION['DB_Birth_Date'], $_SESSION['DB_Img_Src'])) {

  // Declareing array for $Session variables

  $Session_Data = array();

  // ---------- START: Get SESSION data ---------- //

  $Session_User_Id = $_SESSION['DB_User_Id'];
  $Session_User_Type = $_SESSION['DB_User_Type'];
  $Session_Username = $_SESSION['DB_Username'];
  $Session_Firstname = $_SESSION['DB_Firstname'];
  $Session_Middlename = $_SESSION['DB_Middlename'];
  $Session_Lastname = $_SESSION['DB_Lastname'];
  $Session_Email = $_SESSION['DB_Email'];
  $Session_Phone = $_SESSION['DB_Phone'];
  $Session_Birth_Date = $_SESSION['DB_Birth_Date'];
  $Session_Img_Src = $_SESSION['DB_Img_Src'];

  // ---------- END: Get SESSION data ---------- //
  // Pushing variables into $Session_Data

  array_push($Session_Data, $Session_User_Id, $Session_User_Type, $Session_Username, $Session_Firstname, $Session_Middlename, $Session_Lastname, $Session_Email, $Session_Phone, $Session_Birth_Date, $Session_Img_Src);
  foreach((array)$Session_Data as $item) {
   if (empty($item)) {

    // ----- Empty values inside array -----//

    ClearSession('Session_Data_Empty');
    exit();
   }
  }

  // GET DB data, so i can insert the updated user info

  $CheckUsernameSql = "SELECT * FROM users WHERE username = '" . $Session_Username . "' AND active = 'true'";
  $UsernameExists = mysqli_query($conn, $CheckUsernameSql);
  if (mysqli_num_rows($UsernameExists) == 0) {

   // ---------- Username no match to DB usernames ---------- //

   ClearSession('DB_Username_NoMatch');
   exit();
  }
  else {

   // ---------- Got values from database ---------- //
   // Get values from database and put them inside a JSON object

   while ($MatchLogin = mysqli_fetch_row($UsernameExists)) {
    $DBMatchData = json_encode($MatchLogin, JSON_FORCE_OBJECT);
   }

   // Decode JSON object into an array

   $DBMatchDataDecoded = json_decode($DBMatchData, true);

   // Declaring array for DB data

   $DB_Data = array();

   // ---------- START: Declaring data from DB into variables ---------- //

   $DB_User_Id = $DBMatchDataDecoded[2];
   $DB_User_Type = $DBMatchDataDecoded[3];
   $DB_Username = $DBMatchDataDecoded[4];
   $DB_Firstname = $DBMatchDataDecoded[6];
   $DB_Middlename = $DBMatchDataDecoded[7];
   $DB_Lastname = $DBMatchDataDecoded[8];
   $DB_Email = $DBMatchDataDecoded[9];
   $DB_Phone = $DBMatchDataDecoded[10];
   $DB_Birth_Date = $DBMatchDataDecoded[11];
   $DB_Vgs = $DBMatchDataDecoded[12];
   $DB_Img_Src = $DBMatchDataDecoded[13];

   // ---------- END: Declaring data from DB into variables ---------- //
   // Pushing variables into $DB_Data

   array_push($DB_Data, $DB_User_Id, $DB_User_Type, $DB_Username, $DB_Firstname, $DB_Middlename, $DB_Lastname, $DB_Email, $DB_Phone, $DB_Birth_Date, $DB_Vgs, $DB_Img_Src);
   $DB_Array_Empty = false;
   foreach((array)$DB_Data as $item) {
    if (empty($item)) {
     $DB_Array_Empty = true;
    }
   }

   if ($DB_Array_Empty == true) {

    // ---------- There is an empty value inside DB ---------- //

    ClearSession('DB_Data_Empty');
    exit();
   }
   else {

    // ---------- There is no empty data inside DB ---------- //

    $Session_DB_Data_Equal = true;
    foreach($DB_Data as $index => $DB) {
     if ($DB !== $Session_Data[$index]) {
      $Session_DB_Data_Equal = false;
     }
    }

    if ($Session_DB_Data_Equal == false) {

     // ---------- Session and DB is not the same ---------- //

     ClearSession('Session_DB_NotEqual');
     exit();
    }
    else {

     // ---------- Session and DB is the same ---------- //

     return 'Session_DB_Equal';
    }
   }
  }
 }
 else {

  // ----- An empty session value -----//

  $RedirectReason = ClearSession('Session_Data_NotSet');
  $RedirectReasonArray = explode("-", $RedirectReason);
  echo '<script>window.location.href = "Login.html?' . $RedirectReasonArray[1] . '";</script>';
  exit();
 }
} // END: CheckUserVal function
