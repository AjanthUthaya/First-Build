<?php

// Including db connection
require '../Partials/DB.php';

include '../Functions/GetUserIP.php';

// Required field from registration
$required = array(
  'Firstname',
  'Lastname',
  'Email',
  'Phone',
  'Birth_Date',
  'Vgs',
  'Username',
  'Password',
  'CPassword'
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
} else {

  // ---------- START: reCAPTCHA ---------- //

/*  if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {

    // your site secret key
    $secret = '6Ld6QkQUAAAAAAfnqi9VR5W5a3pKZCdidTNKTEAp';
    $response = $_POST['g-recaptcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];

    // get verify response data
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$remoteip");
    $responseData = json_decode($verifyResponse);
    if ($responseData->success) {*/

      // ---------- reCAPTCHA: Success ---------- //

      // ---------- START: Declaring variable from registration page ---------- //

      $Firstname = $_POST["Firstname"];
      $Middlename = $_POST["Middlename"] ? : 'NULL';
      $Lastname = $_POST["Lastname"];
      $Email = $_POST["Email"];
      $Phone = $_POST["Phone"];
      $Birth_Date = $_POST["Birth_Date"];
      $Vgs = $_POST["Vgs"];
      $Username = $_POST["Username"];
      $Password = $_POST["Password"];
      $CPassword = $_POST["CPassword"];

      // ---------- END: Declaring variable from registration page ---------- //

      // Check if username is taken
      $Query_Username = "SELECT username FROM users WHERE username = '$Username'";
      $Username_Taken = $conn->query($Query_Username);

      // Username is taken
      if ($Username_Taken->num_rows > 0) {
        echo "Username_Taken";
      } else {

        // ---------- START: Upload image ---------- //

        if (isset($_FILES["ImgSrc"]["type"])) {

          // ---------- Set validation (fileType) ---------- //
          $validextensions = array(
            "jpeg",
            "jpg",
            "png"
          );
          $temporary = explode(".", $_FILES["ImgSrc"]["name"]);
          $file_extension = end($temporary);

          // ---------- Set validation (fileType - fileSize) ---------- //
          if ((($_FILES["ImgSrc"]["type"] == "image/png") || ($_FILES["ImgSrc"]["type"] == "image/jpg") || ($_FILES["ImgSrc"]["type"] == "image/jpeg")) && ($_FILES["ImgSrc"]["size"] < 10485760) // 10MB files can be uploaded.
           && in_array($file_extension, $validextensions)) {
            if ($_FILES["ImgSrc"]["error"] > 0) {
              // ---------- Image error ---------- //
              echo "Image_Error";
            } else {
              if (file_exists("img/Profile/" . $_FILES["ImgSrc"]["name"])) {
                // ---------- Image already exits ---------- //
                echo $_FILES["ImgSrc"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
              } else {
                // ---------- Upload image to folder ---------- //
                $temp = explode(".", $_FILES["ImgSrc"]["tmp_name"]);
                $fileType = $_FILES["ImgSrc"]["type"];
                $fileTypeExt = explode("/", $fileType) [1];

                // Declare file name
                $User_Username = $Username;
                // NB: Replace with sql query
                $User_Img_Increment = "1";

                // Set filename
                $newfilename = $User_Username . "_" . $User_Img_Increment . "." . $fileTypeExt;
                $filePath = "img/Profile/" . $newfilename;

                // Upload img to folder
                move_uploaded_file($_FILES["ImgSrc"]["tmp_name"], "../../img/Profile/" . $newfilename);

                // Encrypt password
                $Encrypted_Password = password_hash($Password, PASSWORD_BCRYPT);

                // Setting timezone
                date_default_timezone_set("Europe/Oslo");

                // Setting creation date to now
                $Creation_Date = date("d-m-Y");
                $Creation_Time = date("H:i:s");

                $User_Ip = GetUserIP();

                // Send data to the database
                $CreateNewUser = "INSERT INTO users
                (firstname, middlename, lastname, email, phone, birth_date, vgs, username, password, img_src, creation_date, creation_time, creation_ip)
                VALUES
                ('$Firstname', '$Middlename', '$Lastname', '$Email', '$Phone', '$Birth_Date', '$Vgs', '$Username', '$Encrypted_Password', '$filePath', '$Creation_Date', '$Creation_Time', '$User_Ip')";
                if ($conn->query($CreateNewUser) === TRUE) {
                  echo "SQL_Done";
                } else {
                  echo "SQL_Error";
                  //echo $conn->connect_error;
                }

                // Close connection to the database
                $conn->close();
              }
            }
          } else {
            // ---------- Validation failed ---------- //
            echo "Image_Validation_Failed";
          }
        } else {
          // ---------- No file was selected ---------- //
          echo "Image_Non_Selected";
        }

        // ---------- END: Upload image ---------- //
      }
/*    } else {
      // ---------- reCAPTCHA: Failed ---------- //
      $errMsg = 'reCAPTCHA: Failed';
      echo $errMsg;
    }
  } else {
    // ---------- reCAPTCHA: Not activated ---------- //
    $errMsg = 'reCAPTCHA: Not activated';
    echo $errMsg;
  }*/

  // ---------- END: reCAPTCHA ---------- //

}

?>
