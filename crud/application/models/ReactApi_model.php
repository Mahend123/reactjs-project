
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReactApi_model extends CI_model {
  
  public function get_products()
  {
    $this->db->select('*');
    $query = $this->db->get('userkyc_tbl');
    return $query->result();
  }

 public function get_product($productId)
  {

    //$this->db->select('*');
    $this->db->where('id', $productId);
    $query = $this->db->get('userkyc_tbl');
    // $data = $query->result_array();
   
    return $query->row();
  }

  public function insert_product($productData)
  {
    $this->db->insert('testkey', $productData);
    return $this->db->insert_id();
  }

  public function update_product($id, $productData)
  {
    $this->db->where('id', $id);
    $this->db->update('products', $productData);
  }

  public function delete_product($productId)
  {
    $this->db->where('id', $productId);
    $this->db->delete('products');
  }

  public function insert_img($data_insert){
	$this->db->insert('img_tbl',$data_insert);
	}

	
  public function saverecord($value){ 

    $n=$this->db->insert("img_tbl",$value);
    return $n;
  }
}
?>








