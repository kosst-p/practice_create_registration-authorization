<?php
require "../handlers/dbcon.handlers.php"; // конфиг с подключением к БД

$_SESSION = []; // очистка массива session


session_destroy(); // завершение сесии


header('Location: ../auth/login.php'); // редирект на страницу с авторизацией
