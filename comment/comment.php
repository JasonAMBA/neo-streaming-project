<?php

session_start();
session_regenerate_id();

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT comment.*, user.firstname AS prenom FROM comment INNER JOIN user ON user.id_user = comment.id_user WHERE id_manga = '{$method['manga_id']}'");
        $comments = resultAsArray($res);

        echo json_encode(["success" => true, "comments" => $comments]);
        break;

    case 'insert':
        if (isset($method['content']) && trim($method['content']) != '') {
            $sql = "INSERT INTO comment (content, id_user, id_manga) VALUES (:content, :id_user, :id_manga)";
            $req = $pdo->prepare($sql);
            $req->bindValue(':content', $method['content']);
            $req->bindValue(':id_user', $_SESSION['id_user']);
            $req->bindValue(':id_manga', $method['manga_id']);
            $req->execute();

            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Toutes les données n'ont pas été transmises"]);
        break;
}

?>