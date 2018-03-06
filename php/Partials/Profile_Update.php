<?php
session_start();

// Including db connection
require 'DB.php';

// For testing
/*print_r($_POST);
echo $_FILES['ImgSrc']['name'];*/

// Date now (dd-mm-yyyy)
$DateNow = date('d-m-Y');
// Time now (HH:MM:SS)
$TimeNow = date('H:i:s');

// ---------- START: Declare all POST values ---------- //

$NewEmail = $_POST['Email'];
$NewPhone = $_POST['Phone'];
if (isset($_FILES['ImgSrc'])) {
    $NewImg = $_FILES['ImgSrc'];
}


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


// If phone or email is empty, return error
if ($NewEmailEmpty == 'Empty' || $NewPhoneEmpty == 'Empty') {
    echo 'Empty_Email_Phone';
} else {
    require '../Functions/CheckUserVal.php';
    $CheckUserValResult = CheckUserVal($conn);

    if ($CheckUserValResult !== 'Session_DB_Equal') {
        // CheckUserVal() function returns 'Redirect-$Reason' or 'Session_DB_Equal'
    // ---------- START: List of all error responses ---------- //
    /*

    - Session_Data_NotSet
    - Session_Data_Empty
    - DB_Username_NoMatch
    - DB_Data_Empty
    - Session_DB_NotEqual

    */
    // ---------- END: List of all error responses ---------- //
    } else {

        require '../Functions/ProfileUpdateFunction.php';

        if ($NewImgEmpty == 'Empty') {
            UpdateUser($conn, $NewEmail, $NewPhone, 'Empty');
        } else {
            UpdateUser($conn, $NewEmail, $NewPhone, $NewImg);
        }
    }
}
