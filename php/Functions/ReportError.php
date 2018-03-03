<?php

// Declaring response array/json
$RegisterResponse = array();

function ReportError($Status, $Message) {
  // Declare variables
  $RegisterResponse['Status'] = $Status;
  $RegisterResponse['Message'] = $Message;

  // Encode array into JSON
  $RegisterResponseJSON = json_encode($RegisterResponse);

  // Send JSON array
  echo $RegisterResponseJSON;
}

 ?>
