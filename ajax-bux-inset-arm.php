<?php
$org_code = $_POST['org'];
$name_rep = $_POST['nameRep'];
$type_rep = $_POST['typeRep'];
$plan_date = $_POST['dat'];

$rep_id = $_POST['repId'];
$mass_pln_date = explode(',', $plan_date);

$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
$dbbuh->query('set names utf8');
if ($org_code){
	if ($dbbuh){
		if (count($mass_pln_date)>0){
		for ($i=0, $coun=1; $i<count($mass_pln_date); $i+=2, $coun+=2 ){	
		$pl_d  = $mass_pln_date[$i];
		$fa_d = $mass_pln_date[$coun];
		$dbbuh->query("INSERT INTO `rosgid_reporttotax`  VALUES (NULL, '{$org_code}', '{$name_rep}', '{$rep_id}' ,'{$type_rep}', '{$pl_d}' , '{$fa_d}')");
		}
		}
	}
}else{
	
}
$squla = $dbbuh->query("SELECT rep_id, orgs_orgscode  FROM rosgid_reporttotax");
	if ($squla->num_rows>0){
		$massik = array();
		while( $row = $squla->fetch_assoc()){
			$code = $row['orgs_orgscode'];
		$rep_id1 = $row['rep_id'];
		array_push($massik, $rep_id1);
		}
		sort($massik);
		$g = count($massik)-1;
		$cry_id = $massik[$g];
	}
	//mysqli_close($dbbuh);
$data = array($cry_id);



$repport = $dbbuh->query("SELECT * FROM rosgid_reporttotax WHERE orgs_orgscode = '{$code}'");
	$err = 'ERROR';
	$rep_mass = array();
	if ($repport->num_rows>0) {
		while( $row = $repport->fetch_assoc()){
			$rep_id = $row['rep_id'];
			$rep_name = $row['report_name'];
			$rep_type = $row['type_rep'];
			$rep_day_plan = $row['plan_date'];
			$rep_day_fackt = $row['fackt_date'];
			$rep_code = $row['orgs_orgscode'];
			$id = $row['id'];
			
			$rep_mass_push = array($rep_id, $rep_name, $rep_type, $rep_day_plan, $rep_day_fackt, $id);
			array_push($rep_mass, $rep_mass_push);
			
		}
		
	}else{
		array_push($rep_mass, $err);
	}
	
$dat = array($data, $rep_mass, $code);
echo json_encode($dat);
?>
