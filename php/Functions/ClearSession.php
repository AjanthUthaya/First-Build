<?php

// ---------- START: Clears SESSION data ---------- //
function ClearSession($Reason){

/*    unset($_SESSION['DB_User_Id']);
  unset($_SESSION['DB_User_Type']);
  unset($_SESSION['DB_Username']);
  unset($_SESSION['DB_Password']);
  unset($_SESSION['DB_Firstname']);
  unset($_SESSION['DB_Middlename']);
  unset($_SESSION['DB_Lastname']);
  unset($_SESSION['DB_Email']);
  unset($_SESSION['DB_Phone']);
  unset($_SESSION['DB_Birth_Date']);
  unset($_SESSION['DB_Vgs']);
  unset($_SESSION['DB_Img_Src']);
  unset($_SESSION['Login_Date']);*/

  $Clear_Session_Data_Reason = $Reason;

  // Redirect to login
  echo "Redirect-" . $Clear_Session_Data_Reason;

}
// ---------- END: Clears SESSION data ---------- //

 ?>
