<?php

function UpdateUser($conn, $NewEmail, $NewPhone, $NewImg){

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
  $Session_Vgs = $_SESSION['DB_Vgs'];
  $Session_Img_Src = $_SESSION['DB_Img_Src'];

  // ---------- END: Get SESSION data ---------- //

  if ($NewImg == 'Empty') {
    // Image was not selected, just update email and phone values

    // GET DB data, so i can insert the updated user info
    $CheckUsernameSql = "SELECT * FROM users WHERE username = '" . $Session_Username . "' AND active = 'true'";
    $UsernameExists = mysqli_query($conn, $CheckUsernameSql);


    if (mysqli_num_rows($UsernameExists) == 0) {
      // ---------- Username no match to DB usernames ---------- //
      echo "DB_Username_NoMatch";
    } else {
      // ---------- Username match found in DB ---------- //
      // Get values from database and put them inside a JSON object
      while ($MatchLogin = mysqli_fetch_row($UsernameExists)){
        $DBMatchData = json_encode($MatchLogin, JSON_FORCE_OBJECT);
      }

      if (empty($DBMatchData)) {
        echo "DB_CouldNot_Get";
      }
      //Decode JSON object into an array
      $DBMatchDataDecoded = json_decode($DBMatchData, true);

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


      // ---------- START: Declaring other needed variables ---------- //

      include 'GetUserIp.php';

      $Active = 'true';
      $Creation_Ip = GetUserIP();

      // ---------- END: Declaring other needed variables ---------- //

      // Setting timezone
      date_default_timezone_set('Europe/Oslo');
      $Creation_Date = date("d-m-Y");
      $Creation_Time = date("H:i:s");



      $UpdateUserData = "INSERT INTO users
      (active, user_id, user_type, username, password, firstname, middlename, lastname, email, phone, birth_date, vgs, img_src, creation_date, creation_time, creation_ip)
      VALUES
      ('$Active', '$DB_User_Id', '$DB_User_Type', '$DB_Username', '$DB_Password', '$DB_Firstname', '$DB_Middlename', '$DB_Lastname', '$NewEmail', '$NewPhone', '$DB_Birth_Date', '$DB_Vgs', '$DB_Img_Src', '$Creation_Date', '$Creation_Time', '$Creation_Ip')";


      if ($conn->query($UpdateUserData) === TRUE) {
        // Inserted updated user

        $UpdateOld = "UPDATE users SET active='updated' WHERE user_id='$DB_User_Id' AND email='$DB_Email' AND phone='$DB_Phone'";

        if ($conn->query($UpdateOld) === TRUE) {
          $_SESSION['DB_Email'] = $NewEmail;
          $_SESSION['DB_Phone'] = $NewPhone;
          echo "SQL_Done_EmailPhone" . "-" . $NewEmail . "-" . $NewPhone;
        } else {
          echo "SQL_Update_Error";
        }

      } else {
        echo "SQL_Error";
        //echo $conn->connect_error;
      }


    }

  } else {
    // Update image aswell
    print_r($NewImg);
  }
}

 ?>
