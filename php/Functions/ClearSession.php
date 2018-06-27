<?php

// ---------- START: Clears SESSION data ---------- //


function ClearSession($Reason){

  // Session values inside array
  require ($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');


  // Unset all session variables
  foreach (array_keys($Session) as $key) {
    unset($_SESSION[$key]);
  }


  // Reason for redirecting, add underscore where there is space
  $RedirectReason = str_replace(' ', '_', $Reason);

  // Return value
  return 'Reason=' . $RedirectReason;

}

function ClearSessionDoc($Status, $Reason) {

  // Set default values
  if ($Status == 'Failed') {
    $Status = 'Reason';
  }

  // Session values inside array
  require ($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');


  // Unset all session variables
  foreach (array_keys($Session) as $key) {
    unset($_SESSION[$key]);
  }

  // Reason for redirecting, add underscore where there is space
  $RedirectReason = str_replace(' ', '_', $Reason);

  // Redirect to login (Auto-Login sets reason)
  echo '<script>window.location.href = "Login.html?' . $Status . '=' . $RedirectReason . '";</script>';
  exit();

}

// ---------- END: Clears SESSION data ---------- //

 ?>
