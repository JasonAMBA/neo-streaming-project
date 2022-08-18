<?php

require_once("../../Streaming-project/utils/streamingdb.php");
require("../../Streaming-project/utils//function.php");

$regex = '/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])(?=.{5,10})/'; // Au moins huit caractères, au moins une lettre, un chiffre et un caractère spécial 

if (isset($_POST['firstname'],$_POST['lastname'],$_POST['birth'],$_POST['email'],$_POST['pseudo'],$_POST['pwd'],$_POST['confirm'])) {

    if (preg_match($regex, $_POST['pwd'])) {

        if ($_POST['pwd'] == $_POST['confirm']) {

            $passwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
            $sql = "INSERT INTO user (firstname, lastname, date_birth, email, login, passwd) VALUES (:firstname, :lastname, :birth, :email, :pseudo, :pwd)";
            $req = $pdo->prepare($sql);
            $req->bindValue(':firstname', $_POST['firstname']);
            $req->bindValue(':lastname', $_POST['lastname']);
            $req->bindValue(':birth', $_POST['birth']);
            $req->bindValue(':email', $_POST['email']);
            $req->bindValue(':pseudo', $_POST['pseudo']);
            $req->bindValue(':pwd', $passwd);
            $req->execute();

            echo json_encode(['success' => true]);
        } else echo json_encode(['success' => false]);
    }
}

?>