<?php
if($res)
if($ress)
	// echo "<pre>";	
	// print_r($res);
	//  echo "<pre>";	

	 //print_r($email);
	// echo "<pre>";	

	// echo "<pre>";	
	// print_r($images);
	//  echo "<pre>";
	 foreach ($images as $image) {
	 		// echo 
	 		
foreach ($email as $mail) {
	foreach ($res as $r) {
		
		$comm = explode('-', $r->product );
			
			$a = $comm[0];
			$b = $comm[1];
			$c = $comm[2];
			$d = $comm[3];
			$e = $comm[4];
			$f = $comm[5];

			
			// echo($f);
			// echo($c);

			$dd = explode('X', $d);
			 	$sq = $dd[0] * $dd[1] ;
				//echo $sq;
			// echo($e);
			// echo($f);

		foreach ($ress as $rr) {


//============================================================+
// File name   : example_002.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 002 for TCPDF class
//               Removing Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Removing Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
//require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle($r->customername.' Bill');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
// $pdf->SetMargins(PDF_MARGIN_LEFT, '' PDF_MARGIN_RIGHT);
$pdf->SetMargins(10, 10, 10, true);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
// $pdf->SetFont('times', 'BI', 20);
$pdf->SetFont('helvetica', '', 10);
// add a page
$pdf->AddPage('P', 'A4');

 if(!empty($rr))
     {
		$head ='
		<table align="center" border="0" cellpadding="2" cellspacing="2" width="100%";>
		
			<tr>
			<td align="left" width="33%" style="max-width:50%;"><br>

			   
			<img src="http://localhost/react-demo/crud/uploads/'.$mail->image2 .'" >	
			</td>
			<td  align="center" width="33%" style="max-width:50%;"><br>
				<h2>INVOICE</h2><strong style="text-decoration: underline;">Auth. Distributer :</strong><br>'.$rr->distributor.'
		    </td>
			<td align="left" width="33%" style="max-width:50%;"><br>
			'.$rr->address.' <br/>Tel : 0731-4982762, US : '.$rr->telephone.',  Mob : '.$r->contactno.'<br>Email: '. $mail->email . ' 
				
			</td>
		</tr>
		</table>';

		$pdf->writeHTML($head, true, false, false, false, '');
}


$pdf->writeHTML("<hr>", true, false, false, false, '');
// set some text to print
$html = <<<EOF
<!-- EXAMPLE OF CSS STYLE -->
<style>
   
    
   
    
</style>


<br />
<br />

<table >
	<tr>

	   <b style="font-size:15px;"> Deals in :</b> <td  height="80" > 
<img src="http://localhost/react-demo/crud/uploads/$image->deal1" height="52" width="90">

<img src="http://localhost/react-demo/crud/uploads/$image->deal2" height="52" width="90">

<img src="http://localhost/react-demo/crud/uploads/$image->deal3" height="52" width="90">

<img src="http://localhost/react-demo/crud/uploads/$image->deal4" height="52" width="90">

<img src="http://localhost/react-demo/crud/uploads/$image->deal5" height="52" width="90">

<img src="http://localhost/react-demo/crud/uploads/$image->deal6" height="52" width="90">

	    </td>
	   
	 </tr>
</table>


<br />
<br />

<table border="1" class="first" cellpadding="4" cellspacing="4">
<tr>
    <td rowspan="4">
	M/s : $r->customername  <br/>	
	Address : $r->address <br/>
	Contact : $r->contactno <br/>
    </td>
    <td> INVOICE NO. : $r->invoiceno </td>
 </tr>
 <tr>
 	<td>GST NO. : $r->gst_number </td>
  	
 </tr>
 <tr>
  	<td>TRANS : $r->trans </td>
 </tr>
 <tr>
  	<td>DATE : $r->create_date </td>
  	
 </tr>

 
</table>
EOF;

// output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');

// ---------------------------------------------------------

$tbl = <<<EOD



<table   cellpadding="2" cellspacing="0" >
<thead>
 
 <tr style="background-color:#FFFF00;color:#0000FF;">
  <td  width="45"  border="1"	align="center"> <b>S.No</b></td>
  <td width="140" border="1"	align="center"> <b>ProductName</b></td>
  <td width="110"  border="1"	align="center"> <b>HSN Code</b></td>
  <td width="70" border="1"	align="center"> <b>Code</b></td>
  <td width="70" border="1"	align="center"> <b>Code2</b></td>
  <td width="45" border="1"	align="center"> <b>Qut.</b></td>
  <td width="50" border="1"	align="center"> <b>Sq.Ft.</b></td>
  <td width="50" border="1"	align="center"> <b>Rate</b></td>
  <td width="75" border="1"	align="center"> <b>Total</b></td>
 </tr>
</thead>


 <tr  bgcolor="#f5f7cb">
  <td  border="1" width="45" align="center" >1.</td>
  <td border="1" width="140"height="145" > $a </td>
  <td border="1" width="110"height="145" > $f </td>
  <td border="1" width="70" height="145" > $b  </td>
  <td border="1" width="70" height="145" > $c  </td>
  <td border="1" width="45" height="145" > $e  </td>
  <td border="1" width="50" height="145" > $sq  </td>
  <td border="1" width="50" height="145" > $r->price  </td>
  <td border="1" width="75" height="145" > $r->total  </td>
 </tr>
 
 <tr >
	 <td colspan="6" rowspan="10" ><br/><br/><br/><br/>
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  GSTIN No  : $rr->gstno <br/><br/>
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Bank Name : $rr->bankdetail  <br/><br/>
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  A/C No    : $rr->acno <br/><br/>
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  IFSC No   : $rr->ifsc <br/><br/>
		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Branch    : $rr->branch <br/><br/>
	 </td>
 	<td bgcolor="#f5f7cb" border="1" colspan="2">Subtotal</td>
  				<td bgcolor="#f5f7cb" border="1">$r->total</td>
 </tr>

 <tr bgcolor="#f5f7cb">
	<td border="1" colspan="2">Discount</td>
 	<td border="1">$r->disval </td>
 </tr>

<tr bgcolor="#f5f7cb">
	<td border="1" colspan="2">Fright</td>
 	<td border="1">$r->fright</td>
 </tr>

<tr bgcolor="#f5f7cb">
	<td border="1" colspan="2">CGST</td>
 	<td border="1">$r->gstvalue</td>
 </tr>

<tr bgcolor="#f5f7cb"> 
	<td border="1" colspan="2">SGST</td>
 	<td border="1"></td>
 </tr>

<tr bgcolor="#f5f7cb">
	<td border="1" colspan="2">IGST</td>
 	<td border="1">$r->igstinsval</td>
 </tr>

<tr bgcolor="#f5f7cb">
	<td border="1" colspan="2">Grand Total</td>
 	<td border="1">$r->grandtotal</td>
 </tr>


</table>

  
  




EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
//---------------------------------------------------------------

$html1 = <<<EOF
<!-- EXAMPLE OF CSS STYLE -->
<style>
   
    
    
    div.test1 {
        font-family: helvetica;
        border-style: solid solid solid solid;
        border-width: 1px 1px 1px 1px;
	    height:20px;
	    margin-bottom: 5px;
    }
    
</style>


<br /><br /><br /><br /><br /><br /><br /><br /><br />

<div bgcolor="#c5d2e6" class="test1">
	 <br /><b> &nbsp; Terms & Conditions : </b> <&nbsp><&nbsp>
	 <br />
	 <b> &nbsp; All condition</b> <br /> 	
</div>




EOF;

// output the HTML content
$pdf->writeHTML($html1, true, false, true, false, '');









//Close and output PDF document
$pdf->Output( $r->customername.'.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
		}
	}
   }
}