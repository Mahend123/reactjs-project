
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class UserModel extends CI_Model {

    private $user = 'user';
    
    
    
    public function get_Userprofile($id) {
        $query = $this->db->get_where($this->user, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }

     public function update_userprofile($id, $data) {
        $this->db->where('id', $id);
        $this->db->update($this->user, $data);
    }
   
  	public function get_alluserrecordbyid($id){
  		$query = $this->db->get_where($this->user, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL; 
  	}
    
}