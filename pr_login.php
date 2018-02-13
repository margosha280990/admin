
<?php
include 'db.php';
if ($_POST['exit']){setcookie ('rosgid_login', '', time()-54000, '/'); die;}


if ( isset( $_POST['login'] ) && isset( $_POST['pass'] ) ) {

    if ( ( (isset ( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ) ) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {

        //	Функция не удачного выполнение скрипта:
        function error($text)
        {
            echo '<div class="element-notice-red" style="color:red;">' . $text . '</div>';
        }

        //	Функция удачного выполнение скрипта:
        function success($text)
        {
            echo '<script type="text/javascript">setTimeout ("document.location.href = \'/\'", 1000);</script>';
            echo '<div class="element-notice-green" style="color:green;font-size: 18px; ">' . $text . '</div>';
        }



        //	Объявляем конфигурацию для инициализации:
        $conf_init = array ('class_safe' => true, 'plug_logs' => true);


        //	Проверям что ввёл пользователь. Логин или Email:
        if ( filter_var ($_POST['login'], FILTER_VALIDATE_EMAIL ) ) {

            if ( !preg_match ("/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/", $_POST['login']) ) { error ("Вы ввели некорректный Email адрес." ); die; }

            //	Устаналиваем переменную что пользователь авторзовается через Email:
            $emailEnter = true;

        } else {

            if (mb_strlen ($_POST['login'], 'UTF-8') < 6) { error ( "Введенный логин менее 6 символов." ); die;}
            if (mb_strlen ($_POST['login'], 'UTF-8') > 20) { error ( "Введённый логин больше 20 символов." ); die;}
            if ( preg_match ("/[^a-z,A-Z,0-9,\-,\—]/", $_POST['login']) ) { error ("В логине присутствуют недопустимые символы." ); die;}

        }

        if (mb_strlen ($_POST['pass'], "UTF-8") < 6) { error ( "Введённый пароль менее 6 символов." ); die;}
        if (mb_strlen ($_POST['pass'], "UTF-8") > 16) { error ( "Введённый пароль больше 16 символов." ); die;}
        if ( preg_match ("/[^a-z,A-Z,0-9,\-,\—]/", $_POST['pass']) ) { error ( "В пароле присутствуют недопустимые символы." ); die;}


        //	Запрос в базу данных относительно вводимых данных:
        if ( isset ($emailEnter) ) {
            //	Выборка пользовательского аккаунта по Email:
            $select_user = $idg->query("SELECT idg_login, idg_email, idg_active, idg_usercode, idg_password FROM `idg_users` WHERE `idg_email` = '" . $_POST['login'] . "' LIMIT 1");
        } else {
            //	Выборка пользовательского аккаунта по логину:
            $select_user = $idg->query("SELECT idg_login, idg_active, idg_usercode, idg_password FROM `idg_users` WHERE `idg_login` = '" . $_POST['login'] . "' LIMIT 1");
        }

        //	Если пользователь найден в базе данных:
        if ($select_user->num_rows > 0) {

            $fetch_user = $select_user->fetch_assoc();
            $select_user->close();

            //	Проверка регистра относительно вводимых данных:
            if ( isset ($emailEnter) ) {
                //	Проверка логина с учётом регистра:
                if (strcmp ( $_POST['login'], $fetch_user['idg_email'] ) <> 0) { $errorRegister = true; }
            } else {
                //	Проверка логина с учётом регистра:
                if (strcmp ( $_POST['login'], $fetch_user['idg_login'] ) <> 0) { $errorRegister = true; }
            }

            //	Проверка ошибки связанная с регистром:
            if ( isset ($errorRegister) ) {

                //	Записываем действие в журнал:

                error ( "Неверные данные для входа." ); die;

            }

            //	Проверка на блокировку аккаунта:
            if ($fetch_user['idg_active'] == 'no') {

                //	Записываем действие в журнал:

                error ( "Данный аккаунт заблокирован администратором." ); die;

            }

            //	Создаём хэш пароля:
            $hashpassword = sha1( 'alfa77beta' . sha1($_POST['pass']) . $fetch_user['idg_usercode'] );

            //	Проверка пароля:
            if ($fetch_user['idg_password'] == $hashpassword) {

                //	Обновляем данные входа:
                if ( isset ($emailEnter) ) {
                    $idg->query("UPDATE `idg_users` SET idg_last_enter_date = '" . date('d.m.Y H:i:s') . "', `idg_ip_last` = '" . $_SERVER['REMOTE_ADDR'] . "' WHERE `idg_email` = '" . $_POST['login'] . "'");
                } else {
                    $idg->query("UPDATE `idg_users` SET idg_last_enter_date = '" . date('d.m.Y H:i:s') . "', `idg_ip_last` = '" . $_SERVER['REMOTE_ADDR'] . "' WHERE `idg_login` = '" . $_POST['login'] . "'");
                }

                //	Формирование сессии и запись в Куки:
                $sessionhash = (string) sha1( $fetch_user['idg_usercode'] . 'alfa88beta' . $_SERVER['REMOTE_ADDR'] );
                $cookie_format = (string) $fetch_user['idg_usercode'] . '-' .$sessionhash;

                //	Записываем действие в журнал:

                setcookie ('rosgid_login', $cookie_format, time()+54000, '/');
                success ( "Успешный вход. Пожалуйста подождите..." );

            } else {

                //	Записываем действие в журнал:

                error ( "Неверные данные для входа." );

            }

        } else {

            $select_user->close();
            error ( "Неверные данные для входа." );

        }

    }

}


?>



