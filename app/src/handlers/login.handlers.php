<?php
if (count($_POST) > 0) {

    $username = $_POST['ulogin']; // логин
    $password = $_POST['upwd']; // пароль 

    //var_dump($_POST);

    $status = true; // статус ответа
    $message = 'Форма отправлена'; // текст с ошибкой

    // проверка на пустые поля (возможно тут не нужна, т.к проверяем на клиенте)
    if (empty($username) || empty($password)) {
        $status = false;
        $message = 'Поля не могут быть пустым';
    }

    // собираем результат ответа в один массив
    $response = [
        'status' => $status,
        'message' => $message
    ];

    // отправляем ответ обратно, где его примет ajax
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}
