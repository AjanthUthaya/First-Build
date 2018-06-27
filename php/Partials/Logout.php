<?php
// Start a new session
session_start();

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to clear and redirect to login
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ClearSession.php');

// Function to clear and redirect to login
require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/UserOnline.php');

// Include array with session and SessionRequired
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/Session_Variables.php');

// Report user activity
UserOnline($Session['User_Id'], $Session['User_Type'], $Session['Username'], 'LogOut - Successful', $_SERVER["HTTP_REFERER"]);



// ==================== START ==================== //
// # Clear session out #
// ==================== START ==================== //

// Clear out all session values
ClearSession('Logged_Out');

// Remove all session variables, or just specific
session_unset();

// Generate a new session ID
session_regenerate_id(true);

// Destroy the session and remove from server-side
session_destroy();

// Unset the cookie on the client-side, force the cookie to expire
setcookie('PHPSESSID', '', 1);

// ==================== END ==================== //
// # Clear session out #
// ==================== END ==================== //



// Send feedback to user
echo "Logged out";
