<?php
// For testing
/*print_r($_POST);
echo $_FILES['ImgSrc']['name'];*/

// ---------- START: Declare all POST values ---------- //

$NewEmail = $_POST['Email'];
$NewPhone = $_POST['Phone'];
$NewImg = $_FILES['ImgSrc'];

// ---------- END: Declare all POST values ---------- //



// ---------- START: Check if any of the are empty ---------- //

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

// ---------- END: Check if any of the are empty ---------- //


// ---------- START: Get old UserData from DB ---------- //



// ---------- END: Get old UserData from DB ---------- //

 ?>
