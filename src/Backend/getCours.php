<?php

require_once "helper.php";

global $PDO;
// creation de l'instance PDO et connexion a la BD `
$query = "SELECT idMatiere, nom, nbTopic, nbPost, dateLastPost FROM Matieres WHERE idMatiere IN (SELECT idMatiere FROM Inscription".
  " WHERE idUser = ?)";



$data = array($_SESSION['idUtilisateur']);

$statement = $PDO->prepare($query);
$exec = $statement->execute($data);

$resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

sendMessage($resultats);
