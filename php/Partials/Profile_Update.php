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
$CheckUserValResult = CheckUserVal($conn, $_SESSION, 'Pre-Auth ProfileUpdate');


// ***** Check if user authentication failed ***** //
if ($CheckUserValResult['Message'] !== 'Session_DB_Equal') {
  JsonResponse('Failed', '', $CheckUserValResult);
  exit();
}



// ==================== START ==================== //
// # Update user #
// ==================== START ==================== //

// Include function to update user profile
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UpdateProfile.php');
// Include function to log user activity
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');

// Report user activity
UserOnline($_SESSION['User_Id'], $_SESSION['User_Type'], $_SESSION['Username'], 'ProfileUpdate - Running', $_SERVER["HTTP_REFERER"]);

// If there is no img, only update email and phone value
if ($NewImgEmpty == 'Empty') {

  // Only update email and phone, not img
  UpdateProfile($conn, $NewEmail, $NewPhone, 'Empty');

  // Declare response array
  $ResponseArray = array(
    'Status' => 'Done',
    'Title' => 'Update successful',
    'Message' => 'Profile data successfully updated',
    'Img' => 'false',
    'Data' => array(
      'Email' => $NewEmail,
      'Phone' => $NewPhone
    )
  );

} else {

  // Update img, email and phone value
  UpdateProfile($conn, $NewEmail, $NewPhone, $NewImg);

  // Declare response array
  $ResponseArray = array(
    'Status' => 'Done',
    'Title' => 'Update successful',
    'Message' => 'Profile data successfully updated',
    'Img' => 'true',
    'Data' => array(
      'Email' => $NewEmail,
      'Phone' => $NewPhone
    )
  );

}

// ==================== END ==================== //
// # Update user #
// ==================== END ==================== //



// Report user activity
UserOnline($_SESSION['User_Id'], $_SESSION['User_Type'], $_SESSION['Username'], 'ProfileUpdate - Successful', $_SERVER["HTTP_REFERER"]);

// Send feedback to user
echo json_encode($ResponseArray);
exit();
