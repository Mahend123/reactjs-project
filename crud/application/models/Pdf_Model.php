<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Pdf_Model extends CI_Model {

    private $billing_tbl = 'billing_tbl';
    private $pdf_tbl = 'pdf_tbl';
    private $user  =  'user';
    private $image_tbl  =  'image_tbl';
     
    
    
    public function Pdf_list($id) {
        $query = $this->db->get_where($this->billing_tbl, array("id" => $id));
        
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function Pdfdata_list($user_id){
    	 $query = $this->db->get_where($this->pdf_tbl, array("user_id" => $user_id));
        
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function Pdf_email_get($user_id){
    	 $query = $this->db->get_where($this->user, array("id" => $user_id));
        
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function Pdf_images_get($user_id){
         $query = $this->db->get_where($this->image_tbl, array("user_id" => $user_id));
        
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    
    // public function Pdf_imagesprofile_get($user_id){
    //      $query = $this->db->get_where($this->user, array("id" => $user_id));
        
    //     if ($query) {
    //         return $query->result();
    //     }
    //     return NULL;
    // }
    
}