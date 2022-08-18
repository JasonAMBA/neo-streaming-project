<?php

session_start();
session_regenerate_id();
require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;


switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT watch.*, episode.number_episode, episode.titre_episode, arc.name_arc AS arc, manga.name AS manga, CAST(datetime_watch AS DATE) AS date, CAST(datetime_watch AS TIME) AS time FROM watch INNER JOIN episode ON episode.id_episode = watch.id_episode INNER JOIN arc ON arc.id_arc = episode.id_arc INNER JOIN manga ON manga.id_manga = arc.id_manga WHERE watch.id_user = '{$_SESSION['id_user']}' ORDER BY datetime_watch DESC ");
        $historicals = resultAsArray($res);

        echo json_encode(["success" => true, "historicals" => $historicals]);
        break;

    case 'select_id':
        $res = $pdo->query("SELECT DISTINCT id_user from watch WHERE  id_user = '{$_SESSION['id_user']}'");
        $ids = resultAsArray($res);

        echo json_encode(["success" => true, "ids" => $ids]);
        break;

    case 'insert':
        $sql = "INSERT INTO watch (id_episode, id_user) VALUES (:id, :id_user)";
        $req = $pdo->prepare($sql);
        $req->bindValue(':id', $method['episode_id']);
        $req->bindValue(':id_user', $_SESSION['id_user']);
        $req->execute();

        echo json_encode(["success" => true]);
        break;

    case 'delete':
        $sql = "DELETE FROM watch WHERE id_user = '{$_SESSION['id_user']}'";
        $pdo->query($sql);

        echo json_encode(["success" => true]);
        break;
}




?>