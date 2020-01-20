//"use strict";
$(document).ready(function() {
    let current_page = window.location.pathname; //переменная с url страницы
    // проверка текущей страницы
    if (current_page === "/auth/login.php") {
        //обработка формы login_form
        let login_form = document.querySelector("#login_form"); // переменная с формой
        let login_btn = login_form.querySelector("#login_btn"); // переменная с инпутом-кнопкой в форме
        let user_name_inp = document.querySelector("#ulogin"); // переменная с инпутом-логин
        let user_password_inp = document.querySelector("#upwd"); // переменная с инпутом-пароль

        // валидация на пустые поля
        function validate_all_inputs() {
            let fields = document.querySelectorAll(".field"); // набор всех инпутов с классом field
            let login_validate = true; // начальное значение с которым потом будем сравниваться
            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].value) {
                    fields[i].setAttribute(
                        "placeholder",
                        "Поле не должно быть пустым"
                    );
                    fields[i].classList.add("errorvalidate");
                    login_validate = false;
                    console.log("поля пустые");
                }
            }
            return login_validate;
        }
        // удаления класса("с ошибкий") и установка начального placeholder
        function remove_class_and_set_placeholders() {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].classList.contains("errorvalidate")) {
                    fields[i].classList.remove("errorvalidate");
                }
                if (fields[i].getAttribute("name") == "ulogin") {
                    fields[i].setAttribute("placeholder", "Логин");
                }
                if (fields[i].getAttribute("name") == "upwd") {
                    fields[i].setAttribute("placeholder", "Пароль");
                }
            }
        }

        //обработка сабмита
        login_form.addEventListener("submit", function(e) {
            e.preventDefault(); // отменяем дальнейшее действие браузера

            // инициализация функций
            validate_all_inputs();
            remove_class_and_set_placeholders();

            // аякс запрос
            if (validate_all_inputs() == true) {
                $.ajax({
                    url: this.getAttribute("action"), // Определяет адрес, на который будет отправлен запрос.
                    type: this.getAttribute("method"), // Определяет тип выполняемого запроса
                    data: $("#login_form").serialize(), // Данные, которые будут отправлены на сервер. Метод .serialize() возвращает строку пригодную для передачи через URL строку.
                    cache: false, // не будем кешировать производимый запрос.
                    dataType: "json", // Тип данных, в котором ожидается получить ответ от сервера
                    // Функция, которая будет вызвана в случае удачного завершения запроса к серверу.
                    success: function(data) {
                        console.log("форма отправлена");
                        console.log(data);
                    }
                });
            }
        });
    }
});

$(document).ready(function() {
    let current_page = window.location.pathname; //переменная с url страницы
    // проверка текущей страницы
    if (current_page === "/auth/signup.php") {
        //обработка формы signup_form
        let clear_btn = document.querySelector("#clear_btn"); // переменная с кнопкой
        let signup_form = document.querySelector("#signup_form"); // переменная с формой
        let input_in_form = signup_form.querySelectorAll("input"); // переменная со всеми инпутами в форме

        //очистка всех полей формы
        function clearSignupInputs() {
            for (let i = 0; i < input_in_form.length; i++) {
                if (input_in_form[i].value) input_in_form[i].value = "";
            }
        }

        clear_btn.onclick = clearSignupInputs; // запуск функции очистки по клику на кнопку

        // создание блока с информацией об ошибке
        function create_error_block(x) {
            let new_element_div_form_group = document.createElement("div"); // создаем новый элемент div
            new_element_div_form_group.classList.add("form_group", "error_reg"); // добавляем div'у class
            let new_element_div_info = document.createElement("div"); // создаем новый элемент div
            new_element_div_info.classList.add("error_info_wrapper"); // добавляем div'у class
            new_element_div_form_group.append(new_element_div_info);
            let new_element_ul = document.createElement("ul"); // создаем новый элемент ul
            new_element_ul.classList.add("error_message"); // добавляем ul'у class
            new_element_div_info.append(new_element_ul);
            for (let elem in x) {
                let new_element_li = document.createElement("li");
                new_element_li.textContent = x[elem];
                new_element_ul.append(new_element_li);
            }
            let form_title = document.querySelector(".form_title");
            form_title.after(new_element_div_form_group);
        }

        // удаление класса с ошибкой в самом начале
        function delete_class_erorrvalidate() {
            let fields = document.querySelectorAll(".field"); // набор всех инпутов с классом field
            for (let i = 0; i < fields.length; i++) {
                fields[i].classList.remove("errorvalidate");
            }
        }

        // проверка на пустые поля
        function check_empty_inputs() {
            let fields = document.querySelectorAll(".field"); // набор всех инпутов с классом field
            let error_empty;

            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].value) {
                    fields[i].classList.add("errorvalidate");
                    error_empty = "Поля не могут быть пустыми";
                }
            }
            return error_empty;
        }

        //проверка совпадения введенных паролей
        function check_valid_pass() {
            let upwd = document.querySelector("#upwd");
            let upwd_rpt = document.querySelector("#upwd_rpt");
            if (upwd.value.trim() !== upwd_rpt.value.trim()) {
                upwd.classList.add("errorvalidate");
                upwd_rpt.classList.add("errorvalidate");
                let error_pass = "Введенные пароли не совпадают";
                return error_pass;
            }
        }

        //проверка корректности введенного email
        function check_valid_email() {
            let uemail = document.querySelector("#uemail");
            var reg_exp = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i; //регулярное выражение
            let email_val = uemail.value.trim();
            if (email_val) {
                if (email_val.search(reg_exp) !== 0) {
                    uemail.classList.add("errorvalidate");
                    let error_email = "Введен некорректный E-mail";
                    return error_email;
                }
            }
        }

        //составление массива с ошибками
        function error_list() {
            let error_list = [];
            error_list.push(
                check_empty_inputs(),
                check_valid_email(),
                check_valid_pass()
            );
            let error_list_cleared = error_list.filter(function(x) {
                return x;
            });
            return error_list_cleared;
        }

        //обработка сабмита
        signup_form.addEventListener("submit", function(e) {
            e.preventDefault(); // отменяем дальнейшее действие браузера
            console.log("submin");

            delete_class_erorrvalidate(); // вызываем функцию удаления класса об ошибке

            let error_reg = document.querySelector(".error_reg");
            let error_block = error_list();
            if (error_block.length !== 0) {
                create_error_block(error_list());
            }
            if (error_reg) {
                signup_form.removeChild(error_reg);
            }
            console.log(check_empty_inputs());
            console.log(error_block);
        });
    }
});
