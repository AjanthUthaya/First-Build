<?php

// Function to give AJAX response
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

// Function to log user activity
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');



// ----------   ---------- //
// START: Check for empty $_POST variables
// ----------   ---------- //

// Required fields from registration
$required = array(
 'Firstname',
 'Lastname',
 'Email',
 'Phone',
 'Birth_Date',
 'Username',
 'Password',
 'CPassword'
);

// Loop over POST fields, to make sure non are empty
$Empty_Field = false;

foreach ($required as $field) {
  if (empty($_POST[$field])) {
    $Empty_Field = true;
  }
}

// Check if any of the $_POST variables are empty
if ($Empty_Field == true) {
  JsonResponse("Failed", "", "Please fill out all fields");
  exit();
}

// ----------   ---------- //
// END: Check for empty $_POST variables
// ----------   ---------- //



// Check if Password and CPassword matches
if ($_POST['Password'] !== $_POST['CPassword']) {
  JsonResponse("Failed", "", "Password does not match the confirm password");
  exit();
}



// ----------   ---------- //
// START: reCAPTCHA section
// ----------   ---------- //

// Check if reCAPTCHA is activated
if (empty($_POST['g-recaptcha-response'])) {
  JsonResponse("Failed", "", "reCAPTCHA is not activated");
  exit();
}


// reCAPTCHA secret key
$secret = '6Ld6QkQUAAAAAAfnqi9VR5W5a3pKZCdidTNKTEAp';

// Declare reCAPTCHA variables
$response = $_POST['g-recaptcha-response'];
$remoteip = $_SERVER['REMOTE_ADDR'];

// Get response from API
$verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$remoteip");
$responseData = json_decode($verifyResponse);


// Check if reCAPTCHA failed
if ($responseData->success !== true) {
  JsonResponse("Failed", "", "reCAPTCHA failed, try again");
  exit();
}

// ----------   ---------- //
// END: reCAPTCHA section
// ----------   ---------- //



// ----------   ---------- //
// START: Declare $_POST variables
// ----------   ---------- //

$Firstname = $_POST["Firstname"];
$Middlename = $_POST["Middlename"] ?: 'NULL';
$Lastname = $_POST["Lastname"];
$Email = $_POST["Email"];
$Phone = $_POST["Phone"];
$Birth_Date = $_POST["Birth_Date"];
$Username = $_POST["Username"];
$Password = $_POST["Password"];
$CPassword = $_POST["CPassword"];

// ----------   ---------- //
// END: Declare $_POST variables
// ----------   ---------- //



// Including db connection
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');



// ----------   ---------- //
// START: Check if username is taken
// ----------   ---------- //

// Check if username is taken
$Query = "SELECT username FROM users WHERE username = ?";

// Prepareing statement
if (!($stmt = $conn->prepare($Query))) {
  JsonResponse("Error", "", "Prepareing statement");
  exit();
}

// Binding parameters
if (!$stmt->bind_param("s", $_POST["Username"])) {
  JsonResponse("Error", "", "Binding parameters");
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  JsonResponse("Error", "", "Executeing statement");
  exit();
}

// Store data after execution of query
$stmt->store_result();

// Check if num_rows is anything but 0
if ($stmt->num_rows !== 0) {
  JsonResponse("Failed", "", "Username is taken");
  exit();
}

// Close prepared statement
$stmt->close();

// ----------   ---------- //
// END: Check if username is taken
// ----------   ---------- //



// Check if image is corrupted, or displaying any errors
if ($_FILES["ImgSrc"]["error"] > 0) {
  JsonResponse("Error", "", "There was an error uploading the image");
  exit();
}

// Check if image is empty
if (empty($_FILES["ImgSrc"])) {
  JsonResponse("Failed", "", "Please select a image");
  exit();
}



// ----------   ---------- //
// START: Check if image file has a valid ext
// ----------   ---------- //

// Declare valid extensions in array
$ValidExtensions = array(
 "jpeg",
 "jpg",
 "png"
);

// Get the extension format of the file
$Temp_File = explode(".", $_FILES["ImgSrc"]["name"]);
$File_Extension = end($Temp_File);

// Set default value
$ValidFormat = false;

// Loop thourgh array to see if any match
foreach ($ValidExtensions as $ext) {
  if ($ext == $File_Extension) {
    $ValidFormat = true;
  }
}

// Check if file has a invalid extension
if ($ValidFormat == false) {
  JsonResponse("Failed", "", "Not a valid image format, image needs to be: .JPEG - .JPG - .PNG");
  exit();
}

// ----------   ---------- //
// END: Check if image file has a valid ext
// ----------   ---------- //



// Check if image is within 10MB
if ($_FILES["ImgSrc"]["size"] > 10485760) {
  JsonResponse("Failed", "", "Image size is too big, max size is 10MB");
  exit();
}



// ----------   ---------- //
// START: Declare variables for insert to DB
// ----------   ---------- //

// Set image filename (1 = increment)
$Increment = '1';
$NewImgName = $Username . '_' . $Increment . '.' . $File_Extension;

// Set image path
$NewImgPath = 'img/Profile/' . $NewImgName;

// Set time and date
date_default_timezone_set("Europe/Oslo");
$Date_Now = date("d-m-Y");
$Time_Now = date("H:i:s");

// Get GetUserIP
include($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/GetUserIP.php');
$User_Ip = GetUserIP();

// Hash password
$Hashed_Password = password_hash($Password, PASSWORD_BCRYPT);

// ----------   ---------- //
// END: Declare variables for insert to DB
// ----------   ---------- //



// ----------   ---------- //
// START: Insert values with prepared statement
// ----------   ---------- //

$Query = 'INSERT INTO users
          (firstname, middlename, lastname, email, phone, birth_date, username,
            password, img_src, creation_date, creation_time, creation_ip)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

// Prepareing statement
if (!($stmt = $conn->prepare($Query))) {
  JsonResponse('Error', '', 'Prepareing statement');
  exit();
}

// Binding parameters (13 values)
if (!$stmt->bind_param('ssssssssssss', $Firstname, $Middlename, $Lastname, $Email,
    $Phone, $Birth_Date, $Username, $Hashed_Password, $NewImgPath, $Date_Now, $Time_Now, $User_Ip)) {
  JsonResponse('Error', '', 'Binding parameters');
  exit();
}

// Executeing statement
if (!$stmt->execute()) {
  JsonResponse('Error', '', $stmt->error);
  exit();
}

// Close prepared statement
$stmt->close();

// ----------   ---------- //
// START: Insert values with prepared statement
// ----------   ---------- //



// Close connection to the database
$conn->close();


// Create thumbnail
require ($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/CreateTumbnail.php');
CreateThumbnail($_FILES["ImgSrc"], "../../img/Profile/Thumbnail/" . $NewImgName, 100);

// Upload img to server folder folder
move_uploaded_file($_FILES["ImgSrc"]["tmp_name"], "../../img/Profile/" . $NewImgName);


// Send success response
JsonResponse("Done", "User added", $Username . " successfully added");
// Report user activity
UserOnline('', '', $_POST['Username'], 'Registration - New user added');
exit();
