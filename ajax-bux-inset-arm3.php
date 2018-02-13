<?php
$id_rep = $_POST['id'];
$rep_name = $_POST['name'];


$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
$dbbuh->query('set names utf8');
if ($dbbuh){
	$dbbuh->query("UPDATE rosgid_reporttotax SET report_name='{$rep_name}' WHERE rep_id='{$id_rep}'");
	echo 1;
}else{
	echo 0;
}

?>