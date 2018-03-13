<?php
// DHTMLX Scheduler connector
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/scheduler_connector.php');

// Support for MySQLi
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/db_mysqli.php');

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

// Function to get user ip, GetUserIP()
include($_SERVER['DOCUMENT_ROOT'] . '/php/Functions/GetUserIp.php');


// Initialize connection to database
$dbtype = 'MySQLi';
$scheduler = new schedulerConnector($conn, $dbtype);

// For DB action logging
$scheduler->enable_log("../Database_Log.txt", true);

// Function to set data that does not get rendered in the calendar
function ShadowData($ev)
{
    session_start();

    // Setting timezone
    date_default_timezone_set("Europe/Oslo");

    // Setting creation date to now
    $Creation_Date = date("d-m-Y");
    $Creation_Time = date("H:i:s");

    // Created by
    $ev->set_value("creation_by", $_SESSION['DB_Username']);
    // Date
    $ev->add_field("creation_date", $Creation_Date);
    // Time
    $ev->add_field("creation_time", $Creation_Time);
    // Ip
    $ev->add_field("creation_ip", GetUserIP());
}

// Before insert
$scheduler->event->attach("beforeInsert", "ShadowData");
// Before update
$scheduler->event->attach("beforeUpdate", "ShadowData");
// Before delete
$scheduler->event->attach("beforeDelete", "ShadowData");

// Sort result by x field and order in ASC/DESC
$scheduler->sort("start_date", "ASC");
// Querry and render calendar
$scheduler->render_table("lessons", "lesson_id", "id, type, start_date, end_date, teacher_id, title, sub, room, color, vgs, ava, ava_max, details, creation_by");
