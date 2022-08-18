<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT episode.*, arc.name_arc AS arc, manga.logo AS manga FROM episode INNER JOIN arc ON arc.id_arc = episode.id_arc INNER JOIN manga ON manga.id_manga = arc.id_manga GROUP BY episode.id_episode");
        $episodes = resultAsArray($res);

        echo json_encode(["success" => true, "episodes" => $episodes]);
        break;

    case 'insert':
        if (isset($method['number'], $method['name'], $method['video'], $method['arc']) && trim($method['number']) != '' && trim($method['name']) != '' && trim($method['video']) != ''&& trim($method['arc']) != '') {

            $sql = "INSERT INTO episode (number_episode, titre_episode, video, id_arc) VALUES (:number_episode, :name, :video, :arc)"; 
            $req = $pdo->prepare($sql);
            $req->bindValue(':number_episode', $method['number']);
            $req->bindValue(':name', $method['name']);
            $req->bindValue(':video', $method['video']);
            $req->bindValue(':arc', $method['arc']);
            $req->execute();

            echo json_encode(["success" => true, "newid" => $pdo->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Toutes les données n'ont pas été transmises"]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM episode WHERE id_episode = {$method['id']}";
            $pdo->query($sql);
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix de requête"]);
        break;
}

?>