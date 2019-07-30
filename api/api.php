<?php
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:3000");
require 'config.php';
// include_once '../../password.php';
// require '../phpmailer/mailer.php';
error_reporting(E_ALL);
//print_r($_REQUEST);
//die('asda aass');
/***  Action base api call  ***/
if($_REQUEST['action'] == 'login'){ userLogin($db); }
if($_REQUEST['action'] == 'signup'){ userRegistration($db); }
if($_REQUEST['action'] == 'logout'){ agentLogout($db); }
if($_REQUEST['action'] == 'profile'){ agentProfile($db); }
if($_REQUEST['action'] == 'profileupdate'){ agentUpdateProfile($db); }
if($_REQUEST['action'] == 'changepassword'){ agentChangePassword($db); }
if($_REQUEST['action'] == 'forgot'){ forgotPassword($db); }
//if($_REQUEST['action'] == 'verifylink'){ agentVerificationLink($db); }
if($_REQUEST['action'] == 'location'){ mapMarkersByDistance($db); } 
if($_REQUEST['action'] == 'listing'){ savedSearchesByAgent($db); }
if($_REQUEST['action'] == 'savesearch'){ saveSearch($db); }
if($_REQUEST['action'] == 'searchename'){ updateSearcheName($db); }
if($_REQUEST['action'] == 'deletesearch'){ deleteSearches($db); }


/***  User Login  ***/
function userLogin($db){
	$email = $_REQUEST['email'];
	$password = $_REQUEST['password'];
	$error ='';
	$id='';

	if ($email == '') {
	   $error = 'Email was blank';
	} else if ($password == '') {
	   $error = 'Password was blank';
	} else {
	   $info = $db->SelectRow('user', array('email' => $email , 'status' => 'active'));
	   //print_r($info);
	   if ($password == $info['password']) {
	   	//if (password_verify($password, $info['password'])) {
	
	      if ($info === false) {
	         $error = 'Invalid Login';
	      } else { // login

	         $LoginKey = mt_rand(1000,9999) . mt_rand(1000,9999) . mt_rand(1000,9999) . mt_rand(1000,9999) . mt_rand(1000,9999); 
	         $db->UpdateRows('user', array('loginkey' => $LoginKey), array('email' => $info['email']));
	      	 date_default_timezone_set('Asia/Kolkata');
             $LoginAcc = date('Y-m-d G:i:s'); 
             $db->UpdateRows('user', array('create_date' => $LoginAcc), array('email' => $info['email']));
	         $_SESSION['loginkey'] = $LoginKey;//$info['loginkey'];
	         $_SESSION['id'] = $info['id'];
	         
	         //$loginkey = $info['loginkey'];
	         $id = $info['id'];
	      }
	   } else {
	      $error =  'Invalid Login';
	   }   
	}

	if($error != '' || $error != NULL){
		$a = array('success' => 0, 'error' => $error);
		echo json_encode($a);
	}else if($LoginKey != '' || $LoginKey != NULL){
		$a = array('success' => 1, 'loginkey' => $LoginKey, 'id' => $id);
		echo json_encode($a);
	}
	
	
}

/** User Registration **/
function userRegistration($db){
	$name = $_REQUEST['name'];
	$email = $_REQUEST['email'];
	$password = $_REQUEST['password'];
	$mobile = $_REQUEST['mobile'];
	$shopName=$_REQUEST['shopName'];
	$status = $_REQUEST['status'];

	$res = $db->RunQuery('select id from user where email = "'.$email.'"  LIMIT 1');
     
	//echo mysql_num_rows($res);
    if(mysql_num_rows($res) == 0) {

		$a=array('name'=>$name,'email'=>$email,'password'=>$password,'mobile'=>$mobile,'shopName'=>$shopName ,'status'=>$status);
	    $result = $db->InsertRow('user', $a);
	    if($result){
			$ar = array('success' => 1, 'message' => "You have registered successfully");
	    	echo json_encode($ar);
		}else{
			$ar = array('success' => 0, 'error' => "Failed to register, try again");
	    	echo json_encode($ar);
		}
	}else{
		$ar = array('success' => 0, 'error' => "This email is already exist");
	    echo json_encode($ar);
	}	
}


