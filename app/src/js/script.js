$(document).ready(function() {
    let current_page = window.location.pathname; // переменная с url страницы
    // проверка текущей страницы
    if (current_page === '/auth/login.php') {
        // обработка формы login_form
        let login_form = document.querySelector('#login_form'); // переменная с формой
        let login_btn = login_form.querySelector('#login_btn'); // переменная с инпутом-кнопкой в форме
        let user_name_inp = document.querySelector('#ulogin'); // переменная с инпутом-логин
        let user_password_inp = document.querySelector('#upwd'); // переменная с инпутом-пароль
        let fields = document.querySelectorAll('.field'); // набор всех инпутов с классом field

        // валидация на пустые поля
        function validate_all_inputs() {
            let login_validate = true; // начальное значение с которым потом будем сравниваться
            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].value) {
                    fields[i].setAttribute(
                        'placeholder',
                        'Поле не должно быть пустым'
                    );
                    fields[i].classList.add('errorvalidate');
                    login_validate = false;
                    console.log('поля пустые');
                }
            }
            return login_validate;
        }
        // удаления класса("с ошибкий") и установка начального placeholder
        function remove_class_and_set_placeholders() {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].classList.contains('errorvalidate')) {
                    fields[i].classList.remove('errorvalidate');
                }
                if (fields[i].getAttribute('name') == 'ulogin') {
                    fields[i].setAttribute('placeholder', 'Логин');
                }
                if (fields[i].getAttribute('name') == 'upwd') {
                    fields[i].setAttribute('placeholder', 'Пароль');
                }
            }
        }

        // создание блока с информацией об ошибке(проверка на клиенте)
        // eslint-disable-next-line no-inner-declarations
        function create_error_block(x) {
            let new_element_div_form_group = document.createElement('div'); // создаем новый элемент div
            new_element_div_form_group.classList.add('form_group', 'error_reg'); // добавляем div'у class
            let new_element_div_info = document.createElement('div'); // создаем новый элемент div
            new_element_div_info.classList.add('error_info_wrapper'); // добавляем div'у class
            new_element_div_form_group.append(new_element_div_info);
            let new_element_ul = document.createElement('ul'); // создаем новый элемент ul
            new_element_ul.classList.add('error_message'); // добавляем ul'у class
            new_element_div_info.append(new_element_ul);
            for (let elem in x) {
                let new_element_li = document.createElement('li');
                new_element_li.textContent = x[elem];
                new_element_ul.append(new_element_li);
            }
            let form_title = document.querySelector('.form_title');
            form_title.after(new_element_div_form_group);
        }

        // создание блока с успешной регистрацией(ответ от сервера)
        // eslint-disable-next-line no-inner-declarations
        function create_noerror_block(x) {
            let new_element_div_form_group = document.createElement('div'); // создаем новый элемент div
            new_element_div_form_group.classList.add(
                'form_group',
                'noerror_reg'
            ); // добавляем div'у class
            let new_element_div_info = document.createElement('div'); // создаем новый элемент div
            new_element_div_info.classList.add('noerror_info_wrapper'); // добавляем div'у class
            new_element_div_form_group.append(new_element_div_info);
            let new_element_ul = document.createElement('ul'); // создаем новый элемент ul
            new_element_ul.classList.add('noerror_message'); // добавляем ul'у class
            new_element_div_info.append(new_element_ul);
            for (let elem in x) {
                let new_element_li = document.createElement('li');
                new_element_li.textContent = x[elem];
                new_element_ul.append(new_element_li);
            }
            let form_title = document.querySelector('.form_title');
            form_title.after(new_element_div_form_group);
        }

        // удалим появляющийся div(чтобы они не плодились)
        // eslint-disable-next-line no-inner-declarations
        function delete_info_block(x) {
            if (x) {
                login_form.removeChild(x);
            }
        }

        // обработка сабмита
        login_form.addEventListener('submit', function(e) {
            e.preventDefault(); // отменяем дальнейшее действие браузера
            console.log('НАЖАЛИ SUBMIT');
            // инициализация функций
            validate_all_inputs();
            remove_class_and_set_placeholders();
            let error_reg = document.querySelector('.error_reg');
            let noerror_reg = document.querySelector('.noerror_reg');
            delete_info_block(error_reg);
            delete_info_block(noerror_reg);

            // аякс запрос
            if (validate_all_inputs() == true) {
                $.ajax({
                    url: this.getAttribute('action'), // Определяет адрес, на который будет отправлен запрос.
                    type: this.getAttribute('method'), // Определяет тип выполняемого запроса
                    data: $('#login_form').serialize(), // Данные, которые будут отправлены на сервер. Метод .serialize() возвращает строку пригодную для передачи через URL строку.
                    cache: false, // не будем кешировать производимый запрос.
                    dataType: 'json', // Тип данных, в котором ожидается получить ответ от сервера
                    // Функция, которая будет вызвана в случае удачного завершения запроса к серверу.
                    success(data) {
                        console.log(data);
                        if (data.status == false) {
                            console.log('ФОРМА НЕОТПРАВЛЕНА');
                            if (data.bd_info == false) {
                                create_error_block(data.message);
                            }
                            console.log(data.inpnames);
                            for (let i = 0; i < data.inpnames.length; i++) {
                                for (let k = 0; k < fields.length; k++) {
                                    if (
                                        fields[k].getAttribute('name') ===
                                        data.inpnames[i]
                                    ) {
                                        fields[k].setAttribute(
                                            'placeholder',
                                            'Поле не должно быть пустым'
                                        );
                                        fields[k].classList.add(
                                            'errorvalidate'
                                        );
                                    }
                                }
                            }
                        } else {
                            console.log('ФОРМА ОТПРАВЛЕНА');
                            console.log(data.inpnames);
                            create_noerror_block(data.message);
                            setTimeout(function() {
                                window.location.href = '/';
                            }, 3000);
                        }
                    }
                });
            }
        });
    }
});

