<?php
/**
 * 
 */
class Pdf extends CI_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->library('Pdf_Library');
		$this->load->model('Pdf_Model');
	}
	public function generate(){
			$id = $this->uri->segment('3');
			$user_id = $this->uri->segment('4');
			// echo "id=".$id;
			// echo "user_id=".$user_id;		

	        $data['res'] = $this->Pdf_Model->Pdf_list($id);
	        $data['ress'] = $this->Pdf_Model->Pdfdata_list($user_id);
	        $data['email'] = $this->Pdf_Model->Pdf_email_get($user_id);
	        $data['images'] = $this->Pdf_Model->Pdf_images_get($user_id);

			$this->load->view('billview',$data);
	}
	
}

?>