<header class="header">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="header_inner d-flex justify-content-between">
                    <a href="/" class="mainbtn">Главная страница</a>
                    <?php if (!isset($_SESSION['ulogin'])) { ?>
                        <a href="auth/signup.php" class="mainbtn">Зарегистрироваться</a>
                    <?php } ?>
                    <?php if (!isset($_SESSION['ulogin'])) { ?>
                        <a href="auth/login.php" class="mainbtn">Авторизоваться</a>
                    <?php } ?>
                    <?php if (isset($_SESSION['ulogin'])) { ?>
                        <a href="handlers/logout.handlers.php" class="mainbtn">Выйти</a>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</header>