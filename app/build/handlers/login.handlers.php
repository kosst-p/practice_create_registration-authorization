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

    $username =  strip_tags(trim($_POST['ulogin'])); // логин
    $password =  strip_tags(trim($_POST['upwd'])); // пароль 

    // атрибут name с инпутов формы
    $formfieldsnames = [
        'ulogin',
        'upwd',
    ];

    // проверка на пустые поля
    foreach ($formfieldsnames as $name) {
        if (empty($_POST[$name])) {
            $response['status'] = false;
            $response['message'][] = 'Поле не должно быть пустым';
            $response['inpnames'][] = $name;
        } else {
            $sql_check_user = "SELECT * FROM users WHERE u_login=:u_login ";
            $stmt_check_user = $pdo->prepare($sql_check_user);
            $stmt_check_user->execute([':u_login' => $username]);
            $stmt_check_array = $stmt_check_user->fetch(PDO::FETCH_ASSOC);
            //var_dump($stmt_check_array);
            if ($stmt_check_array) {
                if (!password_verify($password, $stmt_check_array['u_password'])) {
                    $response['status'] = false;
                    $response['message'][] = 'Не верный логин или пароль';
                    $response['bd_info'] = false;
                } else {
                    $response['status'] = true;
                }
            } else {
                $response['status'] = false;
                $response['message'][] = 'Такого пользователя не существует';
                $response['bd_info'] = false;
            }
        }
    }

    /* if (empty($username) || empty($password)) {
        $response['status'] = false;
        $response['message'][] = 'Поле не должно быть пустым';
    } */

    /*  // проверка пользователя
    $sql_check_user = "SELECT * FROM users WHERE u_login=:u_login ";
    $stmt_check_user = $pdo->prepare($sql_check_user);
    $stmt_check_user->execute([':u_login' => $username]);
    $stmt_check_array = $stmt_check_user->fetch(PDO::FETCH_ASSOC);
    //var_dump($res);
    if ($stmt_check_array) {
        if (!password_verify($password, $stmt_check_array['u_password'])) {
            $response['status'] = false;
            $response['message'][] = 'Не верный логин или пароль';
            $response['bd_info'] = false;
        } else {
            $response['status'] = true;
        }
    } else {
        $response['status'] = false;
        $response['message'][] = 'Такого пользователя не существует';
        $response['bd_info'] = false;
    } */

    // удаление повторяющийся значений в массиве
    $response['message'] = array_unique($response['message']);


    if ($response['status'] == true) {
        $_SESSION['ulogin'] = $stmt_check_array['u_login'];
        $response['message'][] = 'Вы вошли на сайт';
        echo  json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
}
