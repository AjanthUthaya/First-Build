<?php
session_start();

// Including db connection
require '../Partials/DB.php';

// Set default timezone
date_default_timezone_set('Europe/Oslo');

// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y H:i:s');


// Gives value in Unix Timestamp (seconds since 1970), to compare dates
$LoginDate = strtotime($_SESSION['Login_Date'] . " +7 days"); // Login date plus 7 days
$NowDate = strtotime($DateNow);

$Auto_Login = "Auto_Login_False";

if ($LoginDate < $NowDate){

  // ---------- Login date has expired ---------- //
  $Clear_Session_Data = true;
  $Clear_Session_Data_Reason = "Session_Expired_Date";

} else {

  // ---------- Login date is still valid ---------- //

  // Declareing array for $Session variables
  $Session_Data = array();

  // ---------- START: Declaring data from DB into variables ---------- //

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

  // ---------- END: Declaring data from DB into variables ---------- //

  // Pushing variables into $Session_Data
  array_push($Session_Data, $Session_User_Id, $Session_User_Type, $Session_Username, $Session_Firstname, $Session_Middlename, $Session_Lastname, $Session_Email, $Session_Phone, $Session_Birth_Date, $Session_Vgs, $Session_Img_Src);
  //print_r($Session_Username); // Print session username value

  $Session_Array_Empty = false;

  foreach((array)$Session_Data as $item) {
    if (empty($item)) {
      $Session_Array_Empty = true;
    }
  }

  if ($Session_Array_Empty == true) {
    // ---------- There is an empty value inside array ---------- //
    $Clear_Session_Data = true;
    $Clear_Session_Data_Reason = "Session_Empty_Data";
  } else {
    // ---------- There is no empty value inside array ---------- //



    // ---------- START: Check if session_data matches data from database ---------- //

    $CheckUsernameSql = "SELECT * FROM users WHERE username = '" . $Session_Username . "' AND active = 'true'";
    $UsernameExists = mysqli_query($conn, $CheckUsernameSql);

    if (mysqli_num_rows($UsernameExists) !== 1) {
      // ---------- Username no match to DB usernames ---------- //
      $Clear_Session_Data = true;
      $Clear_Session_Data_Reason = "Session_Username_NoMatch";
    }else {

      // ---------- Username match found ---------- //

      // Get values from database and put them inside a JSON object
      while ($MatchLogin = mysqli_fetch_row($UsernameExists)){
        $DBMatchData = json_encode($MatchLogin, JSON_FORCE_OBJECT);
      }

      if (empty($DBMatchData)) {
        // ---------- Could not get values from database ---------- //
        $Clear_Session_Data = true;
        $Clear_Session_Data_Reason = "DB_GetData_Error";
      }else {
        // ---------- Got values from database ---------- //
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
          $Clear_Session_Data = true;
          $Clear_Session_Data_Reason = "DB_Empty_Data";
        } else {
          // ---------- Found no empty values ---------- //

          // ---------- START: Check if Session and DB data are the same ---------- //
          // NB: $Session_Data && $DB_Data

          $Session_DB_Data_Equal = true;

          if ($Session_Data[0] !== $DB_Data[0] || $Session_Data[1] !== $DB_Data[1] ||
          $Session_Data[2] !== $DB_Data[2] || $Session_Data[3] !== $DB_Data[3] ||
          $Session_Data[4] !== $DB_Data[4] || $Session_Data[5] !== $DB_Data[5] ||
          $Session_Data[6] !== $DB_Data[6] || $Session_Data[7] !== $DB_Data[7] ||
          $Session_Data[8] !== $DB_Data[8] || $Session_Data[9] !== $DB_Data[9] ||
          $Session_Data[10] !== $DB_Data[10]) {
            $Session_DB_Data_Equal = false;
          }

          // ---------- START: Check if Session and DB data are the same ---------- //

          if ($Session_DB_Data_Equal == false) {
            // ---------- Session && DB data does not match ---------- //
            $Clear_Session_Data = true;
            $Clear_Session_Data_Reason = "Session_DB_NotEqual";
          } else {
            // ---------- Session && DB data is the same ---------- //

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
            $Type = 'Auto-Login';
            $Page = $_SERVER['HTTP_REFERER'];
            // $DateNow
            // $TimeNow

            // ---------- END: Declaring variables ---------- //

            // ---------- START: Send data to DB ---------- //

            $sql = "INSERT INTO user_online (user_id, user_type, username, ip_address, type, page, last_update_date, last_update_time)
            VALUES ('$Session_User_Id', '$Session_User_Type', '$Session_Username', '$User_Ip', '$Type', '$Page', '$DateNow', '$TimeNow')";

            if ($conn->query($sql) === TRUE) {}

            $conn->close();

            $Auto_Login = "Auto_Login_True";

            // ---------- END: Send data to DB ---------- //

          }

        }

      }

    }


    // ---------- END: Check if session_data matches data from database ---------- //

 }

}

if ($Clear_Session_Data == true) {
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
  echo $Clear_Session_Data_Reason;
}else {
  // ---------- Echo to login ---------- //
  echo $Auto_Login;
}

 ?>
