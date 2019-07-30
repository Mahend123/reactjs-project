<?php
if($res)
if($ress)	
	foreach ($res as $r) {
		foreach ($ress as $rr) {
			
	
// 	print_r($res);
// print_r($ress);


//============================================================+
// File name   : example_061.php
// Begin       : 2010-05-24
// Last Update : 2014-01-25
//
// Description : Example 061 for TCPDF class
//               XHTML + CSS
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
 * @abstract TCPDF - Example: XHTML + CSS
 * @author Nicola Asuni
 * @since 2010-05-25
 */

// Include the main TCPDF library (search for installation path).
//require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
//$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('Customer Bill');
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData($rr->address);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
// $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage('P', 'A4');

/* NOTE:
 * *********************************************************
 * You can load external XHTML using :
 *
 * $html = file_get_contents('/path/to/your/file.html');
 *
 * External CSS files will be automatically loaded.
 * Sometimes you need to fix the path of the external CSS.
 * *********************************************************
 */


	   if(!empty($rr))
     {
		$head ='
		<table align="center" border="0" cellpadding="2" cellspacing="2" width="100%";>
			<tr><td  align="center" width="50%" style="max-width:50%;"><br>
				<h2>INVOICE</h2><strong style="text-decoration: underline;">Auth. Distributer :</strong><br>'.$rr->distributor.'
		    </td>
			<td align="left" width="50%" style="max-width:50%;"><br>
			'.$rr->address.' <br>Tel : 0731-4982762, US : '.$rr->telephone.', Mob : '.$r->customername.'<br>Email: '.' 
			</td>
		</tr>
		</table>';
		$pdf->writeHTML($head, true, false, false, false, '');
}
// define some HTML content with style
$html = <<<EOF
<!-- EXAMPLE OF CSS STYLE -->
<style>
   
</style>





<div>
	$rr->distributor
</div>


EOF;




// output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');





// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_061.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
}
}
