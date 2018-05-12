<?php
// Start session
session_start();

// Including DB connection
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Report status in JSON format back to user
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



// ==================== START ==================== //
// # Declare all POST values #
// ==================== START ==================== //

$NewEmail = $_POST['Email'];
$NewPhone = $_POST['Phone'];
if (isset($_FILES['ImgSrc'])) {
  $NewImg = $_FILES['ImgSrc'];
}

// ==================== END ==================== //
// # Declare all POST values #
// ==================== END ==================== //





// ==================== START ==================== //
// # Check if any of the declared POST values are empty #
// ==================== START ==================== //

$NewImgEmpty = 'NotEmpty';
$NewEmailEmpty = 'NotEmpty';
$NewPhoneEmpty = 'NotEmpty';

if (empty($NewImg)) {
  $NewImgEmpty = 'Empty';
}

if (empty($NewEmail)) {
  $NewEmailEmpty = 'Empty';
}

if (empty($NewPhone)) {
  $NewPhoneEmpty = 'Empty';
}

// ==================== END ==================== //
// # Check if any of the declared POST values are empty #
// ==================== END ==================== //



// ***** Check if Email or Phone values are empty ***** //
if ($NewEmailEmpty == 'Empty' || $NewPhoneEmpty == 'Empty') {
  JsonResponse('Failed', 'Required values are missing', 'Empty value/s, please fill out all fields');
  exit();
}


// Require CheckUserVal function, to authenticate user login
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/CheckUserVal.php');
$CheckUserValResult = CheckUserVal($conn, $_SESSION, 'ProfileUpdate');


// ***** Check if user authentication failed ***** //
if ($CheckUserValResult['Message'] !== 'Session_DB_Equal') {
  JsonResponse('Failed', '', $CheckUserValResult);
  exit();
}



// ==================== START ==================== //
// # Update user and send success message to user #
// ==================== START ==================== //

// Include function to update user profile
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ProfileUpdateFunction.php');


// If there is no img, only update email and phone value
if ($NewImgEmpty == 'Empty') {
  $Test = UpdateUser($conn, $NewEmail, $NewPhone, 'Empty');
  JsonResponse('Done', 'Update successfull', $Test);
  exit();
}

// Update img, email and phone value
UpdateUser($conn, $NewEmail, $NewPhone, $NewImg);
JsonResponse('Done', 'Update successfull', 'User data successfully updated');
exit();

// ==================== END ==================== //
// # Update user and send success message to user #
// ==================== END ==================== //
