<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils/function.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") $method = $_POST;
else $method = $_GET;

switch ($method['choice']) {
    case 'episode':
        $res = $pdo->query("SELECT * FROM episode WHERE id_episode = {$method['id']}");
        $episodes = resultAsArray($res);

        echo json_encode(["success" => true, "episodes" => $episodes]);
        break;
}

?>