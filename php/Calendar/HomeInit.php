<?php

// NOTE: Error reporting for testing
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//events.php
include($_SERVER['DOCUMENT_ROOT'] .'/php/Addon/Dhtmlx/scheduler_connector.php');//includes the file

// MySQLi
include($_SERVER['DOCUMENT_ROOT'] .'/php/Addon/Dhtmlx/db_mysqli.php');

$res = new mysqli("localhost", "root", "root", "first-build");
$dbtype = "MySQLi";

$calendar = new schedulerConnector($res, $dbtype);//connector initialization
$calendar->render_table("lessons", "lesson_id", "start_date, end_date, title, sub, room, ava, ava_max");


// NOTE: scheduler.getEvents(); to get all loaded events
