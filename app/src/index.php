<?php
//запускаем сессию
session_start();

$page = '';
$title = 'Стартовая страница';
if ($_SERVER['REQUEST_URI'] == '/') {
    $page = 'home';
} else {
    $page = substr($_SERVER['REQUEST_URI'], 1);
    //проверка регулярным выражением. Разрешены буквы от A до z и цифры от 0 до 9, длина строки 3-15 символов.
    if (!preg_match('/^[A-z0-9]{3,15}s/', $page)) exit('Error URL');
}
// echo $page . '<br>';

// подгружаем страницы в зависимости от сесии(зарегестрирован ли пользователь или нет)
if (file_exists('all/' . $page . '.php')) include('all/' . $page . '.php'); // проверяем если файл есть в наличии подгружаем его
else if (isset($_SESSION['ulogin']) == 1 && file_exists('auth/' . $page . '.php')) include('auth/' . $page . '.php'); // проверяем если файл есть в наличии подгружаем его
else if (isset($_SESSION['ulogin']) !== 1 && file_exists('guest/' . $page . '.php')) include('guest/' . $page . '.php');
//else exit('Страница 404');
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Пользовательские стили -->
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
    <link rel="stylesheet" href="styles/main.min.css">
    <title>Стартовая страница</title>
</head>

<body>
    <!-- header -->
    <?php
    if (file_exists('includes/header_main.php')) include('includes/header_main.php'); // если файл в наличии подключаем его
    ?>
    <!-- header -->

    <!-- content -->
    <content>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content_index_wrapper">

                        <?php if (!isset($_SESSION['ulogin'])) { ?>
                            <h1 class="content_title">Вы попали на главную страницу</h1>
                        <?php } else { ?>
                            <h1 class="content_title">Здравствуйте дорогой <?php echo $_SESSION['ulogin']; ?>!</h1>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </content>
    <!-- content -->

    <!-- footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="footer_wrapper">Футер</div>
                </div>
            </div>
        </div>
    </footer>
    <!-- footer -->
    <script src="./js/main.min.js"></script>
</body>









<script>
    //<![CDATA[
    document.write("<script async src='/browser-sync/browser-sync-client.js?v=2.17.5'><\/script>".replace("tesst.com", location.hostname));
    //]]>
</script>