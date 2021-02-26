<?php

require_once "mysqlConnect.php";



function getUserId()
{
  global $PDO;
// creation de l'instance PDO et connexion a la BD `
  $query = "SELECT login, password, idUser FROM User" .
    " WHERE login = ? AND password = ?";

  $data = array($_POST['login'], $_POST['password']);

  $statement = $PDO->prepare($query);
  $exec = $statement->execute($data);

  $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

  if ($resultats[0]['login'] == $data[0] && $resultats[0]['password'] == $data[1]) {
    return $resultats[0]['idUser'];
  }
  else{
    return -1;
  }



}


?>