/***  Agent Logout  ***/
function agentLogout($db){
	session_destroy();
	$a = array('success' => 1, 'message' => 'Logged out successfully');
	echo json_encode($a);
}

/*** Profile View ***/
function agentProfile($db){
	//$LoginKeyAgent = $_REQUEST['LoginKeyAgent'];
	$AgentID = $_REQUEST['id'];
	$AgentInfo = false;
	
	$AgentInfo = $db->SelectRow('Agents', array('AgentNumber' => $AgentID));
	
	if ($AgentInfo == false) { // redirect to login
		$a = array('success' => 0, 'error' => 'Not logged in, try to login');
	}else{
		$a = array('success' => 1, 'agent' => $AgentInfo);
	}
	echo json_encode($a);
}

/*** Update Agent Profile ***/
function agentUpdateProfile($db){
	$AgentNumber = $_REQUEST['id'];

	$a = array('FirstName', 'LastName', 'BusinessName',
		'Address1', 'Address2', 'City', 'State', 'Zip', 'Phone', 'Office_phone');

	$a = $db->MakeValuesArray($a, $_REQUEST);

	$result = $db->UpdateRows('Agents', $a, array('AgentNumber' => $AgentNumber));

	if ($result) { 
		//$AgentInfo = $db->SelectRow('Agents', array('AgentNumber' => $AgentNumber));
		//if($AgentInfo){
			//$o = array('success' => 1, 'agent' => $AgentInfo);
		//}else{
			$o = array('success' => 0, 'message' => 'Profile updated successfully');
		//}		
	}else{
		$o = array('success' => 0, 'error' => 'Can not update profile'); 
	}
	echo json_encode($o);
}

/*** Change Agent Password ***/
function agentChangePassword($db){
	$AgentNumber = $_REQUEST['id'];

	$hash_pass = password_hash($_REQUEST['new_password'], PASSWORD_DEFAULT);
	$new_pass = array('Password' => $hash_pass);

	$PassCheck = $db->SelectRow('Agents', array('AgentNumber' => $AgentNumber));
	
	if (password_verify($_REQUEST['current_password'], $PassCheck['Password'])) {	
		$PassUpdate = $db->UpdateRows('Agents', $new_pass, array('AgentNumber' => $AgentNumber));
		if($PassUpdate){
			$o = array('success' => 1, 'message' => 'Password updated successfully');
		}else{
			$o = array('success' => 0, 'error' => 'Can not change password');
		}
	}else{
	    $o = array('success' => 0, 'error' => 'Can not change password'); 
	}
	echo json_encode($o);
}

/*** Forgot Password ***/
function forgotPassword($db){
	$email = $_REQUEST['email'];

	$UserDetail = $db->SelectRow('Agents', array('Email' => $email));
	if($UserDetail){
		if($UserDetail['Status'] == 'Active'){
			$domain = $_SERVER['SERVER_NAME'];

			$reset_link = $domain.'/reset-password.php?ky='.$UserDetail['LoginKey'];
			
			$to = $email;

			$subject = 'Reset password';

			require '../phpmailer/template/forgot.php';

			/* Mailer func */
			SendCommissionEmail($to, $subject, $message);

			$a = array('success' => 1, 'message' => 'Reset password link sent on email address');
		}else{
			$a = array('success' => 0, 'error' => 'Not an active user');
		}
	}else{
		$a = array('success' => 0, 'error' => 'Email address not registered');
	}
	echo json_encode($a);
}	

/*** Get Verification Link ***/
function agentVerificationLink($db){

	$email = $_REQUEST['email'];
    $agentDetail = $db->SelectRow('Agents', array('Email' => $email));
    if($agentDetail){
    	$agentID = $agentDetail['AgentNumber'];

	    function verificationKey($length = 10) {
	        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	        $charactersLength = strlen($characters);
	        $randomString = '';
	        for ($i = 0; $i < $length; $i++) {
	            $randomString .= $characters[rand(0, $charactersLength - 1)];
	        }
	        return $randomString;
	    }

	    $Verification_code = verificationKey();
	    $upd_data = array('Verification_code' => $Verification_code);
	    $vrfUpdate = $db->UpdateRows('Agents', $upd_data, array('AgentNumber' => $agentID));

	    $domain = $_SERVER['SERVER_NAME'];

	    /** Verify Link  **/

	    $verify_link = $domain.'/verify.php?vk='.$Verification_code;
	    $subject = 'Create password';

	    $to = $email;//trim($_REQUEST['to']);

	    require '../phpmailer/template/welcome.php';

	    /* Mailer func */
	    SendCommissionEmail($to, $subject, $message);
	        
		$a = array('success' => 1, 'message' => 'Verification link sent on email address');
	} else{
	    $a = array('success' => 0, 'error' => 'Failed to send verification link');
	}   
	echo json_encode($a);
}

