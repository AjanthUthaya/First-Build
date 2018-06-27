<?php

require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

$QueryTeachers = "SELECT id, firstname, middlename, lastname, email, phone, img_src FROM users WHERE active = 'true' AND user_type = 'Teacher' OR active = 'true'  AND user_type = 'Admin'";
$TeachersResult = $conn->query($QueryTeachers);

while ($Teacher_Item = $TeachersResult->fetch_assoc()) {
    $TeacherArray[] = $Teacher_Item;
}

$Teachers_Count = count($TeacherArray);
$Teachers_Increment = 0;

echo "[";

foreach ($TeacherArray as $Teacher_Item) {

    // Set fullname variable
    if ($Teacher_Item['middlename'] !== 'NULL') {
      $FullName = $Teacher_Item['firstname'] . ' ' . $Teacher_Item['middlename'] . ' ' . $Teacher_Item['lastname'];
    } else {
      $FullName = $Teacher_Item['firstname'] . ' ' . $Teacher_Item['lastname'];
    }

    $JSON = array(
      "id" => (int)$Teacher_Item['id'],
      "name" => $FullName,
      "email" => $Teacher_Item['email'],
      "phone" => $Teacher_Item['phone'],
      "selected" => false,
      "imgsrc" => $Teacher_Item['img_src']
    );


    $JSON_Final = json_encode($JSON);

    // Remove , from the last item
    if (++$Teachers_Increment === $Teachers_Count) {
        print_r($JSON_Final);
    } else {
        print_r($JSON_Final . ', ');
    }

    unset($TeacherArray);

}

echo "]";

// close connection
$conn->close();
