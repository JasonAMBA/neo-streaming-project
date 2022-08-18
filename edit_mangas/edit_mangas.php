<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT * FROM manga");
        $mangas = resultAsArray($res);

        echo json_encode(["success" => true, "mangas" => $mangas]);
        break;
    
    case 'insert':
        if (isset($method['name'], $method['summary'], $method['logo'], $method['author'], $method['release'], $method['number_episodes'], $method['number_arcs']) && trim($method['name']) != '' && trim($method['summary']) != '' && trim($method['logo']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['number_episodes']) != '' && trim($method['number_arcs']) != '') {

            $sql = "INSERT INTO manga (name, summary, logo, author, release_date, number_episodes, number_arcs) VALUES (:name, :summary, :logo, :author, :release, :number_episodes, :number_arcs)";
            $req = $pdo->prepare($sql);
            $req->bindValue(':name', $method['name']);
            $req->bindValue(':summary', $method['summary']);
            $req->bindValue(':logo', $method['logo']);
            $req->bindValue(':author', $method['author']);
            $req->bindValue(':release', $method['release']);
            $req->bindValue(':number_episodes', $method['number_episodes']);
            $req->bindValue(':number_arcs', $method['number_arcs']);
            $req->execute();

            echo json_encode(["success" => true, "newid" => $pdo->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Toutes les données n'ont pas été transmises"]);
        break;

    case 'select_id':
        if (isset($method['id'])) {
            $res = $pdo->query("SELECT * FROM manga WHERE id_manga = {$method['id']}");
            $manga = resultAsArray($res)[0];

            echo json_encode(["success" => true, "manga" => $manga]);
        } else echo json_encode(["success" => false, "msg" => "L'id' du manga n'a pas été transmis"]);
        break;

    case 'update':
        if (isset($method['name'], $method['summary'], $method['logo'], $method['author'], $method['release'], $method['number_episodes'], $method['number_arcs'], $method['id']) && trim($method['name']) != '' && trim($method['summary']) != '' && trim($method['logo']) != '' && trim($method['author']) != '' && trim($method['release']) != '' && trim($method['number_episodes']) != '' && trim($method['number_arcs']) != '') {

            $sql = "UPDATE manga SET name = :name, summary = :summary, logo = :logo, author = :author, release_date = :release, number_episodes = :number_episodes, number_arcs = :number_arcs WHERE id_manga = {$method['id']}";
            $req = $pdo->prepare($sql);
            $req->bindValue(':name', $method['name']);
            $req->bindValue(':summary', $method['summary']);
            $req->bindValue(':logo', $method['logo']);
            $req->bindValue(':author', $method['author']);
            $req->bindValue(':release', $method['release']);
            $req->bindValue(':number_episodes', $method['number_episodes']);
            $req->bindValue(':number_arcs', $method['number_arcs']);
            $req->execute();

            echo json_encode(["success" => true, 'sql' => $sql]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmise"]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM manga WHERE id_manga = {$method['id']}";
            $pdo->query($sql);
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix, vérifiez votre requête"]);
        break;
}

?>