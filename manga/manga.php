<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'manga':
        $res = $pdo->query("SELECT *, DATE_FORMAT(release_date, '%d/%m/%Y') AS date_fr FROM manga WHERE id_manga = {$method['id']}");
        $infos = resultAsArray($res);

        echo json_encode(["success" => true, "infos" => $infos]);
        break;

    case 'arc':
        $res = $pdo->query("SELECT * FROM arc WHERE id_manga = {$method['id']}");
        $arcs = resultAsArray($res);

        echo json_encode(["success" => true, "arcs" => $arcs]);
        break;
}

?>