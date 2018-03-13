<?php

// DHTMLX Scheduler connector
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/scheduler_connector.php');

// Support for MySQLi
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/db_mysqli.php');

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');


// Initialize connection to database
$dbtype = 'MySQLi';
$scheduler = new schedulerConnector($conn, $dbtype);

// Sort result by (X field) and order in (ASC/DESC)
$scheduler->sort("start_date", "ASC");
// Querry and render calendar
$scheduler->render_table("lessons", "lesson_id", "id, type, start_date, end_date, teacher_id, title, sub, room, color, vgs, ava, ava_max, details, creation_by");


// NOTE: scheduler.getEvents(); to get all loaded events
