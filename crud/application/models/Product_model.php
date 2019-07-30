<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Product_model extends CI_Model {

    private $product_tbl = 'product_tbl';
    private $category_tbl = 'category_tbl';
    private $pdf_tbl = 'pdf_tbl';
    private $billing_tbl = 'billing_tbl';
    private $image_tbl = 'image_tbl';
    private $import_tbl = 'import_tbl';
    
    
    
    
	
    public function get_products_list() {
        $query = $this->db->get($this->product_tbl);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function get_product($id) {
        $query = $this->db->get_where($this->product_tbl, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function product_add($data) {
       $result=$this->db->insert("product_tbl",$data);
        return $result;
    }

    public function update_product($id, $data) {
        $this->db->where('id', $id);
        $this->db->update($this->product_tbl, $data);
    }

    public function delete_Product($productId){
        $this->db->where('id', $productId);
        $this->db->delete('product_tbl');
    }
	
	

    public function saverecord($value){
        $result=$this->db->insert("img_tbl",$value);
        return $result;
    }

    //**********************CATEGORY SECTION***************************//

    public function category_add($data){
        $result=$this->db->insert("category_tbl",$data);
        return $result;
    }

    public function get_category_list(){
       $query = $this->db->get($this->category_tbl);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function get_category($id){
         $query = $this->db->get_where($this->category_tbl, array("id" => $id));
            if ($query) {
                return $query->row();
            }
            return NULL;
    }

    public function update_category($id, $data) {
        $this->db->where('id', $id);
        $this->db->update($this->category_tbl, $data);
    }

    public function delete_Category($catId){
        $this->db->where('id', $catId);
        $this->db->delete('category_tbl');
    }



//*******************PDF Section***********************//

    public function pdfpage_add($data) {
       $result=$this->db->insert("pdf_tbl",$data);
        return $result;
    }

    
    public function get_pdfpages_list() {
        $query = $this->db->get($this->pdf_tbl);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }


    public function get_pdfpage($user_id) {
        $query = $this->db->get_where($this->pdf_tbl, array("user_id" => $user_id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function update_pdfpage($id, $data) {
        $this->db->where('id', $id);
        $this->db->update($this->pdf_tbl, $data);
    }

    //**************************BILLING SECTION********************************//

    public function get_billprducts_list() {
        $query = $this->db->get($this->product_tbl);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }


    public function billprduct_add($data) {
       $result=$this->db->insert("billing_tbl",$data);
        return $result;
    }
    
    
    public function get_allbill_list() {
        $query = $this->db->get($this->billing_tbl);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    public function delete_bill($billId){
        $this->db->where('id', $billId);
        $this->db->delete('billing_tbl');
    }

    public function get_billone($id){
       $query = $this->db->get_where($this->billing_tbl, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;         
    }

    //**********************Image Name Save Database****************************//
    
    public function get_photo($user_id) {
        $query = $this->db->get_where($this->image_tbl, array("user_id" => $user_id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

    public function Image_add($data) {
       $result=$this->db->insert("image_tbl",$data);
        return $result;
    }

    public function update_photos($id, $data){
        $this->db->where('id', $id);
        $this->db->update($this->image_tbl, $data);
    }


    public function get_allphotosrecord($id){
      $query = $this->db->get_where($this->image_tbl, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;  
    }

    
     public function insert_excelfile($dataa) {
       
       $result=$this->db->insert("product_tbl",$dataa);
        return $result;
    }
}