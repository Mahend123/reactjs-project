<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include_once "class.EvoSQL.php";

// $DB_HOST = '34.230.123.79';
// $DB_NAME = 'fiberlo_evonet_quote';
// $DB_USER = 'acs_fiberlookup';
// $DB_PASSWORD = 'g]v|=EjE,JUKY2F';

$DB_HOST = 'localhost';
$DB_NAME = 'pstock_db';
$DB_USER = 'root';
$DB_PASSWORD = '';

$db = new EvoSQL();
$db->Connect($DB_HOST, $DB_NAME, $DB_USER, $DB_PASSWORD);

$ServiceIDs = array(
    0 => 'Unknown',
    1 => "Ethernet (Internet Access)",
    2 => "Bonded (NXT1) 3.0 to 12Mbps",
    3 => "Fractional /Burstable DS3",
    4 => "Full DS3  (45Mbps)",
    5 => "OC3 (155Mbps) ",
    6 => "OC12 - OC48",
    7 => "Internet T1 (1.5Mbps)",
    8 => "Ethernet (WAN Integration)",
    9 => "Dark Fiber ",
    10 => "Collocation ",
    11 => "VPN",
    12 => "MPLS",
    13 => "Frame Relay",
    14 => "Private Line (T1 to 1 GIG)",

    15 => "Long Distance T1 /ISDN PRI",
    16 => "Local T1 /ISDN PRI ",
    17 => "Voice DS3 ",
    18 => "Call Center Applications",
    19 => "VOIP SIP Trunks ",
    20 => "Hosted VOIP / PBX",

    21 => "Internet/ MPLS",
    22 => "Internet/ MPLS / Voice (SIP, PRI or Analog)",
    23 => "Internet/ Voice (SIP, PRI or Analog)",

    24 => "Hosted Email Exchange",
    25 => "Disaster Recovery",
    26 => "Dedicated Server",
    27 => "Server Backup",
    28 => "Hosted Network Security",
    29 => "Managed Firewall",
    30 => "IT Help Desk");

function getVendors(&$db) {
    $results = $db->SelectRows('Vendors');
    $a = array();
    while ($info = mysql_fetch_assoc($results)) {
        $a[$info['VendorID']] = $info['VendorName'];
    }
    return $a;
}

function getBaseUrl(){
	return $url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
}

/* gets the data from a URL */
function get_data($url) {
    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

function GoogleGeoCode(&$db, $address) {
    $url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDYV6Y1M0FR4waNqDfw-f_QqsYuBMFaYfY&address=';
    $url .= urlencode($address . ", USA") . '&sensor=false';

    echo 'Calling ' . $url . "<br />\n";

    $html = get_data($url);

    $json = json_decode($html, true);

    if (array_key_exists('error_message', $json) && $json['error_message'] != '') {
        die('Error: ' . $json['error_message']);
    }


    if ($json['status'] == 'ZERO_RESULTS') {
        return "ZERO_RESULTS";
    } else if ($json['status'] != "OK") {
        return false;
    }
    $a = array();
    $Address = $json['results'][0];

    if (array_key_exists('partial_match', $Address) && $Address['partial_match'] == true) {
        return "PARTIAL_RESULTS " . htmlentities($html);
    }

    $Address['formatted_address'] = str_replace('Northern Michigan University, Up Campus', 'Northern Michigan University', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Washington University North Campus (M-6), 700 Rosedale Avenue, Washington University in St. Louis, Washington University in St. Louis North Campus', 'Washington University in St. Louis North Campus', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Washington University in St. Louis, Washington University in St. Louis South Campus', 'Washington University in St. Louis South Campus', $Address['formatted_address']);

    $Address['formatted_address'] = str_replace('Humboldt-Toiyabe National Forest, Round Hill Village Shopping Center, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Pioneer Hall, Blue Mountain Community College, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Churchill Hall, Southern Oregon University, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Campbell Hall, Bethel University, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Drumlin Dining Hall, University of Wisconsin - Whitewater, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('University of Illinois at Chicago, University of Illinois Hospital & Health Sciences System, ', '', $Address['formatted_address']);
    $Address['formatted_address'] = str_replace('Building A, Mueller Market District, ', '', $Address['formatted_address']);

    $a['formatted_address'] = str_replace(', USA', '', $Address['formatted_address']);
    $a['lat'] = $Address['geometry']['location']['lat'];
    $a['lng'] = $Address['geometry']['location']['lng'];

    $b = explode(",", $Address['formatted_address']);
    $Address2 = '';
    if (sizeof($b) == 4) {
        list($Address1, $City, $State, $Country) = $b;
    } elseif (sizeof($b) == 5) {
        list($Address1, $Address2, $City, $State, $Country) = $b;
    } elseif (sizeof($b) == 6) {
        list($Name, $Address1, $Address2, $City, $State, $Country) = $b;
        if (! is_numeric(substr($Address1, 0, 1))) {
            $Address1 = $Address2;
            $Address2 = '';
        }
    } else {
        echo " size was " . sizeof($b) . "<pre>" . print_r($b, 1) . print_r($address, 1) . "</pre>";
        echo "Formatted Address is <pre>" . print_r(explode(",", $Address['formatted_address']),1) . "</pre>";
        echo "raw = " . $Address['formatted_address'];
        die;
    }

    if ($City == $State) {
        $State = $Country;
        $Country = $b[5];
    }

    if (trim($Country) !== 'USA') {
        echo "Error: country was not USA<br>Address1 = " . $Address1 . "<br>City = " . $City . "<br>State = " . $State . "<br>Formatted = " . $Address['formatted_address'] . "<br>";
        die('country = ' . $Country);
        return 'ZERO_RESULTS';
    }
    $a['Address1'] = trim($Address1);
    $a['Address2'] = trim($Address2);
    $a['City'] = trim($City);
    list($State, $Zip) = explode(" ", trim($State));
    $a['State'] = trim($State);
    $a['Zip'] = trim($Zip);
    $a['Html'] = $html;
    $a['Raw'] = $json;
    return $a;
}

function MailSetup() {
   include_once $_SERVER['DOCUMENT_ROOT'] . "/class.phpmailer5.php";
   include_once $_SERVER['DOCUMENT_ROOT'] . "/class.smtp.php";

   $mail = new PHPMailer();  // create a new object
   $mail->IsSMTP(); // enable SMTP
   $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
   $mail->SMTPAuth = true;  // authentication enabled
   $mail->SMTPSecure = 'ssl';
   $mail->Host = 'mail.fiberlookup.com';
   $mail->Port = 465;
   $mail->Username = 'smtp@fiberlookup.com';
   $mail->Password = 'smtp123!';

   return $mail;
}

?>
