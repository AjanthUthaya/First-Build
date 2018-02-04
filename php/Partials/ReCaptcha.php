<?php

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


   } else {
     // ---------- reCAPTCHA: Failed ---------- //
     $errMsg = 'reCAPTCHA: Failed';
     echo $errMsg;
   }
} else {
   // ---------- reCAPTCHA: Not activated ---------- //
   $errMsg = 'reCAPTCHA: Not activated';
   echo $errMsg;
}

// ---------- END: reCAPTCHA ---------- //

?>
