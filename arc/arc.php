<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'arc':
        $res = $pdo->query("SELECT * FROM arc WHERE id_arc = {$method['id']}");
        $infos = resultAsArray($res);

        echo json_encode(["success" => true, "infos" => $infos]);
        break;

    case 'episode':
        $res = $pdo->query("SELECT * FROM episode WHERE id_arc = {$method['id']}");
        $episodes = resultAsArray($res);

        echo json_encode(["success" => true, "episodes" => $episodes]);
        break;
}

?>