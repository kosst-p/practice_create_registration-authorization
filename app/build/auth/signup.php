<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Пользовательские стили -->
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
    <link rel="stylesheet" href="../styles/main.min.css">
    <title>Регистрация</title>
</head>

<body>
    <!-- content -->
    <content>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content_signup_wrapper">
                        <h1 class="content_title">Вы попали на страницу регистрации</h1>
                        <div class="form_wrapper">
                            <form id="signup_form" action="../handlers/signup.handlers.php" method="post">
                                <h3 class="form_title">Регистрация</h3>
                                <div class="form_group">
                                    <label for="ulogin">Логин</label>
                                    <input id="ulogin" type="text" name="ulogin" class="field" placeholder="Логин">
                                </div>
                                <div class="form_group">
                                    <label for="uemail">E-mail</label>
                                    <input id="uemail" type="text" name="uemail" class="field" placeholder="E-mail">
                                </div>
                                <div class="form_group">
                                    <label for="upwd">Пароль</label>
                                    <input id="upwd" type="password" name="upwd" class="field" placeholder="Пароль">
                                </div>
                                <div class="form_group">
                                    <label for="upwd_rpt">Повторите пароль </label>
                                    <input id="upwd_rpt" type="password" name="upwd_rpt" class="field" placeholder="Повторите пароль">
                                </div>

                                <div class="form_group">
                                    <button id="signup_btn" type="submit" name="signup_btn">Зарегистрироваться</button>
                                </div>
                            </form>
                            <div class="clear_btn_wrapper">
                                <button id="clear_btn">Очистить поля формы</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </content>
    <!-- content -->

    <script src="../js/main.min.js"></script>
</body>