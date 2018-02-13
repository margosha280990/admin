<?
include 'db.php';
$mes=$_POST['message'];
$ocode=$_POST['ocode'];
$name=$_POST['name'];
$dym=date("d.m.Y");
$time=time();

$comments_comp = $idg->query( " INSERT INTO idg_orgs_comments (comment_orgscode, comment_add_manager_name, comment_text, show_client, comment_add_date, comment_group, timestamp, module) 
 VALUES ('{$ocode}','{$name}', '{$mes}', '1', '{$dym}','client','{$time}', 'bookkeeping')" );

header("location: http://adaly.ru/myprofile/");




?>