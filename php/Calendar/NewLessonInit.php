<?php
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/scheduler_connector.php');

// Support MySQLi
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/db_mysqli.php');

require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');
$dbtype = 'MySQLi';

// $list = new OptionsConnector($conn, $dbtype);
// $list->render_table("types", "type_id", "type_id(value),name(label)");

$scheduler = new schedulerConnector($conn, $dbtype); // Initialize connection to database

// For error logging
$scheduler->enable_log("../Database_Log.txt",true);

// we set the same name that was used on the client side - 'sections'
// $scheduler->set_options("sections", $list);

$scheduler->render_table("lessons", "lesson_id", "id, type, start_date, end_date, teacher_id, title, sub, room, color, vgs, ava, ava_max, details");
?>
