<?php
if (isset($_POST['signup-submit'])) {
    //подключим файл с подключением в бд
    require "../handlers/dbcon.handlers.php";

    //запишем в переменные данные с полей формы
    $username = $_POST['uid'];
    $email = $_POST['mail'];
    $password = $_POST['pwd'];
    $passwordRepeat = $_POST['pwd-repeat'];

    if (empty($username) || empty($email) || empty($password) || empty($passwordRepeat)) { //сделаем проверку на заполненость полей
        header("Location: ../pages/signup.php?error=emptyfields&uid=" . $username . "&mail=" . $email);
        exit();
    } else if (!preg_match("/^[a-zA-Z0-9]*$/", $username) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../pages/signup.php?error=invaliduidmail");
        exit();
    } else if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) { //сделаем проверку поля username на соответствие регулярному выражению
        header("Location: ../pages/signup.php?error=invaliduid&mail=" . $email);
        exit();
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { //сделаем проверку поля email(возвращает false, когда написано кириллицей)
        header("Location: ../pages/signup.php?error=invalidmail&uid=" . $username);
        exit();
    } else  if ($password !== $passwordRepeat) { //сделаем проверку полей с паролями, чтобы они были одинаковы
        header("Location: ../pages/signup.php?error=passwordcheck&uid=" . $username . "&mail=" . $email);
        exit();
    } else {
        $sql = "SELECT uidUsers FROM users WHERE uidUsers=?"; //формируем sql запрос
        $stmt = mysqli_stmt_init($connect); //инициализируем запрос к бд с учетом данных для подключения
        if (!mysqli_stmt_prepare($stmt, $sql)) { //подготоваливаем запрос к выполнению
            header("Location: ../pages/signup.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, 's', $username); //привязка переменных к параметрам подготавливаемого запроса
            mysqli_stmt_execute($stmt); //выполняем подготовленный запрос
            mysqli_stmt_store_result($stmt); //передаем результирующий запрос на клиент
            $resultCheck = mysqli_stmt_affected_rows($stmt);
            if ($resultCheck > 0) {
                header("Location: ../pages/signup.php?error=usertaken&mail=" . $email);
                exit();
            } else {
                $sql = "INSERT INTO users (uidUsers, emailUsers, pwdUsers) VALUES(?, ?, ?)";
                $stmt = mysqli_stmt_init($connect);
                if (!mysqli_stmt_prepare($stmt, $sql)) {
                    header("Location: ../pages/signup.php?error=sqlerror");
                    exit();
                } else {
                    $hashedPwd = password_hash($password, PASSWORD_DEFAULT); //кодируем введенный пароль
                    mysqli_stmt_bind_param($stmt, 'sss', $username, $email, $hashedPwd);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../pages/signup.php?signup=success");
                    exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt); //закрываем подготовленный запрос
    mysqli_close($connect); //закрываем соединение
} else {
    header("Location: ../pages/signup.php");
    exit();
}
