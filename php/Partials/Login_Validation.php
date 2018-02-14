<?php
session_start();

// Including db connection
require '../Partials/DB.php';

// Set default timezone
date_default_timezone_set('Europe/Oslo');

// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');

// Declareing array for $Session variables
$Session_Data = array();

// ---------- START: Declare session data ---------- //

$Session_User_Id = $_SESSION['DB_User_Id'];
$Session_User_Type = $_SESSION['DB_User_Type'];
$Session_Username = $_SESSION['DB_Username'];
$Session_Firstname = $_SESSION['DB_Firstname'];
$Session_Middlename = $_SESSION['DB_Middlename'];
$Session_Lastname = $_SESSION['DB_Lastname'];
$Session_Email = $_SESSION['DB_Email'];
$Session_Phone = $_SESSION['DB_Phone'];
$Session_Birth_Date = $_SESSION['DB_Birth_Date'];
$Session_Vgs = $_SESSION['DB_Vgs'];
$Session_Img_Src = $_SESSION['DB_Img_Src'];

// ---------- END: Declare session data ---------- //

// Pushing variables into $Session_Data
array_push($Session_Data, $Session_User_Id, $Session_User_Type, $Session_Username, $Session_Firstname, $Session_Middlename, $Session_Lastname, $Session_Email, $Session_Phone, $Session_Birth_Date, $Session_Vgs, $Session_Img_Src);

$Session_Array_Empty = false;

foreach((array)$Session_Data as $item) {
  if (empty($item)) {
    $Session_Array_Empty = true;
  }
}

if ($Session_Array_Empty == true) {
  // ---------- There is an empty value inside array ---------- //
  ClearSession('Session_Empty_Data');
} else {



  // ---------- START: Check if session_data matches data from database ---------- //

  $CheckUsernameSql = "SELECT * FROM users WHERE username = '" . $Session_Username . "' AND active = 'true'";
  $UsernameExists = mysqli_query($conn, $CheckUsernameSql);

  if (mysqli_num_rows($UsernameExists) !== 1) {
    // ---------- Username no match to DB usernames ---------- //
    ClearSession('Session_Username_NoMatch');
  }else {

    // ---------- Got values from database ---------- //

    // Get values from database and put them inside a JSON object
    while ($MatchLogin = mysqli_fetch_row($UsernameExists)){
      $DBMatchData = json_encode($MatchLogin, JSON_FORCE_OBJECT);
    }

    //Decode JSON object into an array
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

    // ---------- START: Checking if any of the values are empty ---------- //
    if ($DB_Array_Empty == true) {
      // ---------- Found empty value in database value ---------- //
      print_r ($DB_Data);
      ClearSession('DB_Empty_Data');
    } else {
      // ---------- Found no empty values ---------- //

      // ---------- START: Check if Session and DB data are the same ---------- //
      // NB: $Session_Data && $DB_Data

      $Session_DB_Data_Equal = true;

      foreach($DB_Data as $index => $DB) {
        if ($DB !== $Session_Data[$index]) {
          $Session_DB_Data_Equal = false;
        }
      }

      // ---------- START: Check if Session and DB data are the same ---------- //

      if ($Session_DB_Data_Equal == false) {
        // ---------- Session && DB data does not match ---------- //
        ClearSession('Session_DB_NotEqual');
      } else {
        // ---------- Session && DB data is the same ---------- //
        // NOTE: Send validation data to db, user_online

        function getUserIP(){
          $client  = @$_SERVER['HTTP_CLIENT_IP'];
          $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
          $remote  = $_SERVER['REMOTE_ADDR'];

          if (filter_var($client, FILTER_VALIDATE_IP)){
            $ip = $client;
          } elseif (filter_var($forward, FILTER_VALIDATE_IP)){
            $ip = $forward;
          } else {
            $ip = $remote;
          }

          return $ip;
        }

        // ---------- START: Declaring variables ---------- //

        $Session_User_Id = $_SESSION['DB_User_Id'];
        $Session_User_Type = $_SESSION['DB_User_Type'];
        $Session_Username = $_SESSION['DB_Username'];
        $User_Ip = getUserIP();
        $Type = 'Validation';
        $Page = $_SERVER['HTTP_REFERER'];
        // $DateNow
        // $TimeNow

        // ---------- END: Declaring variables ---------- //

        // ---------- START: Send data to DB ---------- //

        $sql = "INSERT INTO user_online (user_id, user_type, username, ip_address, type, page, last_update_date, last_update_time)
        VALUES ('$Session_User_Id', '$Session_User_Type', '$Session_Username', '$User_Ip', '$Type', '$Page', '$DateNow', '$TimeNow')";

        if ($conn->query($sql) === TRUE) {}

        // ---------- END: Send data to DB ---------- //



      }

    }



  }

  // ---------- END: Check if session_data matches data from database ---------- //



}


function ClearSession($Reason){
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

  $Clear_Session_Data_Reason = $Reason;
  // echo "Clear data " . $Clear_Session_Data_Reason; // NB: For testing

  // Redirect to login
  echo "Redirect-" . $Clear_Session_Data_Reason;

}

 ?>
