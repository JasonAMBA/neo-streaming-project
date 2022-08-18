<?php

session_start();
session_regenerate_id();
require_once("../utils/streamingdb.php");

$_SESSION['connected']= false;
unset($_SESSION['id_user']);

echo json_encode(['success' => true]);

?>