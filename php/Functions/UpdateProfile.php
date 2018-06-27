<?php


function UpdateProfile($conn, $NewEmail, $NewPhone, $NewImg) {

  // &&&&& # REQUIRE JSON RESPONSE # &&&&& //
  require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/JsonResponse.php');

  // ***** # CHECK IF USER IS LOGGED IN # ***** //
  if (!isset($_SESSION['Username']) || !isset($_SESSION['User_Id'])) {
    JsonResponse('Failed', '', 'User not logged in');
    exit();
  }



  // =============== START =============== //
  // # GET USER DATA FROM DB #
  // =============== START =============== //

  // _____ # QUERY AFTER USER DATA # _____ //
  $QueryUserData = 'SELECT id, username, img_increment
  FROM users
  WHERE username = ?
  AND active = "true"';


  // ========== START ========== //
  // # RUNNING QUERY #
  // ========== START ========== //

  // ***** # PREPARE STATEMENT # ***** //
  if (!($stmt = $conn->prepare($QueryUserData))) {
    JsonResponse('Error', '', 'Prepareing statement');
    exit();
  }

  // ***** # BIND PARAMETERS # ***** //
  if (!$stmt->bind_param('s', $_SESSION['Username'])) {
    JsonResponse('Error', '', 'Binding parameters');
    exit();
  }

  // ***** # EXECUTE STATEMENT # ***** //
  if (!$stmt->execute()) {
    JsonResponse('Error', '', 'Executeing statement');
    exit();
  }

  // ========== END ========== //
  // # RUNNING QUERY #
  // ========== END ========== //





  // ========== START ========== //
  // # STORE RESULTS FROM QUERY #
  // ========== START ========== //

  // # STORE RESULT # //
  $stmt->store_result();

  // # BIND RESULT TO VARIABLES # //
  $stmt->bind_result($Res_Id, $Res_Username, $Res_ImgIncrement);


  // ***** # IF RESULT EMPTY # ***** //
  if ($stmt->num_rows == 0) {
    JsonResponse('Failed', '', 'No rows found');
    exit();
  }


  // # ARRAY TO STORE RESULT # //
  $Result_User_Data = array();

  // # LOOP THROUGH ROWS AND STORE IN ARRAY # //
  while ($row = $stmt->fetch()) {

    // # PUSH VALUES INTO ARRAY # //
    array_push($Result_User_Data, array(
      'Id' => $Res_Id,
      'Username' => $Res_Username,
      'Img_Increment' => $Res_ImgIncrement
    ));

  }

  // ========== END ========== //
  // # STORE RESULTS FROM QUERY #
  // ========== END ========== //


  // # CLOSE QUERY # //
  $stmt->close();

  // =============== END =============== //
  // # GET USER DATA FROM DB #
  // =============== END =============== //





  // =============== START =============== //
  // # DEFINE ADITIONAL VARIABLES #
  // =============== START =============== //

  // &&&&& # REQUIRE GET_USER_IP # &&&&& //
  require_once($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/GetUserIp.php');

  // # DEFINE USER_IP # //
  $User_Ip = GetUserIP();

  // # DEFINE TIME AND DATE # //
  date_default_timezone_set('Europe/Oslo');
  $Creation_Date = date("d-m-Y");
  $Creation_Time = date("H:i:s");

  // ***** # IF IMG IS NOT EMPTY # ***** //
  if ($NewImg !== 'Empty') {

    // # GET IMG TYPE # //
    $NewImgType = explode("/", $NewImg['type'])[1];

    // # GET NEW IMG INCREMENT (+ 1) # //
    $NewIncrement = $Result_User_Data[0]['Img_Increment'] + 1;


    // # SET NEW IMG NAME # //
    $NewImgName = $_SESSION['Username'] . '_' . $NewIncrement . '.' . $NewImgType;

    // # SET NEW IMG PATH # //
    $NewImgPath = 'img/Profile/' . $NewImgName;

  }

  // =============== END =============== //
  // # DEFINE ADITIONAL VARIABLES #
  // =============== END =============== //





  // =============== START =============== //
  // # UPDATE OLD USER PROFILE USING USERNAME #
  // =============== START =============== //

  // ***** # IF IMG IS NOT EMPTY # ***** //
  if ($NewImg !== 'Empty') {
    // _____ # UPDATE USER DATA, WITH IMG # _____ //
    $UpdateUserData = 'UPDATE users
    SET email = ?, phone = ?, img_src = ?, img_name = ?, img_increment = ?, creation_date = ?, creation_time = ?, creation_ip = ?
    WHERE username = ? AND id = ? AND active = "true"';
  } else {
    // _____ # UPDATE USER DATA, NO IMG # _____ //
    $UpdateUserData = 'UPDATE users
    SET email = ?, phone = ?, creation_date = ?, creation_time = ?, creation_ip = ?
    WHERE username = ? AND id = ? AND active = "true"';
  }



  // ========== START ========== //
  // # RUNNING QUERY #
  // ========== START ========== //

  // ***** # PREPARE STATEMENT # ***** //
  if (!($stmt = $conn->prepare($UpdateUserData))) {
    JsonResponse('Error', '', 'Prepareing statement');
    exit();
  }


  if ($NewImg !== 'Empty') {
    // ***** # BIND PARAMETERS, WITH IMG (10 VALUES) # ***** //
    if (!$stmt->bind_param('ssssissssi', $NewEmail, $NewPhone, $NewImgPath, $NewImgName, $NewIncrement, $Creation_Date, $Creation_Time, $User_Ip, $_SESSION['Username'], $_SESSION['User_Id'])) {
      JsonResponse('Error', '', 'Binding parameters');
      exit();
    }
  } else {
    // ***** # BIND PARAMETERS, NO IMG (7 VALUES) # ***** //
    if (!$stmt->bind_param('ssssssi', $NewEmail, $NewPhone, $Creation_Date, $Creation_Time, $User_Ip, $_SESSION['Username'], $_SESSION['User_Id'])) {
      JsonResponse('Error', '', 'Binding parameters');
      exit();
    }
  }


  // ***** # EXECUTE STATEMENT # ***** //
  if (!$stmt->execute()) {
    JsonResponse('Error', '', 'Executeing statement');
    exit();
  }

  // ========== END ========== //
  // # RUNNING QUERY #
  // ========== END ========== //


  // # CLOSE PREPARED STATEMENT # //
  $stmt->close();

  // =============== END =============== //
  // # UPDATE OLD USER PROFILE USING USERNAME #
  // =============== END =============== //



  // # CLOSE DB CONNECTION # //
  $conn->close();


  if ($NewImg !== 'Empty') {

    // &&&&& # REQUIRE CREATE_THUMBNAIL # &&&&& //
    require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/CreateThumbnail.php');

    // # MAKE A THUMNAIL OF IMG # //
    CreateThumbnail($NewImg, '../../' . 'img/Profile/Thumbnail/' . $NewImgName, 100);


    // # MOVE IMG TO SERVER FOLDER # //
    move_uploaded_file($NewImg['tmp_name'], '../../' . $NewImgPath);

    // # UPDATE SESSION VALUE # //
    $_SESSION['Img_Src'] = $NewImgPath;

  }


  // # UPDATE SESSION VALUE # //
  $_SESSION['Email'] = $NewEmail;
  $_SESSION['Phone'] = $NewPhone;


  return 'Done';

}
