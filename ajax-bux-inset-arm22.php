<?php
$id_rep=$_POST['id_rep'];
$org_code = $_POST['org_cod'];
$mas = $_POST['mas'];
$mas_dat = explode(',', $mas);
$pl_date = '2017-00-00';

//echo count($mas_dat);

$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
$dbbuh->query('set names utf8');
if ($dbbuh){
	if (count($mas_dat)>0){
		for ($i=0, $coun=1; $i<count($mas_dat); $i+=2, $coun+=2){
			$date = $mas_dat[$coun];
			$data = $mas_dat[$i];
			
			if ($date!=''){
					$dbbuh->query("UPDATE rosgid_reporttotax SET plan_date='{$data}' WHERE id='{$date}'");
			}else if($date==''){
				$sql_org_fin_repport = $dbbuh->query("SELECT * FROM rosgid_reporttotax WHERE orgs_orgscode = '{$org_code}' AND rep_id='{$id_rep}'");
				if ($sql_org_fin_repport->num_rows>0) {
					 while( $row = $sql_org_fin_repport->fetch_assoc()){
			                if ($id_rep == $row['rep_id']){
		                 	$rep_name = $row['report_name'];
		                	$rep_type = $row['type_rep'];
		                	$rep_day_plan = $row['plan_date'];
			                $rep_day_fackt = $row['fackt_date'];
			                $rep_code = $row['orgs_orgscode'];
		                	$id = $row['id'];
							}
				        }
						$dbbuh->query("INSERT INTO `rosgid_reporttotax`  VALUES (NULL, '{$rep_code}', '{$rep_name}', '{$id_rep}' ,'{$rep_type}', '{$data}' , '{$pl_date}')");
						
				}else{
					echo 'error';
				}
			}
		}
	}else{
		echo '505';
	}

	
		
	
}else{
	echo '404';
}
$squla = $dbbuh->query("SELECT rep_id, orgs_orgscode FROM rosgid_reporttotax");
	if ($squla->num_rows>0){
		$massik = array();
		while( $row = $squla->fetch_assoc()){
			$code = $row['orgs_orgscode'];
		$rep_id1 = $row[rep_id];
		array_push($massik, $rep_id1);
		}
		sort($massik);
		$g = count($massik);
		$cry_id = $massik[$g];
	}
	
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
	
$dat = array($rep_mass);
echo json_encode($dat);
?>

