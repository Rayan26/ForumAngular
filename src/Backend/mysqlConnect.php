<?php

require_once "mysqlConfig.php";

// creation de l'instance PDO et connexion a la BD `
$dsn = "mysql:host=$mysqlHost;" .
  "port=8889;".
  "dbname=$mysqlDatabase;" .
  "charset=$charset";

// les options
$opt = array (
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false );

$PDO = new PDO($dsn, $mysqlLogin, $mysqlPassword, $opt);
?>
