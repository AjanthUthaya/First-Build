<?php
session_start();

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to clear and redirect to login
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

// Function to clear and redirect to login
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');

// Include array with session and SessionRequired
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');


UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'Logged out');
ClearSession('Logged_Out');


echo "Logged out";

 ?>
