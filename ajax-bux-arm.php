<?php
 /*
=================

//ajax php bux-arm
 
================= 
 */
 
 
    $idi = $_POST['idi'];
	$idg = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_idg');
	$idg->query('set names utf8');
	$dbbuh = new mysqli('localhost','retynan1389','3JhoBR0o','rosgid_buh');
	$dbbuh->query('set names utf8');
	if ($idi){
	$sql_org_idg = $idg->query( "SELECT * FROM idg_orgs WHERE id = '{$idi}' LIMIT 1" );
	while ( $row = $sql_org_idg->fetch_assoc() ) {
		 //������ � ��������
		    $orgs_orgscode = $row['orgs_orgscode'];
			$orgs_usercode = $row['orgs_usercode'];
			$orgs_ls = $row['orgs_ls'];
			$orgs_compname = $row['orgs_compname'];
			$orgs_username = $row['orgs_username'];
			$orgs_phone = $row['orgs_phone'];
			$orgs_email = $row['orgs_email'];
			$user_birthday = $row['orgs_user_birthday'];


		//������ � ������ �������������	
			$system_of_taxation = $idg->query( "SELECT * FROM idg_system_of_taxation WHERE orgs_orgscode = '{$orgs_orgscode}' LIMIT 1" );
			$toxation = $system_of_taxation -> fetch_assoc();
			if($toxation['USN_earnings'] == 1){$check_tox1='checked'; $tox1 = true;} else {$check_tox1=''; $tox1 = false;};
			if($toxation['USN_earnings_costs'] == 1){$check_tox2='checked'; $tox2 = true;} else {$check_tox2=''; $tox2 = false;};
			if($toxation['OSN'] == 1){$check_tox3='checked'; $tox3 = true;} else {$check_tox3=''; $tox3 = false;};
			if($toxation['ENVD'] == 1){$check_tox4='checked'; $tox4 = true;} else {$check_tox4=''; $tox4 = false;};
			$toxOne = array($check_tox1, $tox1);
            $toxSecond = array($check_tox2, $tox2);
			$toxThrid = array($check_tox3, $tox3);
			$toxFoor = array($check_tox4, $tox4);
		
		//����������� � ������ � ��������
		    $comments_comp = $idg->query( "SELECT * FROM idg_orgs_comments WHERE comment_orgscode = '{$orgs_orgscode}' and show_client = 1 " );
			if ( $comments_comp->num_rows > 0 ) {
				$com_mas=array();

				while($comments = $comments_comp -> fetch_assoc()) {
					$com_tex = $comments['comment_text'];
					$com_name = $comments['comment_add_manager_name'];
					$com_date = $comments['comment_add_date'].' '.date("H:i:s", $comments['timestamp']);
					$com_cl= $comments['comment_group'];
					$com_ar = array($com_name, $com_date,$com_tex, $com_cl, $i);
					array_push($com_mas, $com_ar);
				
				}	
			}	
	}
	
	//������ � ����������� �������
	$sql_org_fina = $dbbuh->query( "SELECT * FROM rosgid_fina WHERE fin_orgscode = '{$orgs_orgscode}'" );
	if ( $sql_org_fina->num_rows > 0 ) {
		while ( $row = $sql_org_fina->fetch_assoc() ) {
			$fin_id = $row['id'];
			$fin_service = $row['fin_service'];
			$fin_who_add = $row['fin_who_add'];
			$fin_price = $row['fin_price'];
			$fin_date_add = $row['fin_date_add'];
			$fin_comment = $row['fin_comment'];
			$fin_who_prepared = $row['fin_who_prepared'];
		    $fin_who_checked = $row['fin_who_checked'];
			$fin_contract_period = $row['fin_contract_period'];
			
			if ( $fin_contract_period ) {
					$end_date = explode('-', $fin_contract_period);
					$day_left = intval(( strtotime( $end_date[1] ) - time() ) / 86400);
					$day_left = ( $day_left > 0 ) ? '<font color="green">' . $day_left . '</font>' : '<font color="red">' . $day_left . '</font>';
			} else {$day_left = 'n/a';}
			
			$fin_ab = array($fin_service, $fin_date_add, $fin_price, $fin_contract_period, $day_left);
		}
	}
	
	//������ � ������� �������
	$sql_org_finr = $dbbuh->query( "SELECT * FROM rosgid_finr WHERE fin_orgscode = '{$orgs_orgscode}'" );
	if ( $sql_org_finr->num_rows > 0 ) {
		while ( $row = $sql_org_finr->fetch_assoc() ) {
			$fin_id = $row['id'];
			$fin_service = $row['fin_service'];
			$fin_who_add = $row['fin_who_add'];
			$fin_price = $row['fin_price'];
			$fin_date_add = $row['fin_date_add'];
			$fin_comment = $row['fin_comment'];
		    $fin_who_prepared = $row['fin_who_prepared'];
		    $fin_who_checked = $row['fin_who_checked'];
			
			$fin_rb = array ($fin_service, $fin_date_add, $fin_price, $fin_who_add, $fin_comment);
		}
	}

	
	//������ � ������� 
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
			
			$rep_mass_push = array($rep_id, $rep_name, $rep_type, $rep_day_plan, $rep_day_fackt, $id);
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
	
	$data = array($orgs_ls, $orgs_compname, $orgs_username, $orgs_phone, $orgs_email, $toxOne, $toxSecond, $toxThrid, $toxFoor, $com_mas, $fin_ab, $fin_rb, $rep_mass,$rep_code,$orgs_orgscode,$cry_id,$idi);
	echo json_encode($data);
	
	}

?>