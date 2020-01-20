<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Пользовательские стили -->
    <link rel="stylesheet" href="../styles/main.min.css">
    <title>Регистрация</title>
</head>

<body>
    <!-- header -->
    <?php
    require "../includes/header_slave.php"
    ?>
    <!-- header -->

    <!-- content -->
    <div class="signup_wrapper">
        <h1>Регистрация</h1>
        <form action="../handlers/signup.handlers.php" method="post">
            <input type="text" name="uid" placeholder="Username">
            <input type="text" name="mail" placeholder="E-mail">
            <input type="password" name="pwd" placeholder="Password">
            <input type="password" name="pwd-repeat" placeholder="Repeat Password">
            <div class="signup_wrapper_btn">
                <button class="mainbtn" type="submit" name="signup-submit">Отправить</button>
            </div>
        </form>
    </div>
    <!-- content -->


    <!-- Пользовательские SCRIPTS -->
    <script src="./js/main.min.js"></script>
</body>