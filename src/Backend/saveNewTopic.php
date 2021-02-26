<?php

require_once "helper.php";

function saveNewTopic(){
  global $PDO;

  if($_POST['titre'] != ''){
    $query = "INSERT INTO Topics (idTopic, titre, idMatiere, nbPost, dateLastPost) VALUES (NULL,?, ?, ?,NULL)";

    $data = array($_POST['titre'], $_POST['idMatiere'],0);
    $statement = $PDO->prepare($query);
    $exec = $statement->execute($data);

    if($exec === TRUE){
      $idNewTopic = $PDO->lastInsertId();
      $query2 = "UPDATE Matieres SET nbTopic = nbTopic + 1 WHERE idMatiere = ?";
      $data2 = array($_POST['idMatiere']);
      $statement2 = $PDO->prepare($query2);
      $exec2 = $statement2->execute($data2);

      sendMessage($idNewTopic);
    }else{
      sendError("Erreur de mise a jours");
    }
  }
}

function checkSaveNewTopic(){
  global $PDO;

  $query = "SELECT idMatiere FROM Inscription WHERE idUser = ? AND idMatiere = ?";
  $data = array($_SESSION['idUtilisateur'], $_POST['idMatiere']);
  $statement = $PDO->prepare($query);
  $exec = $statement->execute($data);
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);



  $query2 = "SELECT idTopic FROM Topics WHERE titre = ?";
  $data2 = array($_POST['titre']);
  $statement2 = $PDO->prepare($query2);
  $exec2 = $statement2->execute($data2);
  $result2 = $statement2->fetchAll(PDO::FETCH_ASSOC);


  if(!empty($result) && empty($result2)){
    saveNewTopic();

  }else{
       sendError("Erreur : Cours ou titre non suivit");
   }

}

checkSaveNewTopic();
