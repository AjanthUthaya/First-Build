<?php
namespace test;

function UpdateUser($conn, $NewEmail, $NewPhone, $NewImg) {


  // &&&&& # REQUIRE DB CONFIG # &&&&& //
  require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

  // &&&&& # REQUIRE JSON RESPONSE # &&&&& //
  require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');



  // =============== START =============== //
  // # DECLARE SESSION VALUES #
  // =============== START =============== //

  $Session_User_Id = $_SESSION['DB_User_Id'];
  $Session_User_Type = $_SESSION['DB_User_Type'];
  $Session_Username = $_SESSION['DB_Username'];
  $Session_Firstname = $_SESSION['DB_Firstname'];
  $Session_Middlename = $_SESSION['DB_Middlename'];
  $Session_Lastname = $_SESSION['DB_Lastname'];
  $Session_Email = $_SESSION['DB_Email'];
  $Session_Phone = $_SESSION['DB_Phone'];
  $Session_Birth_Date = $_SESSION['DB_Birth_Date'];
  $Session_Img_Src = $_SESSION['DB_Img_Src'];

  // =============== END =============== //
  // # DECLARE SESSION VALUES #
  // =============== END =============== //





  // =============== START =============== //
  // # GET USER DATA FROM DB BY USERNAME #
  // =============== START =============== //



  // =============== END =============== //
  // # GET USER DATA FROM DB BY USERNAME #
  // =============== END =============== //


}
