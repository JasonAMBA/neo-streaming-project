<?php
session_start();
session_regenerate_id();

require_once("../utils/streamingdb.php");
require("../utils/function.php");

if (!isset($_POST['pseudo'], $_POST['pwd'])) {
    echo json_encode(['success' => false]);
    die();
}

$res = $pdo->query("SELECT id_user, passwd, firstname, lastname, is_admin FROM user WHERE login = '{$_POST['pseudo']}'");
$user = resultAsArray($res)[0];

if (password_verify($_POST['pwd'], $user['passwd'])) {
    $_SESSION['connected'] = true;
    $_SESSION['id_user'] = $user['id_user'];

    echo json_encode(['success' => true, 'user' => ['firstname' => $user['firstname'], 'lastname' => $user['lastname'], 'is_admin' => $user['is_admin']]]);
} else {
    echo json_encode(['success' => false]);
}

?>