<?php

$id = $_POST['id'];
$year = $_POST['year'];
$orgs_orgscode = $_POST['cod'];
$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
$dbbuh->query('set names utf8');
if ($id && $year){
	$sql_org_fin_repport = $dbbuh->query("SELECT * FROM rosgid_reporttotax WHERE orgs_orgscode = '{$orgs_orgscode}'");
	$err = 'ERROR';
	if ($sql_org_fin_repport->num_rows>0) {
		$rep_mass = array();
		while( $row = $sql_org_fin_repport->fetch_assoc()){
			$rep_id = $row['rep_id'];
			$rep_name = $row['report_name'];
			$rep_type = $row['type_rep'];
			$rep_day_plan = $row['plan_date'];
			$rep_day_fackt = $row['fackt_date'];
			$rep_code = $row['orgs_orgscode'];
			$id = $row['id'];
			
			$rep_mass_push = array($rep_id, $rep_name, $rep_type, $rep_day_plan,$rep_day_fackt, $id);
			array_push($rep_mass, $rep_mass_push);
			
		}
		
	}else{
		array_push($rep_mass, $err);
	}
	
	$squla = $dbbuh->query("SELECT rep_id FROM rosgid_reporttotax");
	if ($squla->num_rows>0){
		$massik = array();
		while( $row = $squla->fetch_assoc()){
		$rep_id1 = $row[rep_id];
		array_push($massik, $rep_id1);
		}
		sort($massik);
		$g = count($massik)-1;
		$cry_id = $massik[$g];
	}
	$data = array($year, $rep_mass, $rep_code,$cry_id);
	echo json_encode($data);
}

?>