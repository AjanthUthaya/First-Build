<?php
session_start();

// Unset all data

// ---------- Clears session data ---------- //
unset($_SESSION['DB_User_Id']);
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
unset($_SESSION['Login_Date']);

// ---------- Echo reason for clearing out data ---------- //
echo "Logged out";

 ?>
