<?php
$servername = "db-mysql"; //имя хоста(в данном случае имя контейнера базы данных из docker-compose)
$dBUsername = "root"; //пользователь root
$dBPassword = "root"; //пароль от пользователя root
$dBName = "loginsystemfirst"; //имя бд созданной в phpmyadmin

$connect = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName); //создаем соединеие с бд с учетом необходимых параметров

//делаем проверку соединения
if ($connect == false) {
    die("Connection failed: " . mysqli_connect_error());
}