// обработка формы signup_form
$(document).ready(() => {
    let current_page = window.location.pathname; // переменная с url страницы
    // проверка текущей страницы
    if (current_page === '/auth/signup.php') {
        let signup_form = document.querySelector('#signup_form'); // переменная с формой
        let input_in_form = signup_form.querySelectorAll('input'); // переменная со всеми инпутами в форме
        // очистка всех полей формы
        // eslint-disable-next-line no-inner-declarations
        function clearSignupInputs() {
            for (let i = 0; i < input_in_form.length; i++) {
                if (input_in_form[i].value) input_in_form[i].value = '';
            }
        }

        let clear_btn = document.querySelector('#clear_btn'); // переменная с кнопкой
        clear_btn.onclick = clearSignupInputs; // запуск функции очистки по клику на кнопку

        // создание блока с успешной регистрацией(ответ от сервера)
        // eslint-disable-next-line no-inner-declarations
        function create_noerror_block(x) {
            let new_element_div_form_group = document.createElement('div'); // создаем новый элемент div
            new_element_div_form_group.classList.add(
                'form_group',
                'noerror_reg'
            ); // добавляем div'у class
            let new_element_div_info = document.createElement('div'); // создаем новый элемент div
            new_element_div_info.classList.add('noerror_info_wrapper'); // добавляем div'у class
            new_element_div_form_group.append(new_element_div_info);
            let new_element_ul = document.createElement('ul'); // создаем новый элемент ul
            new_element_ul.classList.add('noerror_message'); // добавляем ul'у class
            new_element_div_info.append(new_element_ul);
            for (let elem in x) {
                let new_element_li = document.createElement('li');
                new_element_li.textContent = x[elem];
                new_element_ul.append(new_element_li);
            }
            let form_title = document.querySelector('.form_title');
            form_title.after(new_element_div_form_group);
        }

        // создание блока с информацией об ошибке(проверка на клиенте)
        // eslint-disable-next-line no-inner-declarations
        function create_error_block(x) {
            let new_element_div_form_group = document.createElement('div'); // создаем новый элемент div
            new_element_div_form_group.classList.add('form_group', 'error_reg'); // добавляем div'у class
            let new_element_div_info = document.createElement('div'); // создаем новый элемент div
            new_element_div_info.classList.add('error_info_wrapper'); // добавляем div'у class
            new_element_div_form_group.append(new_element_div_info);
            let new_element_ul = document.createElement('ul'); // создаем новый элемент ul
            new_element_ul.classList.add('error_message'); // добавляем ul'у class
            new_element_div_info.append(new_element_ul);
            for (let elem in x) {
                let new_element_li = document.createElement('li');
                new_element_li.textContent = x[elem];
                new_element_ul.append(new_element_li);
            }
            let form_title = document.querySelector('.form_title');
            form_title.after(new_element_div_form_group);
        }

        let fields = document.querySelectorAll('.field'); // набор всех инпутов с классом field
        // удаление класса с ошибкой в самом начале
        // eslint-disable-next-line no-inner-declarations
        function delete_class_erorrvalidate() {
            for (let i = 0; i < fields.length; i++) {
                fields[i].classList.remove('errorvalidate');
            }
        }

        // проверка на пустые поля
        // eslint-disable-next-line no-inner-declarations
        function check_empty_inputs() {
            let error_empty = '';
            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].value) {
                    fields[i].classList.add('errorvalidate');
                    error_empty = 'Поля не могут быть пустыми';
                }
            }
            return error_empty;
        }

        // проверка совпадения введенных паролей
        // eslint-disable-next-line no-inner-declarations
        function check_valid_pass() {
            let upwd = document.querySelector('#upwd');
            let upwd_rpt = document.querySelector('#upwd_rpt');
            if (upwd.value.trim() !== upwd_rpt.value.trim()) {
                upwd.classList.add('errorvalidate');
                upwd_rpt.classList.add('errorvalidate');
                let error_pass = 'Введенные пароли не совпадают';
                return error_pass;
            }
        }

        // проверка корректности введенного email
        // eslint-disable-next-line no-inner-declarations
        function check_valid_email() {
            let uemail = document.querySelector('#uemail');
            let reg_exp = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i; // регулярное выражение
            let email_val = uemail.value.trim();
            if (email_val) {
                if (email_val.search(reg_exp) !== 0) {
                    uemail.classList.add('errorvalidate');
                    let error_email = 'Введен некорректный E-mail';
                    return error_email;
                }
            }
        }

        // составление массива с ошибками
        // eslint-disable-next-line no-inner-declarations
        function error_list() {
            let error_list = [];
            error_list.push(
                check_empty_inputs(),
                check_valid_email(),
                check_valid_pass()
            );
            let error_list_cleared = error_list.filter(x => {
                return x;
            });
            return error_list_cleared;
        }

        // удалим появляющийся div(чтобы они не плодились)
        // eslint-disable-next-line no-inner-declarations
        function delete_info_block(x) {
            if (x) {
                signup_form.removeChild(x);
            }
        }

        // обработка сабмита
        signup_form.addEventListener('submit', function(e) {
            e.preventDefault(); // отменяем дальнейшее действие браузера
            delete_class_erorrvalidate(); // удаление класса с ошибкой
            console.log('НАЖАЛИ SUBMIT');
            let error_reg = document.querySelector('.error_reg');
            let noerror_reg = document.querySelector('.noerror_reg');
            let signup_btn = document.querySelector('#signup_btn');
            delete_info_block(error_reg);
            delete_info_block(noerror_reg);

            let error_block = error_list();
            if (error_block.length !== 0) {
                create_error_block(error_list()); // вызываем функцию создания блока с ошибками -> с учетом списка ошибок
            }
            console.log(error_block);

            if (error_block.length == 0) {
                $.ajax({
                    url: this.getAttribute('action'), // Определяет адрес, на который будет отправлен запрос.
                    type: this.getAttribute('method'), // Определяет тип выполняемого запроса
                    data: $('#signup_form').serialize(), // Данные, которые будут отправлены на сервер. Метод .serialize() возвращает строку пригодную для передачи через URL строку.
                    cache: false, // не будем кешировать производимый запрос.
                    dataType: 'json', // Тип данных, в котором ожидается получить ответ от сервера
                    // Функция, которая будет вызвана в случае удачного завершения запроса к серверу.
                    success(data) {
                        console.log(data);
                        if (data.status == false) {
                            console.log('ФОРМА НЕОТПРАВЛЕНА');
                            create_error_block(data.message);
                            console.log(data.inpnames);
                            for (let i = 0; i < data.inpnames.length; i++) {
                                console.log(data.inpnames[i]);
                                for (let k = 0; k < fields.length; k++) {
                                    if (
                                        fields[k].getAttribute('name') ===
                                        data.inpnames[i]
                                    )
                                        fields[k].classList.add(
                                            'errorvalidate'
                                        );
                                }
                            }
                            console.log(data);
                        } else {
                            console.log('ФОРМА ОТПРАВЛЕНА');
                            create_noerror_block(data.message);
                            console.log(data);
                            setTimeout(function() {
                                window.location.href = '/';
                            }, 5000);
                        }
                    }
                });
            }
        });
    }
});
