<?php

require_once "auth.php";
require_once "helper.php";



authenticate() ? sendMessage("WORK") : sendError("Le login/password est invalide");
