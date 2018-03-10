<?php

require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');

$QueryRoomGroup = "SELECT * FROM room_group";
$RoomGroupResult = $conn->query($QueryRoomGroup);


while ($Room_Group_Item = $RoomGroupResult->fetch_array()) {
    $RoomGroupArray[] = $Room_Group_Item;
}

echo "[";

$Room_Group_Count = count($RoomGroupArray);
$Room_Group_Increment = 0;

foreach ($RoomGroupArray as $Room_Group_Item) {
    $JSON_Final = json_encode(
      array(
         "key" => $Room_Group_Item['key'],
         "label" => $Room_Group_Item['label'],
         "open" => $Room_Group_Item['open'],
         "children" => [
           array(
           "key" => "202",
           "label" => "Room 202 (30)"
           ), array(
             "key" => "202",
             "label" => "Room 202 (30)"
           )
         ]
      )
    );

    if (++$Room_Group_Increment === $Room_Group_Count) {
        print_r($JSON_Final);
    } else {
        print_r($JSON_Final . ', ');
    }
}

echo "]";


// close connection
$conn->close();


/* Working JSON
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

require($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/ReportStatus.php');

$QueryRoomGroup = "SELECT * FROM room_group";
$RoomGroupResult = $conn->query($QueryRoomGroup);


while ($Room_Group_Item = $RoomGroupResult->fetch_array()) {
    $RoomGroupArray[] = $Room_Group_Item;
}

echo "[";

$Room_Group_Count = count($RoomGroupArray);
$Room_Group_Increment = 0;

foreach ($RoomGroupArray as $Room_Group_Item) {
    $JSON_Final = json_encode(
      array(
         "key" => $Room_Group_Item['key'],
         "label" => $Room_Group_Item['label'],
         "open" => $Room_Group_Item['open'],
         "children" => [
           array(
           "key" => "202",
           "label" => "Room 202 (30)"
           ), array(
             "key" => "202",
             "label" => "Room 202 (30)"
           )
         ]
      )
    );

    if (++$Room_Group_Increment === $Room_Group_Count) {
        print_r($JSON_Final);
    } else {
        print_r($JSON_Final . ', ');
    }
}

echo "]";

$conn->close();
*/
