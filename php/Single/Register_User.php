<?php

// Including db connection
include '../Partials/DB.php';

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

}
else {

  // ---------- START: reCAPTCHA ---------- //
  if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {

    // your site secret key
    $secret = '6Ld6QkQUAAAAAAfnqi9VR5W5a3pKZCdidTNKTEAp';
    $response = $_POST['g-recaptcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];

    // get verify response data
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$remoteip");
    $responseData = json_decode($verifyResponse);
    if ($responseData->success) {

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
      $Query_Username = "SELECT * FROM users WHERE username = '$Username'";
      $Username_Taken = $conn->query($Query_Username);

      // Username is taken
      if ($Username_Taken->num_rows > 0) {

        echo "Username_Taken";

      }
      else {

        // Encrypt password
        $Encrypted_Password = password_hash($Password, PASSWORD_BCRYPT);

        // Setting timezone
        date_default_timezone_set("Norway/Oslo");

        // Setting creation date to now
        $Creation_Date = date("d-m-Y H:i:s");

        // Send data to the database
        $CreateNewUser = "INSERT INTO users (firstname, middlename, lastname, email, phone, birth_date, vgs, username, password, creation_date) VALUES ('$Firstname', '$Middlename', '$Lastname', '$Email', '$Phone', '$Birth_Date', '$Vgs', '$Username', '$Encrypted_Password', '$Creation_Date')";
        if ($conn->query($CreateNewUser) === TRUE) {
          
          echo "SQL_Done";
        }
        else {
          echo "SQL_Error";
        }

        // Close connection to the database
        $conn->close();

        // ---------- END: reCAPTCHA ---------- //

      }
    }
    else {

      // ---------- reCAPTCHA: Failed ---------- //
      $errMsg = 'reCAPTCHA: Failed';
      echo $errMsg;

    }
  }
  else {

    // ---------- reCAPTCHA: Not activated ---------- //
    $errMsg = 'reCAPTCHA: Not activated';
    echo $errMsg;

  }


}

?>
