<?php
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

$QueryRoomGroup = 'SELECT * FROM rooms';
$RoomGroupResult = $conn->query($QueryRoomGroup);

while ($Room_Group_Item = $RoomGroupResult->fetch_array()) {
    $RoomGroupArray[] = $Room_Group_Item;
}

echo '[';

$IndexOne = 1;
foreach ($RoomGroupArray as $RoomItem) {
    if (is_null($RoomItem['parent_key'])) {
        if ($IndexOne !== 1) {
            echo ',';
        }

        $obj = array(
                "key" => $RoomItem['key'],
                "label" => $RoomItem['label'],
                //"open" => $RoomItem['open'],
                "open" => false,
                "children" => array()
              );

        foreach ($RoomGroupArray as $RoomSubOne) {
            if ($RoomSubOne['parent_key'] == $RoomItem['key']) {
                if ($RoomSubOne['type'] == 'Folder') {
                    $ChildOne = array(
                        "key" => $RoomSubOne['key'],
                        "label" => $RoomSubOne['label'],
                        //"open" => $RoomSubOne['open'],
                        "open" => false,
                        "children" => array()
                      );


                    foreach ($RoomGroupArray as $RoomSubTwo) {
                        if ($RoomSubTwo['parent_key'] == $RoomSubOne['key']) {
                            $ChildTwo = array(
                                "key" => $RoomSubTwo['key'],
                                "label" => $RoomSubTwo['label'],
                                //"open" => $RoomSubTwo['open'],
                                "open" => false
                              );

                            array_push($ChildOne['children'], $ChildTwo);
                        }
                    }
                } else {
                    $ChildOne = array(
                        "key" => $RoomSubOne['key'],
                        "label" => $RoomSubOne['label'],
                        //"open" => $RoomSubOne['open'],
                        "open" => false
                      );
                }


                array_push($obj['children'], $ChildOne);
            }
        }


        echo json_encode($obj);

        $IndexOne++;
    }
}

echo ']';

// close connection
$conn->close();
