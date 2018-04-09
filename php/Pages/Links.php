<?php

// Declaring filename
$File = explode('.', basename($_SERVER['SCRIPT_FILENAME']));
$Filename = $File[0];
$FileExt = $File[1];
$FilenameSplit = preg_split('/(?=[A-Z])/', $Filename);
$FilenameFull = implode(" ", array_filter($FilenameSplit));

// Pages
$URI_Index = "Index.html";
$URI_Login = "Login.html";
$URI_Register = "Register.html";
$URI_Home = "Home.php";
$URI_Lesson = "Lesson.php";
$URI_Majors = "Majors.php";
$URI_EditMajor = "EditMajor.php";
$URI_Test = "Test.php";
$URI_NewLesson = "NewLesson.php";
$URI_NewTest = "NewTest.php";
$URI_Rooms = "Rooms.php";
$URI_Classes = "Classes.php";

// Social
$URI_Facebook = "https://www.Facebook.com/";
$URI_Youtube = "https://www.Youtube.com/";
$URI_Instagram = "https://www.Instagram.com/";
$URI_LinkedIn = "https://www.LinkedIn.com/";
$URI_Twitter = "https://www.Twitter.com/";

 ?>
