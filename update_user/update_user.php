<?php

session_start();
session_regenerate_id();
require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

$regex = '/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{5,10})/';

switch ($method['choice']) {
    case 'select': 
        $res = $pdo->query("SELECT * FROM user WHERE id_user = '{$_SESSION['id_user']}'");
        $users = resultAsArray($res);

        echo json_encode(["success" => true, "users" => $users]);
        break;

    case 'select_user':
        $res = $pdo->query("SELECT * FROM user WHERE id_user = '{$_SESSION['id_user']}'");
        $infos = resultAsArray($res)[0];

        echo json_encode(["success" => true, "infos" => $infos]);
        break;

    case 'update_user':
        if (isset($method['firstname'],$method['lastname'],$method['birth'],$method['email'],$method['pseudo'],$method['pwd'],$method['confirm'])) {

            if (preg_match($regex, $method['pwd'])) {

                if ($method['pwd'] == $method['confirm']) {

                    $passwd = password_hash($method['pwd'], PASSWORD_DEFAULT);
                    $sql = "UPDATE user SET firstname = :firstname, lastname = :lastname, date_birth = :birth, email = :email, login = :pseudo, passwd = :pwd WHERE id_user = {$_SESSION['id_user']}";
                    $pdo->query($sql);
                    $req = $pdo->prepare($sql);
                    $req->bindValue(':firstname', $method['firstname']);
                    $req->bindValue(':lastname', $method['lastname']);
                    $req->bindValue(':birth', $method['birth']);
                    $req->bindValue(':email', $method['email']);
                    $req->bindValue(':pseudo', $method['pseudo']);
                    $req->bindValue(':pwd', $passwd);
                    $req->execute();

                    echo json_encode(["success" => true, 'sql' => $sql]);
                } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmise"]);
            }
        }
}

?>