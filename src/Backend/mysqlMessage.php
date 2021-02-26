<?php

require_once "mysqlConnect.php";
// creation de l'instance PDO et connexion a la BD `
$query = "SELECT * FROM $mysqlMessage".
         " WHERE id <= ? AND nbEtud != ?";

$data = array(10,1);

$statement = $PDO->prepare( $query );
$exec = $statement->execute( $data );

$resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach ($resultats as $result)
  print_r($result);

?>
