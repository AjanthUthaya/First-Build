<?php

//events.php
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/scheduler_connector.php');//includes the file

// MySQLi
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/db_mysqli.php');

require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');

$dbtype = "MySQLi";

$calendar = new schedulerConnector($conn, $dbtype);//connector initialization
$calendar->render_table("lessons", "lesson_id", "id, type, start_date, end_date, teacher_id, title, sub, room, color, vgs, ava, ava_max, details");


// NOTE: scheduler.getEvents(); to get all loaded events
