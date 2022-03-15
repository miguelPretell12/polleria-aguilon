<?php

use Model\ActiveRecord;

require 'database.php';
require 'funciones.php';
require __DIR__ . '/../vendor/autoload.php';

// Conectarnos a la base de datos
ActiveRecord::setDB($db);
