<?php
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

$QueryRoomGroup = "SELECT * FROM room_group";
$RoomGroupResult = $conn->query($QueryRoomGroup);

while ($Room_Group_Item = $RoomGroupResult->fetch_array()) {
    $RoomGroupArray[] = $Room_Group_Item;
}

echo "[";

$Room_Group_Count = count($RoomGroupArray);
$Room_Group_Increment = 0;

foreach ($RoomGroupArray as $Room_Group_Item) {

    // Querry to get rooms
    $QueryRooms = "SELECT * FROM rooms WHERE room_group_id = '" . $Room_Group_Item['id'] . "'";
    $RoomsResult = $conn->query($QueryRooms);
    while ($Rooms_Item = $RoomsResult->fetch_array()) {
        $RoomsArray[] = $Rooms_Item;
    }

    // Init parrent json object(room groups)
    $JSON = array(
      "key" => $Room_Group_Item['key'],
      "label" => $Room_Group_Item['label'],
      "open" => $Room_Group_Item['open'],
      "children" => array()
    );

    if (empty($RoomsArray)) {
        // No rooms found
    } else {
        // Init "children" for parrent json object(rooms)
        foreach ($RoomsArray as $Room_Item) {
            $JSON['children'][] = array(
          "key" => $Room_Item['room'],
          "label" => $Room_Item['label']
        );
        }
    }

    $JSON_Final = json_encode($JSON);

    // Remove , from the last item
    if (++$Room_Group_Increment === $Room_Group_Count) {
        print_r($JSON_Final);
    } else {
        print_r($JSON_Final . ', ');
    }

    unset($RoomsArray);
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

echo "[<br /><br />";

$Room_Group_Count = count($RoomGroupArray);
$Room_Group_Increment = 0;

foreach ($RoomGroupArray as $Room_Group_Item) {

    // Querry to get rooms
    $QueryRooms = "SELECT * FROM rooms WHERE room_group_id = '" . $Room_Group_Item['id'] . "'";
    $RoomsResult = $conn->query($QueryRooms);
    while ($Rooms_Item = $RoomsResult->fetch_array()) {
        $RoomsArray[] = $Rooms_Item;
    }

    // Init parrent json object(room groups)
    $JSON = array(
      "key" => $Room_Group_Item['key'],
      "label" => $Room_Group_Item['label'],
      "open" => $Room_Group_Item['open'],
      "children" => array()
    );

    if (empty($RoomsArray)) {
        // No rooms found
    } else {
        // Init "children" for parrent json object(rooms)
        foreach ($RoomsArray as $Room_Item) {
            $JSON['children'][] = array(
          "key" => $Room_Item['room'],
          "label" => $Room_Item['label']
        );
        }
    }

    $JSON_Final = json_encode($JSON);

    // Remove , from the last item
    if (++$Room_Group_Increment === $Room_Group_Count) {
        print_r($JSON_Final);
    } else {
        print_r($JSON_Final . ', ');
    }

    unset($RoomsArray);

    echo "<br /><br />";
}

echo "]";

// close connection
$conn->close();
*/
