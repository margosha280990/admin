<?php
//	Rosgid Engine 2.0 - Конфигурационный файл подключение к базе данных.

if ( !function_exists ('error') ) {
	//	Функция вывода ошибок:
	function error ($text) {
		echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="ru"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>Rosgid Engine - Error!</title><link href="/css/error.css" rel="stylesheet" type="text/css"></head><body><div><h1>Rosgid Engine - Error!</h1><span>' . $text . '</span></div></body></html>';
	}
}

//	Проверка безапасного подключения файла:
defined ('_ROSGID') or die ( error ('Error! #001 - Access Denide.') );

//	Объявляем данные для подключения:
$data_connection = array ('host' => 'localhost', 'login' => '', 'password' => '');

$idg = new mysqli($data_connection['host'], $data_connection['login'], $data_connection['password'], 'rosgid_idg');
$system = new mysqli($data_connection['host'], $data_connection['login'], $data_connection['password'], 'rosgid_system');
$web = new mysqli($data_connection['host'], $data_connection['login'], $data_connection['password'],'rosgid_web');
$db = new mysqli($data_connection['host'], $data_connection['login'], $data_connection['password'],'rosgid_arm');
$db_rosgid = new mysqli($data_connection['host'], $data_connection['login'], $data_connection['password'],'rosgid');
$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
	
//	Если есть ошибка в подключении к базам данных MySQL - выводим ошибку:
if ($idg->connect_errno) {die ( error ('Error! #002 - No Connect To User Database MySQL. Code: ' . $idg->connect_errno . '' ) );}
if ($system->connect_errno) {die ( error ('Error! #002 - No Connect To System Database MySQL. Code: ' . $system->connect_errno . '' ) );}
if ($web->connect_errno) {die ( error ('Error! #002 - No Connect To Web Database MySQL. Code: ' . $web->connect_errno . '' ) );}
if ($db->connect_errno) {die ( error ('Error! #002 - No Connect To Web Database MySQL. Code: ' . $db->connect_errno . '' ) );}
if ($db_rosgid->connect_errno) {die ( error ('Error! #002 - No Connect To Web Database MySQL. Code: ' . $db_rosgid->connect_errno . '' ) );}
if ($dbbuh->connect_errno) {die ( error ('Error! #002 - No Connect To User Database MySQL. Code: ' . $idg->connect_errno . '' ) );}

//	Выбираем, в какой кодировке, будем работать с базами данных:
$idg->query('SET NAMES utf8');
$system->query('SET NAMES utf8');
$web->query('SET NAMES utf8');
$db->query('SET NAMES utf8');
$db_rosgid->query('SET NAMES utf8');
$dbbuh->query('set names utf8');
?>
