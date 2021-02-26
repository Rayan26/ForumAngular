<?php

session_start();
require_once "mysqlConnect.php";
require_once "mysqlUser.php";


$mysqlTable = "utilisateur";

function authenticate(): bool
{
  if (isset($_POST['login']) && isset($_POST['password'])) {
    $a = getUserId();
    if ($a != -1) {
      $_SESSION['login'] = $_POST['login'];
      $_SESSION['idUtilisateur'] = $a;
      return true;
    }
  }
  return false;
}

function isAuthenticated(): bool
{
  return (isset($_SESSION['idUtilisateur']) && isset($_SESSION['login']));
}

