<?php

require_once "helper.php";

global $PDO;
// creation de l'instance PDO et connexion a la BD `
$query = "SELECT * FROM Messages WHERE idMatiere IN (SELECT idMatiere FROM Inscription".
  " WHERE idUser = ? AND idMatiere = ?) ";



$data = array($_SESSION['idUtilisateur'], $_POST['idMatiere']);

$statement = $PDO->prepare($query);
$exec = $statement->execute($data);

$resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

sendMessage($resultats);
