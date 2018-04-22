<?php


function CheckAccess($conn, $User_Id, $User_Type, $Username) {

  // Function to report status back to user
  require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/Redirect.php');


  // Function to report status back to user
  include($_SERVER['DOCUMENT_ROOT'] . '/php/Pages/Links.php');


  // ----------   ---------- //
  // START: Get user data from DB
  // ----------   ---------- //

  // Sql query
  $Query = 'SELECT * FROM users WHERE user_id = ? AND user_type = ? AND username = ?';

  // Prepareing statement
  if (!($stmt = $conn->prepare($Query))) {
    //Redirect($URI_Home, 'RestrictAccess', 'Error', 'Prepareing_Statement');
    exit();
  }

  // Binding parameters
  if (!$stmt->bind_param('iss', $User_Id, $User_Type, $Username)) {
    //Redirect($URI_Home, 'RestrictAccess', 'Error', 'Binding_Parameters');
    exit();
  }

  // Executeing statement
  if (!$stmt->execute()) {
    //Redirect($URI_Home, 'RestrictAccess', 'Error', 'Executeing_Statement');
    exit();
  }

  // TESTING
  printf("Error: %s.\n", $stmt->error);

  // Store results from query
  $result = $stmt->get_result();

  // Check if result is empty
  if ($result->num_rows == 0) {
    //Redirect($URI_Home, 'RestrictAccess', 'Failed', 'No_Rows_Found');
    exit();
  }

  // Define array to store values
  $DB_Data = array();

  // Loop through rows and store it in an array
  while ($row = $result->fetch_assoc()) {
    $DB_Data[] = $row;
  }

  // Close prepared statement
  $stmt->close();

  // ----------   ---------- //
  // END: Get user data from DB
  // ----------   ---------- //



  // ----------   ---------- //
  // START: Declare access arrays for admin, teacher and student
  // ----------   ---------- //

  $AccessAdmin = array(
    'Home',
    'Rooms'
  );

  $AccessTeacher = array(
    'Home'
  );

  $AccessStudent = array(
    'Home'
  );

  // ----------   ---------- //
  // END: Declare access arrays for admin, teacher and student
  // ----------   ---------- //



}



 ?>
