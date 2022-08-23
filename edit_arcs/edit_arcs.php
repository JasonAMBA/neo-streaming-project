<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'select':
        $res = $pdo->query("SELECT arc.*, manga.logo AS manga FROM arc INNER JOIN manga on manga.id_manga = arc.id_manga GROUP BY arc.id_arc");
        $arcs = resultAsArray($res);

        echo json_encode(["success" => true, "arcs" => $arcs]);
        break;

    case 'insert':
        if (isset($method['arc_number'], $method['name'], $method['picture'], $method['manga'], $method['synopsis']) 
        && trim($method['arc_number']) != '' 
        && trim($method['name']) != '' 
        && trim($method['picture']) != '' 
        && trim($method['manga']) != '' 
        && trim($method['synopsis']) != '') {

            $sql = "INSERT INTO arc (arc_number, name_arc, picture, id_manga, synopsis) VALUES (:arc_number, :name, :picture, :manga, :synopsis)"; 
            $req = $pdo->prepare($sql);
            $req->bindValue(':arc_number', $method['arc_number']);
            $req->bindValue(':name', $method['name']);
            $req->bindValue(':picture', $method['picture']);
            $req->bindValue(':manga', $method['manga']);
            $req->bindValue(':synopsis', $method['synopsis']);
            $req->execute();

            echo json_encode(["success" => true, "newid" => $pdo->insert_id]);
        } else echo json_encode(["success" => false, "msg" => "Toutes les données n'ont pas été transmises"]);
        break;

    case 'select_id':
        if (isset($method['id'])) {
            $res = $pdo->query("SELECT * FROM arc WHERE id_arc = {$method['id']}");
            $arc = resultAsArray($res)[0];

            echo json_encode(["success" => true, "arc" => $arc]);
        } else echo json_encode(["success" => false, "msg" => "L'id' du manga n'a pas été transmis"]);
        break;

    case 'update':
        if (isset($method['arc_number'], $method['name'], $method['picture'], $method['manga'], $method['synopsis']) 
        && trim($method['arc_number']) != '' 
        && trim($method['name']) != '' 
        && trim($method['picture']) != '' 
        && trim($method['manga']) != '' 
        && trim($method['synopsis']) != '') {

            $sql = "UPDATE arc SET arc_number = :arc_number, name_arc = :name, picture = :picture, id_manga = :manga, synopsis = :synopsis WHERE id_arc = {$method['id']}";
            $req = $pdo->prepare($sql);
            $req->bindValue(':arc_number', $method['arc_number']);
            $req->bindValue(':name', $method['name']);
            $req->bindValue(':picture', $method['picture']);
            $req->bindValue(':manga', $method['manga']);
            $req->bindValue(':synopsis', $method['synopsis']);
            $req->execute();

            echo json_encode(["success" => true, 'sql' => $sql]);
        } else echo json_encode(["success" => false, "msg" => "Une ou plusieurs données n'ont pas été transmise"]);
        break;

    case 'delete':
        if (isset($method['id'])) {
            $sql = "DELETE FROM arc WHERE id_arc = {$method['id']}";
            $pdo->query($sql);
            echo json_encode(["success" => true]);
        } else echo json_encode(["success" => false, "msg" => "Erreur lors de la suppression"]);
        break;

    default:
        echo json_encode(["success" => false, "msg" => "Mauvais choix de requête"]);
        break;
}

?>