/*** Map makrers by current location ***/
function mapMarkersByDistance($db) {
   $lat = $_REQUEST['lat'];
   $lng = $_REQUEST['lng'];

    $Vendors = getVendors($db);
  
    //$results = $db->RunQuery('select VendorID,Address,City,State,Zip,Lat,Lng,RateCenter,NPANXXLEC,RateCenterCode,DS1,Ethernet,ILECCLLI,BuildingCLLI from LitBuildings where VendorID in (Select VendorID from Vendors where Status = "Active" and VendorID != 32) and ( VendorID < 100 or VendorID > 100 ) LIMIT 10000');
   	//and ( Lat LIKE "%'.$lat.'%" or Lng LIKE "%'.$lng.'%" )

    $results = $db->RunQuery("SELECT
            LitBuildingID,VendorID,Address,City,State,Zip,custom_line_1,custom_line_2,custom_line_3,Lat,Lng,RateCenter,NPANXXLEC,RateCenterCode,DS1,Ethernet,ILECCLLI,BuildingCLLI, (
              3959 * acos (
                cos ( radians(".$lat.") )
                * cos( radians( Lat ) )
                * cos( radians( Lng ) - radians(".$lng.") )
                + sin ( radians(".$lat.") )
                * sin( radians( Lat ) )
              )
            ) AS `distance`
          FROM `LitBuildings`
          WHERE `VendorID` in (SELECT VendorID FROM `Vendors` WHERE Status = 'Active' )
          HAVING `distance` < 7
          ORDER BY `distance`
          LIMIT 0 , 5000");
   		  //and VendorID != 32) and ( VendorID < 100 or VendorID > 100	

   	if(mysql_num_rows($results) > 0){
   	  	$addresses = array();
      	$markers = [];
      	$markerDetails = [];
      	//$vendors = array();
    	while ($info = mysql_fetch_assoc($results)) {
        	$info['Address'] = str_replace("'", '&#39;', $info['Address']);

        	if (! in_array(strtolower($info['Address']) . '-' . $info['VendorID'], $addresses) && $info['Lat'] != '') {
        		$mLat = $info['Lat'];
        		$mLng = $info['Lng'];
        	
				/*echo $mLat = $info['Lat'];
				echo $mLng = $info['Lng'];
				echo ($lat+1).'  '.($lat-1);
				echo ($lng+1).'  '.($lng-1);*/

				//if( ($mLat <= ($lat+5) && $mLat >= ($lat-5)) && ($mLng <= ($lng+5) && $mLng >= ($lng-5) ) ){
	          	//echo $mLat.'  <=|=>  '.$mLng;
         
	          	$addresses[] = strtolower($info['Address']) . '-' . $info['VendorID'];
	          	$custom_line_1 = '';
	          	$custom_line_2 = '';
	          	$custom_line_3 = '';
	          	if($info['custom_line_1'] != ''){
	          		$custom_line_1 = '<br>'.$info['custom_line_1'];
	          	}
	          	if($info['custom_line_2'] != ''){
	          		$custom_line_2 = '<br>'.$info['custom_line_2'];
	          	}
	          	if($info['custom_line_3'] != ''){
	          		$custom_line_3 = '<br>'.$info['custom_line_3'];
	          	}

	          	if($info['VendorID'] == 17) {
	            	$info['xxxx'] = $info['Address'] . '<br>' . $info['City'] . ', ' . $info['State'] . ' ' . $info['Zip'] . '<br> MRC12 <b>$' . (int) $info['DS1'] . '</b> MRC24 <b>$' . (int) $info['Ethernet'] . '</b> MRC36 <b>$' . (int) $info['ILECCLLI'] . '</b> MRC64 <b>$' . (int) $info['BuildingCLLI'] . '</b>'. $custom_line_1.$custom_line_2.$custom_line_3;
	          	} elseif ($info['VendorID'] == 25) {
	            	$info['xxxx'] = $info['Address'] . '<br>' . $info['City'] . ', ' . $info['State'] . ' ' . $info['Zip'] . '<br> MRC <b>$' . (int) $info['RateCenterCode'] . '</b>'.$custom_line_1.$custom_line_2.$custom_line_3;
	          	} elseif ($info['VendorID'] == 29) {
	            	$info['xxxx'] = $info['Address'] . '<br>' . $info['City'] . ', ' . $info['State'] . ' ' . $info['Zip'] . '<br> ' . $info['RateCenter'] . ' MRC <b>$' . (int) $info['RateCenterCode'] . '</b>'.$custom_line_1.$custom_line_2.$custom_line_3;
	          	} elseif ($info['VendorID'] == 32) {
	            	$info['xxxx'] = $info['Address'] . '<br>' . $info['City'] . ', ' . $info['State'] . ' ' . $info['Zip'] . '<br> ' . $info['RateCenter'] . ' EOC_MAX <b>' .  $info['NPANXXLEC'] . '</b>'.$custom_line_1.$custom_line_2.$custom_line_3;
	          	} else {
	            	$info['xxxx'] = $info['Address'] . '<br>' . $info['City'] . ', ' . $info['State'] . ' ' . $info['Zip'].$custom_line_1.$custom_line_2.$custom_line_3;
	          	}

	          	//$markers[$i] = '{ icon:' . $info['VendorID'] . ", address:'" . $Vendors[$info['VendorID']] . ' - ' . $info['xxxx'] . "', lat:" .$info['Lat'] . ', lng:' . $info['Lng'] . '}';

	          	$vendors[] = $info['VendorID'] . "," . $Vendors[$info['VendorID']] . ",true";
	          	
	          	$markerDetails['icon'] = $info['VendorID'];
	          	$markerDetails['address'] = $Vendors[$info['VendorID']] . ' - ' . $info['xxxx'];
	          	$markerDetails['lat'] = $info['Lat'];
	          	$markerDetails['lng'] = $info['Lng'];
	          	$markers[] = $markerDetails;
          		//}
        	} 
    	} 

    	$vendors = array_unique($vendors);
		$vendors = array_values($vendors);
    	$vendorsRel = [];
    	$vendorData = [];
    	$row = 0;
	    foreach($vendors as $vendor) {
	    	$vendor = explode(",",$vendor);
	    	$vendorData['id'] = $vendor[0];
	    	$vendorData['name'] = $vendor[1];
	    	$vendorData['checked'] = $vendor[2];
	    	$vendorsRel[$row] = $vendorData;
	    	$row++;
	    }
   		//$vendorsRel;//All Active Vendors

		//$markers = implode(",", $markers);

		//echo $HomeDesc = 'Phone: '.$Phone.'<br />'.$Address.'<br />'.$City.', '.$State.' '.$Zip; 

		$LitBuildings = $markers;

		//print_r($LitBuildings);

		$a = array('success' => 1, 'HomeLocation' => array('lat' => $lat, 'lng' => $lng), 'data' => $LitBuildings, 'vendors' => $vendorsRel);
		echo json_encode($a); 

	}else{
    	$a = array('success' => 0, 'error' => "No marker found for given lat-long.");
        echo json_encode($a);
    } 
 }

/***  Agent Saved Search Listing  ***/
function savedSearchesByAgent($db) {
	$agent_number = $_REQUEST['id'];

 	$results = $db->RunQuery("select * from saveMapSearches where agent_number='".$agent_number."'order by date DESC");
              
    if(mysql_num_rows($results) > 0){
    	$savedSearches = [];
    	$i = 0;
        while ($row = mysql_fetch_assoc($results)) {
        	$savedSearches[$i] = $row;
        	$i++;
        }
        //print_r($savedSearches);
        $a = array('success' => 1, 'savedsearches' => $savedSearches);
        echo json_encode($a);
    }else{
    	$a = array('success' => 0, 'error' => "No record found.");
        echo json_encode($a);
    }    
}   

/***  Agent Add Search to Listing  ***/
function saveSearch($db){
	$Address = $_REQUEST['address'];
	$City = $_REQUEST['city'];
	$State = $_REQUEST['state'];
	$Zip = $_REQUEST['zip'];
	$Phone = $_REQUEST['phone'];
	$AgentNumber = $_REQUEST['agentid'];
	$Save_as = $_REQUEST['save_as'];
	
    $res = $db->RunQuery('select agent_number from saveMapSearches where agent_number = '.$AgentNumber.' and phone="'.$Phone.'" and LCASE(address)="'.strtolower($Address).'" and LCASE(city)="'.strtolower($City).'" and LCASE(state)="'.strtolower($State).'" and zipcode="'.$Zip.'" LIMIT 1');
     
	//echo mysql_num_rows($res);
    if(mysql_num_rows($res) == 0) {
      if($Save_as != NULL || $Save_as != ''){
        $a=array('phone'=>$Phone,'search_name'=>strtoupper($Save_as),'address'=>strtoupper($Address),'city'=>strtoupper($City),'state'=>strtoupper($State),'zipcode'=>$Zip,'agent_number' =>$AgentNumber,'date'=>date('Y-m-d H:i:s'));
        $result = $db->InsertRow('saveMapSearches', $a);
  		if($result){
  			$ar = array('success' => 1, 'message' => "Successfully saved search");
        	echo json_encode($ar);
  		}else{
  			$ar = array('success' => 0, 'error' => "Failed to save search");
        	echo json_encode($ar);
  		}        
      }else{
        $a=array('phone'=>$Phone,'address'=>strtoupper($Address),'city'=>strtoupper($City),'state'=>strtoupper($State),'zipcode'=>$Zip,'agent_number' =>$AgentNumber,'date'=>date('Y-m-d H:i:s'));
        $result = $db->InsertRow('saveMapSearches', $a);
        if($result){
  			$ar = array('success' => 1, 'message' => "Successfully saved search");
        	echo json_encode($ar);
  		}else{
  			$ar = array('success' => 0, 'error' => "Failed to save search");
        	echo json_encode($ar);
  		}
      }
    }else{
      if($Save_as != NULL || $Save_as != ''){
        $result = $db->RunQuery("UPDATE saveMapSearches SET search_name='".$Save_as."' WHERE address LIKE '%".strtolower($Address)."%' LIMIT 1");
        if($result){
  			$ar = array('success' => 1, 'message' => "Successfully saved search");
        	echo json_encode($ar);
  		}else{
  			$ar = array('success' => 0, 'error' => "Failed to save search");
        	echo json_encode($ar);
  		}
      }else{
  			$ar = array('success' => 0, 'error' => "Failed to save search");
        	echo json_encode($ar);
  	  }
    }
}

/***  Agent Update Search Name in Listing  ***/
function updateSearcheName($db){
	//$agent_id = $_REQUEST['agent_id'];
	$search_id = $_REQUEST['search_id'];
	$search_name = $_REQUEST['search_name'];


	$sql = 'UPDATE `saveMapSearches` SET `search_name`="'.$search_name.'" WHERE id="'.$search_id.'"';
  	$result = $db->RunQuery($sql);

  	if($result){
  		echo "Done";
  	}else{
  		echo "Failed";
  	}

}

/***  Agent Delete Search From Listing  ***/
function deleteSearches($db){
	$ids = $_REQUEST['ids'];
	$ids = json_decode($ids);
	
	//$ids = explode(',', $_REQUEST["ids"]);
	$result = '';
	foreach ($ids as $id) {
	  $sql = "DELETE FROM `saveMapSearches` WHERE id='".$id."'";
	  $result = $db->RunQuery($sql);
	}
	if($result == TRUE ){
		$ar = array('success' => 1, 'message' => "Successfully deleted searches");
        echo json_encode($ar);
	}else{
		$ar = array('success' => 0, 'error' => "Failed to delete searches");
        echo json_encode($ar);
	}
}
?>