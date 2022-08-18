<?php

function resultAsArray($res)
{
    $result = array();
    while ($resultRow = $res->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $resultRow);
    }
    return $result;
}