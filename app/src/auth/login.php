<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Пользовательские стили -->
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
    <link rel="stylesheet" href="../styles/main.min.css">
    <title>Авторизация</title>
</head>

<body>
    <!-- content -->
    <content>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content_auth_wrapper">
                        <h1 class="content_title">Вы попали на страницу авторизации</h1>
                        <div class="form_wrapper">
                            <form id="login_form" action="../handlers/login.handlers.php" method="post">
                                <h3 class="form_title">Авторизация</h3>
                                <div class="form_group">
                                    <label for=ulogin>Логин</label>
                                    <input id="ulogin" class="field" type="text" name="ulogin" placeholder="Логин">
                                </div>
                                <div class="form_group">
                                    <label for=upwd>Пароль</label>
                                    <input id="upwd" class="field" type="text" name="upwd" placeholder="Пароль">
                                </div>
                                <div class="form_group">
                                    <button id="login_btn" type="submit" name="login_btn">Войти</button>
                                </div>
                                <div class="form_group">
                                    <a href="#">Восстановить пароль</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </content>
    <!-- content -->

    <script src="../js/main.min.js"></script>
</body>