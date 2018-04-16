<?php

// ---------- START: Declare session data ---------- //

$Session = array(
  'User_Id' => $_SESSION['User_Id'],
  'User_Type' => $_SESSION['User_Type'],
  'Username' => $_SESSION['Username'],
  'Firstname' => $_SESSION['Firstname'],
  'Middlename' => $_SESSION['Middlename'],
  'Lastname' => $_SESSION['Lastname'],
  'Email' => $_SESSION['Email'],
  'Phone' => $_SESSION['Phone'],
  'Birth_Date' => $_SESSION['Birth_Date'],
  'Img_Src' => $_SESSION['Img_Src'],
  'Login_Date' => $_SESSION['Login_Date']
);

$SessionRequired = array(
 'User_Id',
 'User_Type',
 'Username',
 'Firstname',
 'Middlename',
 'Lastname',
 'Email',
 'Phone',
 'Birth_Date',
 'Img_Src'
);

// ---------- END: Declare session data ---------- //

?>
