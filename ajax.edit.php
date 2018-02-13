<?php

include 'db.php';


// данные о пользователе (idg_users)

$ucode = $_POST['ucode'];
$idg_phone = $_POST['idg_phone'];
$idg_password = $_POST['idg_password'];
$idg_name = $_POST['idg_name']; // Ф.И.О. клиента
$idg_email = $_POST['idg_email']; // Email клиента

if($idg_password != 'Пароль задан')
{
    //	Создание хэша для пароля:
    $add_password_hash = sha1('alfa77beta' . sha1($idg_password) . $ucode);

    $h1=$idg->query( "UPDATE idg_users SET idg_login = '{$idg_email}', idg_password = '{$add_password_hash}', idg_name = '{$idg_name}', idg_email = '{$idg_email}' , idg_phone = '{$idg_phone}' WHERE idg_usercode = '{$ucode}'" );

}
else
{
    $h1 = $idg->query( "UPDATE idg_users SET idg_login = '{$idg_email}', idg_name = '{$idg_name}', idg_email = '{$idg_email}', idg_phone = '{$idg_phone}' WHERE idg_usercode = '{$ucode}'" );

}
//$content = "alert('Данные о клиенте успешно обновлены');";
header("location: http://adaly.ru/myprofile/");

// Обновление данных о сопровождении


//@header( "Content-type: text/html; charset=utf-8" );
//echo $content;
?>
