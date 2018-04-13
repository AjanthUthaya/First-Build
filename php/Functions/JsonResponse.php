<?php

// Declaring response array/json
$RegisterResponse = array();

function JsonResponse($Status, $Title, $Message) {
  // Declare variables
  $RegisterResponse['Status'] = $Status;
  
  if ($Title == '') {
    $RegisterResponse['Title'] = $Status;
  } else {
    $RegisterResponse['Title'] = $Title;
  }

  $RegisterResponse['Message'] = $Message;

  // Encode array into JSON
  $RegisterResponseJSON = json_encode($RegisterResponse);

  // Send JSON array
  echo $RegisterResponseJSON;
}

 ?>
