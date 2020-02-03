<?php
if (count($_POST) > 0) {
    require "../handlers/dbcon.handlers.php"; // конфиг с подключением к БД

    $status = true; // статус ответа

    // массив который будет собираться и отправляться на клиент
    $response = [
        'status' => $status,
        'message' => [],
        'inpnames' => [],
    ];

    // данные с полей формы
    $username = trim($_POST['ulogin']);
    $email = trim($_POST['uemail']);
    $password = trim($_POST['upwd']);
    $passwordRepeat = trim($_POST['upwd_rpt']);

    // атрибут name с инпутов формы
    $formfieldsnames = [
        'ulogin',
        'uemail',
        'upwd',
        'upwd_rpt'
    ];

    // проверка на пустые поля
    foreach ($formfieldsnames as $name) {
        if (empty(trim($_POST[$name]))) {
            $response['status'] = false;
            $response['message'][] = 'Поля не могут быть пустыми';
            $response['inpnames'][] = $name;
        }
    }

    // проверка корректности заполнения email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['status'] = false;
        $response['message'][] = 'Некорректный E-mail';
        $response['inpnames'][] = 'uemail';
    }

    // проверка совпадения паролей
    if ($password !== $passwordRepeat) {
        $response['status'] = false;
        $response['message'][] = 'Введенные пароли не совпадают';
        $response['inpnames'][] = 'upwd';
        $response['inpnames'][] = 'upwd_rpt';
    }

    // проверка существования пользователя
    // подготовленный sql запрос
    $sql_check = 'SELECT EXISTS ( SELECT u_login FROM users WHERE u_login=:u_login )'; // EXIST - подзапрос
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->execute([':u_login' => $username]);
    if ($stmt_check->fetchColumn()) {
        $response['status'] = false;
        $response['message'][] = 'Такой пользователь уже существует';
        $response['inpnames'][] = 'ulogin';
    }

    // удаление повторяющийся значений в массиве
    $response['message'] = array_unique($response['message']);

    // регистрирование пользователя в базе и отправка ответа на клиент
    if ($response['status'] == true) {
        // регестрируем пользователя
        // подготовленный sql запрос
        $sql = "INSERT INTO users (u_login, u_email, u_password) VALUE(:u_login, :u_email, :u_password)";
        // удаление тегов из полей инпута
        $username = strip_tags($username);
        $email = strip_tags($email);
        $password = strip_tags($password);
        // шифруем пароль
        $password = password_hash($password, PASSWORD_DEFAULT);
        // массив с параметрами
        $params = [
            'u_login' => $username,
            'u_email' => $email,
            'u_password' => $password,
        ];
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $response['message'][] = 'Вы зарегистрированы! Теперь можете авторизоваться!';
        echo  json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
}
