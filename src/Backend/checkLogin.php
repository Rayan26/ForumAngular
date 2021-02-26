<?php

require_once "helper.php";
require_once "auth.php";




authenticate() ? sendMessage("") : sendError("Le login/password est invalide");
