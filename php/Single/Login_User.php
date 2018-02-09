<?php
session_start();

// Including db connection
include '../Partials/DB.php';

// Required field from registration
$required = array(
  'Username',
  'Password',
);

// Loop over POST fields, make sure each one exists and is not empty
$Empty_Field = false;

foreach($required as $field) {
  if (empty($_POST[$field])) {
    $Empty_Field = true;
  }
}

// If any empty fields return Empty field
if ($Empty_Field == true) {
  echo "Missing_Field_Data";
}else {

  // ---------- START: Declaring POST values from Login.html ---------- //

  $Username = $_POST["Username"];
  $Password = $_POST["Password"];

  // ---------- END: Declaring POST values from Login.html ---------- //


// ---------- START: Check if username exists ---------- //

  $CheckUsernameSql = "SELECT * FROM users WHERE username = '" . $Username . "' AND active = 'true'";
  $UsernameExists = mysqli_query($conn, $CheckUsernameSql);

// ---------- END: Check if username exists ---------- //

  if (mysqli_num_rows($UsernameExists) !== 1) {
    // ---------- Username no match to DB usernames ---------- //
    echo "Login_Failed";
  }else {

    // ---------- START: Username match found ---------- //

    // Get hased password from database and match with user input
    while ($MatchLogin = mysqli_fetch_row($UsernameExists)){
      //$DBPassword = $MatchLogin[1];
      $DBMatchData = json_encode($MatchLogin, JSON_FORCE_OBJECT);
    }

    if (empty($DBMatchData)) {
      // ---------- Could not get password from database ---------- //
      echo "Password_Get_Error";
    } else {

      // ---------- Got password from database ---------- //

      $DBMatchDataDecoded = json_decode($DBMatchData, true);

      // Matching DBPassword with user input
      if (password_verify($Password, $DBMatchDataDecoded[5])) {

        // ---------- Password matched DBPassword ---------- //

        // Declareing array for DB data
        $DB_Data = array();

        // ---------- START: Declaring data from DB into variables ---------- //

        $DB_User_Id = $DBMatchDataDecoded[2];
        $DB_User_Type = $DBMatchDataDecoded[3];
        $DB_Username = $DBMatchDataDecoded[4];
        $DB_Password = $DBMatchDataDecoded[5];
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
        array_push($DB_Data, $DB_User_Id, $DB_User_Type, $DB_Username, $DB_Password, $DB_Firstname, $DB_Middlename, $DB_Lastname, $DB_Email, $DB_Phone, $DB_Birth_Date, $DB_Vgs, $DB_Img_Src);

        $DB_Array_Empty = false;

        foreach((array)$DB_Data as $item) {
          if (empty($item)) {
            $DB_Array_Empty = true;
          }
        }

        // ---------- START: Checking if any of the values are empty ---------- //
        if ($DB_Array_Empty == false) {
          // ---------- Did not find any empty values ---------- //

          // ---------- START: Storing DB variables into session cookies ---------- //

          // Set default timezone
          date_default_timezone_set('Norway/Oslo');

          // Date now (dd-mm-yyyy)
          $DateNow = date('d-m-Y H:i:s');

          $_SESSION['DB_User_Id'] = $DB_User_Id;
          $_SESSION['DB_User_Type'] = $DB_User_Type;
          $_SESSION['DB_Username'] = $DB_Username;
          // $_SESSION['DB_Password'] = $DB_Password; // NB: Not sure if this is safe
          $_SESSION['DB_Firstname'] = $DB_Firstname;
          $_SESSION['DB_Middlename'] = $DB_Middlename;
          $_SESSION['DB_Lastname'] = $DB_Lastname;
          $_SESSION['DB_Email'] = $DB_Email;
          $_SESSION['DB_Phone'] = $DB_Phone;
          $_SESSION['DB_Birth_Date'] = $DB_Birth_Date;
          $_SESSION['DB_Vgs'] = $DB_Vgs;
          $_SESSION['DB_Img_Src'] = $DB_Img_Src;
          $_SESSION['Login_Date'] = $DateNow;

          // ---------- END: Storing DB variables into session cookies ---------- //

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
          $Type = 'Login';
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

          echo "Login_Success";

        } else {
          // ---------- Found empty value, NB: There should not be any empty values ---------- //
          echo "DB_GetData_Error";
        }
        // ---------- END: Checking if any of the values are empty ---------- //

      } else {
        // ---------- Password did not match DBPassword ---------- //
        echo "Login_Failed";
      }

      // Print all values from array for TESTING
      //print_r(array_values($DBMatchDataDecoded));

    }



    // ---------- END: Username match found ---------- //

  }



}

?>
