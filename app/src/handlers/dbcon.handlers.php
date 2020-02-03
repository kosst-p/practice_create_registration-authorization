<?php
$driver = "mysql";
$host = "db-mysql"; //имя хоста(в данном случае имя контейнера базы данных из docker-compose)
$db_name = "loginsystemfirst"; //имя бд созданной в phpmyadmin
$db_user = "root"; //пользователь root
$db_pass = "root"; //пароль от пользователя root
$cahrset = "utf8";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]; // Режим сообщений об ошибках.  =>  Выбрасывать исключения.
$response = [
    'status' => false,
    'message' => ['Соединение с базой данных не установлено!'],
];
try {
    $pdo = new PDO("$driver:host=$host; dbname=$db_name; charset=$cahrset", $db_user, $db_pass, $options);
    session_start(); // старт сесии
} catch (PDOException $e) {
    //echo $e;
    //echo $e->getMessage() . '<br>';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    die();
}
