<?php
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

$QueryRoomGroup = "SELECT * FROM room_group";
$RoomGroupResult = $conn->query($QueryRoomGroup);

while ($Room_Group_Item = $RoomGroupResult->fetch_array()) {
    $RoomGroupArray[] = $Room_Group_Item;
}

echo "[";

print_r($RoomGroupArray);

echo "]";

// close connection
$conn->close();
